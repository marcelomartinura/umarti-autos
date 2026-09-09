import { vehiculosNuevos } from "@/lib/mock-data";
import VehicleCard from "./VehicleCard";

export default function FeaturedVehicles() {
  return (
    <section className="bg-umarti-cream py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-umarti-navy">
              Catálogo de Autos Nuevos
            </h2>
            <p className="text-sm text-gray-500">
              Explorá las últimas novedades del mercado. Vehículos 0km con
              garantía oficial.
            </p>
          </div>
          <button className="rounded-md bg-umarti-orange px-4 py-2 text-sm font-semibold text-white">
            Ver catálogo completo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehiculosNuevos.map((vehiculo) => (
            <VehicleCard key={vehiculo.id} vehiculo={vehiculo} />
          ))}
        </div>
      </div>
    </section>
  );
}
