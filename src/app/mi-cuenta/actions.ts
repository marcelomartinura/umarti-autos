"use server";

import { createClient } from "@/lib/supabase/server";

export interface EstadoRegistro {
  ok: boolean;
  error?: string;
}

export async function crearLeadRegistro(
  tipo: "particular" | "concesionaria",
  _estadoPrevio: EstadoRegistro,
  formData: FormData
): Promise<EstadoRegistro> {
  const nombre = (formData.get("nombre") as string | null)?.trim() ?? "";
  const email = (formData.get("email") as string | null)?.trim() ?? "";
  const whatsapp = (formData.get("whatsapp") as string | null)?.trim() ?? "";
  const nombreNegocio =
    (formData.get("nombre_negocio") as string | null)?.trim() ?? "";
  const mensaje = (formData.get("mensaje") as string | null)?.trim() ?? "";

  if (!nombre) {
    return { ok: false, error: "Contanos tu nombre para poder contactarte." };
  }

  if (!email && !whatsapp) {
    return {
      ok: false,
      error: "Dejanos un WhatsApp o un email para poder contactarte.",
    };
  }

  if (tipo === "concesionaria" && !nombreNegocio) {
    return {
      ok: false,
      error: "Contanos el nombre de tu concesionaria o agencia.",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.from("leads_registro").insert({
    tipo,
    nombre,
    email: email || null,
    whatsapp: whatsapp || null,
    nombre_negocio: nombreNegocio || null,
    mensaje: mensaje || null,
  });

  if (error) {
    console.error("Error al crear lead de registro:", error);
    return {
      ok: false,
      error: "Hubo un problema al enviar tus datos. Probá de nuevo.",
    };
  }

  return { ok: true };
}
