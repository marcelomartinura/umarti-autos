"use client";

import { useTransition } from "react";
import { eliminarVersion } from "./actions";

export default function EliminarVersionBoton({
  versionId,
  nombre,
}: {
  versionId: string;
  nombre: string;
}) {
  const [pendiente, iniciarTransicion] = useTransition();

  return (
    <button
      type="button"
      disabled={pendiente}
      onClick={() => {
        if (!confirm(`¿Borrar la versión "${nombre}"? Esta acción no se puede deshacer.`)) {
          return;
        }
        iniciarTransicion(async () => {
          try {
            await eliminarVersion(versionId);
          } catch (e) {
            alert(e instanceof Error ? e.message : "No se pudo borrar la versión.");
          }
        });
      }}
      className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {pendiente ? "Borrando..." : "Borrar"}
    </button>
  );
}
