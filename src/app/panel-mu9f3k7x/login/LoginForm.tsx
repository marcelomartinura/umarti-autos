"use client";

import { useFormState, useFormStatus } from "react-dom";
import { iniciarSesionAdmin, type EstadoLoginAdmin } from "./actions";

const estadoInicial: EstadoLoginAdmin = {};

function BotonIngresar() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full rounded-md bg-umarti-navy py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Ingresando..." : "Ingresar"}
    </button>
  );
}

export default function LoginForm() {
  const [estado, formAction] = useFormState(iniciarSesionAdmin, estadoInicial);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-umarti-navy focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-umarti-navy focus:outline-none"
        />
      </div>
      {estado?.error && (
        <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {estado.error}
        </p>
      )}
      <BotonIngresar />
    </form>
  );
}
