export default function isValidInput(name: string, value: string) {
  // Validar que el campo sea numérico y esté dentro del límite de 8 dígitos
  if (name === 'price') {
    // Permitir borrar el 0 inicial
    if (value === '' || value === '0') {
      return true;
    }

    // Validar que el valor contenga solo números y esté dentro del límite
    if (!/^\d{1,8}$/.test(value) || parseFloat(value) > 99999999) {
      return false;
    }
  }

  if (name === 'percentageIncrease') {
    if (!/^(\d{1,4}(\.\d{0,2})?|0[1-9](\.\d{0,2})?|0\.\d{1,2})?$/.test(value)) {
      return false;
    }
  }

  return true;
}