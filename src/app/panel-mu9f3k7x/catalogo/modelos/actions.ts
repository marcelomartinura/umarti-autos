"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";

export type EstadoFormularioModelo = { error: string } | null;

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
    marca_id: String(formData.get("marca_id") || "").trim(),
    nombre: String(formData.get("nombre") || "").trim(),
    activo: formData.get("activo") === "on",
  };
}

export async function crearModelo(
  _estadoPrevio: EstadoFormularioModelo,
  formData: FormData
): Promise<EstadoFormularioModelo> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.marca_id || !campos.nombre) {
    return { error: "Elegí una marca y escribí el nombre del modelo." };
  }

  const { error } = await supabase.from("modelos").insert(campos);

  if (error) {
    if (error.code === "23505") {
      return { error: `Esa marca ya tiene un modelo llamado "${campos.nombre}".` };
    }
    return { error: `No se pudo crear el modelo: ${error.message}` };
  }

  revalidatePath("/panel-mu9f3k7x/catalogo/modelos");
  redirect("/panel-mu9f3k7x/catalogo/modelos");
}

export async function actualizarModelo(
  modeloId: string,
  _estadoPrevio: EstadoFormularioModelo,
  formData: FormData
): Promise<EstadoFormularioModelo> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.marca_id || !campos.nombre) {
    return { error: "Elegí una marca y escribí el nombre del modelo." };
  }

  const { error } = await supabase.from("modelos").update(campos).eq("id", modeloId);

  if (error) {
    if (error.code === "23505") {
      return { error: `Esa marca ya tiene un modelo llamado "${campos.nombre}".` };
    }
    return { error: `No se pudo actualizar el modelo: ${error.message}` };
  }

  revalidatePath("/panel-mu9f3k7x/catalogo/modelos");
  redirect("/panel-mu9f3k7x/catalogo/modelos");
}

export async function eliminarModelo(modeloId: string): Promise<void> {
  const { supabase } = await requerirAdmin();
  const { error } = await supabase.from("modelos").delete().eq("id", modeloId);
  if (error) {
    if (error.code === "23503") {
      throw new Error(
        "No se puede borrar: hay vehículos cargados con versiones de este modelo. Borrá primero esos vehículos."
      );
    }
    throw new Error(`No se pudo borrar el modelo: ${error.message}`);
  }
  revalidatePath("/panel-mu9f3k7x/catalogo/modelos");
}
