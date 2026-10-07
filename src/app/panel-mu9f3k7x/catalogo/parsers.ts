import type { GrupoEspecificaciones } from "./tipos";

// Helpers para convertir entre los textareas del formulario (pensados para
// que Marcelo pueda escribir datos estructurados sin JS extra en el
// navegador) y los campos jsonb reales en Supabase.
//
// Colores y cotizaciones dejaron de usar esta mini-sintaxis: colores ahora
// se eligen de un menú desplegable (catálogo de colores) y las cotizaciones
// se cargan desde la sección de Concesionarias.

export function parsearLineas(texto: string): string[] {
  return texto
    .split("\n")
    .map((linea) => linea.trim())
    .filter((linea) => linea.length > 0);
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
