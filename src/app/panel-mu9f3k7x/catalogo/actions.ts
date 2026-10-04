"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import {
  parsearColores,
  parsearEspecificaciones,
  parsearLineas,
  parsearOfertas,
} from "./parsers";

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

function generarSlug(marca: string, modelo: string, version: string, anio: number) {
  const base = `${marca}-${modelo}-${version}-${anio}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-+|-+$)/g, "");
  const sufijo = Math.random().toString(36).slice(2, 7);
  return `${base}-${sufijo}`;
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

function leerCamposComunes(formData: FormData) {
  const anioTexto = String(formData.get("anio") || "");
  return {
    marca: String(formData.get("marca") || "").trim(),
    modelo: String(formData.get("modelo") || "").trim(),
    version: String(formData.get("version") || "").trim(),
    anio: anioTexto ? Number(anioTexto) : NaN,
    tipo: String(formData.get("tipo") || "").trim() || null,
    motorizacion: String(formData.get("motorizacion") || "").trim() || null,
    transmision: String(formData.get("transmision") || "").trim() || null,
    origen: String(formData.get("origen") || "").trim() || null,
    plan_ahorro: formData.get("plan_ahorro") === "on",
    airbags_totales: formData.get("airbags_totales")
      ? Number(formData.get("airbags_totales"))
      : null,
    rueda_auxilio: String(formData.get("rueda_auxilio") || "").trim() || null,
    apple_carplay: String(formData.get("apple_carplay") || "").trim() || null,
    android_auto: String(formData.get("android_auto") || "").trim() || null,
    adas: parsearLineas(String(formData.get("adas") || "")),
    colores: parsearColores(String(formData.get("colores") || "")),
    especificaciones: parsearEspecificaciones(
      String(formData.get("especificaciones") || "")
    ),
    contenido_editorial:
      String(formData.get("contenido_editorial") || "").trim() || null,
    publicado: formData.get("publicado") === "on",
    destacado: formData.get("destacado") === "on",
  };
}

async function guardarOfertas(
  supabase: Awaited<ReturnType<typeof createClient>>,
  vehiculoId: string,
  formData: FormData
) {
  await supabase.from("ofertas_vehiculo").delete().eq("vehiculo_id", vehiculoId);

  const ofertas = parsearOfertas(String(formData.get("ofertas") || ""));
  if (ofertas.length === 0) return null;

  const { error } = await supabase.from("ofertas_vehiculo").insert(
    ofertas.map((o, i) => ({
      vehiculo_id: vehiculoId,
      concesionaria_nombre: o.nombre,
      concesionaria_ubicacion: o.ubicacion,
      precio: o.precio,
      moneda: o.moneda,
      disponibilidad: o.disponibilidad,
      forma_pago_nota: o.formaPagoNota,
      orden: i,
    }))
  );

  return error;
}

export async function crearVehiculo(
  _estadoPrevio: EstadoFormularioVehiculo,
  formData: FormData
): Promise<EstadoFormularioVehiculo> {
  const { supabase, userId } = await requerirAdmin();
  const campos = leerCamposComunes(formData);

  if (!campos.marca || !campos.modelo || !campos.version || Number.isNaN(campos.anio)) {
    return { error: "Marca, modelo, versión y año son obligatorios (el año tiene que ser un número)." };
  }

  const slug = generarSlug(campos.marca, campos.modelo, campos.version, campos.anio);

  let fotos: string[] = [];
  try {
    fotos = await subirFotos(supabase, slug, formData);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "No se pudieron subir las fotos." };
  }

  const { data: vehiculo, error } = await supabase
    .from("vehiculos")
    .insert({ ...campos, slug, fotos, created_by: userId })
    .select("id")
    .single();

  if (error || !vehiculo) {
    return { error: `No se pudo crear el vehículo: ${error?.message ?? "error desconocido"}` };
  }

  const errorOfertas = await guardarOfertas(supabase, vehiculo.id, formData);
  if (errorOfertas) {
    return {
      error: `El vehículo se creó, pero no se pudieron guardar las cotizaciones: ${errorOfertas.message}. Podés abrirlo en "Editar" y volver a cargarlas.`,
    };
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

  if (!campos.marca || !campos.modelo || !campos.version || Number.isNaN(campos.anio)) {
    return { error: "Marca, modelo, versión y año son obligatorios (el año tiene que ser un número)." };
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

  const errorOfertas = await guardarOfertas(supabase, vehiculoId, formData);
  if (errorOfertas) {
    return {
      error: `Se guardaron los cambios, pero no se pudieron actualizar las cotizaciones: ${errorOfertas.message}.`,
    };
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
