"use client";

import { useState } from "react";
import Image from "next/image";

// Versión "real" de la galería, para la ficha del catálogo conectado a
// Supabase. A propósito es un componente aparte de GaleriaImagenes.tsx: ese
// sigue usándose (sin fotos reales) en la ficha de Clasificados
// (/clasificados/[id]), que todavía no se conectó a datos reales — tocar su
// firma de props ahí habría roto esa página.
export default function GaleriaImagenesReal({
  fotos,
  alt,
}: {
  fotos: string[];
  alt: string;
}) {
  const [activa, setActiva] = useState(0);

  if (fotos.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl bg-gray-100 sm:h-96">
        <span className="text-sm text-gray-400">
          Foto próximamente — estamos cargando las imágenes reales.
        </span>
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-80 overflow-hidden rounded-xl bg-gray-100 sm:h-96">
        <Image
          src={fotos[activa]}
          alt={alt}
          fill
          className="object-cover"
          priority
        />
        {fotos.length > 1 && (
          <span className="absolute bottom-3 right-3 rounded bg-black/50 px-2 py-1 text-xs text-white">
            {activa + 1}/{fotos.length}
          </span>
        )}
      </div>
      {fotos.length > 1 && (
        <div className="mt-3 flex gap-2">
          {fotos.map((foto, i) => (
            <button
              key={foto + i}
              type="button"
              onClick={() => setActiva(i)}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                activa === i ? "border-umarti-orange" : "border-transparent"
              }`}
            >
              <Image src={foto} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
      <p className="mt-2 text-xs text-gray-400">* Imagen ilustrativa.</p>
    </div>
  );
}
