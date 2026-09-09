export type Combustible = "Nafta" | "Diesel" | "Híbrido" | "Eléctrico";
export type Transmision = "Manual" | "Automática";
export type Segmento =
  | "Sedán"
  | "SUV"
  | "Hatchback"
  | "Pickup"
  | "Minivan"
  | "Coupé";

export interface VehiculoNuevo {
  id: string;
  marca: string;
  modelo: string;
  version: string;
  segmento: Segmento;
  anio: number;
  combustible: Combustible;
  transmision: Transmision;
  precioSugerido: number;
  imagen: string;
}

export interface VehiculoUsado {
  id: string;
  marca: string;
  modelo: string;
  anio: number;
  km: number;
  transmision: Transmision;
  precio: number;
  ubicacion: string;
  vendedor: "Concesionaria" | "Particular";
  imagen: string;
}
