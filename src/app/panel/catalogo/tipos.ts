export type ColorVehiculo = {
  nombre: string;
  hex: string;
};

export type ItemEspecificacion = {
  label: string;
  valor: string;
};

export type GrupoEspecificaciones = {
  grupo: string;
  items: ItemEspecificacion[];
};

export type MarcaRow = {
  id: string;
  nombre: string;
  pais: string | null;
  logo_url: string | null;
  activa: boolean;
  created_at: string;
};

export type ModeloRow = {
  id: string;
  marca_id: string;
  nombre: string;
  activo: boolean;
  created_at: string;
};

export type ModeloListado = ModeloRow & {
  marcas: { nombre: string } | null;
};

export type VersionRow = {
  id: string;
  modelo_id: string;
  nombre: string;
  activa: boolean;
  created_at: string;
};

export type VersionListado = VersionRow & {
  modelos: { nombre: string; marcas: { nombre: string } | null } | null;
};

export type ColorCatalogo = {
  id: string;
  nombre: string;
  hex: string;
  orden: number;
};

/**
 * Árbol marca -> modelos -> versiones, usado para armar los menús
 * desplegables en cascada del formulario de vehículo (sin ir al servidor
 * en cada selección).
 */
export type CatalogoMarca = {
  id: string;
  nombre: string;
  modelos: {
    id: string;
    nombre: string;
    versiones: { id: string; nombre: string }[];
  }[];
};

export type VehiculoListado = {
  id: string;
  slug: string;
  anio: number;
  publicado: boolean;
  destacado: boolean;
  created_at: string;
  versiones: {
    nombre: string;
    modelos: { nombre: string; marcas: { nombre: string } | null } | null;
  } | null;
};

export type VehiculoRow = {
  id: string;
  slug: string;
  version_id: string;
  anio: number;
  tipo: string | null;
  motorizacion: string | null;
  transmision: string | null;
  origen: string | null;
  plan_ahorro: boolean;
  precio: number | null;
  precio_moneda: string;
  airbags_totales: number | null;
  rueda_auxilio: string | null;
  apple_carplay: string | null;
  android_auto: string | null;
  adas: string[];
  colores: ColorVehiculo[];
  fotos: string[];
  especificaciones: GrupoEspecificaciones[];
  contenido_editorial: string | null;
  publicado: boolean;
  destacado: boolean;
  created_at: string;
};

/** Resultado de traer un vehículo con la cadena versión -> modelo -> marca, para precargar el formulario de edición. */
export type VehiculoConCadena = VehiculoRow & {
  versiones: {
    id: string;
    nombre: string;
    modelo_id: string;
    modelos: {
      id: string;
      nombre: string;
      marca_id: string;
      marcas: { id: string; nombre: string } | null;
    } | null;
  } | null;
};

export type OfertaRow = {
  id: string;
  vehiculo_id: string;
  concesionaria_nombre: string;
  concesionaria_ubicacion: string | null;
  precio: number;
  moneda: string;
  disponibilidad: string | null;
  forma_pago_nota: string | null;
  orden: number;
};
