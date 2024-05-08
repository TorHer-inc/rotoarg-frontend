import axiosInstance from "@/hooks/axiosInstance";
import { Product } from "@/interfaces/products-interface";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 0
  });

  useEffect(() => {
    fetchProducts();
  }, [pagination.page]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`/products/paginated?page=${pagination.page}&limit=${pagination.limit}`);
      console.log(response.data.products);
      setProducts(response.data.products);
      setPagination({
        ...pagination,
        totalPages: response.data.totalPages
      });
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('es-ES');
  };

  const changePage = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({
        ...pagination,
        page: newPage
      });
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={`px-3 py-1 rounded-md ${pagination.page === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          disabled={i === pagination.page}>
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Products Page</h1>

      {/* flex-row flex-wrap flex-col  */}
      {/* <div className="flex flex-wrap justify-center mx-auto gap-4 md:justify-center md:flex-row md:gap-8">
        {products.map((product) => (
          <NavLink className="flex-shrink-0 w-full md:w-auto" to={`/productos/${product.id}`}>
            <div key={product.id} className="border p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>Price: ${formatPrice(product.price)}</p>
              <p>Capacity: {product.capacity} lts</p>
              <p>Height: {product.height} mm</p>
              <p>Diameter: {product.diameter} mm</p>
            </div>
          </NavLink>
        ))}
      </div> */}

      {/* <div className="grid grid-cols-5 gap-4 max-w-[1420px] mx-auto"> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-[1420px] mx-auto">
        {products.map((product) => (
          <NavLink key={product.id} to={`/productos/${product.id}`}>
            <div className="border p-4 rounded-md shadow-md">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p>Price: ${formatPrice(product.price)}</p>
              <p>Capacity: {product.capacity} lts</p>
              <p>Height: {product.height} mm</p>
              <p>Diameter: {product.diameter} mm</p>
            </div>
          </NavLink>
        ))}
      </div>
      
      <div className="flex justify-center mt-8">
        <button
          onClick={() => changePage(pagination.page - 1)}
          className={`px-4 py-2 mr-2 rounded-md ${pagination.page === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          disabled={pagination.page === 1}
        >
          Prev
        </button>
        
        <div className="flex flex-row items-center justify-center gap-2">
          {renderPageNumbers()}
        </div>

        <button
          onClick={() => changePage(pagination.page + 1)}
          className={`px-4 py-2 ml-2 rounded-md ${pagination.page === pagination.totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
          disabled={pagination.page === pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default ProductsPage;