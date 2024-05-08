import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from '@/pages/home/pages/HomePage';
import NotFoundPage from '@/pages/NotFound/pages/NotFoundPage';
import LoginPage from '@/pages/auth/pages/LoginPage';
import DashboardPage from '@/pages/dashboard/pages/DashboardPage';
import ProductsListPrices from '@/pages/productsListPrices/pages/ProductsListPrices';
import { ProtectedRoute } from '@/ProtectedRoute';
import ContactPage from '@/pages/contact/ContactPage';
import ProductsDetailPage from '@/pages/productsDetail/pages/ProductDetailPage';
import ProductsPage from '@/pages/products/pages/ProductsPage';

const AppRouter = () => {

  const token = import.meta.env.VITE_REACT_APP_ADMIN_TOKEN;

  return (
    <>
      <Routes>
        <Route path={`/iniciar-sesion-${token}`} element={<LoginPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/productos' element={<ProductsPage />} />
        <Route path='/productos/:id' element={<ProductsDetailPage />} />
        <Route path='/lista-de-precios' element={<ProductsListPrices />} />
        <Route path='/contacto' element={<ContactPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
        
        <Route path='/404' element={<NotFoundPage />} />
        <Route path="/*" element={ <Navigate to="/404" replace />} />
      </Routes>
    </>
  )
}

export default AppRouter