"use client";

import { useEffect, useMemo, useState } from "react";
import { marcas, segmentos, vehiculosUsados } from "@/lib/mock-data";
import { Combustible, Moneda, Transmision, VehiculoUsado } from "@/lib/types";
import { formatPrecio } from "@/lib/format";
import FiltrosClasificados from "./FiltrosClasificados";
import UsedVehicleCard from "./UsedVehicleCard";
import AdSlot from "./AdSlot";
import BuscadorInteligente from "./BuscadorInteligente";
import { AD_SLOTS } from "@/lib/adsense";

const combustibles: Combustible[] = ["Nafta", "Diesel", "Híbrido", "Eléctrico"];
const transmisiones: Transmision[] = ["Manual", "Automática"];
const LIMITE_INICIAL: { moneda: Moneda; min: number; max: number } = {
  moneda: "ARS",
  min: 0,
  max: 20000000,
};
const MAX_COMPARADOS = 3;
const FAVORITOS_KEY = "umarti_favoritos_clasificados";

type Orden = "relevancia" | "precio-asc" | "precio-desc" | "anio-desc" | "km-asc";

export default function ClasificadosListado() {
  const [busqueda, setBusqueda] = useState("");
  const [marcasSel, setMarcasSel] = useState<string[]>([]);
  const [segmentosSel, setSegmentosSel] = useState<string[]>([]);
  const [combustiblesSel, setCombustiblesSel] = useState<string[]>([]);
  const [transmisionesSel, setTransmisionesSel] = useState<string[]>([]);
  const [moneda, setMoneda] = useState<Moneda>(LIMITE_INICIAL.moneda);
  const [precioMin, setPrecioMin] = useState(LIMITE_INICIAL.min);
  const [precioMax, setPrecioMax] = useState(LIMITE_INICIAL.max);
  const [orden, setOrden] = useState<Orden>("relevancia");

  const [comparados, setComparados] = useState<string[]>([]);
  const [avisoComparador, setAvisoComparador] = useState("");
  const [mostrarComparacion, setMostrarComparacion] = useState(false);

  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [favoritosListos, setFavoritosListos] = useState(false);
  const [copiadoId, setCopiadoId] = useState<string | null>(null);

  // Favoritos: se guardan en el navegador de cada visitante (localStorage),
  // no hay todavía una cuenta de usuario conectada a Supabase.
  useEffect(() => {
    try {
      const guardados = window.localStorage.getItem(FAVORITOS_KEY);
      if (guardados) setFavoritos(JSON.parse(guardados));
    } catch {
      // localStorage no disponible — seguimos sin favoritos guardados.
    } finally {
      setFavoritosListos(true);
    }
  }, []);

  useEffect(() => {
    if (!favoritosListos) return;
    try {
      window.localStorage.setItem(FAVORITOS_KEY, JSON.stringify(favoritos));
    } catch {
      // si falla el guardado, no interrumpimos la experiencia.
    }
  }, [favoritos, favoritosListos]);

  function toggleFavorito(id: string) {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }

  function toggleComparar(id: string) {
    setComparados((prev) => {
      if (prev.includes(id)) return prev.filter((c) => c !== id);
      if (prev.length >= MAX_COMPARADOS) {
        setAvisoComparador(
          `Podés comparar hasta ${MAX_COMPARADOS} vehículos a la vez.`
        );
        setTimeout(() => setAvisoComparador(""), 3000);
        return prev;
      }
      return [...prev, id];
    });
  }

  async function compartir(vehiculo: VehiculoUsado) {
    const url = `${window.location.origin}/clasificados/${vehiculo.id}`;
    const texto = `${vehiculo.anio} ${vehiculo.marca} ${vehiculo.modelo} en Umarti Movilidad`;

    if (navigator.share) {
      try {
        await navigator.share({ title: texto, url });
        return;
      } catch {
        // el usuario canceló el share nativo — probamos copiar el link igual.
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopiadoId(vehiculo.id);
      setTimeout(() => setCopiadoId(null), 2000);
    } catch {
      // sin clipboard disponible no podemos hacer más que nada.
    }
  }

  const vehiculosFiltrados = useMemo(() => {
    const filtrados = vehiculosUsados.filter((v) => {
      const texto = `${v.marca} ${v.modelo}`.toLowerCase();
      const coincideBusqueda =
        busqueda.trim() === "" || texto.includes(busqueda.trim().toLowerCase());
      const coincideMarca = marcasSel.length === 0 || marcasSel.includes(v.marca);
      const coincideSegmento =
        segmentosSel.length === 0 || segmentosSel.includes(v.segmento);
      const coincideCombustible =
        combustiblesSel.length === 0 || combustiblesSel.includes(v.combustible);
      const coincideTransmision =
        transmisionesSel.length === 0 || transmisionesSel.includes(v.transmision);
      const coincidePrecio =
        v.moneda !== moneda || (v.precio >= precioMin && v.precio <= precioMax);

      return (
        coincideBusqueda &&
        coincideMarca &&
        coincideSegmento &&
        coincideCombustible &&
        coincideTransmision &&
        coincidePrecio
      );
    });

    const ordenados = [...filtrados];
    switch (orden) {
      case "precio-asc":
        // Nota: compara el número de precio tal cual, sin convertir ARS/USD
        // a un valor comparable — hasta que conectemos una cotización en
        // vivo, es una referencia aproximada, igual que el filtro de precio.
        ordenados.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        ordenados.sort((a, b) => b.precio - a.precio);
        break;
      case "anio-desc":
        ordenados.sort((a, b) => b.anio - a.anio);
        break;
      case "km-asc":
        ordenados.sort((a, b) => a.km - b.km);
        break;
      default:
        break;
    }
    return ordenados;
  }, [
    busqueda,
    marcasSel,
    segmentosSel,
    combustiblesSel,
    transmisionesSel,
    moneda,
    precioMin,
    precioMax,
    orden,
  ]);

  const hayFiltrosActivos =
    marcasSel.length +
      segmentosSel.length +
      combustiblesSel.length +
      transmisionesSel.length >
      0 || precioMin !== LIMITE_INICIAL.min || precioMax !== LIMITE_INICIAL.max;

  function limpiarFiltros() {
    setBusqueda("");
    setMarcasSel([]);
    setSegmentosSel([]);
    setCombustiblesSel([]);
    setTransmisionesSel([]);
    setMoneda(LIMITE_INICIAL.moneda);
    setPrecioMin(LIMITE_INICIAL.min);
    setPrecioMax(LIMITE_INICIAL.max);
  }

  const vehiculosComparados = vehiculosUsados.filter((v) =>
    comparados.includes(v.id)
  );

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
      <div className="flex flex-col gap-6">
        <FiltrosClasificados
          marcas={marcas}
          marcasSel={marcasSel}
          setMarcasSel={setMarcasSel}
          segmentos={segmentos}
          segmentosSel={segmentosSel}
          setSegmentosSel={setSegmentosSel}
          combustibles={combustibles}
          combustiblesSel={combustiblesSel}
          setCombustiblesSel={setCombustiblesSel}
          transmisiones={transmisiones}
          transmisionesSel={transmisionesSel}
          setTransmisionesSel={setTransmisionesSel}
          moneda={moneda}
          setMoneda={setMoneda}
          precioMin={precioMin}
          setPrecioMin={setPrecioMin}
          precioMax={precioMax}
          setPrecioMax={setPrecioMax}
          onLimpiar={limpiarFiltros}
          hayFiltrosActivos={hayFiltrosActivos}
        />
        <AdSlot slot={AD_SLOTS.clasificadosListado} formato="cuadrado" />
      </div>

      <div>
        <div className="mb-6 max-w-xl">
          <BuscadorInteligente
            valor={busqueda}
            onChange={setBusqueda}
            placeholder="Buscá por marca o modelo"
          />
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-umarti-navy">
              Resultado de búsqueda
            </h2>
            <p className="text-sm text-gray-500">
              {vehiculosFiltrados.length} vehículo
              {vehiculosFiltrados.length === 1 ? "" : "s"} encontrado
              {vehiculosFiltrados.length === 1 ? "" : "s"}
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-gray-600">
            Ordenar por
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value as Orden)}
              className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-umarti-navy"
            >
              <option value="relevancia">Relevancia</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="anio-desc">Año más nuevo</option>
              <option value="km-asc">Menos kilómetros</option>
            </select>
          </label>
        </div>

        {vehiculosFiltrados.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
            No encontramos avisos con esos filtros. Probá ajustar la
            búsqueda.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {vehiculosFiltrados.map((v) => (
              <UsedVehicleCard
                key={v.id}
                vehiculo={v}
                comparado={comparados.includes(v.id)}
                onToggleComparar={toggleComparar}
                esFavorito={favoritos.includes(v.id)}
                onToggleFavorito={toggleFavorito}
                onCompartir={compartir}
                copiado={copiadoId === v.id}
              />
            ))}
          </div>
        )}
      </div>

      {comparados.length > 0 && (
        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-gray-200 bg-white/95 px-6 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] backdrop-blur lg:pl-[304px]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-umarti-navy">
              <span className="font-semibold">{comparados.length}</span>{" "}
              vehículo{comparados.length === 1 ? "" : "s"} para comparar
              {avisoComparador && (
                <span className="ml-2 text-xs text-umarti-orange">
                  {avisoComparador}
                </span>
              )}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setComparados([])}
                className="rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
              >
                Vaciar
              </button>
              <button
                type="button"
                disabled={comparados.length < 2}
                onClick={() => setMostrarComparacion(true)}
                className="rounded-md bg-umarti-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Comparar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarComparacion && vehiculosComparados.length > 0 && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6">
          <div className="max-h-[85vh] w-full max-w-4xl overflow-y-auto rounded-t-xl bg-white p-6 sm:rounded-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-umarti-navy">
                Comparar vehículos
              </h3>
              <button
                type="button"
                onClick={() => setMostrarComparacion(false)}
                aria-label="Cerrar comparación"
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm">
                <tbody>
                  <tr>
                    <td className="w-32 py-2 text-xs uppercase text-gray-400">
                      Vehículo
                    </td>
                    {vehiculosComparados.map((v) => (
                      <td key={v.id} className="px-3 py-2 font-semibold text-umarti-navy">
                        {v.anio} {v.marca} {v.modelo}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-xs uppercase text-gray-400">Precio</td>
                    {vehiculosComparados.map((v) => (
                      <td key={v.id} className="px-3 py-2 font-bold text-umarti-orange">
                        {formatPrecio(v.precio, v.moneda)}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-xs uppercase text-gray-400">Kilómetros</td>
                    {vehiculosComparados.map((v) => (
                      <td key={v.id} className="px-3 py-2 text-gray-700">
                        {v.km.toLocaleString("es-AR")} km
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-xs uppercase text-gray-400">Segmento</td>
                    {vehiculosComparados.map((v) => (
                      <td key={v.id} className="px-3 py-2 text-gray-700">
                        {v.segmento}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-xs uppercase text-gray-400">Motorización</td>
                    {vehiculosComparados.map((v) => (
                      <td key={v.id} className="px-3 py-2 text-gray-700">
                        {v.combustible}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-xs uppercase text-gray-400">Transmisión</td>
                    {vehiculosComparados.map((v) => (
                      <td key={v.id} className="px-3 py-2 text-gray-700">
                        {v.transmision}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-xs uppercase text-gray-400">Ubicación</td>
                    {vehiculosComparados.map((v) => (
                      <td key={v.id} className="px-3 py-2 text-gray-700">
                        {v.ubicacion}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-t border-gray-100">
                    <td className="py-2 text-xs uppercase text-gray-400">Vendedor</td>
                    {vehiculosComparados.map((v) => (
                      <td key={v.id} className="px-3 py-2 text-gray-700">
                        {v.vendedor}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
