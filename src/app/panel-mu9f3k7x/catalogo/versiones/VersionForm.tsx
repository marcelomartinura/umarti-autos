"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import type { EstadoFormularioVersion } from "./actions";
import type { VersionRow } from "../tipos";

type MarcaConModelos = {
  id: string;
  nombre: string;
  modelos: { id: string; nombre: string }[];
};

type Props = {
  accion: (
    estadoPrevio: EstadoFormularioVersion,
    formData: FormData
  ) => Promise<EstadoFormularioVersion>;
  marcas: MarcaConModelos[];
  version?: VersionRow;
  marcaIdInicial?: string;
  textoBoton: string;
};

export default function VersionForm({
  accion,
  marcas,
  version,
  marcaIdInicial,
  textoBoton,
}: Props) {
  const [estado, formAction] = useActionState(accion, null);
  const [marcaId, setMarcaId] = useState(marcaIdInicial ?? "");

  const modelos = marcas.find((m) => m.id === marcaId)?.modelos ?? [];

  return (
    <form action={formAction} className="space-y-4">
      {estado?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {estado.error}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Marca</span>
          <select
            value={marcaId}
            onChange={(e) => setMarcaId(e.target.value)}
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
          <span className="mb-1 block font-medium text-gray-700">Modelo</span>
          <select
            name="modelo_id"
            defaultValue={version?.modelo_id ?? ""}
            disabled={!marcaId}
            required
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">
              {marcaId ? "Elegí un modelo" : "Elegí una marca primero"}
            </option>
            {modelos.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Nombre de la versión</span>
          <input
            type="text"
            name="nombre"
            defaultValue={version?.nombre}
            required
            placeholder="Ej: HEV Premium"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
      </div>
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" name="activa" defaultChecked={version?.activa ?? true} />
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
