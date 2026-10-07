"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { EstadoFormularioMarca } from "./actions";
import type { MarcaRow } from "../tipos";

type Props = {
  accion: (
    estadoPrevio: EstadoFormularioMarca,
    formData: FormData
  ) => Promise<EstadoFormularioMarca>;
  marca?: MarcaRow;
  textoBoton: string;
};

export default function MarcaForm({ accion, marca, textoBoton }: Props) {
  const [estado, formAction] = useActionState(accion, null);

  return (
    <form action={formAction} className="space-y-4">
      {estado?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {estado.error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block text-sm sm:col-span-1">
          <span className="mb-1 block font-medium text-gray-700">Nombre</span>
          <input
            type="text"
            name="nombre"
            defaultValue={marca?.nombre}
            required
            placeholder="Ej: Chery"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">País</span>
          <input
            type="text"
            name="pais"
            defaultValue={marca?.pais ?? ""}
            placeholder="Ej: China"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Logo (URL, opcional)</span>
          <input
            type="text"
            name="logo_url"
            defaultValue={marca?.logo_url ?? ""}
            placeholder="https://..."
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" name="activa" defaultChecked={marca?.activa ?? true} />
        Activa (visible para elegir al cargar vehículos)
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
