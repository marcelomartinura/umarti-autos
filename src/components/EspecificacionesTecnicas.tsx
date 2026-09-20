"use client";

import { useState } from "react";
import { EspecificacionGrupo } from "@/lib/types";

export default function EspecificacionesTecnicas({
  grupos,
}: {
  grupos: EspecificacionGrupo[];
}) {
  const [expandido, setExpandido] = useState<Record<number, boolean>>({});

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {grupos.map((grupo, index) => {
        const abierto = !!expandido[index];
        const visibles = abierto ? grupo.items : grupo.items.slice(0, 3);
        const restantes = grupo.items.length - 3;

        return (
          <div
            key={grupo.titulo}
            className="rounded-xl border border-gray-100 bg-white p-5"
          >
            <h3 className="mb-3 font-semibold text-umarti-navy">
              {grupo.titulo}
            </h3>
            <dl className="space-y-2 text-sm">
              {visibles.map((item) => (
                <div key={item.label}>
                  <dt className="text-gray-400">{item.label}</dt>
                  <dd className="font-medium text-gray-700">{item.valor}</dd>
                </div>
              ))}
            </dl>
            {restantes > 0 && (
              <button
                type="button"
                onClick={() =>
                  setExpandido((prev) => ({ ...prev, [index]: !abierto }))
                }
                className="mt-3 text-xs font-semibold text-umarti-orange"
              >
                {abierto ? "Ver menos" : `Ver más (${restantes})`}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
