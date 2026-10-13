export type ConcesionariaRow = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  direccion: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  portada_url: string | null;
  ofrece_plan_ahorro: boolean;
  financiacion_nota: string | null;
  activa: boolean;
  created_at: string;
  updated_at: string;
};

export type MarcaOpcion = {
  id: string;
  nombre: string;
};

export type SucursalRow = {
  id: string;
  nombre: string;
  direccion: string | null;
  telefono: string | null;
  email: string | null;
  orden: number;
};

/** Forma en la que viaja cada sucursal en el campo oculto `sucursales_json` del formulario (sin id: se recrean en cada guardado). */
export type SucursalInput = {
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
};

export type NovedadRow = {
  id: string;
  titulo: string;
  texto: string | null;
  fecha: string;
  link_url: string | null;
};

/** Forma en la que viaja cada novedad en el campo oculto `novedades_json` del formulario (sin id: se recrean en cada guardado). */
export type NovedadInput = {
  titulo: string;
  texto: string;
  fecha: string;
  link_url: string;
};
