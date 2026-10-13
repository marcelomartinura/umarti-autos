"use client";

import { useTransition } from "react";
import { eliminarVendedor } from "./actions";

export default function EliminarVendedorBoton({
  vendedorId,
  nombre,
}: {
  vendedorId: string;
  nombre: string;
}) {
  const [pendiente, iniciarTransicion] = useTransition();

  return (
    <button
      type="button"
      disabled={pendiente}
      onClick={() => {
        if (!confirm(`¿Borrar al vendedor "${nombre}"? Esta acción no se puede deshacer.`)) {
          return;
        }
        iniciarTransicion(async () => {
          try {
            await eliminarVendedor(vendedorId);
          } catch (e) {
            alert(e instanceof Error ? e.message : "No se pudo borrar el vendedor.");
          }
        });
      }}
      className="text-sm font-semibold text-red-600 hover:underline disabled:opacity-50"
    >
      {pendiente ? "Borrando..." : "Borrar"}
    </button>
  );
}
