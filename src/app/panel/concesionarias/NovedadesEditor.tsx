"use client";

import { useState } from "react";
import type { NovedadInput } from "./tipos";

function hoy() {
  return new Date().toISOString().slice(0, 10);
}

export default function NovedadesEditor({
  valorInicial,
}: {
  valorInicial: NovedadInput[];
}) {
  const [novedades, setNovedades] = useState<NovedadInput[]>(valorInicial);

  function actualizar(indice: number, campo: keyof NovedadInput, valor: string) {
    setNovedades((prev) =>
      prev.map((n, i) => (i === indice ? { ...n, [campo]: valor } : n))
    );
  }

  function agregar() {
    setNovedades((prev) => [
      ...prev,
      { titulo: "", texto: "", fecha: hoy(), link_url: "" },
    ]);
  }

  function quitar(indice: number) {
    setNovedades((prev) => prev.filter((_, i) => i !== indice));
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name="novedades_json" value={JSON.stringify(novedades)} />

      {novedades.length === 0 && (
        <p className="text-xs text-gray-400">
          Todavía no cargaste ninguna novedad (lanzamientos, promociones, noticias...).
        </p>
      )}

      {novedades.map((n, i) => (
        <div key={i} className="rounded-md border border-gray-200 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-gray-400">
              Novedad {i + 1}
            </span>
            <button
              type="button"
              onClick={() => quitar(i)}
              className="text-xs font-semibold text-red-600 hover:underline"
            >
              Quitar
            </button>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Título (ej: Llegó el nuevo modelo 2027)"
              value={n.titulo}
              onChange={(e) => actualizar(i, "titulo", e.target.value)}
              className="rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-umarti-orange focus:outline-none sm:col-span-2"
            />
            <input
              type="date"
              value={n.fecha}
              onChange={(e) => actualizar(i, "fecha", e.target.value)}
              className="rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-umarti-orange focus:outline-none"
            />
          </div>
          <textarea
            placeholder="Texto breve (opcional)"
            value={n.texto}
            onChange={(e) => actualizar(i, "texto", e.target.value)}
            rows={2}
            className="mt-2 w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-umarti-orange focus:outline-none"
          />
          <input
            type="text"
            placeholder="Link opcional (ej: a una nota o al catálogo)"
            value={n.link_url}
            onChange={(e) => actualizar(i, "link_url", e.target.value)}
            className="mt-2 w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={agregar}
        className="text-sm font-semibold text-umarti-orange hover:underline"
      >
        + Agregar novedad
      </button>
    </div>
  );
}
