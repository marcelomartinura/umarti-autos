import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Cliente de Supabase para usar en Server Components, Server Actions y Route
// Handlers. Lee/escribe la sesión desde las cookies de la request.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Puede fallar si se llama desde un Server Component (en vez de
            // una Server Action o un Route Handler) — no pasa nada, el
            // middleware ya se encarga de mantener la sesión al día.
          }
        },
      },
    }
  );
}
