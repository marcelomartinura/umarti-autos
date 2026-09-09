import { VehiculoNuevo } from "@/lib/types";

export default function VehicleCard({ vehiculo }: { vehiculo: VehiculoNuevo }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="relative flex h-36 items-center justify-center bg-gray-100">
        <span className="absolute left-2 top-2 rounded bg-umarti-navy px-2 py-0.5 text-xs font-semibold text-white">
          {vehiculo.segmento}
        </span>
        <span className="text-xs text-gray-400">Foto del vehículo</span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-umarti-navy">
          {vehiculo.marca} {vehiculo.modelo}
        </h3>
        <p className="text-sm text-gray-500">{vehiculo.version}</p>

        <div className="mt-3 flex gap-4 text-xs text-gray-500">
          <span>{vehiculo.anio}</span>
          <span>{vehiculo.combustible}</span>
          <span>{vehiculo.transmision}</span>
        </div>

        <div className="mt-3">
          <p className="text-xs uppercase text-gray-400">Precio sugerido</p>
          <p className="text-lg font-bold text-umarti-navy">
            USD {vehiculo.precioSugerido.toLocaleString("es-AR")}
          </p>
        </div>

        <button className="mt-4 w-full rounded-md bg-umarti-navy py-2 text-sm font-semibold text-white hover:opacity-90">
          Ver detalles
        </button>
      </div>
    </div>
  );
}
