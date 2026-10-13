"use client";

import { useState } from "react";
import type { SucursalInput } from "./tipos";

export default function SucursalesEditor({
  valorInicial,
}: {
  valorInicial: SucursalInput[];
}) {
  const [sucursales, setSucursales] = useState<SucursalInput[]>(valorInicial);

  function actualizar(indice: number, campo: keyof SucursalInput, valor: string) {
    setSucursales((prev) =>
      prev.map((s, i) => (i === indice ? { ...s, [campo]: valor } : s))
    );
  }

  function agregar() {
    setSucursales((prev) => [
      ...prev,
      { nombre: "", direccion: "", telefono: "", email: "" },
    ]);
  }

  function quitar(indice: number) {
    setSucursales((prev) => prev.filter((_, i) => i !== indice));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="sucursales_json" value={JSON.stringify(sucursales)} />

      {sucursales.length === 0 && (
        <p className="text-xs text-gray-400">Todavía no cargaste ninguna sucursal.</p>
      )}

      {sucursales.map((s, i) => (
        <div key={i} className="rounded-md border border-gray-200 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-gray-400">
              Sucursal {i + 1}
            </span>
            <button
              type="button"
              onClick={() => quitar(i)}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              Quitar
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nombre (ej: Sede Central)"
              value={s.nombre}
              onChange={(e) => actualizar(i, "nombre", e.target.value)}
              className="rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-umarti-orange focus:outline-none"
            />
            <input
              type="text"
              placeholder="Dirección"
              value={s.direccion}
              onChange={(e) => actualizar(i, "direccion", e.target.value)}
              className="rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-umarti-orange focus:outline-none"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={s.telefono}
              onChange={(e) => actualizar(i, "telefono", e.target.value)}
              className="rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-umarti-orange focus:outline-none"
            />
            <input
              type="text"
              placeholder="Email"
              value={s.email}
              onChange={(e) => actualizar(i, "email", e.target.value)}
              className="rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-umarti-orange focus:outline-none"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={agregar}
        className="text-sm font-semibold text-umarti-orange hover:underline"
      >
        + Agregar sucursal
      </button>
    </div>
  );
}
