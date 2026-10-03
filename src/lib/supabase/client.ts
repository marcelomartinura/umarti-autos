import { createBrowserClient } from "@supabase/ssr";

// Cliente de Supabase para usar en Client Components. Usa la anon key
// pública: el acceso real a los datos lo controlan las políticas de RLS
// configuradas en Supabase, no este cliente.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
