import Link from "next/link";
import { marcas, rangosPrecio, segmentos } from "@/lib/mock-data";

export default function CatalogoBuscador() {
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
            {marcas.map((marca) => (
              <Link
                key={marca}
                href={`/catalogo?marca=${encodeURIComponent(marca)}`}
                className="flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-umarti-cream/40 p-4 text-center hover:border-umarti-orange"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-umarti-navy text-sm font-bold text-white">
                  {marca.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-sm font-medium text-umarti-navy">
                  {marca}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Estas son algunas marcas a modo de ejemplo — el listado completo
            se suma cuando conectemos el catálogo real.
          </p>
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
