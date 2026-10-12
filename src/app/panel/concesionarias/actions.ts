"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";

export type EstadoFormularioConcesionaria = { error: string } | null;

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
    descripcion: String(formData.get("descripcion") || "").trim() || null,
    direccion: String(formData.get("direccion") || "").trim() || null,
    whatsapp:
      String(formData.get("whatsapp") || "")
        .trim()
        .replace(/[^0-9]/g, "") || null,
    activa: formData.get("activa") === "on",
  };
}

/** "Toyota Buenos Aires" -> "toyota-buenos-aires" (sin tildes, sin símbolos). */
function generarSlugBase(nombre: string) {
  return nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "concesionaria";
}

/**
 * Genera un slug único para la URL pública (/concesionarias/<slug>),
 * agregando un sufijo corto si ya existe uno igual (por ejemplo, dos
 * agencias con el mismo nombre en ciudades distintas).
 */
async function generarSlugUnico(
  supabase: Awaited<ReturnType<typeof createClient>>,
  nombre: string,
  idAIgnorar?: string
) {
  const base = generarSlugBase(nombre);
  let candidato = base;
  let intento = 0;

  while (true) {
    let consulta = supabase
      .from("concesionarias")
      .select("id")
      .eq("slug", candidato);
    if (idAIgnorar) {
      consulta = consulta.neq("id", idAIgnorar);
    }
    const { data } = await consulta.maybeSingle();
    if (!data) return candidato;
    intento += 1;
    candidato = `${base}-${intento + 1}`;
  }
}

/**
 * Si el formulario trae un archivo en el campo indicado, lo sube al bucket
 * público concesionarias-fotos (dentro de la subcarpeta dada) y devuelve su
 * URL pública. Si no se adjuntó ningún archivo, devuelve undefined (el
 * caller decide: en alta no se guarda esa imagen, en edición se conserva la
 * que ya tenía la concesionaria).
 */
async function subirImagenSiCorresponde(
  supabase: Awaited<ReturnType<typeof createClient>>,
  formData: FormData,
  campo: string,
  subcarpeta: "logos" | "portadas"
): Promise<string | undefined> {
  const archivo = formData.get(campo);
  if (!(archivo instanceof File) || archivo.size === 0) {
    return undefined;
  }

  const extension = archivo.name.split(".").pop() || "jpg";
  const ruta = `${subcarpeta}/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage
    .from("concesionarias-fotos")
    .upload(ruta, archivo, { contentType: archivo.type || undefined });

  if (error) {
    throw new Error(`No se pudo subir la imagen: ${error.message}`);
  }

  const { data } = supabase.storage.from("concesionarias-fotos").getPublicUrl(ruta);
  return data.publicUrl;
}

export async function crearConcesionaria(
  _estadoPrevio: EstadoFormularioConcesionaria,
  formData: FormData
): Promise<EstadoFormularioConcesionaria> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.nombre) {
    return { error: "El nombre de la concesionaria es obligatorio." };
  }

  let logoUrl: string | undefined;
  let portadaUrl: string | undefined;
  try {
    logoUrl = await subirImagenSiCorresponde(supabase, formData, "logo_archivo", "logos");
    portadaUrl = await subirImagenSiCorresponde(
      supabase,
      formData,
      "portada_archivo",
      "portadas"
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudo subir la imagen." };
  }

  const slug = await generarSlugUnico(supabase, campos.nombre);

  const { error } = await supabase.from("concesionarias").insert({
    ...campos,
    slug,
    logo_url: logoUrl ?? null,
    portada_url: portadaUrl ?? null,
  });

  if (error) {
    return { error: `No se pudo crear la concesionaria: ${error.message}` };
  }

  revalidatePath("/panel/concesionarias");
  revalidatePath("/concesionarias");
  redirect("/panel/concesionarias");
}

export async function actualizarConcesionaria(
  concesionariaId: string,
  _estadoPrevio: EstadoFormularioConcesionaria,
  formData: FormData
): Promise<EstadoFormularioConcesionaria> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.nombre) {
    return { error: "El nombre de la concesionaria es obligatorio." };
  }

  let logoUrl: string | undefined;
  let portadaUrl: string | undefined;
  try {
    logoUrl = await subirImagenSiCorresponde(supabase, formData, "logo_archivo", "logos");
    portadaUrl = await subirImagenSiCorresponde(
      supabase,
      formData,
      "portada_archivo",
      "portadas"
    );
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudo subir la imagen." };
  }

  // Obtenemos el slug actual: si el nombre no cambió, lo dejamos igual para
  // no romper links que ya se hayan compartido; si cambió, generamos uno
  // nuevo a partir del nombre nuevo.
  const { data: actual } = await supabase
    .from("concesionarias")
    .select("nombre, slug")
    .eq("id", concesionariaId)
    .single();

  const slug =
    actual && actual.nombre === campos.nombre
      ? actual.slug
      : await generarSlugUnico(supabase, campos.nombre, concesionariaId);

  const cambios: Record<string, unknown> = { ...campos, slug };
  if (logoUrl !== undefined) cambios.logo_url = logoUrl;
  if (portadaUrl !== undefined) cambios.portada_url = portadaUrl;

  const { error } = await supabase
    .from("concesionarias")
    .update(cambios)
    .eq("id", concesionariaId);

  if (error) {
    return { error: `No se pudo actualizar la concesionaria: ${error.message}` };
  }

  revalidatePath("/panel/concesionarias");
  revalidatePath("/concesionarias");
  revalidatePath(`/concesionarias/${slug}`);
  redirect("/panel/concesionarias");
}

export async function eliminarConcesionaria(concesionariaId: string): Promise<void> {
  const { supabase } = await requerirAdmin();
  const { error } = await supabase
    .from("concesionarias")
    .delete()
    .eq("id", concesionariaId);
  if (error) {
    throw new Error(`No se pudo borrar la concesionaria: ${error.message}`);
  }
  revalidatePath("/panel/concesionarias");
  revalidatePath("/concesionarias");
}
