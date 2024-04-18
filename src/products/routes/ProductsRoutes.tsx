import { Route, Routes } from 'react-router-dom'
import ProductsPage from '../pages/ProductsPage'
import Navbar from '../components/Navbar'

const ProductsRoutes = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<ProductsPage />} />
      </Routes>
    </>
  )
}

export default ProductsRoutes