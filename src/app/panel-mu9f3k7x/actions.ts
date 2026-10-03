"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";

export async function cerrarSesionAdmin() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect(ADMIN_LOGIN_PATH);
}
