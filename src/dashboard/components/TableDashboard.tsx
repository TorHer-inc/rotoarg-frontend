import { Product } from '../../interfaces/products-interface';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import EditModalForm from "./EditModalForm";
import DeleteModalForm from "./DeleteModalForm";

interface TableModalFormProps {
  products      : Product[];
  handleSuccess : () => void;
}

const TableDashboard = ({ products, handleSuccess }: TableModalFormProps) => {

  const formatPrice = (price: number): string => {
    return price.toLocaleString('es-ES', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      useGrouping: true,
    });
  };

  return (
    <>
      <Table>

        <TableHeader className="bg-orange-200">
          <TableRow className="sm:text-xl">
            <TableHead className="text-center">PRODUCTO</TableHead>
            <TableHead className="text-center">CAPACIDAD</TableHead>
            <TableHead className="text-center">ALTURA</TableHead>
            <TableHead className="text-center">DIAMETRO</TableHead>
            <TableHead className="text-center">PRECIO</TableHead>
            <TableHead className="text-center">ACCIONES</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {products.map((product) => (
            <TableRow className="sm:text-lg" key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="text-center">{product.capacity} lts</TableCell>
              <TableCell className="text-center">{product.height} mm</TableCell>
              <TableCell className="text-center">{product.diameter} mm</TableCell>
              <TableCell className="text-center">${formatPrice(product.price)}</TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center gap-4">

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <EditModalForm 
                          product={product}
                          handleSuccess={handleSuccess}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Editar producto</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <DeleteModalForm
                          productId={product.id}
                          handleSuccess={handleSuccess}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Eliminar producto</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </>
  )
}

export default TableDashboard