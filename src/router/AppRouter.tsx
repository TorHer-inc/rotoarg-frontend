import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../auth/pages/LoginPage'
import DashboardPage from '../dashboard/pages/DashboardPage'
import ProductsRoutes from '../products/routes/ProductsRoutes'
import NotFoundPage from '../NotFound/pages/NotFoundPage';

const AppRouter = () => {

  const token = import.meta.env.VITE_REACT_APP_ADMIN_TOKEN;

  return (
    <>
      <Routes>
        <Route path='/' element={<ProductsRoutes />} />

        <Route path='/products/*' element={<ProductsRoutes />} />

        <Route path={`/login-${token}`} element={<LoginPage />} />

        <Route path='/dashboard' element={<DashboardPage />} />
        
        <Route path='/404' element={<NotFoundPage />} />
        <Route path="/*" element={ <Navigate to="/404" replace />} />
      </Routes>
    </>
  )
}

export default AppRouter