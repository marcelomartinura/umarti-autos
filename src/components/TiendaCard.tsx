import Link from "next/link";
import { Tienda } from "@/lib/types";

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join("")
    .toUpperCase();
}

export default function TiendaCard({ tienda }: { tienda: Tienda }) {
  const cantidadAutos =
    tienda.vehiculosNuevosIds.length + tienda.vehiculosUsadosIds.length;

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="relative flex h-32 items-center justify-center bg-gray-100">
        <span className="text-xs text-gray-400">Foto de portada</span>
        <span className="absolute -bottom-6 left-4 flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-umarti-navy text-sm font-bold text-white shadow">
          {iniciales(tienda.nombre)}
        </span>
      </div>

      <div className="p-4 pt-9">
        <div className="flex items-center gap-1">
          <h3 className="font-semibold text-umarti-navy">{tienda.nombre}</h3>
          {tienda.verificada && (
            <span
              className="text-xs text-umarti-orange"
              title="Tienda verificada"
              aria-hidden
            >
              ✓
            </span>
          )}
        </div>
        <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
          <svg
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
          >
            <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
          </svg>
          {tienda.ubicacion}
        </p>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {tienda.descripcion}
        </p>

        <div className="mt-3 flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
              <rect x="3" y="13" width="18" height="5" rx="1.5" />
              <circle cx="7" cy="18" r="1.5" />
              <circle cx="17" cy="18" r="1.5" />
            </svg>
            {cantidadAutos} autos
          </span>
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden
            >
              <polyline points="3 17 9 11 13 15 21 7" />
              <polyline points="14 7 21 7 21 14" />
            </svg>
            {tienda.visualizaciones.toLocaleString("es-AR")}
          </span>
        </div>

        <Link
          href={`/tiendas/${tienda.id}`}
          className="mt-4 block w-full rounded-md border border-umarti-navy py-2 text-center text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
        >
          Ver tienda
        </Link>
      </div>
    </div>
  );
}
