"use client";

import { useTransition } from "react";
import { eliminarModelo } from "./actions";

export default function EliminarModeloBoton({
  modeloId,
  nombre,
}: {
  modeloId: string;
  nombre: string;
}) {
  const [pendiente, iniciarTransicion] = useTransition();

  return (
    <button
      type="button"
      disabled={pendiente}
      onClick={() => {
        if (
          !confirm(
            `¿Borrar el modelo "${nombre}"? También se van a borrar sus versiones (salvo que tengan vehículos cargados, en cuyo caso no se va a poder borrar).`
          )
        ) {
          return;
        }
        iniciarTransicion(async () => {
          try {
            await eliminarModelo(modeloId);
          } catch (e) {
            alert(e instanceof Error ? e.message : "No se pudo borrar el modelo.");
          }
        });
      }}
      className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {pendiente ? "Borrando..." : "Borrar"}
    </button>
  );
}
