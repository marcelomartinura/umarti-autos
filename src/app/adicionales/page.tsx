import Link from "next/link";
import Header from "@/components/Header";
import AdSlot from "@/components/AdSlot";
import AdicionalIcono from "@/components/AdicionalIcono";
import SimuladorFinanciamiento from "@/components/SimuladorFinanciamiento";
import AcordeonSimple from "@/components/AcordeonSimple";
import BotonImprimir from "@/components/BotonImprimir";
import { AD_SLOTS } from "@/lib/adsense";
import {
  categoriasAdicionales,
  preguntasFrecuentesAdicionales,
} from "@/lib/mock-data";

export const metadata = {
  title: "Adicionales | Umarti Movilidad",
  description:
    "Seguros, financiamiento, gestoría, garantías extendidas, blindajes, accesorios y alquiler de autos: todo lo que rodea a la compra de tu vehículo, en un solo lugar.",
};

export default function AdicionalesPage() {
  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark py-14">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="mb-4 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>{" "}
            <span className="mx-1">›</span> Adicionales
          </nav>
          <h1 className="text-3xl font-bold text-white">
            Servicios adicionales
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-blue-100">
            Todo lo que rodea a la compra de tu vehículo, en un solo lugar:
            seguro, financiación, trámites, garantía extendida, blindaje,
            accesorios y alquiler. Elegí una categoría o recorré la página
            completa.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-8 flex justify-end print:hidden">
          <BotonImprimir />
        </div>

        <div className="mt-4">
          <AdSlot slot={AD_SLOTS.adicionalesTope} />
        </div>

        {/* Grilla de categorías: navegación rápida por ancla a cada sección */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoriasAdicionales.map((categoria) => (
            <a
              key={categoria.slug}
              href={`#${categoria.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-umarti-orange hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-umarti-navy text-white transition group-hover:bg-umarti-orange">
                <AdicionalIcono slug={categoria.slug} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-umarti-navy">
                {categoria.nombre}
              </h3>
              <p className="mt-1 flex-1 text-sm text-gray-500">
                {categoria.resumen}
              </p>
              <span className="mt-4 text-sm font-semibold text-umarti-orange">
                Ver más →
              </span>
            </a>
          ))}
        </div>

        {/* Secciones detalladas, una por categoría */}
        <div className="mt-16 space-y-10">
          {categoriasAdicionales.map((categoria, index) => {
            const mensajeWhatsapp = encodeURIComponent(
              `Hola, quiero consultar por ${categoria.nombre}.`
            );
            return (
              <div
                key={categoria.slug}
                id={categoria.slug}
                className="scroll-mt-24 rounded-2xl border border-gray-100 bg-white p-6 sm:p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-umarti-cream text-umarti-navy">
                    <AdicionalIcono slug={categoria.slug} />
                  </span>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-umarti-navy">
                      {categoria.nombre}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                      {categoria.descripcion}
                    </p>

                    <ul className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
                      {categoria.beneficios.map((beneficio) => (
                        <li
                          key={beneficio}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="mt-1 text-umarti-orange">✓</span>
                          {beneficio}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`https://wa.me/${categoria.whatsapp}?text=${mensajeWhatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
                    >
                      Consultar por {categoria.nombre}
                    </a>
                  </div>
                </div>

                {categoria.slug === "financiamiento" && (
                  <div className="mt-8">
                    <SimuladorFinanciamiento />
                  </div>
                )}

                {index === 2 && (
                  <div className="mt-8">
                    <AdSlot slot={AD_SLOTS.adicionalesMedio} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <h2 className="mb-1 text-xl font-bold text-umarti-navy">
            Preguntas frecuentes sobre adicionales
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Lo que más nos consultan sobre estos servicios.
          </p>
          <AcordeonSimple items={preguntasFrecuentesAdicionales} />
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-umarti-navy to-umarti-navyDark p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100">
            Escribinos por WhatsApp y te ayudamos a resolverlo, sea cual sea
            el adicional que necesitás.
          </p>
          <a
            href={`https://wa.me/${
              categoriasAdicionales[0].whatsapp
            }?text=${encodeURIComponent(
              "Hola, tengo una consulta sobre servicios adicionales."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Hablar por WhatsApp
          </a>
        </div>

        <div className="mt-12">
          <AdSlot slot={AD_SLOTS.adicionalesPie} />
        </div>
      </div>
    </main>
  );
}
