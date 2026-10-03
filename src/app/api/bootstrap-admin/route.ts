import { NextResponse, type NextRequest } from "next/server";
import { createClient as createServiceClient } from "@supabase/supabase-js";

// Endpoint de UN SOLO USO para crear la primera cuenta de administrador.
// Se autodesactiva en cuanto ya exista un perfil con rol "admin": no hace
// falta (ni conviene) dejarlo activo después de usarlo una vez. Ver la guía
// de uso en la especificación técnica del proyecto.
export async function POST(request: NextRequest) {
  const secretoConfigurado = process.env.ADMIN_BOOTSTRAP_SECRET;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!secretoConfigurado || !serviceRoleKey || !supabaseUrl) {
    return NextResponse.json(
      { error: "Bootstrap no configurado (faltan variables de entorno)." },
      { status: 503 }
    );
  }

  const secretoRecibido = request.headers.get("x-setup-secret");
  if (secretoRecibido !== secretoConfigurado) {
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });
  }

  const supabaseAdmin = createServiceClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { count } = await supabaseAdmin
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("rol", "admin");

  if (count && count > 0) {
    return NextResponse.json(
      {
        error:
          "Ya existe un administrador. Este endpoint ya cumplió su función y no crea más.",
      },
      { status: 409 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = body?.email ? String(body.email).trim() : "";
  const password = body?.password ? String(body.password) : "";
  const nombre = body?.nombre ? String(body.nombre) : null;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Faltan email y/o password en el body." },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { nombre, rol: "admin" },
  });

  if (error || !data.user) {
    return NextResponse.json(
      { error: error?.message || "No se pudo crear el usuario." },
      { status: 400 }
    );
  }

  // El trigger handle_new_user ya crea el perfil (con rol 'consumidor' por
  // default); lo pasamos a 'admin' con el cliente de service role, que
  // bypassa RLS.
  await supabaseAdmin
    .from("profiles")
    .update({ rol: "admin", nombre })
    .eq("id", data.user.id);

  return NextResponse.json({ ok: true, user_id: data.user.id });
}
