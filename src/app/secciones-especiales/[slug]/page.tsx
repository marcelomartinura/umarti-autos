import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import UsedVehicleCard from "@/components/UsedVehicleCard";
import AdSlot from "@/components/AdSlot";
import SeccionIcono from "@/components/SeccionIcono";
import { AD_SLOTS } from "@/lib/adsense";
import { seccionesEspeciales } from "@/lib/mock-data";
import {
  getSeccionEspecial,
  linkCatalogoDeSeccion,
  vehiculosNuevosDeSeccion,
  vehiculosUsadosDeSeccion,
} from "@/lib/secciones";

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const seccion = getSeccionEspecial(params.slug);
  if (!seccion) return {};
  return {
    title: `${seccion.nombre} | Umarti Movilidad`,
    description: seccion.resumen,
  };
}

export default function SeccionEspecialPage({
  params,
}: {
  params: { slug: string };
}) {
  const seccion = getSeccionEspecial(params.slug);

  if (!seccion) {
    notFound();
  }

  const nuevos = vehiculosNuevosDeSeccion(seccion);
  const usados = vehiculosUsadosDeSeccion(seccion);
  const linkCatalogo = linkCatalogoDeSeccion(seccion);
  const otras = seccionesEspeciales.filter((s) => s.slug !== seccion.slug);

  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark py-14">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="mb-4 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>{" "}
            <span className="mx-1">›</span>{" "}
            <Link href="/secciones-especiales" className="hover:text-white">
              Secciones especiales
            </Link>{" "}
            <span className="mx-1">›</span> {seccion.nombre}
          </nav>

          <div className="flex items-start gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
              <SeccionIcono slug={seccion.slug} />
            </span>
            <div>
              <h1 className="text-3xl font-bold text-white">
                {seccion.nombre}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-blue-100">
                {seccion.descripcion}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-bold text-umarti-navy">
              Vehículos 0km en esta categoría
            </h2>
            <Link
              href={linkCatalogo}
              className="rounded-md bg-umarti-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              Ver todos en el catálogo
            </Link>
          </div>
          {nuevos.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
              Todavía no hay vehículos 0km cargados en esta categoría.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nuevos.map((v) => (
                <VehicleCard key={v.id} vehiculo={v} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-bold text-umarti-navy">
              Clasificados relacionados
            </h2>
            <Link
              href="/clasificados"
              className="text-sm font-semibold text-umarti-orange hover:underline"
            >
              Ver todos los clasificados →
            </Link>
          </div>
          {usados.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
              Todavía no hay avisos de usados en esta categoría.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {usados.map((v) => (
                <UsedVehicleCard key={v.id} vehiculo={v} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          <AdSlot slot={AD_SLOTS.seccionEspecialFicha} />
        </div>

        <div className="mt-12">
          <h2 className="mb-1 text-xl font-bold text-umarti-navy">
            Notas editoriales
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Contenido en preparación para esta sección.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {seccion.articulos.map((articulo) => (
              <div
                key={articulo.titulo}
                className="rounded-xl border border-gray-100 bg-white p-5"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-umarti-navy">
                    {articulo.titulo}
                  </h3>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Próximamente
                  </span>
                </div>
                <p className="text-sm text-gray-500">{articulo.resumen}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-1 text-xl font-bold text-umarti-navy">
            Herramientas útiles
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Herramientas en preparación para esta sección.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {seccion.herramientas.map((herramienta) => (
              <div
                key={herramienta.titulo}
                className="rounded-xl border border-dashed border-umarti-navy/20 bg-white p-5"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-umarti-navy">
                    {herramienta.titulo}
                  </h3>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Próximamente
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {herramienta.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {otras.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-umarti-navy">
              Otras secciones especiales
            </h2>
            <div className="flex flex-wrap gap-3">
              {otras.map((s) => (
                <Link
                  key={s.slug}
                  href={`/secciones-especiales/${s.slug}`}
                  className="rounded-full border border-umarti-navy px-4 py-2 text-sm font-medium text-umarti-navy hover:bg-umarti-navy hover:text-white"
                >
                  {s.nombre}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
