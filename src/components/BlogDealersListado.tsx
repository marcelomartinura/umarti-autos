"use client";

import { useMemo, useState } from "react";
import { articulosDealers } from "@/lib/mock-data";
import { CategoriaBlogDealers } from "@/lib/types";

type Tab = "Todas" | CategoriaBlogDealers;

const CATEGORIAS: CategoriaBlogDealers[] = [
  "Cómo publicar tus autos",
  "Posventa para tu negocio",
  "Gestión de tu tienda",
  "Publicidad en Umarti",
  "Novedades y lanzamientos",
];

function formatearFecha(fecha: string) {
  return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogDealersListado() {
  const [tab, setTab] = useState<Tab>("Todas");

  const articulos = useMemo(() => {
    const filtrados =
      tab === "Todas"
        ? articulosDealers
        : articulosDealers.filter((a) => a.categoria === tab);
    return [...filtrados].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
  }, [tab]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("Todas")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            tab === "Todas"
              ? "bg-umarti-navy text-white"
              : "border border-gray-200 bg-white text-umarti-navy hover:border-umarti-navy"
          }`}
        >
          Todas
        </button>
        {CATEGORIAS.map((categoria) => (
          <button
            key={categoria}
            type="button"
            onClick={() => setTab(categoria)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === categoria
                ? "bg-umarti-navy text-white"
                : "border border-gray-200 bg-white text-umarti-navy hover:border-umarti-navy"
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {articulos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          Todavía no hay notas en esta categoría.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {articulos.map((articulo) => (
            <div
              key={articulo.slug}
              className="flex flex-col rounded-xl border border-gray-100 bg-white p-5"
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-umarti-cream px-2 py-0.5 text-[11px] font-medium text-umarti-navy">
                  {articulo.categoria}
                </span>
                <span className="text-[11px] text-gray-400">
                  {formatearFecha(articulo.fecha)}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-umarti-navy">
                  {articulo.titulo}
                </h3>
                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                  Próximamente
                </span>
              </div>
              <p className="mt-2 flex-1 text-sm text-gray-500">
                {articulo.resumen}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
