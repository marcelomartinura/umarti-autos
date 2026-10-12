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
          <span className="mb-1 block font-medium text-gray-700">Logo</span>
          {marca?.logo_url && (
            <img
              src={marca.logo_url}
              alt=""
              className="mb-2 h-12 w-12 rounded-md border border-gray-200 object-contain p-1"
            />
          )}
          <input
            type="file"
            name="logo_archivo"
            accept="image/png,image/jpeg,image/webp,image/svg+xml"
            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-umarti-navy file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
          />
          <span className="mt-1 block text-xs text-gray-400">
            {marca?.logo_url
              ? "Subí un archivo para reemplazar el logo actual."
              : "PNG, JPG, WEBP o SVG — hasta 5 MB."}
          </span>
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" name="activa" defaultChecked={marca?.activa ?? true} />
        Activa (visible para elegir al cargar vehículos y en la Home)
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
