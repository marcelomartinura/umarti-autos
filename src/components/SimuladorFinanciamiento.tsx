"use client";

import { useMemo, useState } from "react";

const plazos = [12, 24, 36, 48];

export default function SimuladorFinanciamiento() {
  const [monto, setMonto] = useState(15000000);
  const [plazo, setPlazo] = useState(36);
  const [tasaAnual, setTasaAnual] = useState(55);

  const cuota = useMemo(() => {
    const tasaMensual = tasaAnual / 100 / 12;
    if (tasaMensual <= 0) return monto / plazo;
    const factor = Math.pow(1 + tasaMensual, plazo);
    return (monto * tasaMensual * factor) / (factor - 1);
  }, [monto, plazo, tasaAnual]);

  const mensajeWhatsapp = encodeURIComponent(
    `Hola, quiero consultar por financiamiento: monto $${monto.toLocaleString(
      "es-AR"
    )}, ${plazo} cuotas.`
  );

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6">
      <h3 className="text-lg font-bold text-umarti-navy">
        Simulador de cuotas
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Una estimación orientativa para tener una primera idea. No es una
        oferta en firme: la cuota final depende de la entidad financiera y de
        tu evaluación crediticia.
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Monto a financiar (ARS)
          </span>
          <input
            type="number"
            min={100000}
            step={100000}
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Plazo (cuotas)
          </span>
          <select
            value={plazo}
            onChange={(e) => setPlazo(Number(e.target.value))}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          >
            {plazos.map((p) => (
              <option key={p} value={p}>
                {p} meses
              </option>
            ))}
          </select>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-600">
            Tasa anual estimada (%)
          </span>
          <input
            type="number"
            min={1}
            max={150}
            value={tasaAnual}
            onChange={(e) => setTasaAnual(Number(e.target.value) || 0)}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-umarti-cream px-5 py-4">
        <div>
          <p className="text-xs text-gray-500">Cuota mensual estimada</p>
          <p className="text-2xl font-bold text-umarti-navy">
            $
            {cuota.toLocaleString("es-AR", {
              maximumFractionDigits: 0,
            })}
          </p>
        </div>
        <a
          href={`https://wa.me/5491122334400?text=${mensajeWhatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Consultar financiación
        </a>
      </div>
    </div>
  );
}
