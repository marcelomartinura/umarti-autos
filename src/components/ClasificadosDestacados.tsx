import Link from "next/link";
import { vehiculosUsados } from "@/lib/mock-data";
import UsedVehicleCard from "./UsedVehicleCard";

export default function ClasificadosDestacados() {
  return (
    <section className="bg-umarti-cream py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-umarti-navy">
              Clasificados destacados
            </h2>
            <p className="text-sm text-gray-500">
              Usados verificados, publicados por concesionarias y
              particulares.
            </p>
          </div>
          <Link
            href="/clasificados"
            className="rounded-md bg-umarti-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Ver todos los clasificados
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vehiculosUsados.map((vehiculo) => (
            <UsedVehicleCard key={vehiculo.id} vehiculo={vehiculo} />
          ))}
        </div>
      </div>
    </section>
  );
}
