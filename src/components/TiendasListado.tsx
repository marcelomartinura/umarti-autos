"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { tiendas, vendedoresDestacados } from "@/lib/mock-data";
import { CategoriaTienda } from "@/lib/types";
import TiendaCard from "./TiendaCard";
import VendedorCard from "./VendedorCard";

type Tab = "Todas" | CategoriaTienda | "Vendedores destacados";

const CATEGORIAS: CategoriaTienda[] = [
  "Concesionaria oficial",
  "Marca oficial",
  "Agencia",
];

export default function TiendasListado() {
  const [busqueda, setBusqueda] = useState("");
  const [tab, setTab] = useState<Tab>("Todas");

  const tabs: { key: Tab; label: string; cantidad: number }[] = useMemo(
    () => [
      { key: "Todas", label: "Todas", cantidad: tiendas.length },
      ...CATEGORIAS.map((categoria) => ({
        key: categoria,
        label:
          categoria === "Concesionaria oficial"
            ? "Concesionarias oficiales"
            : categoria === "Marca oficial"
            ? "Marcas oficiales"
            : "Agencias",
        cantidad: tiendas.filter((t) => t.categoria === categoria).length,
      })),
      {
        key: "Vendedores destacados",
        label: "Vendedores destacados",
        cantidad: vendedoresDestacados.length,
      },
    ],
    []
  );

  const tiendasFiltradas = useMemo(() => {
    return tiendas.filter((t) => {
      const coincideBusqueda =
        busqueda.trim() === "" ||
        t.nombre.toLowerCase().includes(busqueda.trim().toLowerCase());
      const coincideTab = tab === "Todas" || tab === t.categoria;
      return coincideBusqueda && coincideTab;
    });
  }, [busqueda, tab]);

  const vendedoresFiltrados = useMemo(() => {
    if (busqueda.trim() === "") return vendedoresDestacados;
    return vendedoresDestacados.filter((v) =>
      v.nombre.toLowerCase().includes(busqueda.trim().toLowerCase())
    );
  }, [busqueda]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex min-w-[240px] flex-1 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 text-gray-400"
            aria-hidden
          >
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar agencia..."
            className="flex-1 border-none text-sm text-gray-700 outline-none placeholder:text-gray-400"
          />
        </div>
        <Link
          href="/ecosistema-negocios"
          className="rounded-md bg-umarti-orange px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          + Crear tu agencia
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              tab === t.key
                ? "bg-umarti-navy text-white"
                : "border border-gray-200 bg-white text-umarti-navy hover:border-umarti-navy"
            }`}
          >
            {t.label} ({t.cantidad})
          </button>
        ))}
      </div>

      {tab === "Vendedores destacados" ? (
        <div>
          <h2 className="mb-1 text-xl font-bold text-umarti-navy">
            Vendedores profesionales verificados
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Conectá con confianza y asesoramiento experto.
          </p>
          {vendedoresFiltrados.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
              No encontramos vendedores con ese nombre.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vendedoresFiltrados.map((v) => (
                <VendedorCard key={v.id} vendedor={v} />
              ))}
            </div>
          )}
        </div>
      ) : tiendasFiltradas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          No encontramos tiendas con esos filtros.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4">
          {tiendasFiltradas.map((t) => (
            <TiendaCard key={t.id} tienda={t} />
          ))}
        </div>
      )}
    </div>
  );
}
