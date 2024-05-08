import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/provider/AuthContextProvider";
import rotoargLogoWG from "@/assets/rotoargLogoWG.svg";
// import rotoargLogoDB from "@/assets/rotoargLogoDB.svg";
// import rotoargLogoWB from "@/assets/rotoargLogoWB.svg";
// import rotoargLogoDG from "@/assets/rotoargLogoDG.svg";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const isAdmin = user?.role.includes("ADMIN_ROLE");

  console.log("User:", user);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    logout();
    navigate("/");
  };

  const isListaDePrecios = location.pathname === "/lista-de-precios";

  return (
    <div
      className={`w-full text-white transition-all duration-500 ${
        isScrolled ? "sticky top-0 bg-gray-800 shadow-lg z-50" : ""
      } ${isListaDePrecios ? "bg-gray-800" : ""}`}
    >
      <div className="flex flex-row max-w-[1420px] items-center justify-between mx-auto relative top-0 left-0 py-6 px-6">
        <div className="text-lg">
          <img src={rotoargLogoWG} alt="Logo" className="h-12 w-auto" />
        </div>

        <div className="flex flex-row gap-10">
          <NavLink 
            className="text-sm md:text-2xl font-bold" 
            to="/"
          >
            INICIO
          </NavLink>
          <NavLink
            className="text-sm md:text-2xl font-bold"
            to="/productos"
          >
            PRODUCTOS
          </NavLink>
          <NavLink
            className="text-sm md:text-2xl font-bold"
            to="/lista-de-precios"
          >
            LISTA DE PRECIOS
          </NavLink>
          <NavLink
            className="text-sm md:text-2xl font-bold"
            to="/contacto"
          >
            CONTACTO
          </NavLink>
          
          {isAdmin && 
            <NavLink className="text-sm md:text-2xl font-bold" to="/dashboard">
              ADMIN
            </NavLink>
          }
        </div>

        {loading ? (
          <div className="flex flex-col">
            <p>Cargando info de usuario...</p>
            <p>Cargando info de usuario...</p>
          </div>
        ) : (
          isAuthenticated ? (
            <div className="flex flow-row gap-4">
              <img src="https://stickerly.pstatic.net/sticker_pack/RoQKd7eh2a6EUxtCfRXefw/WV0IMP/2/3fc94da3-1518-4ee6-a2a0-6df612ade495.png" className="w-[50px] rounded-full" alt="" />
              <div>
                <p className="">{user?.name}</p>
                <p className="">{user?.email}</p>
              </div>
              <button onClick={(event) => handleLogout(event)}>
                Cerrar sesión
              </button>
            </div>
          ) : null
        )}

      </div>
    </div>
  );
};

export default Navbar;




// import { useState, useEffect } from "react";
// import { NavLink, useLocation } from "react-router-dom";
// import rotoargLogoWG from "@/assets/rotoargLogoWG.svg";
// import axiosInstance from "@/hooks/axiosInstance";

// interface GoogleUserData {
//   name  : string;
//   image : string;
//   email : string;
//   role  : string[];
// }


// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const location = useLocation();
  
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       if (scrollPosition > 0) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const isListaDePrecios = location.pathname === "/lista-de-precios";

//   const [googleUserdata, setGoogleUserdata] = useState<GoogleUserData>();
//   console.log("data", googleUserdata)

//   const getUser = async () => {
//     try {
//       const response = await axiosInstance.get("/auth/login/sucess");
//       console.log("peticion", response);
      
//       setGoogleUserdata(response.data.user)
//     } catch (error) {
//       console.log("error", error)
//     }
//   }

//   useEffect(() => {
//     getUser()
//   }, [])

//   const isAdmin = googleUserdata?.role.includes("ADMIN_ROLE");

//   return (
//     <div
//       className={`w-full text-white transition-all duration-500 ${
//         isScrolled ? "sticky top-0 bg-gray-800 shadow-lg z-50" : ""
//       } ${isListaDePrecios ? "bg-gray-800" : ""}`}
//     >
//       <div className="flex flex-row max-w-[1420px] items-center justify-between mx-auto relative top-0 left-0 py-6 px-6">
//         <div className="text-lg">
//           <img src={rotoargLogoWG} alt="Logo" className="h-12 w-auto" />
//         </div>

//         <div className="flex flex-row gap-10">
//           <NavLink 
//             className="text-sm md:text-2xl font-bold" 
//             to="/"
//           >
//             INICIO
//           </NavLink>
//           <NavLink
//             className="text-sm md:text-2xl font-bold"
//             to="/productos"
//           >
//             PRODUCTOS
//           </NavLink>
//           <NavLink
//             className="text-sm md:text-2xl font-bold"
//             to="/lista-de-precios"
//           >
//             LISTA DE PRECIOS
//           </NavLink>
//           <NavLink
//             className="text-sm md:text-2xl font-bold"
//             to="/contacto"
//           >
//             CONTACTO
//           </NavLink>
          
//           {isAdmin && (
//             <NavLink className="text-sm md:text-2xl font-bold" to="/dashboard">
//               ADMIN
//             </NavLink>
//           )}
//         </div>

//         {googleUserdata &&
//           <>
//             <p className="font-bold">{googleUserdata?.name}</p>
//             <p className="font-bold">{googleUserdata?.email}</p>
//             <img src={googleUserdata?.image} className="w-[50px] rounded-full" alt="" />
//           </>
//         }
//       </div>
//     </div>
//   );
// };

// export default Navbar;