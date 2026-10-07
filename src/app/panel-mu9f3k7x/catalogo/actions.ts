"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import { parsearEspecificaciones, parsearLineas } from "./parsers";
import type { ColorVehiculo } from "./tipos";

export type EstadoFormularioVehiculo = { error: string } | null;

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

  return { supabase, userId: user.id };
}

function limpiarTexto(texto: string) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
}

/**
 * El slug se arma a partir de los nombres de marca/modelo/versión de la
 * versión elegida (que ahora vive en otra tabla), por eso hace falta traerla
 * de la base antes de generarlo.
 */
async function generarSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  versionId: string,
  anio: number
): Promise<{ slug?: string; error?: string }> {
  const { data: version, error } = await supabase
    .from("versiones")
    .select("nombre, modelos(nombre, marcas(nombre))")
    .eq("id", versionId)
    .single();

  if (error || !version) {
    return { error: "No se encontró la versión elegida." };
  }

  const modelo = version.modelos as unknown as {
    nombre: string;
    marcas: { nombre: string } | null;
  } | null;

  const marcaNombre = modelo?.marcas?.nombre ?? "marca";
  const modeloNombre = modelo?.nombre ?? "modelo";

  const base = limpiarTexto(`${marcaNombre}-${modeloNombre}-${version.nombre}-${anio}`);
  const sufijo = Math.random().toString(36).slice(2, 7);
  return { slug: `${base}-${sufijo}` };
}

async function subirFotos(
  supabase: Awaited<ReturnType<typeof createClient>>,
  slug: string,
  formData: FormData
): Promise<string[]> {
  const archivos = formData
    .getAll("fotos")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const urls: string[] = [];
  for (const archivo of archivos) {
    const extension = archivo.name.split(".").pop() || "jpg";
    const ruta = `${slug}/${crypto.randomUUID()}.${extension}`;
    const { error } = await supabase.storage
      .from("vehiculos-fotos")
      .upload(ruta, archivo, { contentType: archivo.type || undefined });
    if (error) {
      throw new Error(`No se pudo subir la foto "${archivo.name}": ${error.message}`);
    }
    const { data } = supabase.storage.from("vehiculos-fotos").getPublicUrl(ruta);
    urls.push(data.publicUrl);
  }
  return urls;
}

/** Cada <option> del multi-select de colores viaja como "id|nombre|hex". */
function leerColoresSeleccionados(formData: FormData): ColorVehiculo[] {
  return formData
    .getAll("colores")
    .map(String)
    .map((valor) => {
      const [, nombre, hex] = valor.split("|");
      return { nombre: nombre || "", hex: hex || "#cccccc" };
    })
    .filter((c) => c.nombre);
}

function leerCamposComunes(formData: FormData) {
  const anioTexto = String(formData.get("anio") || "");
  const precioTexto = String(formData.get("precio") || "").trim();
  return {
    version_id: String(formData.get("version_id") || "").trim(),
    anio: anioTexto ? Number(anioTexto) : NaN,
    tipo: String(formData.get("tipo") || "").trim() || null,
    motorizacion: String(formData.get("motorizacion") || "").trim() || null,
    transmision: String(formData.get("transmision") || "").trim() || null,
    origen: String(formData.get("origen") || "").trim() || null,
    plan_ahorro: formData.get("plan_ahorro") === "on",
    precio: precioTexto ? Number(precioTexto) : null,
    precio_moneda: String(formData.get("precio_moneda") || "USD").trim() || "USD",
    airbags_totales: formData.get("airbags_totales")
      ? Number(formData.get("airbags_totales"))
      : null,
    rueda_auxilio: String(formData.get("rueda_auxilio") || "").trim() || null,
    apple_carplay: String(formData.get("apple_carplay") || "").trim() || null,
    android_auto: String(formData.get("android_auto") || "").trim() || null,
    adas: parsearLineas(String(formData.get("adas") || "")),
    colores: leerColoresSeleccionados(formData),
    especificaciones: parsearEspecificaciones(
      String(formData.get("especificaciones") || "")
    ),
    contenido_editorial:
      String(formData.get("contenido_editorial") || "").trim() || null,
    publicado: formData.get("publicado") === "on",
    destacado: formData.get("destacado") === "on",
  };
}

export async function crearVehiculo(
  _estadoPrevio: EstadoFormularioVehiculo,
  formData: FormData
): Promise<EstadoFormularioVehiculo> {
  const { supabase, userId } = await requerirAdmin();
  const campos = leerCamposComunes(formData);

  if (!campos.version_id || Number.isNaN(campos.anio)) {
    return { error: "Elegí marca, modelo, versión y año antes de guardar." };
  }

  const { slug, error: errorSlug } = await generarSlug(supabase, campos.version_id, campos.anio);
  if (!slug) {
    return { error: errorSlug ?? "No se pudo generar el identificador del vehículo." };
  }

  let fotos: string[] = [];
  try {
    fotos = await subirFotos(supabase, slug, formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudieron subir las fotos." };
  }

  const { error } = await supabase
    .from("vehiculos")
    .insert({ ...campos, slug, fotos, created_by: userId })
    .select("id")
    .single();

  if (error) {
    return { error: `No se pudo crear el vehículo: ${error.message}` };
  }

  revalidatePath("/panel-mu9f3k7x/catalogo");
  redirect("/panel-mu9f3k7x/catalogo");
}

export async function actualizarVehiculo(
  vehiculoId: string,
  _estadoPrevio: EstadoFormularioVehiculo,
  formData: FormData
): Promise<EstadoFormularioVehiculo> {
  const { supabase } = await requerirAdmin();
  const campos = leerCamposComunes(formData);

  if (!campos.version_id || Number.isNaN(campos.anio)) {
    return { error: "Elegí marca, modelo, versión y año antes de guardar." };
  }

  const { data: existente, error: errorExistente } = await supabase
    .from("vehiculos")
    .select("slug")
    .eq("id", vehiculoId)
    .single();

  if (errorExistente || !existente) {
    return { error: "No se encontró el vehículo a editar." };
  }

  const fotosAMantener = formData.getAll("fotos_mantener").map(String);

  let fotosNuevas: string[] = [];
  try {
    fotosNuevas = await subirFotos(supabase, existente.slug, formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudieron subir las fotos nuevas." };
  }

  const fotos = [...fotosAMantener, ...fotosNuevas];

  const { error } = await supabase
    .from("vehiculos")
    .update({ ...campos, fotos })
    .eq("id", vehiculoId);

  if (error) {
    return { error: `No se pudo actualizar el vehículo: ${error.message}` };
  }

  revalidatePath("/panel-mu9f3k7x/catalogo");
  redirect("/panel-mu9f3k7x/catalogo");
}

export async function eliminarVehiculo(vehiculoId: string): Promise<void> {
  const { supabase } = await requerirAdmin();
  const { error } = await supabase.from("vehiculos").delete().eq("id", vehiculoId);
  if (error) {
    throw new Error(`No se pudo borrar el vehículo: ${error.message}`);
  }
  revalidatePath("/panel-mu9f3k7x/catalogo");
}
