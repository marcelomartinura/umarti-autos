"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { EstadoFormularioConcesionaria } from "./actions";
import type { ConcesionariaRow } from "./tipos";

type Props = {
  accion: (
    estadoPrevio: EstadoFormularioConcesionaria,
    formData: FormData
  ) => Promise<EstadoFormularioConcesionaria>;
  concesionaria?: ConcesionariaRow;
  textoBoton: string;
};

export default function ConcesionariaForm({ accion, concesionaria, textoBoton }: Props) {
  const [estado, formAction] = useActionState(accion, null);

  return (
    <form action={formAction} className="space-y-4">
      {estado?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {estado.error}
        </div>
      )}

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Nombre de la agencia</span>
        <input
          type="text"
          name="nombre"
          defaultValue={concesionaria?.nombre}
          required
          placeholder="Ej: Toyota Buenos Aires"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Dirección</span>
          <input
            type="text"
            name="direccion"
            defaultValue={concesionaria?.direccion ?? ""}
            placeholder="Ej: Av. Libertador 1234, CABA"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">WhatsApp de contacto</span>
          <input
            type="text"
            name="whatsapp"
            defaultValue={concesionaria?.whatsapp ?? ""}
            placeholder="Ej: 5491122334400"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
          <span className="mt-1 block text-xs text-gray-400">
            Con código de país y de área, sin espacios ni signos (así funciona el botón
            de WhatsApp en la landing).
          </span>
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Descripción</span>
        <textarea
          name="descripcion"
          defaultValue={concesionaria?.descripcion ?? ""}
          rows={4}
          placeholder="Contá brevemente quiénes son, qué venden y qué los distingue."
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
        />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Logo</span>
          {concesionaria?.logo_url && (
            <img
              src={concesionaria.logo_url}
              alt=""
              className="mb-2 h-16 w-16 rounded-md border border-gray-200 object-contain p-1"
            />
          )}
          <input
            type="file"
            name="logo_archivo"
            accept="image/png,image/jpeg,image/webp"
            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-umarti-navy file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
          />
          <span className="mt-1 block text-xs text-gray-400">
            {concesionaria?.logo_url
              ? "Subí un archivo para reemplazar el logo actual."
              : "PNG, JPG o WEBP — hasta 5 MB."}
          </span>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Foto de portada</span>
          {concesionaria?.portada_url && (
            <img
              src={concesionaria.portada_url}
              alt=""
              className="mb-2 h-16 w-28 rounded-md border border-gray-200 object-cover"
            />
          )}
          <input
            type="file"
            name="portada_archivo"
            accept="image/png,image/jpeg,image/webp"
            className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-md file:border-0 file:bg-umarti-navy file:px-3 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:opacity-90"
          />
          <span className="mt-1 block text-xs text-gray-400">
            {concesionaria?.portada_url
              ? "Subí un archivo para reemplazar la portada actual."
              : "Foto horizontal del local o del equipo — hasta 5 MB."}
          </span>
        </label>
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" name="activa" defaultChecked={concesionaria?.activa ?? true} />
        Activa (visible en /concesionarias)
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
