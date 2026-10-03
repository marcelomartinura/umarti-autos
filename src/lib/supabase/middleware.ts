import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_LOGIN_PATH, ADMIN_PATH_PREFIX } from "@/lib/admin-config";

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options: CookieOptions;
          }[]
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANTE: no sacar este getUser() — revalida la sesión contra Supabase
  // en cada request a una ruta del panel (no solo confía en la cookie local).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const esRutaAdmin = pathname.startsWith(ADMIN_PATH_PREFIX);
  const esLogin = pathname.startsWith(ADMIN_LOGIN_PATH);

  if (esRutaAdmin && !esLogin) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_LOGIN_PATH;
      return NextResponse.redirect(url);
    }

    const { data: perfil } = await supabase
      .from("profiles")
      .select("rol")
      .eq("id", user.id)
      .single();

    if (perfil?.rol !== "admin") {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_LOGIN_PATH;
      url.searchParams.set("error", "sin_acceso");
      return NextResponse.redirect(url);
    }
  }

  // Si ya está logueado como admin y entra al login, lo mandamos derecho al panel.
  if (esLogin && user) {
    const { data: perfil } = await supabase
      .from("profiles")
      .select("rol")
      .eq("id", user.id)
      .single();
    if (perfil?.rol === "admin") {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_PATH_PREFIX;
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  return response;
}
