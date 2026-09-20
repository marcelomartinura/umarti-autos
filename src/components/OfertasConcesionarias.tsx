import { OfertaConcesionaria } from "@/lib/types";
import { formatPrecio } from "@/lib/format";

export default function OfertasConcesionarias({
  ofertas,
}: {
  ofertas: OfertaConcesionaria[];
}) {
  return (
    <section>
      <h2 className="mb-1 text-xl font-bold text-umarti-navy">
        Ofertas de concesionarias
      </h2>
      <p className="mb-6 text-sm text-gray-500">
        Cotizaciones de agencias oficiales y vendedores verificados.
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {ofertas.map((oferta) => (
          <div
            key={oferta.concesionaria}
            className="rounded-xl border border-gray-100 bg-white p-5"
          >
            <div className="flex items-center gap-1">
              <h3 className="font-semibold text-umarti-navy">
                {oferta.concesionaria}
              </h3>
              {oferta.verificada && (
                <span
                  className="text-xs text-green-600"
                  title="Concesionaria verificada"
                >
                  ✓
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">{oferta.ubicacion}</p>
            <p className="mt-1 text-xs text-gray-500">
              ★ {oferta.rating.toFixed(1)} ({oferta.opiniones} opiniones)
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {oferta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-umarti-cream px-2 py-0.5 text-[11px] text-umarti-navy"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mt-3 text-xs uppercase text-gray-400">
              Precio final
            </p>
            <p className="text-lg font-bold text-umarti-navy">
              {formatPrecio(oferta.precio, oferta.moneda)}
            </p>

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                className="rounded-md bg-green-600 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                Contactar por WhatsApp
              </button>
              <button
                type="button"
                className="rounded-md border border-umarti-navy py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
              >
                Ver perfil
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
