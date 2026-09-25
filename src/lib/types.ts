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

export interface FiltroSeccionEspecial {
  segmento?: Segmento;
  combustible?: Combustible;
  planAhorro?: boolean;
}

export interface ArticuloEditorial {
  titulo: string;
  resumen: string;
}

export interface HerramientaUtil {
  titulo: string;
  descripcion: string;
}

export interface CategoriaAdicional {
  slug: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  beneficios: string[];
  whatsapp: string;
}

export type EspecialidadTaller =
  | "Multimarca"
  | "Mecánica general"
  | "Chapa y pintura"
  | "Electricidad"
  | "Neumáticos y alineación"
  | "Aire acondicionado";

export interface ServicioOficialMarca {
  id: string;
  marca: string;
  nombre: string;
  provincia: string;
  ciudad: string;
  descripcion: string;
  servicios: string[];
  whatsapp: string;
  verificado: boolean;
}

export interface Taller {
  id: string;
  nombre: string;
  especialidad: EspecialidadTaller;
  // ["Todas"] para talleres multimarca, o una lista puntual de marcas.
  marcasQueAtiende: string[];
  provincia: string;
  ciudad: string;
  descripcion: string;
  whatsapp: string;
  verificado: boolean;
}

export interface SeccionEspecial {
  slug: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  // Si hay filtro, los vehículos se calculan dinámicamente sobre el
  // catálogo/clasificados. Si no, se usan los IDs curados a mano (para
  // secciones que todavía no tienen un atributo propio en los datos).
  filtro?: FiltroSeccionEspecial;
  vehiculosNuevosIds?: string[];
  vehiculosUsadosIds?: string[];
  articulos: ArticuloEditorial[];
  herramientas: HerramientaUtil[];
}
