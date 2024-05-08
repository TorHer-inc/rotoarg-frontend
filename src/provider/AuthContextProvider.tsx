import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '@/hooks/axiosInstance';
import Cookies from 'js-cookie';
import { NavLink, useLocation } from 'react-router-dom';

interface User {
  id    : string;
  name  : string;
  email : string;
  image : string;
  role  : string[];
}

interface AuthContextType {
  user            : User | null;
  login           : (email: string, password: string) => Promise<void>;
  logout          : () => void;
  isAuthenticated : boolean
  loading         : boolean
}

export const AuthContext = createContext<AuthContextType>({
  user            : null,
  login           : async () => {},
  logout          : () => {},
  isAuthenticated : false,
  loading         : false,
});

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextType;
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showExpiredSessionModal, setShowExpiredSessionModal] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password
      });
      console.log("nativeUserResponse", response);
      
      const userData: User = response.data.user;

      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error logging in:', error);
      throw error;
    }
  };

  const logout = () => {
    Cookies.remove('session')
    setUser(null)
    setIsAuthenticated(false);
  };
  
  const location = useLocation();

  useEffect(() => {
    const checkLogin = async () => {
      setLoading(true);
      const cookies = Cookies.get();
      console.log(cookies);
      
      if (!cookies.session) {
        setIsAuthenticated(false);
        setLoading(false); 
        return;
      }

      try {
        const res = await axiosInstance.get(`/auth/verify`);
        console.log('/auth/verify', res);

        if (!res.data) return setIsAuthenticated(false);

        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error: any) {
        if (error.response && error.response.status === 401) {
          setShowExpiredSessionModal(true);
        }
        setIsAuthenticated(false);
        setLoading(false);
        logout();
      }
    };
    
    checkLogin();

    // const interval = setInterval(checkLogin, 10000);
    // return () => clearInterval(interval);
  }, [location]);

  const handleCloseModal = () => {
    setShowExpiredSessionModal(false);
  };

  const adminRoutetoken = import.meta.env.VITE_REACT_APP_ADMIN_TOKEN;
  const ruta = `/iniciar-sesion-${adminRoutetoken}`;
  
  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {children}
          {showExpiredSessionModal && (
                      <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
                      <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                      </div>
          
                      <div className="relative z-10 bg-white p-8 rounded-lg shadow-xl max-w-md">
                        <div className="flex justify-between items-center mb-4">
                          <h2 className="text-lg font-semibold">¡Tu sesión ha expirado!</h2>
                          <button className="text-gray-500 hover:text-gray-700" onClick={handleCloseModal}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
          
                        <p className="text-sm text-gray-700">Tu sesión no es válida. Por favor, vuelve a iniciar sesión.</p>
                        <NavLink to={ruta} onClick={handleCloseModal}>Iniciar Sesión</NavLink> 
                      </div>
                    </div>
          )}
        </>
      )}

    </AuthContext.Provider>
  );
};