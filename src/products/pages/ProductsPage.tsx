import axios from "axios";
import TableProducts from "../components/TableProducts"
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [lastUpdated, setLastUpdated] = useState(null);

  // useEffect(() => {
  //   // Hacer una solicitud al backend para obtener la fecha de la última actualización
  //   axios.get('http://localhost:3000/products/last-updated')
  //     .then(response => {
  //       setLastUpdated(response.data.lastUpdated);
  //     })
  //     .catch(error => {
  //       console.error('Error al obtener la fecha de la última actualización:', error);
  //     });
  // }, []);

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
    axios.get('http://localhost:3000/products/lista', { responseType: 'blob' })
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
    <div className="pt-10 max-w-[1420px] flex flex-col mx-auto gap-8 p-6">
      <div>
        <button onClick={handleDownloadPDF}>Descargar PDF de Productos</button>
        {lastUpdated && <p>Última actualización: {new Date(lastUpdated).toLocaleString()}</p>}
      </div>
      <h1 className="text-center font-bold text-4xl" >Lista de precios RotoArg</h1>
      <TableProducts />
    </div>
  )
}

export default ProductsPage