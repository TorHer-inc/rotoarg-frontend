const formatDate = (date: Date) => {
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return `${days[date.getDay()]} ${date.getDate()} de ${months[date.getMonth()]} del ${date.getFullYear()} a las ${date.toLocaleTimeString('es-ES', { hour: 'numeric', minute: '2-digit' })}`;
};

export default formatDate;