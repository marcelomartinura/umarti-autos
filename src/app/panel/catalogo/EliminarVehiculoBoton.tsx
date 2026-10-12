"use client";

import { useTransition } from "react";
import { eliminarVehiculo } from "./actions";

export default function EliminarVehiculoBoton({
  vehiculoId,
  nombre,
}: {
  vehiculoId: string;
  nombre: string;
}) {
  const [pendiente, iniciarTransicion] = useTransition();

  return (
    <button
      type="button"
      disabled={pendiente}
      onClick={() => {
        if (!confirm(`¿Borrar "${nombre}" del catálogo? Esta acción no se puede deshacer.`)) {
          return;
        }
        iniciarTransicion(async () => {
          await eliminarVehiculo(vehiculoId);
        });
      }}
      className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {pendiente ? "Borrando..." : "Borrar"}
    </button>
  );
}
