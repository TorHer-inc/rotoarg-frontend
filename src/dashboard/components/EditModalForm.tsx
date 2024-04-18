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
import { FileEdit } from "lucide-react"
import { useState } from "react"

interface EditModalFormProps {
  product: Product;
  handleSuccess: () => void;
  // onEditSuccess: () => void;
}

const EditModalForm = ({ product, handleSuccess }: EditModalFormProps) => {

  const [formData, setFormData] = useState<Product>({
    ...product,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleEditProduct = () => {
    axios
      .put(`http://localhost:3000/products/${product.id}`, formData)
      .then((response) => {
        if (response.status === 200) {
          handleSuccess();
          // onEditSuccess();
          console.log("Product updated successfully");
        } else {
          throw new Error("Failed to update product");
        }
      })
      .catch((error) => console.error("Error updating product:", error));
  };

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
              className="col-span-3"
            />
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