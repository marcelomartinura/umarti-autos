export type ColorVehiculo = {
  nombre: string;
  hex: string;
  disponibilidad?: string | null;
};

export type ItemEspecificacion = {
  label: string;
  valor: string;
};

export type GrupoEspecificaciones = {
  grupo: string;
  items: ItemEspecificacion[];
};

export type OfertaParseada = {
  nombre: string;
  ubicacion: string | null;
  precio: number;
  moneda: string;
  disponibilidad: string | null;
  formaPagoNota: string | null;
};

export type VehiculoListado = {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  version: string;
  anio: number;
  publicado: boolean;
  destacado: boolean;
  created_at: string;
};

export type VehiculoRow = {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  version: string;
  anio: number;
  tipo: string | null;
  motorizacion: string | null;
  transmision: string | null;
  origen: string | null;
  plan_ahorro: boolean;
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
