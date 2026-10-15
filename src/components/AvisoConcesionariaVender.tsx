"use client";

import { useState } from "react";
import Link from "next/link";

export default function AvisoConcesionariaVender() {
  const [marcado, setMarcado] = useState(false);

  return (
    <div className="mx-auto mt-6 max-w-xl rounded-xl bg-white/10 px-5 py-4 text-left">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <label className="flex items-center gap-2 text-sm text-blue-100">
          <input
            type="checkbox"
            checked={marcado}
            onChange={(evento) => setMarcado(evento.target.checked)}
            className="h-4 w-4 rounded border-blue-200 text-umarti-orange focus:ring-umarti-orange"
          />
          Soy concesionaria / agencia
        </label>
        <Link
          href="/mi-cuenta/concesionaria"
          className="text-sm font-semibold text-white hover:underline"
        >
          Más información →
        </Link>
      </div>
      {marcado && (
        <p className="mt-3 text-xs text-blue-100">
          Si tenés varios vehículos para publicar, sumá tu concesionaria o
          agencia al Ecosistema de Negocios de Umarti: vas a poder cargar tu
          inventario completo y tener tu propia miniweb.
        </p>
      )}
    </div>
  );
}
