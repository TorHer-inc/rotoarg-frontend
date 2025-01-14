import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useEffect, useState } from "react";
import { Product } from "@/interfaces/products-interface";
import axiosInstance from "@/hooks/axiosInstance";

const TableProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/all');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-ES');
  };

  return (
    <div>
      <Table>
        <TableHeader className="bg-orange-200">
          <TableRow className="sm:text-xl">
            <TableHead className="text-center">PRODUCTO</TableHead>
            <TableHead className="text-center">CAPACIDAD</TableHead>
            <TableHead className="text-center">ALTURA</TableHead>
            <TableHead className="text-center">DIAMETRO</TableHead>
            <TableHead className="text-center">PRECIO</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="sm:text-lg">
            <TableCell className="font-medium">ROTOARG TANQUE MODAL</TableCell>
            <TableCell className="text-center">413 lts</TableCell>
            <TableCell className="text-center">413 mm</TableCell>
            <TableCell className="text-center">413 mm</TableCell>
            <TableCell className="text-center">$132.323</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          <TableRow className="sm:text-lg">
            <TableCell className="font-medium">ROTOARG TANQUE MODAL</TableCell>
            <TableCell className="text-center">413 lts</TableCell>
            <TableCell className="text-center">413 mm</TableCell>
            <TableCell className="text-center">413 mm</TableCell>
            <TableCell className="text-center">$132.323</TableCell>
          </TableRow>
        </TableBody>

        <TableBody>
          {products.map((product) => (
            <TableRow className="sm:text-lg" key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="text-center">{product.capacity} lts</TableCell>
              <TableCell className="text-center">{product.height} mm</TableCell>
              <TableCell className="text-center">{product.diameter} mm</TableCell>
              <TableCell className="text-center">${formatPrice(product.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </div>
  )
}

export default TableProducts