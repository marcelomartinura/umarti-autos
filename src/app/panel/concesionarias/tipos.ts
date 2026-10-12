export type ConcesionariaRow = {
  id: string;
  nombre: string;
  slug: string;
  descripcion: string | null;
  direccion: string | null;
  whatsapp: string | null;
  logo_url: string | null;
  portada_url: string | null;
  activa: boolean;
  created_at: string;
  updated_at: string;
};
