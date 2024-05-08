import axiosInstance from "@/hooks/axiosInstance";
import { Product } from "@/interfaces/products-interface";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductsDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosInstance.get(`/products/${id}`);
        setProduct(response.data.product)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct();

    // Limpío el estado cuando el componente se desmonta para evitar fugas de memoria
    return () => {
      setProduct(null);
    };
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <p>Capacity: {product.capacity} lts</p>
      <p>Height: {product.height} mm</p>
      <p>Diameter: {product.diameter} mm</p>
    </div>
  );
};

export default ProductsDetailPage;
