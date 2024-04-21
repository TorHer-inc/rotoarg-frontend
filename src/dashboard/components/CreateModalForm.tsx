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
import CreateFormValidator from "../validators/CreateFormValidator"
import { toast } from "sonner"
import isValidInput from "../validators/InputValidators"
// import isValidInput from "../validators/InputValidators"

interface CreateModalFormProps {
  handleSuccess : () => void;
}

const CreateModalForm = ({ handleSuccess }: CreateModalFormProps) => {

  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name     : "",
    capacity : 0,
    height   : 0,
    diameter : 0,
    price    : 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!isValidInput(name, value)) {
      return;
    }

    // Utiliza el valor más reciente de formData al ejecutar la validación
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);

    // Actualiza los errores inmediatamente después de actualizar el formData
    const newErrors = CreateFormValidator({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: newErrors[name] });
  };

  const handleSubmit = async () => {
    const newErrors = CreateFormValidator(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/products", formData);
      if (response.status === 201) {
        handleSuccess();
        console.log("Producto creado exitosamente");
        setFormData({
          name     : "",
          capacity : 0,
          height   : 0,
          diameter : 0,
          price    : 0,
        });

        setTimeout(() => {
          toast.success("¡Producto creado exitosamente!", { style: {background: "#0F172A"} })
        }, 130); 
      } else {
        throw new Error("Fallo al crear el producto");
      }
    } catch (error) {
      console.error("Error creando el producto:", error);
    }
  };

  const isSubmitDisabled = Object.values(formData).some(val => !val) || Object.values(errors).some(val => val);

  const formatPrice = (price: number): string => {
    const parts = price.toLocaleString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `$${parts.join(".")}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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

        {/* CREATE FORM*/}
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
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
            {errors.name && <span className="text-red-500 col-span-3 col-start-2">{errors.name}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
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
            {errors.capacity && <span className="text-red-500 col-span-3 col-start-2">{errors.capacity}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
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
            {errors.height && <span className="text-red-500 col-span-3 col-start-2">{errors.height}</span>}
          </div>

          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
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
            {errors.diameter && <span className="text-red-500 col-span-3 col-start-2">{errors.diameter}</span>}
          </div>

          <div className="grid grid-cols-8 items-center gap-x-4 gap-y-1">
            <Label htmlFor="price" className="text-right col-span-2">
              Precio
            </Label>

            <Input
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="col-span-3 col-start-3"
            />
            
            <div className="col-span-3 col-start-6 cursor-auto inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors bg-[#0F172A] text-white h-10 px-4 py-2">
              {formatPrice(formData.price)}
            </div>

            {errors.price && <span className="text-red-500 col-span-full col-start-3">{errors.price}</span>}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button 
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
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