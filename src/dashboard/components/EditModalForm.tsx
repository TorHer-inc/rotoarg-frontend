import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Product } from "@/interfaces/products-interface"
import { DialogClose } from "@radix-ui/react-dialog"
import axios from "axios"
import { FileEdit, RefreshCcw } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import formatDate from "../utils/formatDate"

interface EditModalFormProps {
  product: Product;
  handleSuccess: () => void;
}

const EditModalForm = ({ product, handleSuccess }: EditModalFormProps) => {

  const [formData, setFormData] = useState<Product>({
    ...product,
    percentageIncrease: 0,
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      percentageIncrease: 0,
    }));
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCalculatePrice = () => {
    const newPrice = formData.price * (1 + formData.percentageIncrease! / 100);
    setFormData(prevFormData => ({
      ...prevFormData,
      price: newPrice,
    }));

    toast("¡Precio actualizado!", {
      description: `El nuevo precio es ${newPrice}`,
    });
  };

  const handleEditProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/products/${product.id}`, formData);
      if (response.status === 200) {
        handleSuccess();
        console.log("Product updated successfully");
        setTimeout(() => {
          toast("¡Producto actualizado exitosamente!", {
            description: `Actualizado el ${formattedDate}`,
            // action: {
            //   label: "Entendido!",
            //   onClick: () => console.log("Undo"),
            // },
          })
        }, 130); 
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FileEdit 
          className="cursor-pointer"
          size={24}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle>EDITAR PRODUCTO</DialogTitle>
          <DialogDescription>
            Realiza cambios en tus productos aquí. Haz click en <span className="font-semibold">CREAR PRODUCTO</span> cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Capacidad
            </Label>
            <Input
              id="capacity"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="height" className="text-right">
              Altura
            </Label>
            <Input
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="diameter" className="text-right">
              Diametro
            </Label>
            <Input
              id="diameter"
              name="diameter"
              value={formData.diameter}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Precio
            </Label>
            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="col-span-2"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="percentageIncrease" className="text-right">
              % de aumento
            </Label>
            <div className="col-span-1 flex items-center">
              <Input
                type="number"
                id="percentageIncrease"
                name="percentageIncrease"
                value={formData.percentageIncrease}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <Button variant="update" size="icon" onClick={handleCalculatePrice}>
              <RefreshCcw />
            </Button>
          </div>

        </div>
        <DialogFooter>

          <DialogClose asChild>
            <Button 
              type="submit" 
              onClick={handleEditProduct}
            >
              EDITAR PRODUCTO
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditModalForm