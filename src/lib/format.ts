import { Moneda } from "./types";

// Formatea un precio según su moneda. En Umarti Movilidad conviven vehículos
// publicados en pesos argentinos (lo más común) y en dólares (frecuente en
// pickups y gama alta) — hasta que conectemos una cotización en vivo, cada
// vehículo declara su propia moneda en los datos de ejemplo.
export function formatPrecio(valor: number, moneda: Moneda): string {
  const formateado = valor.toLocaleString("es-AR");
  return moneda === "USD" ? `USD ${formateado}` : `$ ${formateado}`;
}
