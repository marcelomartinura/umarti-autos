"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EliminarVehiculoBoton from "./EliminarVehiculoBoton";
import type { VehiculoListado } from "./tipos";

type GrupoModeloVehiculos = { modelo: string; vehiculos: VehiculoListado[] };
type GrupoMarcaVehiculos = { marca: string; modelos: GrupoModeloVehiculos[] };

/**
 * Listado de vehículos agrupados por marca y modelo, con un buscador
 * desplegable de marca arriba de la tabla (a pedido de Marcelo). El
 * filtrado es 100% en el navegador, no vuelve a consultar el servidor.
 */
export default function ListadoVehiculos({ arbol }: { arbol: GrupoMarcaVehiculos[] }) {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");

  const arbolFiltrado = useMemo(() => {
    if (!marcaSeleccionada) return arbol;
    return arbol.filter((g) => g.marca === marcaSeleccionada);
  }, [arbol, marcaSeleccionada]);

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-umarti-navy" htmlFor="filtro-marca-vehiculos">
          Filtrar por marca:
        </label>
        <select
          id="filtro-marca-vehiculos"
          value={marcaSeleccionada}
          onChange={(e) => setMarcaSeleccionada(e.target.value)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-umarti-navy focus:border-umarti-orange focus:outline-none"
        >
          <option value="">Todas las marcas</option>
          {arbol.map((g) => (
            <option key={g.marca} value={g.marca}>
              {g.marca}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        {arbolFiltrado.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-400">No hay vehículos para esa marca.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-4 py-3">Versión</th>
                <th className="px-4 py-3">Año</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Destacado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {arbolFiltrado.flatMap((grupoMarca) => [
                <tr key={`marca-${grupoMarca.marca}`} className="border-t border-gray-100 bg-gray-50">
                  <td
                    colSpan={5}
                    className="px-4 py-2 text-xs font-bold uppercase tracking-wide text-umarti-navy"
                  >
                    {grupoMarca.marca}
                  </td>
                </tr>,
                ...grupoMarca.modelos.flatMap((grupoModelo) => [
                  <tr
                    key={`modelo-${grupoMarca.marca}-${grupoModelo.modelo}`}
                    className="border-t border-gray-100"
                  >
                    <td
                      colSpan={5}
                      className="px-4 py-1.5 pl-6 text-xs font-semibold uppercase tracking-wide text-gray-400"
                    >
                      {grupoModelo.modelo}
                    </td>
                  </tr>,
                  ...grupoModelo.vehiculos.map((v) => {
                    const nombre = v.versiones?.nombre ?? "";
                    return (
                      <tr key={v.id} className="border-t border-gray-100">
                        <td className="px-4 py-3 pl-10 font-medium text-umarti-navy">
                          {nombre || "(sin versión asignada)"}
                        </td>
                        <td className="px-4 py-3 text-gray-500">{v.anio}</td>
                        <td className="px-4 py-3">
                          {v.publicado ? (
                            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                              Publicado
                            </span>
                          ) : (
                            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                              Borrador
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-500">{v.destacado ? "✓" : "—"}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-3">
                            <Link
                              href={`/panel/catalogo/${v.id}/editar`}
                              className="text-sm font-semibold text-umarti-orange hover:underline"
                            >
                              Editar
                            </Link>
                            <EliminarVehiculoBoton vehiculoId={v.id} nombre={nombre || "vehículo"} />
                          </div>
                        </td>
                      </tr>
                    );
                  }),
                ]),
              ])}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
