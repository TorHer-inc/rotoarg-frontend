import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TableProducts from "@/pages/products/components/TableProducts";
import Footer from "@/components/Footer";

const ProductsListPrices = () => {
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchLastUpdatedDate();
  }, []);

  const fetchLastUpdatedDate = () => {
    axios.get('http://localhost:3000/products/last-updated')
      .then(response => {
        setLastUpdated(response.data.lastUpdated);
      })
      .catch(error => {
        console.error('Error fetching last updated date:', error);
      });
  };

  const handleDownloadPDF = () => {
    axios.get('http://localhost:3000/products/lista-productos-pdf', { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'lista-productos.pdf');
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error('Error al descargar el PDF:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-[1420px] min-h-screen flex flex-col mx-auto gap-8 pt-10 p-6">
        <div className="flex flex-col gap-3 justify-center items-center">
          <h1 className="font-bold text-4xl">Lista de precios RotoArg</h1>
          <div className="flex flex-col">
            <button onClick={handleDownloadPDF}>Descargar PDF de Productos</button>
            {lastUpdated && <p>Última actualización: {new Date(lastUpdated).toLocaleString()}</p>}
          </div>
        </div>

        <TableProducts />
      </div>
      <Footer />

    </div>
  )
}

export default ProductsListPrices