import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import VehicleCardReal from "@/components/VehicleCardReal";
import GaleriaImagenesReal from "@/components/GaleriaImagenesReal";
import EspecificacionesTecnicas from "@/components/EspecificacionesTecnicas";
import ComoComprarDetalle from "@/components/ComoComprarDetalle";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";
import { createClient } from "@/lib/supabase/server";
import { formatPrecio } from "@/lib/format";
import { aVehiculoPlano, VehiculoRealCrudo } from "../tipos";

export default async function VehiculoDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("vehiculos")
    .select(
      "id, slug, anio, tipo, motorizacion, transmision, precio, precio_moneda, plan_ahorro, destacado, colores, fotos, especificaciones, versiones(nombre, modelos(nombre, marcas(nombre, logo_url)))"
    )
    .eq("slug", slug)
    .eq("publicado", true)
    .maybeSingle();

  const crudo = data as unknown as VehiculoRealCrudo | null;

  if (!crudo) {
    notFound();
  }

  const vehiculo = aVehiculoPlano(crudo);

  const { data: similaresData } = await supabase
    .from("vehiculos")
    .select(
      "id, slug, anio, tipo, motorizacion, transmision, precio, precio_moneda, plan_ahorro, destacado, fotos, versiones(nombre, modelos(nombre, marcas(nombre, logo_url)))"
    )
    .eq("publicado", true)
    .eq("tipo", crudo.tipo ?? "")
    .neq("id", crudo.id)
    .limit(3);

  const similaresCrudos = (similaresData ?? []) as unknown as VehiculoRealCrudo[];
  const similares = similaresCrudos.map(aVehiculoPlano);

  const gruposEspecificaciones = (crudo.especificaciones ?? []).map((g) => ({
    titulo: g.grupo,
    items: g.items,
  }));

  return (
    <main className="min-h-screen bg-umarti-cream">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-6 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span>{" "}
          <Link href="/catalogo" className="hover:text-umarti-orange">
            Catálogo
          </Link>{" "}
          <span className="mx-1">›</span> {vehiculo.marca} {vehiculo.modelo}
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="mb-4 flex gap-2">
              <span className="rounded bg-umarti-navy px-2 py-0.5 text-xs font-semibold text-white">
                0KM
              </span>
              <span className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-500">
                {vehiculo.anio}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-umarti-navy">
              {vehiculo.marca} {vehiculo.modelo}
            </h1>
            <p className="text-gray-500">{vehiculo.version}</p>

            <div className="mt-6">
              <GaleriaImagenesReal
                fotos={crudo.fotos ?? []}
                alt={`${vehiculo.marca} ${vehiculo.modelo} ${vehiculo.version}`}
              />
            </div>
          </div>

          <aside>
            <div className="rounded-xl border border-umarti-navy/20 bg-white p-6">
              <p className="text-xs uppercase text-gray-400">
                Precio sugerido
              </p>
              <p className="text-3xl font-bold text-umarti-orange">
                {vehiculo.precio != null
                  ? formatPrecio(vehiculo.precio, vehiculo.moneda)
                  : "Consultar precio"}
              </p>
              <ul className="mt-3 space-y-1 text-xs text-gray-500">
                <li>✓ Incluye flete y formularios</li>
                <li>No incluye patentamiento</li>
              </ul>

              <div className="mt-5">
                <p className="text-xs font-semibold uppercase text-gray-400">
                  Formas de pago aceptadas
                </p>
                <ul className="mt-2 space-y-1 text-sm text-gray-600">
                  <li>Contado efectivo o transferencia</li>
                  <li>Financiación bancaria hasta 60 meses</li>
                  <li>Toma de tu usado como parte de pago</li>
                  {vehiculo.planAhorro && <li>Plan de ahorro</li>}
                </ul>
              </div>

              {crudo.colores && crudo.colores.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold uppercase text-gray-400">
                    Colores disponibles
                  </p>
                  <div className="mt-2 flex gap-2">
                    {crudo.colores.map((color) => (
                      <span
                        key={color.nombre}
                        title={color.nombre}
                        className="h-6 w-6 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  className="rounded-md bg-umarti-orange py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  Consultar ofertas
                </button>
                <button
                  type="button"
                  className="rounded-md border border-umarti-navy py-3 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
                >
                  Compartir
                </button>
              </div>

              <div className="mt-5 space-y-1 border-t border-gray-100 pt-4 text-xs text-gray-500">
                <p>✓ Verificado por Umarti Movilidad</p>
                <p>✓ Sin cargos ocultos</p>
                <p>✓ Atención directa con la concesionaria</p>
              </div>
            </div>
          </aside>
        </div>

        {gruposEspecificaciones.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-umarti-navy">
              Especificaciones técnicas
            </h2>
            <EspecificacionesTecnicas grupos={gruposEspecificaciones} />
          </div>
        )}

        <div className="mt-14">
          <AdSlot slot={AD_SLOTS.catalogoFicha} />
        </div>

        <div className="mt-14">
          <ComoComprarDetalle />
        </div>

        {similares.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-umarti-navy">
              Vehículos similares
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similares.map((v) => (
                <VehicleCardReal key={v.id} vehiculo={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
