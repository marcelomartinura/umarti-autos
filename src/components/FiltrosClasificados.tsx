"use client";

import { Combustible, Moneda, Segmento, Transmision } from "@/lib/types";

const LIMITES: Record<Moneda, { min: number; max: number }> = {
  ARS: { min: 0, max: 20000000 },
  USD: { min: 0, max: 30000 },
};

function CheckboxGrupo({
  titulo,
  opciones,
  seleccionadas,
  onChange,
}: {
  titulo: string;
  opciones: string[];
  seleccionadas: string[];
  onChange: (valores: string[]) => void;
}) {
  function toggle(opcion: string) {
    if (seleccionadas.includes(opcion)) {
      onChange(seleccionadas.filter((o) => o !== opcion));
    } else {
      onChange([...seleccionadas, opcion]);
    }
  }

  return (
    <div className="border-b border-gray-100 py-4 first:pt-0 last:border-none">
      <h3 className="mb-3 text-sm font-semibold text-umarti-navy">{titulo}</h3>
      <div className="space-y-2">
        {opciones.map((opcion) => (
          <label
            key={opcion}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <input
              type="checkbox"
              checked={seleccionadas.includes(opcion)}
              onChange={() => toggle(opcion)}
              className="accent-umarti-orange"
            />
            {opcion}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FiltrosClasificados({
  marcas,
  marcasSel,
  setMarcasSel,
  segmentos,
  segmentosSel,
  setSegmentosSel,
  combustibles,
  combustiblesSel,
  setCombustiblesSel,
  transmisiones,
  transmisionesSel,
  setTransmisionesSel,
  moneda,
  setMoneda,
  precioMin,
  setPrecioMin,
  precioMax,
  setPrecioMax,
  onLimpiar,
  hayFiltrosActivos,
}: {
  marcas: string[];
  marcasSel: string[];
  setMarcasSel: (v: string[]) => void;
  segmentos: Segmento[];
  segmentosSel: string[];
  setSegmentosSel: (v: string[]) => void;
  combustibles: Combustible[];
  combustiblesSel: string[];
  setCombustiblesSel: (v: string[]) => void;
  transmisiones: Transmision[];
  transmisionesSel: string[];
  setTransmisionesSel: (v: string[]) => void;
  moneda: Moneda;
  setMoneda: (m: Moneda) => void;
  precioMin: number;
  setPrecioMin: (v: number) => void;
  precioMax: number;
  setPrecioMax: (v: number) => void;
  onLimpiar: () => void;
  hayFiltrosActivos: boolean;
}) {
  const limite = LIMITES[moneda];

  function cambiarMoneda(nuevaMoneda: Moneda) {
    setMoneda(nuevaMoneda);
    setPrecioMin(LIMITES[nuevaMoneda].min);
    setPrecioMax(LIMITES[nuevaMoneda].max);
  }

  return (
    <aside className="h-fit rounded-xl border border-gray-100 bg-white p-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-bold text-umarti-navy">Filtros</h2>
        {hayFiltrosActivos && (
          <button
            type="button"
            onClick={onLimpiar}
            className="rounded-md bg-umarti-orange px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <CheckboxGrupo
        titulo="Marca"
        opciones={marcas}
        seleccionadas={marcasSel}
        onChange={setMarcasSel}
      />
      <CheckboxGrupo
        titulo="Segmento"
        opciones={segmentos}
        seleccionadas={segmentosSel}
        onChange={setSegmentosSel}
      />
      <CheckboxGrupo
        titulo="Motorización"
        opciones={combustibles}
        seleccionadas={combustiblesSel}
        onChange={setCombustiblesSel}
      />
      <CheckboxGrupo
        titulo="Transmisión"
        opciones={transmisiones}
        seleccionadas={transmisionesSel}
        onChange={setTransmisionesSel}
      />

      <div className="py-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-umarti-navy">
            Rango de precio
          </h3>
          <div className="flex overflow-hidden rounded-md border border-umarti-navy/20 text-xs font-semibold">
            {(["ARS", "USD"] as Moneda[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => cambiarMoneda(m)}
                className={`px-2 py-1 ${
                  moneda === m
                    ? "bg-umarti-navy text-white"
                    : "bg-white text-umarti-navy"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="relative h-8">
          <input
            type="range"
            min={limite.min}
            max={limite.max}
            value={precioMin}
            onChange={(e) =>
              setPrecioMin(Math.min(Number(e.target.value), precioMax))
            }
            className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent accent-umarti-orange [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          />
          <input
            type="range"
            min={limite.min}
            max={limite.max}
            value={precioMax}
            onChange={(e) =>
              setPrecioMax(Math.max(Number(e.target.value), precioMin))
            }
            className="pointer-events-none absolute h-2 w-full appearance-none bg-transparent accent-umarti-orange [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
          />
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex-1">
            <label className="text-[11px] uppercase text-gray-400">
              Mínimo
            </label>
            <input
              type="number"
              value={precioMin}
              min={limite.min}
              max={precioMax}
              onChange={(e) =>
                setPrecioMin(Math.min(Number(e.target.value), precioMax))
              }
              className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm text-gray-700"
            />
          </div>
          <span className="pt-4 text-gray-300">—</span>
          <div className="flex-1">
            <label className="text-[11px] uppercase text-gray-400">
              Máximo
            </label>
            <input
              type="number"
              value={precioMax}
              min={precioMin}
              max={limite.max}
              onChange={(e) =>
                setPrecioMax(Math.max(Number(e.target.value), precioMin))
              }
              className="w-full rounded-md border border-gray-200 px-2 py-1.5 text-sm text-gray-700"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
