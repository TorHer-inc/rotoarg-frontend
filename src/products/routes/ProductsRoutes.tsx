import { Navigate, Route, Routes } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'
import Navbar from '../components/Navbar'

const ProductsRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/' element={<Navigate to="/products" />} />  
      </Routes>
    </>
  )
}

export default ProductsRoutes