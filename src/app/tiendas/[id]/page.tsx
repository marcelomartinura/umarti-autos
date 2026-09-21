import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import VehicleCard from "@/components/VehicleCard";
import UsedVehicleCard from "@/components/UsedVehicleCard";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";
import { tiendas, vehiculosNuevos, vehiculosUsados } from "@/lib/mock-data";

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join("")
    .toUpperCase();
}

export default function TiendaDetallePage({
  params,
}: {
  params: { id: string };
}) {
  const tienda = tiendas.find((t) => t.id === params.id);

  if (!tienda) {
    notFound();
  }

  const nuevosDeLaTienda = vehiculosNuevos.filter((v) =>
    tienda.vehiculosNuevosIds.includes(v.id)
  );
  const usadosDeLaTienda = vehiculosUsados.filter((v) =>
    tienda.vehiculosUsadosIds.includes(v.id)
  );
  const totalVehiculos = nuevosDeLaTienda.length + usadosDeLaTienda.length;

  const mensajeWhatsapp = encodeURIComponent(
    `Hola, te contacto desde tu perfil en Umarti Movilidad (${tienda.nombre}).`
  );

  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="h-40 bg-gradient-to-r from-umarti-navy to-umarti-navyDark sm:h-56" />

      <div className="mx-auto max-w-7xl px-6">
        <nav className="mb-4 mt-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span>{" "}
          <Link href="/tiendas" className="hover:text-umarti-orange">
            Tiendas
          </Link>{" "}
          <span className="mx-1">›</span> {tienda.nombre}
        </nav>

        <div className="-mt-16 flex flex-wrap items-end justify-between gap-6 sm:-mt-20">
          <div className="flex items-end gap-4">
            <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-umarti-cream bg-umarti-navy text-2xl font-bold text-white shadow-lg sm:h-28 sm:w-28">
              {iniciales(tienda.nombre)}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-umarti-navy sm:text-3xl">
                  {tienda.nombre}
                </h1>
                {tienda.verificada && (
                  <span
                    className="text-umarti-orange"
                    title="Tienda verificada"
                    aria-hidden
                  >
                    ✓
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500">
                {tienda.categoria} · {tienda.ubicacion}
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${tienda.whatsapp}?text=${mensajeWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Contactar por WhatsApp
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-6 rounded-xl border border-gray-100 bg-white p-5 text-sm text-gray-600">
          <p className="max-w-2xl">{tienda.descripcion}</p>
          <div className="ml-auto flex gap-6 text-umarti-navy">
            <div>
              <p className="text-xl font-bold">{totalVehiculos}</p>
              <p className="text-xs text-gray-400">Vehículos publicados</p>
            </div>
            <div>
              <p className="text-xl font-bold">
                {tienda.visualizaciones.toLocaleString("es-AR")}
              </p>
              <p className="text-xs text-gray-400">Visualizaciones</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <AdSlot slot={AD_SLOTS.tiendaFicha} />
        </div>

        <div className="mt-10">
          <h2 className="mb-6 text-xl font-bold text-umarti-navy">
            Vehículos disponibles
          </h2>
          {totalVehiculos === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
              Esta tienda todavía no tiene vehículos publicados.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {nuevosDeLaTienda.map((v) => (
                <VehicleCard key={v.id} vehiculo={v} />
              ))}
              {usadosDeLaTienda.map((v) => (
                <UsedVehicleCard key={v.id} vehiculo={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
