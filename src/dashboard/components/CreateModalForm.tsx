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
import { useEffect, useState } from "react"
import CreateFormValidator from "../validators/CreateFormValidator"
import { toast } from "sonner"
import formatDate from "../utils/formatDate"

interface CreateModalFormProps {
  handleSuccess : () => void;
}

const CreateModalForm = ({ handleSuccess }: CreateModalFormProps) => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    name: "",
    capacity: "",
    height: "",
    diameter: "",
    price: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

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

  const currentDate = new Date();
  const formattedDate = formatDate(currentDate);

  const handleSubmit = async () => {
    // Validar todos los campos antes de enviar el formulario
    const newErrors = CreateFormValidator(formData);
    setErrors(newErrors); // Actualizar inmediatamente el estado

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/products", formData);
      if (response.status === 201) {
        handleSuccess();
        console.log("Producto creado exitosamente");
        setFormData({
          name: "",
          capacity: "",
          height: "",
          diameter: "",
          price: "",
        });

        setTimeout(() => {
          toast("¡Producto creado exitosamente!", {
            description: `Creado el ${formattedDate}`,
          })
        }, 130); 
        
        // toast.success(`¡Producto creado exitosamente el ${formattedDate}!`);

        // toast("¡Producto creado exitosamente!", {
        //   description: `Creado el ${formattedDate}`,
        // })
        
        // toast.success(`¡Producto creado exitosamente el ${formattedDate}!`, {
        //   description: "Ahora mismo",
        //   action: {
        //     label: "Undo",
        //     onClick: () => console.log("Undo"),
        //   },
        // });
      } else {
        throw new Error("Fallo al crear el producto");
      }
    } catch (error) {
      console.error("Error creando el producto:", error);
    }
  };

  const isSubmitDisabled = Object.values(formData).some(val => !val) || Object.values(errors).some(val => val);

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

          <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
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
            {errors.price && <span className="text-red-500 col-span-3 col-start-2">{errors.price}</span>}
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



// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { DialogClose } from "@radix-ui/react-dialog"
// import axios from "axios"
// import { Plus } from "lucide-react"
// import { useEffect, useState } from "react"

// interface CreateModalFormProps {
//   handleSuccess : () => void;
// }

// const CreateModalForm = ({ handleSuccess }: CreateModalFormProps) => {

//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       setErrors({});
//     }
//   }, [isOpen]);

//   const [formData, setFormData] = useState({
//     name: "",
//     capacity: "",
//     height: "",
//     diameter: "",
//     price: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));

//     const newErrors = { ...errors };
//     if (!value.trim()) {
//       newErrors[name] = `El ${name} es requerido`;
//     } else if (name === "name" && value.trim().length < 4) {
//       newErrors[name] = `El ${name} debe tener al menos 4 letras`;
//     } else {
//       delete newErrors[name];
//     }
//     setErrors(newErrors);
//   };

//   const handleSubmit = async () => {
//     if (Object.keys(errors).length > 0) {
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/products", formData);
//       if (response.status === 201) {
//         handleSuccess();
//         console.log("Producto creado exitosamente");
//         setFormData({
//           name: "",
//           capacity: "",
//           height: "",
//           diameter: "",
//           price: "",
//         });
//       } else {
//         throw new Error("Fallo al crear el producto");
//       }
//     } catch (error) {
//       console.error("Error creando el producto:", error);
//     }
//   };

//   const isSubmitDisabled = Object.keys(errors).length > 0 || !formData.name || !formData.capacity || !formData.height || !formData.diameter || !formData.price;

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button
//           variant="default"
//           className="flex flex-row gap-2 text-lg"
//           size="base"
//         >
//           <Plus />
//           CREAR PRODUCTO
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader className="flex flex-col gap-3">
//           <DialogTitle>CREAR PRODUCTO</DialogTitle>
//           <DialogDescription>
//             Crea todos tus productos aquí. Haz click en <span className="font-semibold">CREAR PRODUCTO</span> cuando hayas terminado de llenar los campos.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="grid gap-4 py-4">

//           <div className="grid grid-cols-4 items-center gap-x-4 gap-y-1">
//             <Label htmlFor="name" className="text-right">
//               Nombre
//             </Label>
//             <Input
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//             {errors.name && <span className="text-red-500 col-span-3 col-start-2">{errors.name}</span>}
//           </div>

//           <div className="flex flex-row items-center justify-center gap-4">
//             <Label htmlFor="name" className="text-right">
//               Nombre
//             </Label>
//             <div className="w-full flex flex-col gap-y-1">
//               <Input
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="col-span-3"
//               />
//               {errors.name && <span className="text-red-500 col-span-3 col-start-2">{errors.name}</span>}
//             </div>
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="capacity" className="text-right">
//               Capacidad
//             </Label>
//             <Input
//               id="capacity"
//               name="capacity"
//               value={formData.capacity}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="height" className="text-right">
//               Altura
//             </Label>
//             <Input
//               id="height"
//               name="height"
//               value={formData.height}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="diameter" className="text-right">
//               Diametro
//             </Label>
//             <Input
//               id="diameter"
//               name="diameter"
//               value={formData.diameter}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//           </div>

//           <div className="grid grid-cols-4 items-center gap-4">
//             <Label htmlFor="price" className="text-right">
//               Precio
//             </Label>
//             <Input
//               id="price"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               className="col-span-3"
//             />
//           </div>
//         </div>

//         <DialogFooter>
//           <DialogClose asChild>
//             <Button 
//               type="submit"
//               onClick={handleSubmit}
//               disabled={isSubmitDisabled}
//             >
//               CREAR PRODUCTO
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default CreateModalForm