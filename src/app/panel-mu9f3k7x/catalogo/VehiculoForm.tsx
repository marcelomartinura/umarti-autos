"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { EstadoFormularioVehiculo } from "./actions";
import type { VehiculoRow, OfertaRow } from "./tipos";
import {
  formatearColoresParaTexto,
  formatearEspecificacionesParaTexto,
  formatearOfertasParaTexto,
} from "./parsers";

type Props = {
  accion: (
    estadoPrevio: EstadoFormularioVehiculo,
    formData: FormData
  ) => Promise<EstadoFormularioVehiculo>;
  vehiculo?: VehiculoRow;
  ofertas?: OfertaRow[];
};

export default function VehiculoForm({ accion, vehiculo, ofertas }: Props) {
  const [estado, formAction] = useActionState(accion, null);

  return (
    <form action={formAction} className="space-y-8">
      {estado?.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {estado.error}
        </div>
      )}

      <section className="rounded-xl border border-gray-100 bg-white p-6">
        <h2 className="mb-4 text-lg font-bold text-umarti-navy">Datos básicos</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Campo label="Marca" name="marca" defaultValue={vehiculo?.marca} required />
          <Campo label="Modelo" name="modelo" defaultValue={vehiculo?.modelo} required />
          <Campo label="Versión" name="version" defaultValue={vehiculo?.version} required />
          <Campo
            label="Año"
            name="anio"
            type="number"
            defaultValue={vehiculo?.anio}
            required
          />
          <Campo
            label="Tipo / segmento"
            name="tipo"
            defaultValue={vehiculo?.tipo ?? ""}
            placeholder="Ej: SUV Compacta"
          />
          <Campo
            label="Motorización"
            name="motorizacion"
            defaultValue={vehiculo?.motorizacion ?? ""}
            placeholder="Ej: Híbrido (HEV)"
          />
          <Campo
            label="Transmisión"
            name="transmision"
            defaultValue={vehiculo?.transmision ?? ""}
            placeholder="Ej: Automática CVT"
          />
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
          Uno por línea: Nombre | #código de color | disponibilidad (esto último es opcional).
        </p>
        <CampoTextarea
          name="colores"
          defaultValue={vehiculo?.colores ? formatearColoresParaTexto(vehiculo.colores) : ""}
          placeholder={"Gris | #9ca3af | A consultar\nBlanco | #ffffff"}
          rows={4}
        />
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
        <h2 className="mb-2 text-lg font-bold text-umarti-navy">Cotizaciones</h2>
        <p className="mb-2 text-xs text-gray-400">
          Una cotización por bloque, separados por una línea con <code>---</code>. Campos:
          Concesionaria, Ubicación, Precio, Moneda (ARS o USD), Disponibilidad, Forma de pago.
        </p>
        <CampoTextarea
          name="ofertas"
          defaultValue={ofertas ? formatearOfertasParaTexto(ofertas) : ""}
          rows={10}
          placeholder={
            "Concesionaria: AutoNorte\nUbicación: GBA Norte\nPrecio: 28600\nMoneda: USD\nDisponibilidad: Inmediata / 30 días\nForma de pago: Contado o financiado, precio distinto\n---\nConcesionaria: AutoOeste\nPrecio: 30000\nMoneda: USD"
          }
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
