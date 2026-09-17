"use client";

import { useState } from "react";
import { preguntasFrecuentes } from "@/lib/mock-data";

export default function PreguntasFrecuentes() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="bg-umarti-cream py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-umarti-navy">
            Preguntas frecuentes
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Resolvemos tus dudas para que compres o vendas con confianza.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          {preguntasFrecuentes.map((item, index) => {
            const isOpen = abierta === index;
            return (
              <div
                key={item.pregunta}
                className={index !== 0 ? "border-t border-gray-200" : ""}
              >
                <button
                  type="button"
                  onClick={() => setAbierta(isOpen ? null : index)}
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-umarti-navy">
                    {item.pregunta}
                  </span>
                  <span
                    className={`ml-4 text-umarti-navy transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-4 text-sm text-gray-500">
                    {item.respuesta}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
