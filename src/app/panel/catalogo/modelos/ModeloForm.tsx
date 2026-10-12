"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { EstadoFormularioModelo } from "./actions";
import type { ModeloRow } from "../tipos";

type Props = {
  accion: (
    estadoPrevio: EstadoFormularioModelo,
    formData: FormData
  ) => Promise<EstadoFormularioModelo>;
  marcas: { id: string; nombre: string }[];
  modelo?: ModeloRow;
  textoBoton: string;
};

export default function ModeloForm({ accion, marcas, modelo, textoBoton }: Props) {
  const [estado, formAction] = useActionState(accion, null);

  return (
    <form action={formAction} className="space-y-4">
      {estado?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {estado.error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Marca</span>
          <select
            name="marca_id"
            defaultValue={modelo?.marca_id ?? ""}
            required
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          >
            <option value="">Elegí una marca</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Nombre del modelo</span>
          <input
            type="text"
            name="nombre"
            defaultValue={modelo?.nombre}
            required
            placeholder="Ej: Tiggo 4"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" name="activo" defaultChecked={modelo?.activo ?? true} />
        Activo (visible para elegir al cargar vehículos)
      </label>
      <BotonGuardar texto={textoBoton} />
    </form>
  );
}

function BotonGuardar({ texto }: { texto: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-umarti-orange px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Guardando..." : texto}
    </button>
  );
}
