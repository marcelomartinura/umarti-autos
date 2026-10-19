// Formatea un precio según su moneda. Umarti Movilidad admite vehículos
// publicados en pesos argentinos (lo más común), en dólares (frecuente en
// pickups y gama alta) o en euros (algunos premium europeos).
export function formatPrecio(
  valor: number,
  moneda: "ARS" | "USD" | "EUR"
): string {
  const formateado = valor.toLocaleString("es-AR");
  if (moneda === "USD") return `USD ${formateado}`;
  if (moneda === "EUR") return `€ ${formateado}`;
  return `$ ${formateado}`;
}
