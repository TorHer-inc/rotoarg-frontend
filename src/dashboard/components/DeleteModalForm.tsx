import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DeleteModalFormProps {
  productId: string;
  handleSuccess: () => void;
}

const DeleteModalForm = ({ productId, handleSuccess }: DeleteModalFormProps) => {
  
  const [error, setError] = useState<string | null>(null);

  const handleDeleteProduct = async () => {
    setError(null);

    try {
      const response = await axios.delete(`http://localhost:3000/products/${productId}`);
      if (response.status === 200) {
        handleSuccess();
        console.log('Producto eliminado exitosamente');

        setTimeout(() => {
          toast.success("¡Producto eliminado exitosamente!", { style: {background: "#0F172A"} })
        }, 130); 
      } else {
        throw new Error('Failed to delete product');
      }
    } catch (error) {
      setError('Error deleting product');
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Trash2 className="cursor-pointer" size={24} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col gap-3">
          <DialogTitle>ELIMINAR PRODUCTO</DialogTitle>
          <DialogDescription>
            Elimina tu producto aquí. Haz click en <span className="font-semibold">ELIMINAR PRODUCTO</span> cuando estés seguro.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={handleDeleteProduct}>
              ELIMINAR PRODUCTO
            </Button>
          </DialogClose>
          {error && <p className="text-red-500">{error}</p>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModalForm;