"use client";

import { useState, type FormEvent } from "react";

export default function SetupForm() {
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<
    { tipo: "ok" | "error"; mensaje: string } | null
  >(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEnviando(true);
    setResultado(null);

    const formData = new FormData(e.currentTarget);
    const secreto = String(formData.get("secreto") || "");

    try {
      const res = await fetch("/api/bootstrap-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-setup-secret": secreto,
        },
        body: JSON.stringify({
          email: formData.get("email"),
          password: formData.get("password"),
          nombre: formData.get("nombre"),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setResultado({
          tipo: "error",
          mensaje: data.error || "Ocurrió un error inesperado.",
        });
      } else {
        setResultado({
          tipo: "ok",
          mensaje:
            "Cuenta de administrador creada. Ya podés borrar esta página (carpeta src/app/configurar-primer-admin) y entrar al panel con este email y contraseña.",
        });
        e.currentTarget.reset();
      }
    } catch {
      setResultado({
        tipo: "error",
        mensaje: "No se pudo conectar con el servidor. Probá de nuevo.",
      });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="secreto"
          className="block text-sm font-medium text-gray-700"
        >
          Clave de configuración (ADMIN_BOOTSTRAP_SECRET)
        </label>
        <input
          id="secreto"
          name="secreto"
          type="password"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-umarti-navy focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-gray-700"
        >
          Tu nombre
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-umarti-navy focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Tu email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-umarti-navy focus:outline-none"
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Elegí una contraseña segura
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={10}
          className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-umarti-navy focus:outline-none"
        />
      </div>

      {resultado && (
        <p
          className={`rounded-md px-3 py-2 text-sm ${
            resultado.tipo === "ok"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {resultado.mensaje}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="w-full rounded-md bg-umarti-navy py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
      >
        {enviando ? "Creando cuenta..." : "Crear mi cuenta de administrador"}
      </button>
    </form>
  );
}
