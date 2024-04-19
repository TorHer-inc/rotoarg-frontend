interface FormData {
  name     : string;
  capacity : string;
  height   : string;
  diameter : string;
  price    : string;
}
// name, capacity, height, diameter, price

export default function CreateFormValidator(input: FormData): Record<string, string> {
  let errors: Record<string, string> = {};

  // Validación del nombre
  if (!input.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (input.name.length < 4) {
    errors.name = "El nombre debe tener al menos 4 letras";
  }

  // Validación de la capacidad
  if (!input.capacity.trim()) {
    errors.capacity = "La capacidad es obligatoria";
  } else if (!/^\d+$/.test(input.capacity)) {
    errors.capacity = "La capacidad solo debe contener números";
  } else if (input.capacity.trim().length > 4) {
    errors.capacity = "La capacidad no debe tener más de 4 caracteres";
  }

  // Validación de la altura
  if (!input.height.trim()) {
    errors.height = "La altura es obligatoria";
  } else if (!/^\d+$/.test(input.height)) {
    errors.height = "La altura solo debe contener números";
  } else if (input.height.trim().length > 4) {
    errors.height = "La altura no debe tener más de 4 caracteres";
  }

  // Validación del diámetro
  if (!input.diameter.trim()) {
    errors.diameter = "El diámetro es obligatorio";
  } else if (!/^\d+$/.test(input.diameter)) {
    errors.diameter = "El diámetro solo debe contener números";
  } else if (input.diameter.trim().length > 4) {
    errors.diameter = "El diámetro no debe tener más de 4 caracteres";
  }

  // Validación del precio
  if (!input.price.trim()) {
    errors.price = "El precio es obligatorio";
  } else if (!/^\d+(\.\d{1,2})?$/.test(input.price)) {
    errors.price = "El precio debe ser un número válido";
  } else {
    const priceValue = parseFloat(input.price);
    if (priceValue <= 0 || priceValue > 99999999) {
      errors.price = "El precio ingresado es inválido. Asegúrate de que esté dentro del rango permitido (de 1 a 99,999,999).";
    }
  }

  return errors;
}