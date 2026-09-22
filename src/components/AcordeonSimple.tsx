"use client";

import { useState } from "react";
import { PreguntaFrecuente } from "@/lib/types";

export default function AcordeonSimple({
  items,
}: {
  items: PreguntaFrecuente[];
}) {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl overflow-hidden rounded-xl bg-white">
      {items.map((item, index) => (
        <div
          key={item.pregunta}
          className={index === 0 ? "" : "border-t border-gray-100"}
        >
          <button
            type="button"
            onClick={() => setAbierta(abierta === index ? null : index)}
            className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
          >
            <span className="font-medium text-umarti-navy">
              {item.pregunta}
            </span>
            <span
              className={`shrink-0 text-gray-400 transition-transform ${
                abierta === index ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>
          {abierta === index && (
            <p className="px-6 pb-4 text-sm text-gray-500">
              {item.respuesta}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
