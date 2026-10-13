"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";

export type EstadoFormularioVendedor = { error: string } | null;

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
  const concesionariaId = String(formData.get("concesionaria_id") || "").trim() || null;

  return {
    nombre_completo: String(formData.get("nombre_completo") || "").trim(),
    concesionaria_id: concesionariaId,
    // La sucursal solo tiene sentido si el vendedor pertenece a una
    // concesionaria — si no eligió ninguna, no guardamos sucursal aunque
    // haya quedado algo cargado en el campo oculto del formulario.
    sucursal_id: concesionariaId
      ? String(formData.get("sucursal_id") || "").trim() || null
      : null,
    marca_id: String(formData.get("marca_id") || "").trim() || null,
    email: String(formData.get("email") || "").trim() || null,
    whatsapp:
      String(formData.get("whatsapp") || "")
        .trim()
        .replace(/[^0-9]/g, "") || null,
    activo: formData.get("activo") === "on",
  };
}

/** "Juan Pérez" -> "juan-perez" (sin tildes, sin símbolos). */
function generarSlugBase(nombre: string) {
  return (
    nombre
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "vendedor"
  );
}

/**
 * Genera un slug único para la URL pública (/vendedores/<slug>), agregando
 * un sufijo corto si ya existe uno igual (por ejemplo, dos vendedores con
 * el mismo nombre).
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
    let consulta = supabase.from("vendedores").select("id").eq("slug", candidato);
    if (idAIgnorar) {
      consulta = consulta.neq("id", idAIgnorar);
    }
    const { data } = await consulta.maybeSingle();
    if (!data) return candidato;
    intento += 1;
    candidato = `${base}-${intento + 1}`;
  }
}

export async function crearVendedor(
  _estadoPrevio: EstadoFormularioVendedor,
  formData: FormData
): Promise<EstadoFormularioVendedor> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.nombre_completo) {
    return { error: "El nombre completo del vendedor es obligatorio." };
  }

  const slug = await generarSlugUnico(supabase, campos.nombre_completo);

  const { error } = await supabase.from("vendedores").insert({ ...campos, slug });

  if (error) {
    return { error: `No se pudo crear el vendedor: ${error.message}` };
  }

  revalidatePath("/panel/vendedores");
  revalidatePath("/vendedores");
  redirect("/panel/vendedores");
}

export async function actualizarVendedor(
  vendedorId: string,
  _estadoPrevio: EstadoFormularioVendedor,
  formData: FormData
): Promise<EstadoFormularioVendedor> {
  const { supabase } = await requerirAdmin();
  const campos = leerCampos(formData);

  if (!campos.nombre_completo) {
    return { error: "El nombre completo del vendedor es obligatorio." };
  }

  const { data: actual } = await supabase
    .from("vendedores")
    .select("nombre_completo, slug")
    .eq("id", vendedorId)
    .single();

  const slug =
    actual && actual.nombre_completo === campos.nombre_completo
      ? actual.slug
      : await generarSlugUnico(supabase, campos.nombre_completo, vendedorId);

  const { error } = await supabase
    .from("vendedores")
    .update({ ...campos, slug })
    .eq("id", vendedorId);

  if (error) {
    return { error: `No se pudo actualizar el vendedor: ${error.message}` };
  }

  revalidatePath("/panel/vendedores");
  revalidatePath("/vendedores");
  revalidatePath(`/vendedores/${slug}`);
  redirect("/panel/vendedores");
}

export async function eliminarVendedor(vendedorId: string): Promise<void> {
  const { supabase } = await requerirAdmin();
  const { error } = await supabase.from("vendedores").delete().eq("id", vendedorId);
  if (error) {
    throw new Error(`No se pudo borrar el vendedor: ${error.message}`);
  }
  revalidatePath("/panel/vendedores");
  revalidatePath("/vendedores");
}
