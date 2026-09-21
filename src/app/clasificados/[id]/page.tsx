import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import GaleriaImagenes from "@/components/GaleriaImagenes";
import UsedVehicleCard from "@/components/UsedVehicleCard";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";
import { vehiculosUsados } from "@/lib/mock-data";
import { formatPrecio } from "@/lib/format";

// Página pensada para ser lo más simple posible pero bien indexable: título y
// descripción únicos por aviso (generateMetadata), contenido en texto real
// (no solo detrás de JavaScript) y datos estructurados (JSON-LD) para que
// Google entienda que es un vehículo en venta.

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const vehiculo = vehiculosUsados.find((v) => v.id === params.id);
  if (!vehiculo) return {};

  const titulo = `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anio} usado en ${vehiculo.ubicacion} | Umarti Movilidad`;
  const descripcion = `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anio}, ${vehiculo.km.toLocaleString(
    "es-AR"
  )} km, ${vehiculo.combustible.toLowerCase()}, ${vehiculo.transmision.toLowerCase()}. Publicado por ${vehiculo.vendedor.toLowerCase()} en ${vehiculo.ubicacion}. Precio: ${formatPrecio(
    vehiculo.precio,
    vehiculo.moneda
  )}.`;

  return {
    title: titulo,
    description: descripcion,
    openGraph: {
      title: titulo,
      description: descripcion,
    },
  };
}

export default function ClasificadoDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const vehiculo = vehiculosUsados.find((v) => v.id === params.id);

  if (!vehiculo) {
    notFound();
  }

  const similares = vehiculosUsados
    .filter(
      (v) =>
        v.id !== vehiculo.id &&
        (v.marca === vehiculo.marca || v.segmento === vehiculo.segmento)
    )
    .slice(0, 3);

  const mensajeWhatsapp = encodeURIComponent(
    `Hola, me interesa el ${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anio} publicado en Umarti Movilidad.`
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.anio}`,
    brand: vehiculo.marca,
    model: vehiculo.modelo,
    vehicleModelDate: String(vehiculo.anio),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehiculo.km,
      unitCode: "KMT",
    },
    fuelType: vehiculo.combustible,
    vehicleTransmission: vehiculo.transmision,
    offers: {
      "@type": "Offer",
      priceCurrency: vehiculo.moneda,
      price: vehiculo.precio,
      availability: "https://schema.org/InStock",
      areaServed: vehiculo.ubicacion,
      seller: {
        "@type":
          vehiculo.vendedor === "Concesionaria" ? "AutoDealer" : "Person",
        name: vehiculo.vendedor,
      },
    },
  };

  return (
    <main className="min-h-screen bg-umarti-cream">
      <Header />
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-5xl px-6 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span>{" "}
          <Link href="/clasificados" className="hover:text-umarti-orange">
            Clasificados
          </Link>{" "}
          <span className="mx-1">›</span> {vehiculo.marca} {vehiculo.modelo}
        </nav>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded bg-umarti-navy px-2 py-0.5 text-xs font-semibold text-white">
            Usado
          </span>
          <span className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
            {vehiculo.segmento}
          </span>
          <span
            className={`rounded px-2 py-0.5 text-xs font-semibold ${
              vehiculo.vendedor === "Concesionaria"
                ? "bg-umarti-navy/10 text-umarti-navy"
                : "border border-umarti-orange text-umarti-orange"
            }`}
          >
            {vehiculo.vendedor}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-umarti-navy">
          {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio}
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {vehiculo.km.toLocaleString("es-AR")} km · {vehiculo.combustible} ·{" "}
          {vehiculo.transmision} · {vehiculo.ubicacion}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <GaleriaImagenes cantidadFotos={4} />

            <section className="mt-8">
              <h2 className="mb-2 text-lg font-bold text-umarti-navy">
                Descripción
              </h2>
              <p className="text-sm leading-relaxed text-gray-600">
                {vehiculo.marca} {vehiculo.modelo} {vehiculo.anio} con{" "}
                {vehiculo.km.toLocaleString("es-AR")} km, motor{" "}
                {vehiculo.combustible.toLowerCase()} y caja{" "}
                {vehiculo.transmision.toLowerCase()}. Publicado por{" "}
                {vehiculo.vendedor.toLowerCase()} verificado en Umarti
                Movilidad, ubicado en {vehiculo.ubicacion}. Consultá por
                WhatsApp para coordinar una prueba o pedir más información
                sobre el estado del vehículo.
              </p>
            </section>

            <section className="mt-8">
              <h2 className="mb-3 text-lg font-bold text-umarti-navy">
                Ficha del vehículo
              </h2>
              <dl className="grid grid-cols-1 gap-x-8 gap-y-3 rounded-xl border border-gray-100 bg-white p-5 text-sm sm:grid-cols-2">
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <dt className="text-gray-400">Marca</dt>
                  <dd className="font-medium text-gray-700">{vehiculo.marca}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <dt className="text-gray-400">Modelo</dt>
                  <dd className="font-medium text-gray-700">{vehiculo.modelo}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <dt className="text-gray-400">Año</dt>
                  <dd className="font-medium text-gray-700">{vehiculo.anio}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <dt className="text-gray-400">Kilómetros</dt>
                  <dd className="font-medium text-gray-700">
                    {vehiculo.km.toLocaleString("es-AR")} km
                  </dd>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <dt className="text-gray-400">Segmento</dt>
                  <dd className="font-medium text-gray-700">{vehiculo.segmento}</dd>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2">
                  <dt className="text-gray-400">Motorización</dt>
                  <dd className="font-medium text-gray-700">
                    {vehiculo.combustible}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-gray-50 pb-2 sm:border-none sm:pb-0">
                  <dt className="text-gray-400">Transmisión</dt>
                  <dd className="font-medium text-gray-700">
                    {vehiculo.transmision}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-400">Ubicación</dt>
                  <dd className="font-medium text-gray-700">
                    {vehiculo.ubicacion}
                  </dd>
                </div>
              </dl>
            </section>

            <div className="mt-8">
              <AdSlot slot={AD_SLOTS.clasificadosFicha} />
            </div>
          </div>

          <aside>
            <div className="rounded-xl border border-umarti-navy/20 bg-white p-6">
              <p className="text-xs uppercase text-gray-400">Precio</p>
              <p className="text-3xl font-bold text-umarti-orange">
                {formatPrecio(vehiculo.precio, vehiculo.moneda)}
              </p>

              <div className="mt-5 flex flex-col gap-2">
                <a
                  href={`https://wa.me/?text=${mensajeWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-md bg-green-600 py-3 text-center text-sm font-semibold text-white hover:opacity-90"
                >
                  Consultar por WhatsApp
                </a>
                <button
                  type="button"
                  className="rounded-md border border-umarti-navy py-3 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
                >
                  Compartir
                </button>
              </div>

              <div className="mt-5 space-y-1 border-t border-gray-100 pt-4 text-xs text-gray-500">
                <p>✓ Vendedor verificado por Umarti Movilidad</p>
                <p>✓ Contacto directo, sin intermediarios</p>
                <p>✓ Publicado en {vehiculo.ubicacion}</p>
              </div>
            </div>
          </aside>
        </div>

        {similares.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-umarti-navy">
              Avisos similares
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similares.map((v) => (
                <UsedVehicleCard key={v.id} vehiculo={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
