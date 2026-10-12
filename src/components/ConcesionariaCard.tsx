import Link from "next/link";
import Image from "next/image";

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join("")
    .toUpperCase();
}

export type ConcesionariaResumen = {
  nombre: string;
  slug: string;
  descripcion: string | null;
  direccion: string | null;
  logo_url: string | null;
};

export default function ConcesionariaCard({
  concesionaria,
}: {
  concesionaria: ConcesionariaResumen;
}) {
  return (
    <Link
      href={`/concesionarias/${concesionaria.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition hover:border-umarti-orange hover:shadow-md"
    >
      <div className="flex items-center gap-3 border-b border-gray-50 p-5">
        {concesionaria.logo_url ? (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gray-100 bg-white">
            <Image
              src={concesionaria.logo_url}
              alt={concesionaria.nombre}
              width={40}
              height={40}
              className="h-9 w-9 object-contain"
            />
          </span>
        ) : (
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-umarti-navy text-sm font-bold text-white">
            {iniciales(concesionaria.nombre)}
          </span>
        )}
        <div className="min-w-0">
          <p className="truncate font-bold text-umarti-navy group-hover:text-umarti-orange">
            {concesionaria.nombre}
          </p>
          {concesionaria.direccion && (
            <p className="truncate text-xs text-gray-400">{concesionaria.direccion}</p>
          )}
        </div>
      </div>
      {concesionaria.descripcion && (
        <p className="line-clamp-3 flex-1 p-5 text-sm text-gray-500">
          {concesionaria.descripcion}
        </p>
      )}
    </Link>
  );
}
