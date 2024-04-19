import { useEffect, useState } from "react";
import NavbarDashboard from "../components/NavbarDashboard"
import TableDashboard from "../components/TableDashboard"
import { Product } from "@/interfaces/products-interface";
import axios from "axios";
import { Toaster } from "sonner";

const DashboardPage = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSuccess = () => {
    fetchProducts();
  };

  return (
    <>
      <NavbarDashboard 
        handleSuccess={handleSuccess} 
      />

      <div className="flex flex-col gap-5 max-w-[1420px] mx-auto p-6 pt-12">
        <TableDashboard 
          products={products}
          handleSuccess={handleSuccess}
        />
      </div>

      <Toaster position="bottom-right" theme="dark" />
    </>
  )
}

export default DashboardPage