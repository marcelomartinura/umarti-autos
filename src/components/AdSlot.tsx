"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

const ALTURAS: Record<string, string> = {
  horizontal: "h-24 md:h-28",
  cuadrado: "h-64",
  vertical: "h-96",
};

// Espacio de publicidad reutilizable. Mientras no exista la variable de
// entorno NEXT_PUBLIC_ADSENSE_CLIENT_ID (todavía no tenemos la cuenta de
// AdSense aprobada) se muestra un espacio reservado discreto en vez de un
// anuncio real, para no dejar huecos rotos en el diseño. Apenas esa variable
// se configure en Vercel, este mismo componente empieza a servir anuncios
// reales sin tocar código.
export default function AdSlot({
  slot,
  formato = "horizontal",
  className = "",
}: {
  slot: string;
  formato?: "horizontal" | "cuadrado" | "vertical";
  className?: string;
}) {
  const clienteId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!clienteId) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // El script de AdSense puede no estar listo todavía en el primer
      // render; no hay nada más para hacer acá.
    }
  }, [clienteId]);

  return (
    <div className={`w-full ${className}`}>
      <p className="mb-1 text-center text-[10px] uppercase tracking-widest text-gray-400">
        Publicidad
      </p>
      <div
        className={`flex ${ALTURAS[formato]} w-full items-center justify-center overflow-hidden rounded-lg border border-dashed border-umarti-navy/15 bg-white`}
      >
        {clienteId ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", width: "100%", height: "100%" }}
            data-ad-client={clienteId}
            data-ad-slot={slot}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        ) : (
          <span className="text-xs text-gray-300">Espacio publicitario</span>
        )}
      </div>
    </div>
  );
}
