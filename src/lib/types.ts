export type Combustible = "Nafta" | "Diesel" | "Híbrido" | "Eléctrico";
export type Transmision = "Manual" | "Automática";
export type Moneda = "ARS" | "USD";
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
  moneda: Moneda;
  imagen: string;
  planAhorro?: boolean;
}

export interface VehiculoUsado {
  id: string;
  marca: string;
  modelo: string;
  segmento: Segmento;
  combustible: Combustible;
  anio: number;
  km: number;
  transmision: Transmision;
  precio: number;
  moneda: Moneda;
  ubicacion: string;
  vendedor: "Concesionaria" | "Particular";
  imagen: string;
}

export interface PasoCompra {
  numero: number;
  titulo: string;
  descripcion: string;
}

export interface PreguntaFrecuente {
  pregunta: string;
  respuesta: string;
}

export interface RangoPrecio {
  label: string;
  valorMaximo: number;
}

export interface OfertaConcesionaria {
  concesionaria: string;
  ubicacion: string;
  precio: number;
  moneda: Moneda;
  rating: number;
  opiniones: number;
  tags: string[];
  verificada: boolean;
}

export interface EspecificacionItem {
  label: string;
  valor: string;
}

export interface EspecificacionGrupo {
  titulo: string;
  items: EspecificacionItem[];
}

export type CategoriaTienda =
  | "Concesionaria oficial"
  | "Marca oficial"
  | "Agencia";

export interface Tienda {
  id: string;
  nombre: string;
  categoria: CategoriaTienda;
  ubicacion: string;
  descripcion: string;
  visualizaciones: number;
  verificada: boolean;
  whatsapp: string;
  vehiculosNuevosIds: string[];
  vehiculosUsadosIds: string[];
}

export interface VendedorDestacado {
  id: string;
  nombre: string;
  tienda: string;
  mensaje: string;
  marca?: string;
  whatsapp: string;
}
