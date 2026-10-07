"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";

export type EstadoFormularioMarca = { error: string } | null;

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
    nombre: String(formData.get("nombre") || "").trim(),
    pais: String(formData.get("pais") || "").trim() || null,
    logo_url: String(formData.get("logo_url") || "").trim() || null,
    activa: formData.get("activa") === "on",
  };
}

export async function crearMarca(
  _estadoPrevio: EstadoFormularioMarca,
  formData: FormData
): Promise<EstadoFormularioMarca> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.nombre) {
    return { error: "El nombre de la marca es obligatorio." };
  }

  const { error } = await supabase.from("marcas").insert(campos);

  if (error) {
    if (error.code === "23505") {
      return { error: `Ya existe una marca llamada "${campos.nombre}".` };
    }
    return { error: `No se pudo crear la marca: ${error.message}` };
  }

  revalidatePath("/panel-mu9f3k7x/catalogo/marcas");
  redirect("/panel-mu9f3k7x/catalogo/marcas");
}

export async function actualizarMarca(
  marcaId: string,
  _estadoPrevio: EstadoFormularioMarca,
  formData: FormData
): Promise<EstadoFormularioMarca> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.nombre) {
    return { error: "El nombre de la marca es obligatorio." };
  }

  const { error } = await supabase.from("marcas").update(campos).eq("id", marcaId);

  if (error) {
    if (error.code === "23505") {
      return { error: `Ya existe una marca llamada "${campos.nombre}".` };
    }
    return { error: `No se pudo actualizar la marca: ${error.message}` };
  }

  revalidatePath("/panel-mu9f3k7x/catalogo/marcas");
  redirect("/panel-mu9f3k7x/catalogo/marcas");
}

export async function eliminarMarca(marcaId: string): Promise<void> {
  const { supabase } = await requerirAdmin();
  const { error } = await supabase.from("marcas").delete().eq("id", marcaId);
  if (error) {
    if (error.code === "23503") {
      throw new Error(
        "No se puede borrar: hay vehículos cargados con modelos o versiones de esta marca. Borrá primero esos vehículos."
      );
    }
    throw new Error(`No se pudo borrar la marca: ${error.message}`);
  }
  revalidatePath("/panel-mu9f3k7x/catalogo/marcas");
}
