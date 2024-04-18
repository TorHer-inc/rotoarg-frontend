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
import { DialogClose } from "@radix-ui/react-dialog"
import axios from "axios"
import { Plus } from "lucide-react"
import { useState } from "react"

interface CreateModalFormProps {
  handleSuccess : () => void;
  // onCreateSuccess : () => void;
}

const CreateModalForm = ({ handleSuccess }: CreateModalFormProps) => {

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    height: "",
    diameter: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3000/products', formData)
      .then(response => {
        if (response.status === 201) {
          handleSuccess();
          // onCreateSuccess();
          console.log('Product created successfully');
          setFormData({
            name: "",
            capacity: "",
            height: "",
            diameter: "",
            price: "",
          });
        } else {
          throw new Error('Failed to create product');
        }
      })
      .catch(error => console.error('Error creating product:', error));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          className="flex flex-row gap-2 text-lg"
          size="base"
        >
          <Plus />
          CREAR PRODUCTO
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle>CREAR PRODUCTO</DialogTitle>
          <DialogDescription>
            Crea todos tus productos aquí. Haz click en <span className="font-semibold">CREAR PRODUCTO</span> cuando hayas terminado de llenar los campos.
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
              onClick={handleSubmit}
            >
              CREAR PRODUCTO
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateModalForm