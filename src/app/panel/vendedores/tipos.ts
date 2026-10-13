export type VendedorRow = {
  id: string;
  nombre_completo: string;
  slug: string;
  concesionaria_id: string | null;
  sucursal_id: string | null;
  marca_id: string | null;
  email: string | null;
  whatsapp: string | null;
  activo: boolean;
  created_at: string;
  updated_at: string;
};

export type VendedorListado = VendedorRow & {
  concesionarias: { nombre: string } | null;
  concesionaria_sucursales: { nombre: string } | null;
  marcas: { nombre: string } | null;
};

export type ConcesionariaArbol = {
  id: string;
  nombre: string;
  sucursales: { id: string; nombre: string }[];
};

export type MarcaOpcion = {
  id: string;
  nombre: string;
};
