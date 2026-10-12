"use client";

import { useTransition } from "react";
import { eliminarMarca } from "./actions";

export default function EliminarMarcaBoton({
  marcaId,
  nombre,
}: {
  marcaId: string;
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
            `¿Borrar la marca "${nombre}"? También se van a borrar sus modelos y versiones (salvo que tengan vehículos cargados, en cuyo caso no se va a poder borrar).`
          )
        ) {
          return;
        }
        iniciarTransicion(async () => {
          try {
            await eliminarMarca(marcaId);
          } catch (e) {
            alert(e instanceof Error ? e.message : "No se pudo borrar la marca.");
          }
        });
      }}
      className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {pendiente ? "Borrando..." : "Borrar"}
    </button>
  );
}
