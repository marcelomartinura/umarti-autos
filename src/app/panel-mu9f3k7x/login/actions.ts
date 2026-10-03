"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_PATH_PREFIX } from "@/lib/admin-config";

export interface EstadoLoginAdmin {
  error?: string;
}

export async function iniciarSesionAdmin(
  _estadoPrevio: EstadoLoginAdmin | undefined,
  formData: FormData
): Promise<EstadoLoginAdmin> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) {
    return { error: "Completá tu email y tu contraseña." };
  }

  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Email o contraseña incorrectos." };
  }

  const { data: perfil } = await supabase
    .from("profiles")
    .select("rol")
    .eq("id", data.user.id)
    .single();

  if (perfil?.rol !== "admin") {
    await supabase.auth.signOut();
    return { error: "Esta cuenta no tiene acceso al panel de administración." };
  }

  redirect(ADMIN_PATH_PREFIX);
}
