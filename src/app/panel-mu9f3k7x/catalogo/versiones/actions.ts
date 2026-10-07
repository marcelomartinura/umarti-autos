"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";

export type EstadoFormularioVersion = { error: string } | null;

async function requerirAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ADMIN_LOGIN_PATH);
  }

  const { data: perfil } = await supabase
    .from("profiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (perfil?.rol !== "admin") {
    redirect(ADMIN_LOGIN_PATH);
  }

  return { supabase };
}

function leerCampos(formData: FormData) {
  return {
    modelo_id: String(formData.get("modelo_id") || "").trim(),
    nombre: String(formData.get("nombre") || "").trim(),
    activa: formData.get("activa") === "on",
  };
}

export async function crearVersion(
  _estadoPrevio: EstadoFormularioVersion,
  formData: FormData
): Promise<EstadoFormularioVersion> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.modelo_id || !campos.nombre) {
    return { error: "Elegí marca, modelo y escribí el nombre de la versión." };
  }

  const { error } = await supabase.from("versiones").insert(campos);

  if (error) {
    if (error.code === "23505") {
      return { error: `Ese modelo ya tiene una versión llamada "${campos.nombre}".` };
    }
    return { error: `No se pudo crear la versión: ${error.message}` };
  }

  revalidatePath("/panel-mu9f3k7x/catalogo/versiones");
  redirect("/panel-mu9f3k7x/catalogo/versiones");
}

export async function actualizarVersion(
  versionId: string,
  _estadoPrevio: EstadoFormularioVersion,
  formData: FormData
): Promise<EstadoFormularioVersion> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.modelo_id || !campos.nombre) {
    return { error: "Elegí marca, modelo y escribí el nombre de la versión." };
  }

  const { error } = await supabase.from("versiones").update(campos).eq("id", versionId);

  if (error) {
    if (error.code === "23505") {
      return { error: `Ese modelo ya tiene una versión llamada "${campos.nombre}".` };
    }
    return { error: `No se pudo actualizar la versión: ${error.message}` };
  }

  revalidatePath("/panel-mu9f3k7x/catalogo/versiones");
  redirect("/panel-mu9f3k7x/catalogo/versiones");
}

export async function eliminarVersion(versionId: string): Promise<void> {
  const { supabase } = await requerirAdmin();
  const { error } = await supabase.from("versiones").delete().eq("id", versionId);
  if (error) {
    if (error.code === "23503") {
      throw new Error(
        "No se puede borrar: hay vehículos cargados con esta versión. Borrá primero esos vehículos."
      );
    }
    throw new Error(`No se pudo borrar la versión: ${error.message}`);
  }
  revalidatePath("/panel-mu9f3k7x/catalogo/versiones");
}
