"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EliminarModeloBoton from "./EliminarModeloBoton";
import type { ModeloListado } from "../tipos";

type GrupoMarca = { marca: string; modelos: ModeloListado[] };

/**
 * Listado de modelos agrupados por marca, con un buscador desplegable de
 * marca arriba de la tabla (a pedido de Marcelo) para poder chequear
 * rápido si están todos los modelos cargados de una marca puntual. El
 * filtrado es 100% en el navegador: no vuelve a consultar el servidor.
 */
export default function ListadoModelos({ grupos }: { grupos: GrupoMarca[] }) {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");

  const gruposFiltrados = useMemo(() => {
    if (!marcaSeleccionada) return grupos;
    return grupos.filter((g) => g.marca === marcaSeleccionada);
  }, [grupos, marcaSeleccionada]);

  return (
    <div className="mb-6">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-umarti-navy" htmlFor="filtro-marca-modelos">
          Filtrar por marca:
        </label>
        <select
          id="filtro-marca-modelos"
          value={marcaSeleccionada}
          onChange={(e) => setMarcaSeleccionada(e.target.value)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-umarti-navy focus:border-umarti-orange focus:outline-none"
        >
          <option value="">Todas las marcas</option>
          {grupos.map((g) => (
            <option key={g.marca} value={g.marca}>
              {g.marca} ({g.modelos.length})
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        {gruposFiltrados.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-400">No hay modelos para esa marca.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-4 py-3">Modelo</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {gruposFiltrados.flatMap((g) => [
                <tr key={`marca-${g.marca}`} className="border-t border-gray-100 bg-gray-50">
                  <td
                    colSpan={3}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-umarti-navy"
                  >
                    {g.marca}
                  </td>
                </tr>,
                ...g.modelos.map((m) => (
                  <tr key={m.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 pl-8 font-medium text-umarti-navy">{m.nombre}</td>
                    <td className="px-4 py-3">
                      {m.activo ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                          Activo
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/panel/catalogo/modelos/${m.id}/editar`}
                          className="text-sm font-semibold text-umarti-orange hover:underline"
                        >
                          Editar
                        </Link>
                        <EliminarModeloBoton modeloId={m.id} nombre={m.nombre} />
                      </div>
                    </td>
                  </tr>
                )),
              ])}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
