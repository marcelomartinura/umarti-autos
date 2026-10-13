"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { EstadoFormularioVendedor } from "./actions";
import type { ConcesionariaArbol, MarcaOpcion, VendedorRow } from "./tipos";
import ConcesionariaSucursalSelect from "./ConcesionariaSucursalSelect";

type Props = {
  accion: (
    estadoPrevio: EstadoFormularioVendedor,
    formData: FormData
  ) => Promise<EstadoFormularioVendedor>;
  vendedor?: VendedorRow;
  concesionarias: ConcesionariaArbol[];
  marcas: MarcaOpcion[];
  textoBoton: string;
};

export default function VendedorForm({
  accion,
  vendedor,
  concesionarias,
  marcas,
  textoBoton,
}: Props) {
  const [estado, formAction] = useActionState(accion, null);

  return (
    <form action={formAction} className="space-y-4">
      {estado?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {estado.error}
        </div>
      )}

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Nombre completo</span>
        <input
          type="text"
          name="nombre_completo"
          defaultValue={vendedor?.nombre_completo}
          required
          placeholder="Ej: Juan Pérez"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
        />
      </label>

      <ConcesionariaSucursalSelect
        concesionarias={concesionarias}
        concesionariaInicial={vendedor?.concesionaria_id ?? ""}
        sucursalInicial={vendedor?.sucursal_id ?? ""}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">Marca (opcional)</span>
          <select
            name="marca_id"
            defaultValue={vendedor?.marca_id ?? ""}
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          >
            <option value="">— Sin marca —</option>
            {marcas.map((m) => (
              <option key={m.id} value={m.id}>
                {m.nombre}
              </option>
            ))}
          </select>
          <span className="mt-1 block text-xs text-gray-400">
            Si el vendedor es independiente y no quiere mostrar afiliación a una marca
            puntual, dejá esto en blanco.
          </span>
        </label>

        <label className="block text-sm">
          <span className="mb-1 block font-medium text-gray-700">WhatsApp</span>
          <input
            type="text"
            name="whatsapp"
            defaultValue={vendedor?.whatsapp ?? ""}
            placeholder="Ej: 5491122334400"
            className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
          />
        </label>
      </div>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Correo electrónico</span>
        <input
          type="email"
          name="email"
          defaultValue={vendedor?.email ?? ""}
          placeholder="Ej: juan@ejemplo.com"
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input type="checkbox" name="activo" defaultChecked={vendedor?.activo ?? true} />
        Activo (visible en /vendedores)
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
