"use client";

import Link from "next/link";
import { VehiculoUsado } from "@/lib/types";
import { formatPrecio } from "@/lib/format";

export default function UsedVehicleCard({
  vehiculo,
  comparado = false,
  onToggleComparar,
  esFavorito = false,
  onToggleFavorito,
  onCompartir,
  copiado = false,
}: {
  vehiculo: VehiculoUsado;
  comparado?: boolean;
  onToggleComparar?: (id: string) => void;
  esFavorito?: boolean;
  onToggleFavorito?: (id: string) => void;
  onCompartir?: (vehiculo: VehiculoUsado) => void;
  copiado?: boolean;
}) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="relative flex h-36 items-center justify-center bg-gray-100">
        <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-white/90 px-2 py-0.5 text-xs font-semibold text-umarti-navy shadow">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          {vehiculo.ubicacion}
        </span>

        <div className="absolute right-2 top-2 flex gap-1">
          <button
            type="button"
            onClick={() => onToggleFavorito?.(vehiculo.id)}
            aria-label={
              esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"
            }
            title={esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}
            className={`flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm shadow ${
              esFavorito ? "text-umarti-orange" : "text-umarti-navy"
            }`}
          >
            {esFavorito ? "♥" : "♡"}
          </button>
          <button
            type="button"
            onClick={() => onCompartir?.(vehiculo)}
            aria-label="Compartir"
            title="Compartir"
            className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-sm text-umarti-navy shadow"
          >
            ↗
          </button>
        </div>

        {copiado && (
          <span className="absolute bottom-2 right-2 rounded bg-umarti-navy px-2 py-0.5 text-[10px] font-semibold text-white">
            ¡Enlace copiado!
          </span>
        )}

        <span className="text-xs text-gray-400">Foto del vehículo</span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        {onToggleComparar && (
          <label className="mb-2 flex items-center gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={comparado}
              onChange={() => onToggleComparar(vehiculo.id)}
              className="accent-umarti-orange"
            />
            Comparar
          </label>
        )}

        <h3 className="font-semibold text-umarti-navy">
          {vehiculo.anio} {vehiculo.marca} {vehiculo.modelo}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">
          {vehiculo.km.toLocaleString("es-AR")} km · {vehiculo.combustible} ·{" "}
          {vehiculo.transmision}
        </p>

        <span
          className={`mt-2 w-fit rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            vehiculo.vendedor === "Concesionaria"
              ? "bg-umarti-navy text-white"
              : "border border-umarti-orange text-umarti-orange"
          }`}
        >
          {vehiculo.vendedor}
        </span>

        <div className="mt-auto pt-3">
          <p className="text-lg font-bold text-umarti-orange">
            {formatPrecio(vehiculo.precio, vehiculo.moneda)}
          </p>
          <Link
            href={`/clasificados/${vehiculo.id}`}
            className="mt-3 block w-full rounded-md bg-umarti-navy py-2 text-center text-sm font-semibold text-white hover:opacity-90"
          >
            Ver aviso
          </Link>
        </div>
      </div>
    </div>
  );
}
