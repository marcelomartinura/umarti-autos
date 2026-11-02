"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import EliminarVersionBoton from "./EliminarVersionBoton";
import type { VersionListado } from "../tipos";

type GrupoModelo = { modelo: string; versiones: VersionListado[] };
type GrupoMarca = { marca: string; modelos: GrupoModelo[] };

/**
 * Listado de versiones agrupadas por marca y modelo, con dos buscadores
 * desplegables arriba de la tabla (marca y modelo, en cascada) a pedido de
 * Marcelo. Elegir una marca recalcula las opciones del desplegable de
 * modelo para mostrar solo los modelos de esa marca; el filtrado es 100%
 * en el navegador, no vuelve a consultar el servidor.
 */
export default function ListadoVersiones({ arbol }: { arbol: GrupoMarca[] }) {
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");
  const [modeloSeleccionado, setModeloSeleccionado] = useState("");

  const opcionesModelo = useMemo(() => {
    const marcasAConsiderar = marcaSeleccionada
      ? arbol.filter((g) => g.marca === marcaSeleccionada)
      : arbol;
    const nombres = new Set<string>();
    for (const g of marcasAConsiderar) {
      for (const m of g.modelos) nombres.add(m.modelo);
    }
    return Array.from(nombres).sort((a, b) =>
      a.localeCompare(b, "es", { sensitivity: "base" })
    );
  }, [arbol, marcaSeleccionada]);

  const arbolFiltrado = useMemo(() => {
    return arbol
      .filter((g) => !marcaSeleccionada || g.marca === marcaSeleccionada)
      .map((g) => ({
        ...g,
        modelos: g.modelos.filter(
          (m) => !modeloSeleccionado || m.modelo === modeloSeleccionado
        ),
      }))
      .filter((g) => g.modelos.length > 0);
  }, [arbol, marcaSeleccionada, modeloSeleccionado]);

  return (
    <div className="mb-6">
      <div className="mb-3 flex flex-wrap items-center gap-3">
        <label className="text-sm font-semibold text-umarti-navy" htmlFor="filtro-marca-versiones">
          Marca:
        </label>
        <select
          id="filtro-marca-versiones"
          value={marcaSeleccionada}
          onChange={(e) => {
            setMarcaSeleccionada(e.target.value);
            setModeloSeleccionado("");
          }}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-umarti-navy focus:border-umarti-orange focus:outline-none"
        >
          <option value="">Todas las marcas</option>
          {arbol.map((g) => (
            <option key={g.marca} value={g.marca}>
              {g.marca}
            </option>
          ))}
        </select>

        <label className="text-sm font-semibold text-umarti-navy" htmlFor="filtro-modelo-versiones">
          Modelo:
        </label>
        <select
          id="filtro-modelo-versiones"
          value={modeloSeleccionado}
          onChange={(e) => setModeloSeleccionado(e.target.value)}
          className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-umarti-navy focus:border-umarti-orange focus:outline-none"
        >
          <option value="">Todos los modelos</option>
          {opcionesModelo.map((modelo) => (
            <option key={modelo} value={modelo}>
              {modelo}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
        {arbolFiltrado.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-400">No hay versiones para ese filtro.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-400">
              <tr>
                <th className="px-4 py-3">Versión</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {arbolFiltrado.flatMap((grupoMarca) => [
                <tr key={`marca-${grupoMarca.marca}`} className="border-t border-gray-100 bg-gray-50">
                  <td
                    colSpan={3}
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
                      colSpan={3}
                      className="px-4 py-1.5 pl-6 text-xs font-semibold uppercase tracking-wide text-gray-400"
                    >
                      {grupoModelo.modelo}
                    </td>
                  </tr>,
                  ...grupoModelo.versiones.map((v) => (
                    <tr key={v.id} className="border-t border-gray-100">
                      <td className="px-4 py-3 pl-10 font-medium text-umarti-navy">{v.nombre}</td>
                      <td className="px-4 py-3">
                        {v.activa ? (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                            Activa
                          </span>
                        ) : (
                          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                            Inactiva
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-3">
                          <Link
                            href={`/panel/catalogo/versiones/${v.id}/editar`}
                            className="text-sm font-semibold text-umarti-orange hover:underline"
                          >
                            Editar
                          </Link>
                          <EliminarVersionBoton versionId={v.id} nombre={v.nombre} />
                        </div>
                      </td>
                    </tr>
                  )),
                ]),
              ])}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
