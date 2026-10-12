"use client";

import { useTransition } from "react";
import { eliminarConcesionaria } from "./actions";

export default function EliminarConcesionariaBoton({
  concesionariaId,
  nombre,
}: {
  concesionariaId: string;
  nombre: string;
}) {
  const [pendiente, iniciarTransicion] = useTransition();

  return (
    <button
      type="button"
      disabled={pendiente}
      onClick={() => {
        if (!confirm(`¿Borrar la concesionaria "${nombre}"? Esta acción no se puede deshacer.`)) {
          return;
        }
        iniciarTransicion(async () => {
          try {
            await eliminarConcesionaria(concesionariaId);
          } catch (e) {
            alert(e instanceof Error ? e.message : "No se pudo borrar la concesionaria.");
          }
        });
      }}
      className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {pendiente ? "Borrando..." : "Borrar"}
    </button>
  );
}
