import { formatDistance, parseISO, differenceInDays } from "date-fns";

// Función para restar fechas
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

// Función para formatear la distancia de tiempo
export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Obtener la fecha actual en formato ISO
export const getToday = function (options = {}) {
  const today = new Date();

  if (options?.end)
    // Establecer al último segundo del día
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

// Formatear moneda
export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

// Convertir edad
export const calcularEdad = (fechaNacimiento) => {
  if (!fechaNacimiento) return "N/A"; // Si no hay fecha, devuelve "N/A"

  const nacimiento = new Date(fechaNacimiento); // Usa directamente la fecha
  if (isNaN(nacimiento.getTime())) return "N/A"; // Valida si es una fecha válida

  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const mes = hoy.getMonth() - nacimiento.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }

  return edad; // Devuelve la edad calculada
};
