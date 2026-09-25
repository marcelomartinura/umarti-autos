"use client";

import { useMemo, useState } from "react";
import { marcas, provinciasArgentina, serviciosOficiales, talleres } from "@/lib/mock-data";
import ServicioOficialCard from "./ServicioOficialCard";
import TallerCard from "./TallerCard";

type Tab = "oficiales" | "talleres";

export default function PosventaListados() {
  const [tab, setTab] = useState<Tab>("oficiales");
  const [marca, setMarca] = useState("Todas");
  const [provincia, setProvincia] = useState("Todas");

  const oficialesFiltrados = useMemo(() => {
    return serviciosOficiales.filter((s) => {
      const coincideMarca = marca === "Todas" || s.marca === marca;
      const coincideProvincia =
        provincia === "Todas" || s.provincia === provincia;
      return coincideMarca && coincideProvincia;
    });
  }, [marca, provincia]);

  const talleresFiltrados = useMemo(() => {
    return talleres.filter((t) => {
      const coincideMarca =
        marca === "Todas" ||
        t.marcasQueAtiende.includes("Todas") ||
        t.marcasQueAtiende.includes(marca);
      const coincideProvincia =
        provincia === "Todas" || t.provincia === provincia;
      return coincideMarca && coincideProvincia;
    });
  }, [marca, provincia]);

  const hayFiltrosActivos = marca !== "Todas" || provincia !== "Todas";
  const limpiarFiltros = () => {
    setMarca("Todas");
    setProvincia("Todas");
  };

  return (
    <div id="buscar-service" className="scroll-mt-24">
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTab("oficiales")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            tab === "oficiales"
              ? "bg-umarti-navy text-white"
              : "border border-gray-200 bg-white text-umarti-navy hover:border-umarti-navy"
          }`}
        >
          Service oficial ({serviciosOficiales.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("talleres")}
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            tab === "talleres"
              ? "bg-umarti-navy text-white"
              : "border border-gray-200 bg-white text-umarti-navy hover:border-umarti-navy"
          }`}
        >
          Talleres independientes ({talleres.length})
        </button>
      </div>

      <div className="mb-8 flex flex-wrap items-end gap-3 rounded-xl border border-gray-100 bg-white p-4">
        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-gray-500">
            Marca
          </span>
          <select
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          >
            <option value="Todas">Todas las marcas</option>
            {marcas.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block text-xs font-medium text-gray-500">
            Provincia
          </span>
          <select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
            className="rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          >
            <option value="Todas">Todas las provincias</option>
            {provinciasArgentina.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>

        {hayFiltrosActivos && (
          <button
            type="button"
            onClick={limpiarFiltros}
            className="rounded-md px-3 py-2 text-sm font-medium text-umarti-orange hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {tab === "oficiales" ? (
        oficialesFiltrados.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
            No encontramos service oficial con esos filtros.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {oficialesFiltrados.map((s) => (
              <ServicioOficialCard key={s.id} servicio={s} />
            ))}
          </div>
        )
      ) : talleresFiltrados.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          No encontramos talleres con esos filtros.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {talleresFiltrados.map((t) => (
            <TallerCard key={t.id} taller={t} />
          ))}
        </div>
      )}
    </div>
  );
}
