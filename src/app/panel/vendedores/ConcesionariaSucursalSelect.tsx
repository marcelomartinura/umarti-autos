"use client";

import { useState } from "react";
import type { ConcesionariaArbol } from "./tipos";

export default function ConcesionariaSucursalSelect({
  concesionarias,
  concesionariaInicial = "",
  sucursalInicial = "",
}: {
  concesionarias: ConcesionariaArbol[];
  concesionariaInicial?: string;
  sucursalInicial?: string;
}) {
  const [concesionariaId, setConcesionariaId] = useState(concesionariaInicial);
  const seleccionada = concesionarias.find((c) => c.id === concesionariaId);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Concesionaria</span>
        <select
          name="concesionaria_id"
          value={concesionariaId}
          onChange={(e) => setConcesionariaId(e.target.value)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
        >
          <option value="">Independiente (sin concesionaria)</option>
          {concesionarias.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nombre}
            </option>
          ))}
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Sucursal</span>
        {/* La key fuerza a React a reiniciar este select cuando cambia la
            concesionaria, así nunca queda seleccionada una sucursal que
            pertenece a otra agencia. */}
        <select
          key={concesionariaId}
          name="sucursal_id"
          defaultValue={sucursalInicial}
          disabled={!seleccionada || seleccionada.sucursales.length === 0}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
        >
          <option value="">
            {seleccionada ? "Sin sucursal específica" : "— Elegí una concesionaria primero —"}
          </option>
          {seleccionada?.sucursales.map((s) => (
            <option key={s.id} value={s.id}>
              {s.nombre}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
