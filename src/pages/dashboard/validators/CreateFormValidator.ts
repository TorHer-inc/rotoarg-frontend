interface FormData {
  name     : string;
  capacity : number | string;
  height   : number | string;
  diameter : number | string;
  price    : number | string;
}

export default function UpdateFormValidator(input: FormData): Record<string, string> {
  let errors: Record<string, string> = {};

  // Validación del nombre
  if (!input.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (input.name.length < 4) {
    errors.name = "El nombre debe tener al menos 4 letras";
  } else if (input.name.length > 45) {
    errors.name = "El nombre no debe tener más de 45 caracteres";
  } else if ((input.name.match(/\d/g) || []).length > 6) {
    errors.name = "El nombre no puede contener más de 6 números";
  }

  // Validación de la capacidad
  if (!input.capacity) {
    errors.capacity = "La capacidad es obligatoria";
  } else if (parseFloat(input.capacity.toString()) === 0 || /^0\d+/.test(input.capacity.toString())) {
    errors.capacity = "La capacidad no puede empezar con 0";
  } else if (!/^\d+$/.test(input.capacity.toString())) {
    errors.capacity = "La capacidad solo debe contener números";
  } else if (input.capacity.toString().length > 6) {
    errors.capacity = "La capacidad no debe tener más de 6 caracteres";
  }

  // Validación de la altura
  if (!input.height) {
    errors.height = "La altura es obligatoria";
  } else if (parseFloat(input.height.toString()) === 0 || /^0\d+/.test(input.height.toString())) {
    errors.height = "La altura no puede empezar con 0";
  } else if (!/^\d+$/.test(input.height.toString())) {
    errors.height = "La altura solo debe contener números";
  } else if (input.height.toString().length > 6) {
    errors.height = "La altura no debe tener más de 6 caracteres";
  }

  // Validación del diámetro
  if (!input.diameter) {
    errors.diameter = "El diámetro es obligatorio";
  } else if (parseFloat(input.diameter.toString()) === 0 || /^0\d+/.test(input.diameter.toString())) {
    errors.diameter = "El diámetro no puede empezar con 0";
  } else if (!/^\d+$/.test(input.diameter.toString())) {
    errors.diameter = "El diámetro solo debe contener números";
  } else if (input.diameter.toString().length > 6) {
    errors.diameter = "El diámetro no debe tener más de 6 caracteres";
  }

  // Validación del precio
  if (!input.price) {
    errors.price = "El precio es obligatorio";
  } else if (parseFloat(input.price.toString()) === 0 || /^0\d+/.test(input.price.toString())) {
    errors.price = "El precio no puede empezar con 0";
  } else if (!/^\d+(\.\d{1,2})?$/.test(input.price.toString())) {
    errors.price = "El precio debe ser un número válido";
  } else {
    const priceValue = parseFloat(input.price.toString());
    if (priceValue <= 0 || priceValue > 99999999) {
      errors.price = "El precio ingresado es inválido. Asegúrate de que esté dentro del rango permitido (de 1 a 99,999,999).";
    }
  }

  return errors;
}