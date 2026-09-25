"use client";

import { useMemo, useState } from "react";

const intervalos = [
  { label: "Cada 10.000 km", valor: 10000 },
  { label: "Cada 15.000 km", valor: 15000 },
  { label: "Cada 20.000 km", valor: 20000 },
];

export default function CalculadoraProximoService() {
  const [kmActuales, setKmActuales] = useState(45000);
  const [kmUltimoService, setKmUltimoService] = useState(38000);
  const [kmPromedioMensual, setKmPromedioMensual] = useState(1200);
  const [intervalo, setIntervalo] = useState(10000);

  const resultado = useMemo(() => {
    const kmProximoService = kmUltimoService + intervalo;
    const kmRestantes = kmProximoService - kmActuales;

    let mesesEstimados: number | null = null;
    if (kmPromedioMensual > 0) {
      mesesEstimados = kmRestantes / kmPromedioMensual;
    }

    return { kmProximoService, kmRestantes, mesesEstimados };
  }, [kmActuales, kmUltimoService, kmPromedioMensual, intervalo]);

  const vencido = resultado.kmRestantes <= 0;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="text-lg font-bold text-umarti-navy">
        ¿Cuándo te toca el próximo service?
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Una estimación simple según tu kilometraje. No reemplaza el plan de
        mantenimiento específico de tu fabricante.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Km actuales
          </span>
          <input
            type="number"
            min={0}
            step={1000}
            value={kmActuales}
            onChange={(e) => setKmActuales(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Km del último service
          </span>
          <input
            type="number"
            min={0}
            step={1000}
            value={kmUltimoService}
            onChange={(e) => setKmUltimoService(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Intervalo recomendado
          </span>
          <select
            value={intervalo}
            onChange={(e) => setIntervalo(Number(e.target.value))}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          >
            {intervalos.map((i) => (
              <option key={i.valor} value={i.valor}>
                {i.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Km que recorrés por mes
          </span>
          <input
            type="number"
            min={0}
            step={100}
            value={kmPromedioMensual}
            onChange={(e) =>
              setKmPromedioMensual(Number(e.target.value) || 0)
            }
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-umarti-cream px-5 py-4">
        <div>
          <p className="text-xs text-gray-500">
            Próximo service estimado a los{" "}
            {resultado.kmProximoService.toLocaleString("es-AR")} km
          </p>
          <p className="text-2xl font-bold text-umarti-navy">
            {vencido
              ? "Ya deberías haber hecho el service"
              : `Te faltan ${resultado.kmRestantes.toLocaleString(
                  "es-AR"
                )} km`}
          </p>
          {!vencido && resultado.mesesEstimados !== null && (
            <p className="mt-0.5 text-xs text-gray-500">
              Aproximadamente en{" "}
              {Math.max(0, Math.round(resultado.mesesEstimados))} mes
              {Math.round(resultado.mesesEstimados) === 1 ? "" : "es"}, según
              tu promedio de uso.
            </p>
          )}
        </div>
        <a
          href="#buscar-service"
          className="rounded-full bg-umarti-orange px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Buscar turno cerca tuyo
        </a>
      </div>
    </div>
  );
}
