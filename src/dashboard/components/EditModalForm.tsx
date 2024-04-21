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
import UpdateFormValidator from "../validators/UpdateFormValidator"
import isValidInput from "../validators/InputValidators"

interface EditModalFormProps {
  product       : Product;
  handleSuccess : () => void;
}

const EditModalForm = ({ product, handleSuccess }: EditModalFormProps) => {

  const [formData, setFormData] = useState<Product>({
    ...product,
    percentageIncrease: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      percentageIncrease: 0,
    }));
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (!isValidInput(name, value)) {
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    // Validate on change
    const newErrors = UpdateFormValidator({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: newErrors[name] });
  };

  const handleCalculatePrice = () => {
    const newPrice = formData.price * (1 + formData.percentageIncrease! / 100);

    // Redondeo personalizado
    const roundedPrice = Math.abs(newPrice) % 1 >= 0.5 ? Math.ceil(newPrice) : Math.floor(newPrice);
  
    setFormData(prevFormData => ({
      ...prevFormData,
      price: roundedPrice,
    }));

    const formattedPrice = `$${roundedPrice.toLocaleString()}`;

    toast.success("¡Precio actualizado!",  {
      description: `El nuevo precio es ${formattedPrice}`,
      style: {
        background: "#0F172A"
      },
      position: "bottom-center",
      duration: 1500
    });
  };

  const handleEditProduct = async () => {
    // Validate before submitting
    const newErrors = UpdateFormValidator(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.put(`http://localhost:3000/products/${product.id}`, formData);
      if (response.status === 200) {
        handleSuccess();
        console.log("Product updated successfully");
        setTimeout(() => {
          toast.success("¡Producto actualizado exitosamente!", { style: {background: "#0F172A"} })
        }, 130); 
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const formatPrice = (price: number): string => {
    const parts = price.toLocaleString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return `$${parts.join(".")}`;
  };

  const isSubmitDisabled = !formData.name || !formData.capacity || !formData.height || !formData.diameter || !formData.price || Object.values(errors).some(val => val);

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

        {/* UPDATE FORM */}
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

          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
            <Label htmlFor="percentageIncrease" className="text-right">
              % de aumento
            </Label>
            <div className="col-span-1 flex items-center">
              <Input
                id="percentageIncrease"
                name="percentageIncrease"
                value={formData.percentageIncrease}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            
            <Button className="col-span-2" variant="update" onClick={handleCalculatePrice}>
              <div className="flex flex-row gap-2">
                <RefreshCcw />
                <span>Actualizar precio</span>
              </div>
            </Button>
            {errors.percentageIncrease && <span className="text-red-500 col-span-3 col-start-2">{errors.percentageIncrease}</span>}
          </div>
        </div>

        <DialogFooter>

          <DialogClose asChild>
            <Button 
              type="submit" 
              onClick={handleEditProduct}
              disabled={isSubmitDisabled}
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