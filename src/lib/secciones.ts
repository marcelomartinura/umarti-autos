import { seccionesEspeciales, vehiculosNuevos, vehiculosUsados } from "./mock-data";
import { SeccionEspecial, VehiculoNuevo, VehiculoUsado } from "./types";

export function getSeccionEspecial(slug: string): SeccionEspecial | undefined {
  return seccionesEspeciales.find((s) => s.slug === slug);
}

export function vehiculosNuevosDeSeccion(
  seccion: SeccionEspecial
): VehiculoNuevo[] {
  if (seccion.filtro) {
    const { segmento, combustible, planAhorro } = seccion.filtro;
    return vehiculosNuevos.filter(
      (v) =>
        (!segmento || v.segmento === segmento) &&
        (!combustible || v.combustible === combustible) &&
        (!planAhorro || v.planAhorro === true)
    );
  }
  if (seccion.vehiculosNuevosIds) {
    return vehiculosNuevos.filter((v) =>
      seccion.vehiculosNuevosIds!.includes(v.id)
    );
  }
  return [];
}

// Los usados no tienen "planAhorro", así que ese filtro se ignora acá — solo
// segmento y motorización aplican a clasificados.
export function vehiculosUsadosDeSeccion(
  seccion: SeccionEspecial
): VehiculoUsado[] {
  if (seccion.filtro) {
    const { segmento, combustible } = seccion.filtro;
    if (!segmento && !combustible) return [];
    return vehiculosUsados.filter(
      (v) =>
        (!segmento || v.segmento === segmento) &&
        (!combustible || v.combustible === combustible)
    );
  }
  if (seccion.vehiculosUsadosIds) {
    return vehiculosUsados.filter((v) =>
      seccion.vehiculosUsadosIds!.includes(v.id)
    );
  }
  return [];
}

// Arma el link con el filtro correspondiente precargado en /catalogo (ver el
// useEffect que lee la URL en CatalogoListado.tsx). Para las secciones
// curadas a mano (sin filtro real) manda al catálogo completo.
export function linkCatalogoDeSeccion(seccion: SeccionEspecial): string {
  if (!seccion.filtro) return "/catalogo";
  const params = new URLSearchParams();
  if (seccion.filtro.segmento) params.set("segmento", seccion.filtro.segmento);
  if (seccion.filtro.combustible)
    params.set("combustible", seccion.filtro.combustible);
  if (seccion.filtro.planAhorro) params.set("planAhorro", "1");
  const query = params.toString();
  return query ? `/catalogo?${query}` : "/catalogo";
}
