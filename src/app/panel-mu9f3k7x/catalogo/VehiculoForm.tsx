"use client";

import { useActionState, useState, type ReactNode } from "react";
import { useFormStatus } from "react-dom";
import type { EstadoFormularioVehiculo } from "./actions";
import type { CatalogoMarca, ColorCatalogo, VehiculoRow } from "./tipos";
import { formatearEspecificacionesParaTexto } from "./parsers";
import {
  MONEDAS,
  MOTORIZACIONES,
  SEGMENTOS,
  TRANSMISIONES,
  aniosDisponibles,
} from "./constantes";

type Props = {
  accion: (
    estadoPrevio: EstadoFormularioVehiculo,
    formData: FormData
  ) => Promise<EstadoFormularioVehiculo>;
  catalogoMarcas: CatalogoMarca[];
  catalogoColores: ColorCatalogo[];
  vehiculo?: VehiculoRow;
  marcaIdInicial?: string;
  modeloIdInicial?: string;
  coloresSeleccionadosInicial?: string[];
};

export default function VehiculoForm({
  accion,
  catalogoMarcas,
  catalogoColores,
  vehiculo,
  marcaIdInicial,
  modeloIdInicial,
  coloresSeleccionadosInicial,
}: Props) {
  const [estado, formAction] = useActionState(accion, null);
  const [marcaId, setMarcaId] = useState(marcaIdInicial ?? "");
  const [modeloId, setModeloId] = useState(modeloIdInicial ?? "");

  const marcaSeleccionada = catalogoMarcas.find((m) => m.id === marcaId);
  const modelos = marcaSeleccionada?.modelos ?? [];
  const modeloSeleccionado = modelos.find((m) => m.id === modeloId);
  const versiones = modeloSeleccionado?.versiones ?? [];

  return (
    <form action={formAction} className="space-y-8">
      {estado?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {estado.error}
        </div>
      )}

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-umarti-navy">Marca, modelo y versión</h2>
        {catalogoMarcas.length === 0 ? (
          <p className="text-sm text-red-600">
            Todavía no hay marcas cargadas. Andá a{" "}
            <a href="/panel-mu9f3k7x/catalogo/marcas" className="underline">
              Marcas
            </a>{" "}
            y cargá al menos una marca, un modelo y una versión antes de crear un vehículo.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <label className="block text-sm">
              <span className="mb-1 block font-medium text-gray-700">Marca</span>
              <select
                value={marcaId}
                onChange={(e) => {
                  setMarcaId(e.target.value);
                  setModeloId("");
                }}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
              >
                <option value="">Elegí una marca</option>
                {catalogoMarcas.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.nombre}
                  </option>
                ))}
              </select>
            </label>

            <label className="block text-sm">
              <span className="mb-1 block font-medium text-gray-700">Modelo</span>
              <select
                value={modeloId}
                onChange={(e) => setModeloId(e.target.value)}
                disabled={!marcaId}
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
              <span className="mb-1 block font-medium text-gray-700">Versión</span>
              <select
                name="version_id"
                defaultValue={vehiculo?.version_id ?? ""}
                disabled={!modeloId}
                required
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">
                  {modeloId ? "Elegí una versión" : "Elegí un modelo primero"}
                </option>
                {versiones.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.nombre}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-umarti-navy">Datos básicos</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select label="Año" name="anio" defaultValue={vehiculo?.anio} required>
            <option value="">Elegí un año</option>
            {aniosDisponibles().map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </Select>
          <Select label="Segmento" name="tipo" defaultValue={vehiculo?.tipo ?? ""}>
            <option value="">Sin especificar</option>
            {SEGMENTOS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
          <Select
            label="Motorización"
            name="motorizacion"
            defaultValue={vehiculo?.motorizacion ?? ""}
          >
            <option value="">Sin especificar</option>
            {MOTORIZACIONES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
          <Select
            label="Transmisión"
            name="transmision"
            defaultValue={vehiculo?.transmision ?? ""}
          >
            <option value="">Sin especificar</option>
            {TRANSMISIONES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <Campo
            label="Origen"
            name="origen"
            defaultValue={vehiculo?.origen ?? ""}
            placeholder="Ej: China"
          />
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="plan_ahorro" defaultChecked={vehiculo?.plan_ahorro} />
          Disponible en plan de ahorro
        </label>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-2 text-lg font-bold text-umarti-navy">Precio</h2>
        <p className="mb-2 text-xs text-gray-400">
          Precio de referencia del vehículo (no una cotización de concesionaria — esas se
          cargan desde Concesionarias).
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Campo
            label="Monto"
            name="precio"
            type="number"
            defaultValue={vehiculo?.precio ?? ""}
            placeholder="Ej: 28600"
          />
          <Select label="Moneda" name="precio_moneda" defaultValue={vehiculo?.precio_moneda ?? "USD"}>
            {MONEDAS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </Select>
        </div>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-umarti-navy">Equipamiento y seguridad</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Campo
            label="Airbags totales"
            name="airbags_totales"
            type="number"
            defaultValue={vehiculo?.airbags_totales ?? ""}
          />
          <Campo
            label="Rueda de auxilio"
            name="rueda_auxilio"
            defaultValue={vehiculo?.rueda_auxilio ?? ""}
            placeholder="Ej: Temporal"
          />
          <Campo
            label="Apple CarPlay"
            name="apple_carplay"
            defaultValue={vehiculo?.apple_carplay ?? ""}
            placeholder="Ej: Inalámbrico y cable"
          />
          <Campo
            label="Android Auto"
            name="android_auto"
            defaultValue={vehiculo?.android_auto ?? ""}
            placeholder="Ej: Con cable"
          />
        </div>
        <div className="mt-4">
          <CampoTextarea
            label="Asistencias a la conducción (ADAS)"
            name="adas"
            defaultValue={vehiculo?.adas?.join("\n") ?? ""}
            placeholder={
              "Una por línea, por ejemplo:\nAsistente de frenado de emergencia\nAdvertencia de colisión\nControl de velocidad crucero adaptativo"
            }
            rows={4}
          />
        </div>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-2 text-lg font-bold text-umarti-navy">Colores disponibles</h2>
        <p className="mb-2 text-xs text-gray-400">
          Mantené presionado Ctrl (o Cmd en Mac) para elegir más de un color. Si falta algún
          color, pedímelo y lo sumo al catálogo.
        </p>
        <select
          name="colores"
          multiple
          size={Math.min(8, Math.max(4, catalogoColores.length))}
          defaultValue={coloresSeleccionadosInicial ?? []}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
        >
          {catalogoColores.map((c) => (
            <option key={c.id} value={`${c.id}|${c.nombre}|${c.hex}`}>
              {c.nombre} ({c.hex})
            </option>
          ))}
        </select>
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-umarti-navy">Fotos</h2>
        {vehiculo?.fotos && vehiculo.fotos.length > 0 && (
          <div className="mb-4">
            <p className="mb-2 text-sm text-gray-500">
              Fotos actuales — desmarcá las que quieras sacar:
            </p>
            <div className="flex flex-wrap gap-4">
              {vehiculo.fotos.map((url) => (
                <label
                  key={url}
                  className="flex flex-col items-center gap-1 text-xs text-gray-500"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={url} alt="" className="h-20 w-20 rounded-md object-cover" />
                  <span className="flex items-center gap-1">
                    <input type="checkbox" name="fotos_mantener" value={url} defaultChecked />
                    Mantener
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
        <label className="block text-sm font-medium text-gray-700">
          {vehiculo ? "Agregar más fotos" : "Fotos del vehículo"}
        </label>
        <input
          type="file"
          name="fotos"
          accept="image/png, image/jpeg, image/webp"
          multiple
          className="mt-2 block w-full text-sm text-gray-600"
        />
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-2 text-lg font-bold text-umarti-navy">Especificaciones técnicas</h2>
        <p className="mb-2 text-xs text-gray-400">
          Agrupadas con <code>##</code> y cada dato como <code>Etiqueta: Valor</code>.
        </p>
        <CampoTextarea
          name="especificaciones"
          defaultValue={
            vehiculo?.especificaciones
              ? formatearEspecificacionesParaTexto(vehiculo.especificaciones)
              : ""
          }
          placeholder={
            "## Motor\nPotencia: 115 CV\nCilindrada: 1.5L\n\n## Dimensiones\nLargo: 4330 mm\nBaúl: 400 L"
          }
          rows={10}
        />
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-2 text-lg font-bold text-umarti-navy">Reseña del vehículo</h2>
        <p className="mb-2 text-sm text-gray-500">
          El texto que acompaña la ficha: para quién es, qué lo distingue, pros y contras.
        </p>
        <CampoTextarea
          name="contenido_editorial"
          defaultValue={vehiculo?.contenido_editorial ?? ""}
          rows={10}
          placeholder="Escribí acá la nota/reseña de este vehículo..."
        />
      </section>

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-umarti-navy">Publicación</h2>
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="publicado" defaultChecked={vehiculo?.publicado} />
          Publicado (visible en el sitio)
        </label>
        <label className="mt-2 flex items-center gap-2 text-sm text-gray-600">
          <input type="checkbox" name="destacado" defaultChecked={vehiculo?.destacado} />
          Destacado en la Home
        </label>
      </section>

      <BotonGuardar texto={vehiculo ? "Guardar cambios" : "Crear vehículo"} />
    </form>
  );
}

function BotonGuardar({ texto }: { texto: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-umarti-orange px-6 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
    >
      {pending ? "Guardando..." : texto}
    </button>
  );
}

function Campo({
  label,
  name,
  type = "text",
  defaultValue,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-gray-700">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
      />
    </label>
  );
}

function Select({
  label,
  name,
  defaultValue,
  required,
  children,
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-gray-700">{label}</span>
      <select
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm focus:border-umarti-orange focus:outline-none"
      >
        {children}
      </select>
    </label>
  );
}

function CampoTextarea({
  label,
  name,
  defaultValue,
  placeholder,
  rows = 4,
}: {
  label?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block text-sm">
      {label && <span className="mb-1 block font-medium text-gray-700">{label}</span>}
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-md border border-gray-200 px-3 py-2 font-mono text-xs leading-relaxed focus:border-umarti-orange focus:outline-none"
      />
    </label>
  );
}
