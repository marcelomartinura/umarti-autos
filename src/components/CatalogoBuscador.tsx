import Link from "next/link";
import Image from "next/image";
import { marcas, rangosPrecio, segmentos } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";

type MarcaConLogo = { nombre: string; logo_url: string | null };

export default async function CatalogoBuscador() {
  // Marcas reales cargadas desde el panel (con su logo, si tienen). Mientras
  // no haya ninguna activa todavía, se muestran las de ejemplo de siempre
  // para que esta sección nunca quede vacía.
  const supabase = await createClient();
  const { data: marcasReales } = await supabase
    .from("marcas")
    .select("nombre, logo_url")
    .eq("activa", true)
    .order("nombre");

  const hayMarcasReales = (marcasReales?.length ?? 0) > 0;
  const marcasAMostrar: MarcaConLogo[] = hayMarcasReales
    ? (marcasReales as MarcaConLogo[])
    : marcas.map((nombre) => ({ nombre, logo_url: null }));

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-umarti-navy">Catálogo</h2>
            <p className="text-sm text-gray-500">
              0km y usados verificados. Filtrá por marca, segmento o
              presupuesto y encontrá el tuyo.
            </p>
          </div>
          <Link
            href="/catalogo"
            className="rounded-md bg-umarti-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Ver catálogo completo
          </Link>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Buscá por marca
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {marcasAMostrar.map((marca) => (
              <Link
                key={marca.nombre}
                href={`/catalogo?marca=${encodeURIComponent(marca.nombre)}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-umarti-cream/40 p-4 text-center hover:border-umarti-orange"
              >
                {marca.logo_url ? (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <Image
                      src={marca.logo_url}
                      alt={marca.nombre}
                      width={40}
                      height={40}
                      className="h-9 w-9 object-contain"
                    />
                  </span>
                ) : (
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-umarti-navy text-sm font-bold text-white">
                    {marca.nombre.slice(0, 2).toUpperCase()}
                  </span>
                )}
                <span className="text-sm font-medium text-umarti-navy">
                  {marca.nombre}
                </span>
              </Link>
            ))}
          </div>
          {!hayMarcasReales && (
            <p className="mt-3 text-xs text-gray-400">
              Estas son algunas marcas a modo de ejemplo — en cuanto actives
              marcas reales desde el panel, se muestran acá en su lugar.
            </p>
          )}
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Buscá por segmento
          </h3>
          <div className="flex flex-wrap gap-3">
            {segmentos.map((segmento) => (
              <Link
                key={segmento}
                href={`/catalogo?segmento=${encodeURIComponent(segmento)}`}
                className="rounded-full border border-umarti-navy px-4 py-2 text-sm font-medium text-umarti-navy hover:bg-umarti-navy hover:text-white"
              >
                {segmento}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            Autos por menos de
          </h3>
          <div className="flex flex-wrap gap-3">
            {rangosPrecio.map((rango, index) => (
              <Link
                key={rango.label}
                href={`/catalogo?precioMax=${rango.valorMaximo}`}
                className={
                  index === 0
                    ? "rounded-md bg-umarti-navy px-5 py-2.5 text-sm font-semibold text-white"
                    : "rounded-md border border-gray-200 px-5 py-2.5 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
                }
              >
                {rango.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
