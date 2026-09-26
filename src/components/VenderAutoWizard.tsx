"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Link from "next/link";
import {
  coloresVehiculo,
  marcas,
  provinciasArgentina,
  UMARTI_WHATSAPP_VENDER,
} from "@/lib/mock-data";

const combustibles = ["Nafta", "Diesel", "Híbrido", "Eléctrico"];
const transmisiones = ["Manual", "Automática"];

type Paso = 1 | 2 | 3 | 4;

interface DatosVehiculo {
  marca: string;
  modelo: string;
  anio: string;
  version: string;
  moneda: "ARS" | "USD";
  precio: string;
  km: string;
  color: string;
  combustible: string;
  transmision: string;
  descripcion: string;
}

interface DatosContacto {
  nombre: string;
  whatsapp: string;
  email: string;
  provincia: string;
  ciudad: string;
}

interface Foto {
  url: string;
}

const datosIniciales: DatosVehiculo = {
  marca: "",
  modelo: "",
  anio: "",
  version: "",
  moneda: "USD",
  precio: "",
  km: "",
  color: "",
  combustible: "",
  transmision: "",
  descripcion: "",
};

const contactoInicial: DatosContacto = {
  nombre: "",
  whatsapp: "",
  email: "",
  provincia: "",
  ciudad: "",
};

const pasos: { numero: Paso; label: string }[] = [
  { numero: 1, label: "Datos" },
  { numero: 2, label: "Fotos" },
  { numero: 3, label: "Contacto" },
];

export default function VenderAutoWizard() {
  const [paso, setPaso] = useState<Paso>(1);
  const [datos, setDatos] = useState<DatosVehiculo>(datosIniciales);
  const [contacto, setContacto] = useState<DatosContacto>(contactoInicial);
  const [fotos, setFotos] = useState<Foto[]>([]);
  const [errores, setErrores] = useState<Record<string, string>>({});

  useEffect(() => {
    return () => {
      fotos.forEach((f) => URL.revokeObjectURL(f.url));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const actualizarDato = (campo: keyof DatosVehiculo, valor: string) => {
    setDatos((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => {
      const { [campo]: _omit, ...resto } = prev;
      return resto;
    });
  };

  const actualizarContacto = (campo: keyof DatosContacto, valor: string) => {
    setContacto((prev) => ({ ...prev, [campo]: valor }));
    setErrores((prev) => {
      const { [campo]: _omit, ...resto } = prev;
      return resto;
    });
  };

  const validarPaso1 = () => {
    const nuevos: Record<string, string> = {};
    if (!datos.marca) nuevos.marca = "Elegí una marca";
    if (!datos.modelo.trim()) nuevos.modelo = "Ingresá el modelo";
    if (!datos.anio.trim()) nuevos.anio = "Ingresá el año";
    if (!datos.precio.trim()) nuevos.precio = "Ingresá un precio";
    if (!datos.combustible) nuevos.combustible = "Elegí el combustible";
    if (!datos.transmision) nuevos.transmision = "Elegí la transmisión";
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const validarPaso3 = () => {
    const nuevos: Record<string, string> = {};
    if (!contacto.nombre.trim()) nuevos.nombre = "Ingresá tu nombre";
    if (!contacto.whatsapp.trim())
      nuevos.whatsapp = "Ingresá un WhatsApp de contacto";
    setErrores(nuevos);
    return Object.keys(nuevos).length === 0;
  };

  const manejarFotos = (e: ChangeEvent<HTMLInputElement>) => {
    const archivos = Array.from(e.target.files ?? []);
    const nuevas = archivos.map((file) => ({ url: URL.createObjectURL(file) }));
    setFotos((prev) => [...prev, ...nuevas]);
    e.target.value = "";
  };

  const quitarFoto = (index: number) => {
    setFotos((prev) => {
      URL.revokeObjectURL(prev[index].url);
      return prev.filter((_, i) => i !== index);
    });
  };

  const construirMensajeWhatsapp = () => {
    const lineas = [
      "Hola, quiero publicar mi auto en Umarti Movilidad.",
      "",
      `Vehículo: ${datos.marca} ${datos.modelo} ${datos.anio}${
        datos.version ? " " + datos.version : ""
      }`,
      `Precio: ${datos.moneda} ${datos.precio}`,
      datos.km ? `Kilometraje: ${datos.km} km` : null,
      `Color: ${datos.color || "-"}`,
      `Combustible: ${datos.combustible}`,
      `Transmisión: ${datos.transmision}`,
      datos.descripcion ? `Descripción: ${datos.descripcion}` : null,
      "",
      `Contacto: ${contacto.nombre}`,
      `WhatsApp: ${contacto.whatsapp}`,
      contacto.email ? `Email: ${contacto.email}` : null,
      contacto.provincia
        ? `Ubicación: ${contacto.provincia}${
            contacto.ciudad ? ", " + contacto.ciudad : ""
          }`
        : null,
      "",
      fotos.length > 0
        ? `Fotos: tengo ${fotos.length} foto${
            fotos.length === 1 ? "" : "s"
          } para enviar por este chat`
        : "Fotos: te las envío por este chat",
    ].filter((linea): linea is string => linea !== null);

    return encodeURIComponent(lineas.join("\n"));
  };

  const irAlPaso2 = () => {
    if (validarPaso1()) setPaso(2);
  };

  const irAlPaso3 = () => {
    setPaso(3);
  };

  const publicar = () => {
    if (!validarPaso3()) return;
    const url = `https://wa.me/${UMARTI_WHATSAPP_VENDER}?text=${construirMensajeWhatsapp()}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setPaso(4);
  };

  const reabrirWhatsapp = () => {
    const url = `https://wa.me/${UMARTI_WHATSAPP_VENDER}?text=${construirMensajeWhatsapp()}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="mx-auto -mt-10 max-w-3xl px-6">
      {paso < 4 && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center gap-4 sm:gap-10">
            {pasos.map((p, i) => (
              <div key={p.numero} className="flex items-center gap-4 sm:gap-10">
                <div className="flex flex-col items-center">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-bold ${
                      paso === p.numero
                        ? "border-umarti-orange text-umarti-orange"
                        : paso > p.numero
                        ? "border-umarti-navy bg-umarti-navy text-white"
                        : "border-gray-200 text-gray-300"
                    }`}
                  >
                    {paso > p.numero ? "✓" : p.numero}
                  </span>
                  <span
                    className={`mt-1 text-xs font-medium ${
                      paso === p.numero ? "text-umarti-orange" : "text-gray-400"
                    }`}
                  >
                    {p.label}
                  </span>
                </div>
                {i < pasos.length - 1 && (
                  <span className="h-px w-8 bg-gray-200 sm:w-16" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {paso === 1 && (
        <div className="mt-6 space-y-6">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-3 font-bold text-umarti-navy">
              1. Información Básica
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Marca *
                </span>
                <select
                  value={datos.marca}
                  onChange={(e) => actualizarDato("marca", e.target.value)}
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                    errores.marca
                      ? "border-red-400"
                      : "border-gray-200 focus:border-umarti-orange"
                  }`}
                >
                  <option value="">Seleccioná la marca</option>
                  {marcas.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                {errores.marca && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errores.marca}
                  </span>
                )}
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Modelo *
                </span>
                <input
                  type="text"
                  value={datos.modelo}
                  onChange={(e) => actualizarDato("modelo", e.target.value)}
                  placeholder="Ej: Corolla"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                    errores.modelo
                      ? "border-red-400"
                      : "border-gray-200 focus:border-umarti-orange"
                  }`}
                />
                {errores.modelo && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errores.modelo}
                  </span>
                )}
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Año *
                </span>
                <input
                  type="number"
                  value={datos.anio}
                  onChange={(e) => actualizarDato("anio", e.target.value)}
                  placeholder="Ej: 2018"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                    errores.anio
                      ? "border-red-400"
                      : "border-gray-200 focus:border-umarti-orange"
                  }`}
                />
                {errores.anio && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errores.anio}
                  </span>
                )}
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Versión (Opcional)
                </span>
                <input
                  type="text"
                  value={datos.version}
                  onChange={(e) => actualizarDato("version", e.target.value)}
                  placeholder="Ej: 2.0 XLI"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-3 font-bold text-umarti-navy">
              2. Información Comercial
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Precio *
                </span>
                <div className="flex gap-2">
                  <select
                    value={datos.moneda}
                    onChange={(e) =>
                      actualizarDato("moneda", e.target.value)
                    }
                    className="rounded-md border border-gray-200 px-2 py-2 text-sm focus:border-umarti-orange focus:outline-none"
                  >
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                  </select>
                  <input
                    type="number"
                    value={datos.precio}
                    onChange={(e) => actualizarDato("precio", e.target.value)}
                    placeholder="Valor"
                    className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                      errores.precio
                        ? "border-red-400"
                        : "border-gray-200 focus:border-umarti-orange"
                    }`}
                  />
                </div>
                {errores.precio && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errores.precio}
                  </span>
                )}
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Kilometraje
                </span>
                <input
                  type="number"
                  value={datos.km}
                  onChange={(e) => actualizarDato("km", e.target.value)}
                  placeholder="Ej: 85000"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
                />
              </label>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-3 font-bold text-umarti-navy">
              3. Información Técnica
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Color
                </span>
                <select
                  value={datos.color}
                  onChange={(e) => actualizarDato("color", e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
                >
                  <option value="">Elegí</option>
                  {coloresVehiculo.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Combustible *
                </span>
                <select
                  value={datos.combustible}
                  onChange={(e) =>
                    actualizarDato("combustible", e.target.value)
                  }
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                    errores.combustible
                      ? "border-red-400"
                      : "border-gray-200 focus:border-umarti-orange"
                  }`}
                >
                  <option value="">Elegí</option>
                  {combustibles.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errores.combustible && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errores.combustible}
                  </span>
                )}
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Transmisión *
                </span>
                <select
                  value={datos.transmision}
                  onChange={(e) =>
                    actualizarDato("transmision", e.target.value)
                  }
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                    errores.transmision
                      ? "border-red-400"
                      : "border-gray-200 focus:border-umarti-orange"
                  }`}
                >
                  <option value="">Elegí</option>
                  {transmisiones.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {errores.transmision && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errores.transmision}
                  </span>
                )}
              </label>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-3 font-bold text-umarti-navy">
              4. Descripción
            </h2>
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-umarti-navy">
                Detalles adicionales del vehículo (Máx 500 caract.)
              </span>
              <textarea
                value={datos.descripcion}
                maxLength={500}
                onChange={(e) => actualizarDato("descripcion", e.target.value)}
                placeholder="Mencioná el estado general, mantenimientos realizados, accesorios extra..."
                rows={4}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
              />
              <span className="mt-1 block text-right text-xs text-gray-400">
                {datos.descripcion.length}/500
              </span>
            </label>
          </div>

          <div className="flex justify-end pb-4">
            <button
              type="button"
              onClick={irAlPaso2}
              className="rounded-md bg-umarti-orange px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Siguiente paso
            </button>
          </div>
        </div>
      )}

      {paso === 2 && (
        <div className="mt-6 space-y-6 pb-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-3 font-bold text-umarti-navy">
              Fotos del vehículo
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              Subí las fotos que tengas — recomendamos al menos 6: frente,
              lateral, trasera, interior, motor y detalles. Podés enviar el
              resto directo por WhatsApp cuando te contactemos.
            </p>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-10 text-center hover:border-umarti-orange">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="mb-2 text-gray-400"
                aria-hidden
              >
                <path d="M12 16V4" />
                <path d="m6 10 6-6 6 6" />
                <path d="M4 20h16" />
              </svg>
              <span className="text-sm font-medium text-umarti-navy">
                Elegí fotos de tu vehículo
              </span>
              <span className="mt-1 text-xs text-gray-400">
                JPG o PNG — podés seleccionar varias a la vez
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={manejarFotos}
                className="hidden"
              />
            </label>

            {fotos.length > 0 && (
              <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {fotos.map((foto, index) => (
                  <div key={foto.url} className="group relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={foto.url}
                      alt={`Foto ${index + 1} del vehículo`}
                      className="h-24 w-full rounded-md object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => quitarFoto(index)}
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-red-500 shadow"
                      aria-label="Quitar foto"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {fotos.length === 0 && (
              <p className="mt-3 text-xs text-gray-400">
                Todavía no subiste fotos — podés continuar igual y enviarlas
                por WhatsApp más adelante.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPaso(1)}
              className="text-sm font-medium text-gray-500 hover:text-umarti-navy"
            >
              ← Volver
            </button>
            <button
              type="button"
              onClick={irAlPaso3}
              className="rounded-md bg-umarti-orange px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Siguiente paso
            </button>
          </div>
        </div>
      )}

      {paso === 3 && (
        <div className="mt-6 space-y-6 pb-4">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-4 border-b border-gray-100 pb-3 font-bold text-umarti-navy">
              Datos de contacto
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              No necesitás crear una cuenta. Con estos datos te contactamos
              por WhatsApp para validar la publicación.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Nombre y apellido *
                </span>
                <input
                  type="text"
                  value={contacto.nombre}
                  onChange={(e) =>
                    actualizarContacto("nombre", e.target.value)
                  }
                  placeholder="Ej: Marcelo Uranga"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                    errores.nombre
                      ? "border-red-400"
                      : "border-gray-200 focus:border-umarti-orange"
                  }`}
                />
                {errores.nombre && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errores.nombre}
                  </span>
                )}
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  WhatsApp *
                </span>
                <input
                  type="tel"
                  value={contacto.whatsapp}
                  onChange={(e) =>
                    actualizarContacto("whatsapp", e.target.value)
                  }
                  placeholder="Ej: 11 2233-4455"
                  className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none ${
                    errores.whatsapp
                      ? "border-red-400"
                      : "border-gray-200 focus:border-umarti-orange"
                  }`}
                />
                {errores.whatsapp && (
                  <span className="mt-1 block text-xs text-red-500">
                    {errores.whatsapp}
                  </span>
                )}
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Email (Opcional)
                </span>
                <input
                  type="email"
                  value={contacto.email}
                  onChange={(e) =>
                    actualizarContacto("email", e.target.value)
                  }
                  placeholder="Ej: nombre@email.com"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
                />
              </label>

              <label className="block text-sm">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Provincia
                </span>
                <select
                  value={contacto.provincia}
                  onChange={(e) =>
                    actualizarContacto("provincia", e.target.value)
                  }
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
                >
                  <option value="">Elegí tu provincia</option>
                  {provinciasArgentina.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm sm:col-span-2">
                <span className="mb-1 block font-medium text-umarti-navy">
                  Ciudad / Localidad
                </span>
                <input
                  type="text"
                  value={contacto.ciudad}
                  onChange={(e) =>
                    actualizarContacto("ciudad", e.target.value)
                  }
                  placeholder="Ej: San Isidro"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
                />
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setPaso(2)}
              className="text-sm font-medium text-gray-500 hover:text-umarti-navy"
            >
              ← Volver
            </button>
            <button
              type="button"
              onClick={publicar}
              className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Publicar por WhatsApp
            </button>
          </div>
        </div>
      )}

      {paso === 4 && (
        <div className="mt-6 rounded-2xl bg-white p-8 text-center shadow-sm">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
            ✓
          </span>
          <h2 className="mt-4 text-xl font-bold text-umarti-navy">
            ¡Recibimos tu publicación!
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
            Antes de que aparezca en el sitio, nuestro equipo la va a revisar.
            Te vamos a contactar por WhatsApp para validar los datos y, si
            todavía no las enviaste, para pedirte las fotos del vehículo.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={reabrirWhatsapp}
              className="rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Volver a abrir WhatsApp
            </button>
            <Link
              href="/"
              className="rounded-md border border-umarti-navy px-6 py-3 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
