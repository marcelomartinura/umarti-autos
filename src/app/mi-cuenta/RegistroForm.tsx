"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { crearLeadRegistro, type EstadoRegistro } from "./actions";

function BotonEnviar({ texto }: { texto: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-full bg-umarti-orange px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Enviando..." : texto}
    </button>
  );
}

export default function RegistroForm({
  tipo,
  textoBoton,
  whatsappUmarti,
}: {
  tipo: "particular" | "concesionaria";
  textoBoton: string;
  whatsappUmarti: string;
}) {
  const accionConTipo = crearLeadRegistro.bind(null, tipo);
  const estadoInicial: EstadoRegistro = { ok: false };
  const [estado, accion] = useActionState(accionConTipo, estadoInicial);

  if (estado.ok) {
    const mensajeWhatsapp = encodeURIComponent(
      tipo === "concesionaria"
        ? "Hola, acabo de registrar mi concesionaria/agencia en Umarti Movilidad y quiero avanzar."
        : "Hola, acabo de registrarme en Umarti Movilidad."
    );

    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="font-semibold text-green-800">¡Listo, recibimos tus datos!</p>
        <p className="mt-1 text-sm text-green-700">
          Te vamos a contactar a la brevedad. Si querés, también podés
          escribirnos ahora mismo.
        </p>
        <a
          href={`https://wa.me/${whatsappUmarti}?text=${mensajeWhatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
        >
          Hablar ahora por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={accion} className="space-y-4">
      {tipo === "concesionaria" && (
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Nombre de tu concesionaria o agencia
          </label>
          <input
            type="text"
            name="nombre_negocio"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-umarti-orange focus:outline-none"
            placeholder="Ej: Autos del Sur"
          />
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Tu nombre
        </label>
        <input
          type="text"
          name="nombre"
          required
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-umarti-orange focus:outline-none"
          placeholder="Nombre y apellido"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            WhatsApp
          </label>
          <input
            type="tel"
            name="whatsapp"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-umarti-orange focus:outline-none"
            placeholder="Ej: 1122334455"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-umarti-orange focus:outline-none"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Mensaje (opcional)
        </label>
        <textarea
          name="mensaje"
          rows={3}
          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-umarti-orange focus:outline-none"
          placeholder={
            tipo === "concesionaria"
              ? "Contanos un poco sobre tu negocio: cuántos autos manejás, dónde estás ubicado, etc."
              : "¿Algo que quieras contarnos?"
          }
        />
      </div>

      {estado.error && (
        <p className="text-sm font-medium text-red-600">{estado.error}</p>
      )}

      <BotonEnviar texto={textoBoton} />
    </form>
  );
}
