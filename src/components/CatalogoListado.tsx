"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  marcas,
  preciosFiltroARS,
  preciosFiltroUSD,
  segmentos,
  vehiculosNuevos,
} from "@/lib/mock-data";
import { Combustible, Moneda, Transmision } from "@/lib/types";
import VehicleCard from "./VehicleCard";
import FiltroDropdown from "./FiltroDropdown";
import BuscadorInteligente from "./BuscadorInteligente";

const combustibles: Combustible[] = ["Nafta", "Diesel", "Híbrido", "Eléctrico"];
const transmisiones: Transmision[] = ["Manual", "Automática"];

function parsePrecioLabel(label: string): { moneda: Moneda; valor: number } {
  const valor = Number(label.replace(/[^\d]/g, ""));
  return label.includes("USD") ? { moneda: "USD", valor } : { moneda: "ARS", valor };
}

export default function CatalogoListado() {
  const searchParams = useSearchParams();

  const [busqueda, setBusqueda] = useState("");
  const [marcasSel, setMarcasSel] = useState<string[]>([]);
  const [segmentosSel, setSegmentosSel] = useState<string[]>([]);
  const [combustiblesSel, setCombustiblesSel] = useState<string[]>([]);
  const [transmisionesSel, setTransmisionesSel] = useState<string[]>([]);
  const [precioSel, setPrecioSel] = useState<string[]>([]);
  const [soloPlanAhorro, setSoloPlanAhorro] = useState(false);

  // Deep-links desde la Home (buscador por marca/segmento y las categorías
  // especiales de plan de ahorro / autos eléctricos) precargan el filtro
  // correspondiente al entrar a /catalogo.
  useEffect(() => {
    const marca = searchParams.get("marca");
    const segmento = searchParams.get("segmento");
    const combustible = searchParams.get("combustible");
    const planAhorro = searchParams.get("planAhorro");

    if (marca) setMarcasSel([marca]);
    if (segmento) setSegmentosSel([segmento]);
    if (combustible) setCombustiblesSel([combustible]);
    if (planAhorro === "1") setSoloPlanAhorro(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const vehiculosFiltrados = useMemo(() => {
    return vehiculosNuevos.filter((v) => {
      const texto = `${v.marca} ${v.modelo} ${v.version}`.toLowerCase();
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
        precioSel.length === 0 ||
        precioSel.some((label) => {
          const { moneda, valor } = parsePrecioLabel(label);
          return v.moneda === moneda && v.precioSugerido <= valor;
        });
      const coincidePlanAhorro = !soloPlanAhorro || v.planAhorro === true;

      return (
        coincideBusqueda &&
        coincideMarca &&
        coincideSegmento &&
        coincideCombustible &&
        coincideTransmision &&
        coincidePrecio &&
        coincidePlanAhorro
      );
    });
  }, [
    busqueda,
    marcasSel,
    segmentosSel,
    combustiblesSel,
    transmisionesSel,
    precioSel,
    soloPlanAhorro,
  ]);

  const hayFiltrosActivos =
    marcasSel.length +
      segmentosSel.length +
      combustiblesSel.length +
      transmisionesSel.length +
      precioSel.length >
      0 || soloPlanAhorro;

  function limpiarFiltros() {
    setMarcasSel([]);
    setSegmentosSel([]);
    setCombustiblesSel([]);
    setTransmisionesSel([]);
    setPrecioSel([]);
    setBusqueda("");
    setSoloPlanAhorro(false);
  }

  return (
    <div>
      <div className="mb-6 max-w-xl">
        <BuscadorInteligente valor={busqueda} onChange={setBusqueda} />
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <FiltroDropdown
          label="Marca"
          opciones={marcas}
          seleccionadas={marcasSel}
          onChange={setMarcasSel}
        />
        <FiltroDropdown
          label="Segmento"
          opciones={segmentos}
          seleccionadas={segmentosSel}
          onChange={setSegmentosSel}
        />
        <FiltroDropdown
          label="Motorización"
          opciones={combustibles}
          seleccionadas={combustiblesSel}
          onChange={setCombustiblesSel}
        />
        <FiltroDropdown
          label="Transmisión"
          opciones={transmisiones}
          seleccionadas={transmisionesSel}
          onChange={setTransmisionesSel}
        />
        <FiltroDropdown
          label="Precio"
          opciones={[...preciosFiltroUSD, ...preciosFiltroARS]}
          seleccionadas={precioSel}
          onChange={setPrecioSel}
        />
        <button
          type="button"
          onClick={() => setSoloPlanAhorro((v) => !v)}
          className={`rounded-full border px-4 py-2 text-sm font-medium ${
            soloPlanAhorro
              ? "border-umarti-orange bg-umarti-orange/10 text-umarti-orange"
              : "border-gray-200 text-gray-600"
          }`}
        >
          Plan de ahorro
        </button>
        {hayFiltrosActivos && (
          <button
            type="button"
            onClick={limpiarFiltros}
            className="text-sm font-semibold text-umarti-orange"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <p className="mb-4 text-sm text-gray-500">
        Mostrando {vehiculosFiltrados.length} vehículo
        {vehiculosFiltrados.length === 1 ? "" : "s"}
      </p>

      {vehiculosFiltrados.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-12 text-center text-sm text-gray-400">
          No encontramos vehículos con esos filtros. Probá ajustar la
          búsqueda.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {vehiculosFiltrados.map((v) => (
            <VehicleCard key={v.id} vehiculo={v} />
          ))}
        </div>
      )}
    </div>
  );
}
