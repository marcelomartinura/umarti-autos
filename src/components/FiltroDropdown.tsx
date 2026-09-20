"use client";

import { useEffect, useRef, useState } from "react";

export default function FiltroDropdown({
  label,
  opciones,
  seleccionadas,
  onChange,
}: {
  label: string;
  opciones: string[];
  seleccionadas: string[];
  onChange: (valores: string[]) => void;
}) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickFuera(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    document.addEventListener("mousedown", handleClickFuera);
    return () => document.removeEventListener("mousedown", handleClickFuera);
  }, []);

  function toggleOpcion(opcion: string) {
    if (seleccionadas.includes(opcion)) {
      onChange(seleccionadas.filter((o) => o !== opcion));
    } else {
      onChange([...seleccionadas, opcion]);
    }
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className={`rounded-full border px-4 py-2 text-sm font-medium ${
          seleccionadas.length > 0
            ? "border-umarti-orange text-umarti-orange"
            : "border-gray-200 text-gray-600"
        }`}
      >
        {label}
        {seleccionadas.length > 0 ? ` (${seleccionadas.length})` : ""}
        <span className="ml-1" aria-hidden>
          ▾
        </span>
      </button>
      {abierto && (
        <div className="absolute left-0 top-full z-10 mt-2 w-56 rounded-lg border border-gray-100 bg-white p-3 shadow-lg">
          {opciones.map((opcion) => (
            <label
              key={opcion}
              className="flex items-center gap-2 rounded px-1 py-1.5 text-sm text-gray-700 hover:bg-umarti-cream/50"
            >
              <input
                type="checkbox"
                checked={seleccionadas.includes(opcion)}
                onChange={() => toggleOpcion(opcion)}
                className="accent-umarti-orange"
              />
              {opcion}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
