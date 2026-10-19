// Tipos del catálogo público real (Supabase), separados de los tipos de
// ejemplo en src/lib/types.ts. Reemplazan a VehiculoNuevo/VehicleCard de
// mock-data para todo lo que se muestra en /catalogo y /catalogo/[slug].

export type ColorVehiculoReal = {
  nombre: string;
  hex: string;
  disponibilidad?: string;
};

export type ItemEspecificacionReal = {
  label: string;
  valor: string;
};

// Tal cual se guarda en la columna jsonb `especificaciones` (clave "grupo").
export type GrupoEspecificacionReal = {
  grupo: string;
  items: ItemEspecificacionReal[];
};

export type MonedaReal = "ARS" | "USD" | "EUR";

// Forma cruda que devuelve Supabase con el embed de versiones -> modelos -> marcas.
export type VehiculoRealCrudo = {
  id: string;
  slug: string;
  anio: number;
  tipo: string | null;
  motorizacion: string | null;
  transmision: string | null;
  precio: number | null;
  precio_moneda: MonedaReal;
  plan_ahorro: boolean;
  destacado: boolean;
  colores: ColorVehiculoReal[] | null;
  fotos: string[] | null;
  especificaciones: GrupoEspecificacionReal[] | null;
  adas: string[] | null;
  airbags_totales: number | null;
  rueda_auxilio: string | null;
  apple_carplay: string | null;
  android_auto: string | null;
  contenido_editorial: string | null;
  origen: string | null;
  versiones: {
    nombre: string;
    modelos: {
      nombre: string;
      marcas: { nombre: string; logo_url: string | null } | null;
    } | null;
  } | null;
};

// Forma "plana", la que consumen VehicleCard y los filtros del listado.
export type VehiculoPlano = {
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  version: string;
  anio: number;
  segmento: string;
  combustible: string;
  transmision: string;
  precio: number | null;
  moneda: MonedaReal;
  planAhorro: boolean;
  destacado: boolean;
  imagen: string | null;
};

export function aVehiculoPlano(v: VehiculoRealCrudo): VehiculoPlano {
  return {
    id: v.id,
    slug: v.slug,
    marca: v.versiones?.modelos?.marcas?.nombre ?? "—",
    modelo: v.versiones?.modelos?.nombre ?? "—",
    version: v.versiones?.nombre ?? "—",
    anio: v.anio,
    segmento: v.tipo ?? "—",
    combustible: v.motorizacion ?? "—",
    transmision: v.transmision ?? "—",
    precio: v.precio,
    moneda: v.precio_moneda,
    planAhorro: v.plan_ahorro,
    destacado: v.destacado,
    imagen: v.fotos && v.fotos.length > 0 ? v.fotos[0] : null,
  };
}
