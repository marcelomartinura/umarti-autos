// Listas predefinidas para los menús desplegables del formulario de vehículo.
// Si en el futuro Marcelo necesita agregar/quitar opciones, alcanza con editar estos arrays.

export const SEGMENTOS = [
  "Hatchback",
  "Sedán",
  "SUV Compacta",
  "SUV Mediana",
  "SUV Grande",
  "Pickup",
  "Furgón / Utilitario",
  "Coupé",
  "Minivan / Monovolumen",
  "Deportivo",
] as const;

export const MOTORIZACIONES = [
  "Nafta",
  "Diésel",
  "Híbrido (HEV)",
  "Híbrido enchufable (PHEV)",
  "Eléctrico (EV)",
  "GNC",
] as const;

export const TRANSMISIONES = [
  "Manual",
  "Automática",
  "Automática CVT",
  "Automática DCT",
  "Automática secuencial",
] as const;

export const MONEDAS = ["ARS", "USD", "EUR"] as const;

/**
 * Años disponibles para el desplegable: siempre arranca un año por delante
 * del actual y baja hasta 3 años atrás (ej. si estamos en 2026: 2027..2024).
 * Se calcula en el momento, así no hay que tocar código año a año.
 */
export function aniosDisponibles(): number[] {
  const actual = new Date().getFullYear();
  const anios: number[] = [];
  for (let a = actual + 1; a >= actual - 2; a--) {
    anios.push(a);
  }
  return anios;
}
