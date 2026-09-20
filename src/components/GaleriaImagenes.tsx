"use client";

import { useState } from "react";

export default function GaleriaImagenes({
  cantidadFotos = 5,
}: {
  cantidadFotos?: number;
}) {
  const [activa, setActiva] = useState(0);
  const fotos = Array.from({ length: cantidadFotos }, (_, i) => i);

  return (
    <div>
      <div className="relative flex h-80 items-center justify-center rounded-xl bg-gray-100 sm:h-96">
        <span className="text-sm text-gray-400">Foto {activa + 1}</span>
        <span className="absolute bottom-3 right-3 rounded bg-black/50 px-2 py-1 text-xs text-white">
          {activa + 1}/{cantidadFotos}
        </span>
      </div>
      <div className="mt-3 flex gap-2">
        {fotos.map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActiva(i)}
            className={`flex h-16 w-20 shrink-0 items-center justify-center rounded-lg border-2 text-xs ${
              activa === i
                ? "border-umarti-orange bg-gray-50 text-umarti-navy"
                : "border-transparent bg-gray-100 text-gray-400"
            }`}
          >
            Foto {i + 1}
          </button>
        ))}
      </div>
      <p className="mt-2 text-xs text-gray-400">
        *Imagen ilustrativa — fotos reales cuando conectemos el catálogo con
        Supabase.
      </p>
    </div>
  );
}
