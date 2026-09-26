"use client";

import { useMemo, useState } from "react";

const transmisiones = ["Manual", "Automática"];
const combustibles = ["Nafta", "Diesel", "Híbrido", "Eléctrico"];

export default function GeneradorDescripcion() {
  const [marca, setMarca] = useState("Toyota");
  const [modelo, setModelo] = useState("Corolla");
  const [anio, setAnio] = useState(2023);
  const [km, setKm] = useState(32000);
  const [transmision, setTransmision] = useState(transmisiones[0]);
  const [combustible, setCombustible] = useState(combustibles[0]);
  const [destacados, setDestacados] = useState(
    "único dueño, service oficial al día, cubiertas nuevas"
  );
  const [copiado, setCopiado] = useState(false);

  const texto = useMemo(() => {
    const listaDestacados = destacados
      .split(",")
      .map((d) => d.trim())
      .filter(Boolean);

    const frasedestacados =
      listaDestacados.length > 0
        ? ` Destacados: ${listaDestacados.join(", ")}.`
        : "";

    return `Se vende ${marca} ${modelo} ${anio}, con ${km.toLocaleString(
      "es-AR"
    )} km. Transmisión ${transmision.toLowerCase()}, motor a ${combustible.toLowerCase()}.${frasedestacados} Consultanos por más información o para coordinar una visita.`;
  }, [marca, modelo, anio, km, transmision, combustible, destacados]);

  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // Si el navegador no permite el portapapeles, no hay nada más que
      // hacer acá — el texto ya está visible para copiar a mano.
    }
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="text-lg font-bold text-umarti-navy">
        Generador de descripciones para tus avisos
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Completá los datos del vehículo y generamos un texto listo para
        pegar en tu publicación de Catálogo o Clasificados.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">Marca</span>
          <input
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Modelo
          </span>
          <input
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">Año</span>
          <input
            type="number"
            value={anio}
            onChange={(e) => setAnio(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Kilómetros
          </span>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Transmisión
          </span>
          <select
            value={transmision}
            onChange={(e) => setTransmision(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          >
            {transmisiones.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Combustible
          </span>
          <select
            value={combustible}
            onChange={(e) => setCombustible(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          >
            {combustibles.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm sm:col-span-2 lg:col-span-3">
          <span className="mb-1 block font-medium text-gray-600">
            Destacados (separados por coma)
          </span>
          <input
            type="text"
            value={destacados}
            onChange={(e) => setDestacados(e.target.value)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 rounded-xl bg-umarti-cream p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Texto generado
        </p>
        <p className="mt-2 text-sm text-gray-700">{texto}</p>
        <button
          type="button"
          onClick={copiarTexto}
          className="mt-4 rounded-full bg-umarti-orange px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          {copiado ? "¡Copiado!" : "Copiar texto"}
        </button>
      </div>
    </div>
  );
}
