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
    activa: formData.get("activa") === "on",
  };
}

/**
 * Si el formulario trae un archivo en "logo_archivo", lo sube al bucket
 * público marcas-logos y devuelve su URL pública. Si no se adjuntó ningún
 * archivo, devuelve undefined (el caller decide qué hacer: en alta no se
 * guarda logo_url, en edición se deja el que ya tenía la marca).
 */
async function subirLogoSiCorresponde(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData
): Promise<string | undefined> {
  const archivo = formData.get("logo_archivo");
  if (!(archivo instanceof File) || archivo.size === 0) {
    return undefined;
  }

  const extension = archivo.name.split(".").pop() || "png";
  const ruta = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from("marcas-logos")
    .upload(ruta, archivo, { contentType: archivo.type || undefined });

  if (error) {
    throw new Error(`No se pudo subir el logo: ${error.message}`);
  }

  const { data } = supabase.storage.from("marcas-logos").getPublicUrl(ruta);
  return data.publicUrl;
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

  let logoUrl: string | undefined;
  try {
    logoUrl = await subirLogoSiCorresponde(supabase, formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudo subir el logo." };
  }

  const { error } = await supabase
    .from("marcas")
    .insert({ ...campos, logo_url: logoUrl ?? null });

  if (error) {
    if (error.code === "23505") {
      return { error: `Ya existe una marca llamada "${campos.nombre}".` };
    }
    return { error: `No se pudo crear la marca: ${error.message}` };
  }

  revalidatePath("/panel/catalogo/marcas");
  revalidatePath("/");
  redirect("/panel/catalogo/marcas");
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

  let logoUrl: string | undefined;
  try {
    logoUrl = await subirLogoSiCorresponde(supabase, formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudo subir el logo." };
  }

  // Si no se subió un archivo nuevo, no tocamos logo_url: la marca conserva
  // el logo que ya tenía.
  const cambios =
    logoUrl !== undefined ? { ...campos, logo_url: logoUrl } : campos;

  const { error } = await supabase.from("marcas").update(cambios).eq("id", marcaId);

  if (error) {
    if (error.code === "23505") {
      return { error: `Ya existe una marca llamada "${campos.nombre}".` };
    }
    return { error: `No se pudo actualizar la marca: ${error.message}` };
  }

  revalidatePath("/panel/catalogo/marcas");
  revalidatePath("/");
  redirect("/panel/catalogo/marcas");
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
  revalidatePath("/panel/catalogo/marcas");
}
