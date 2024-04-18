import { useEffect, useState } from "react";
import NavbarDashboard from "../components/NavbarDashboard"
import TableDashboard from "../components/TableDashboard"
import { Product } from "@/interfaces/products-interface";
import axios from "axios";

const DashboardPage = () => {

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  // const fetchProducts = () => {
  //   fetch('http://localhost:3000/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data.products))
  //     .catch(error => console.error('Error fetching products:', error));
  // };

  const fetchProducts = () => {
    axios.get('http://localhost:3000/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  const handleSuccess = () => {
    fetchProducts();
  };

  // useEffect(() => {
  //   fetch('http://localhost:3000/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data.products))
  //     .catch(error => console.error('Error fetching products:', error));
  // }, []);

  // const onDeleteSuccess = () => {
  //   fetch('http://localhost:3000/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data.products))
  //     .catch(error => console.error('Error fetching products:', error));
  // };

  // const onCreateSuccess = () => {
  //   fetch('http://localhost:3000/products')
  //     .then(response => response.json())
  //     .then(data => setProducts(data.products))
  //     .catch(error => console.error('Error fetching products:', error));
  // };

  // const onEditSuccess = () => {
  //   fetch("http://localhost:3000/products")
  //     .then((response) => response.json())
  //     .then((data) => setProducts(data.products))
  //     .catch((error) => console.error("Error fetching products:", error));
  // };

  return (
    <div>
      <NavbarDashboard 
        // onCreateSuccess={onCreateSuccess}
        handleSuccess={handleSuccess} 
      />

      <div className="flex flex-col gap-5 max-w-[1420px] mx-auto p-6 pt-12">
        <TableDashboard 
          products={products}
          handleSuccess={handleSuccess}
          // onDeleteSuccess={onDeleteSuccess}
          // onEditSuccess={onEditSuccess}
        />
      </div>
    </div>
  )
}

export default DashboardPage