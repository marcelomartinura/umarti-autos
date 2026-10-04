import type {
  ColorVehiculo,
  GrupoEspecificaciones,
  OfertaParseada,
  OfertaRow,
} from "./tipos";

// Helpers para convertir entre los textareas del formulario (pensados para
// que Marcelo pueda escribir datos estructurados sin JS extra en el
// navegador) y los campos jsonb/relacionales reales en Supabase.

export function parsearLineas(texto: string): string[] {
  return texto
    .split("\n")
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 0);
}

export function parsearColores(texto: string): ColorVehiculo[] {
  return parsearLineas(texto).map((linea) => {
    const partes = linea.split("|").map((p) => p.trim());
    return {
      nombre: partes[0] || "",
      hex: partes[1] || "#cccccc",
      disponibilidad: partes[2] || null,
    };
  });
}

export function formatearColoresParaTexto(colores: ColorVehiculo[]): string {
  return colores
    .map(
      (c) =>
        `${c.nombre} | ${c.hex}${c.disponibilidad ? ` | ${c.disponibilidad}` : ""}`
    )
    .join("\n");
}

export function parsearEspecificaciones(texto: string): GrupoEspecificaciones[] {
  const grupos: GrupoEspecificaciones[] = [];
  let grupoActual: GrupoEspecificaciones | null = null;

  for (const lineaOriginal of texto.split("\n")) {
    const linea = lineaOriginal.trim();
    if (!linea) continue;

    if (linea.startsWith("##")) {
      grupoActual = { grupo: linea.replace(/^##\s*/, ""), items: [] };
      grupos.push(grupoActual);
      continue;
    }

    if (grupoActual) {
      const idx = linea.indexOf(":");
      if (idx > -1) {
        grupoActual.items.push({
          label: linea.slice(0, idx).trim(),
          valor: linea.slice(idx + 1).trim(),
        });
      }
    }
  }

  return grupos;
}

export function formatearEspecificacionesParaTexto(
  grupos: GrupoEspecificaciones[]
): string {
  return grupos
    .map(
      (g) =>
        `## ${g.grupo}\n${g.items.map((i) => `${i.label}: ${i.valor}`).join("\n")}`
    )
    .join("\n\n");
}

export function parsearOfertas(texto: string): OfertaParseada[] {
  const bloques = texto
    .split(/^-{3,}\s*$/m)
    .map((b) => b.trim())
    .filter(Boolean);

  const ofertas: OfertaParseada[] = [];

  for (const bloque of bloques) {
    const campos: Record<string, string> = {};
    for (const lineaOriginal of bloque.split("\n")) {
      const linea = lineaOriginal.trim();
      const idx = linea.indexOf(":");
      if (idx > -1) {
        const clave = linea.slice(0, idx).trim().toLowerCase();
        const valor = linea.slice(idx + 1).trim();
        if (clave) campos[clave] = valor;
      }
    }

    const nombre = campos["concesionaria"] || campos["nombre"];
    const precioTexto = (campos["precio"] || "").replace(/[^\d.,]/g, "").replace(",", ".");
    const precio = Number(precioTexto);

    if (nombre && precioTexto && !Number.isNaN(precio)) {
      ofertas.push({
        nombre,
        ubicacion: campos["ubicación"] || campos["ubicacion"] || null,
        precio,
        moneda: (campos["moneda"] || "USD").toUpperCase(),
        disponibilidad: campos["disponibilidad"] || null,
        formaPagoNota: campos["forma de pago"] || null,
      });
    }
  }

  return ofertas;
}

export function formatearOfertasParaTexto(ofertas: OfertaRow[]): string {
  return ofertas
    .map((o) =>
      [
        `Concesionaria: ${o.concesionaria_nombre}`,
        o.concesionaria_ubicacion ? `Ubicación: ${o.concesionaria_ubicacion}` : null,
        `Precio: ${o.precio}`,
        `Moneda: ${o.moneda}`,
        o.disponibilidad ? `Disponibilidad: ${o.disponibilidad}` : null,
        o.forma_pago_nota ? `Forma de pago: ${o.forma_pago_nota}` : null,
      ]
        .filter((linea): linea is string => Boolean(linea))
        .join("\n")
    )
    .join("\n---\n");
}
