import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import AdSlot from "@/components/AdSlot";
import GeneradorDescripcion from "@/components/GeneradorDescripcion";
import BlogDealersListado from "@/components/BlogDealersListado";
import ServicioIndustriaCard from "@/components/ServicioIndustriaCard";
import IconoCategoriaComunidad from "@/components/IconoCategoriaComunidad";
import { AD_SLOTS } from "@/lib/adsense";
import {
  UMARTI_WHATSAPP_ECOSISTEMA,
  categoriasComunidad,
  herramientasDealers,
  serviciosIndustria,
} from "@/lib/mock-data";

export const metadata = {
  title: "Ecosistema de Negocios | Umarti Movilidad",
  description:
    "El espacio para concesionarias, agencias y proveedores de la industria: cómo publicar mejor, sumarte a posventa, gestionar tu tienda, anunciarte y herramientas para tu negocio.",
};

export default function EcosistemaNegociosPage() {
  const mensajeConcesionaria = encodeURIComponent(
    "Hola, quiero sumar mi concesionaria/agencia a Umarti Movilidad."
  );
  const mensajeProveedor = encodeURIComponent(
    "Hola, soy proveedor de la industria de la movilidad y quiero sumarme al ecosistema de Umarti."
  );

  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-6 md:flex-row">
          <div>
            <nav className="mb-4 text-xs text-blue-200">
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>{" "}
              <span className="mx-1">›</span> Ecosistema de Negocios
            </nav>
            <h1 className="text-3xl font-bold text-white">
              Ecosistema de Negocios
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              El espacio de Umarti Movilidad para concesionarias, agencias y
              proveedores de la industria: herramientas, contenido y todo lo
              que necesitás para sacarle el máximo provecho a la plataforma.
            </p>
          </div>

          <Image
            src="/avatar-ecosistema.jpg"
            alt="Asistente del Ecosistema de Negocios de Umarti Motors"
            width={640}
            height={640}
            className="w-44 shrink-0 rounded-2xl shadow-2xl sm:w-52"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-8">
          <h2 className="text-xl font-bold text-umarti-navy">
            Servicios para la industria
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Un hub de soluciones pensadas para concesionarias, agencias y
            proveedores que quieren escalar su negocio.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviciosIndustria.map((servicio) => (
              <ServicioIndustriaCard key={servicio.slug} servicio={servicio} />
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-umarti-navy to-umarti-navyDark p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              Comunidad de la industria
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-blue-100">
              ¿Querés ver qué está ocurriendo en la industria? ¿Querés
              intercambiar conocimiento con colegas? ¿Querés ver qué están
              haciendo en otras regiones? Ingresá al área de comunidad.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {categoriasComunidad.map((categoria) => (
              <Link
                key={categoria.slug}
                href={`/comunidad/${categoria.slug}`}
                className="flex flex-col items-center rounded-xl bg-white/10 p-6 text-center hover:bg-white/20"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-umarti-navy">
                  <IconoCategoriaComunidad categoria={categoria.categoria} />
                </span>
                <h3 className="mt-3 font-bold text-white">
                  Comunidad de {categoria.categoria}
                </h3>
                <p className="mt-1 text-xs text-blue-100">
                  {categoria.descripcion}
                </p>
                <span className="mt-4 text-sm font-semibold text-white">
                  Entrar →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div id="sumar-negocio" className="mt-12 grid scroll-mt-24 grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="font-bold text-umarti-navy">
              Tenés una concesionaria o agencia
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Sumá tu negocio, publicá tu inventario y aparecé en Tiendas,
              Catálogo y Clasificados.
            </p>
            <a
              href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${mensajeConcesionaria}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Sumar mi concesionaria o agencia
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="font-bold text-umarti-navy">
              Sos proveedor de la industria
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Seguros, financiación, accesorios, talleres y más: llegá a
              miles de compradores y concesionarias.
            </p>
            <a
              href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${mensajeProveedor}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-600 px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
            >
              Quiero ser proveedor
            </a>
          </div>
        </div>

        <div className="mt-10">
          <AdSlot slot={AD_SLOTS.ecosistemaTope} />
        </div>

        <div className="mt-12">
          <h2 className="mb-1 text-xl font-bold text-umarti-navy">
            Herramientas para tu negocio
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Recursos pensados para concesionarias y agencias.
          </p>

          <GeneradorDescripcion />

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {herramientasDealers.map((herramienta) => (
              <div
                key={herramienta.titulo}
                className="rounded-xl border border-dashed border-umarti-navy/20 bg-white p-5"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-umarti-navy">
                    {herramienta.titulo}
                  </h3>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Próximamente
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  {herramienta.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <h2 className="mb-1 text-xl font-bold text-umarti-navy">
            Blog para concesionarias y agencias
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Cómo publicar mejor, sumarte a posventa, gestionar tu tienda,
            anunciarte en el sitio y todas las novedades de la plataforma.
          </p>
          <BlogDealersListado />
        </div>

        <div className="mt-12">
          <AdSlot slot={AD_SLOTS.ecosistemaPie} />
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-umarti-navy to-umarti-navyDark p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            ¿Tenés dudas sobre cómo sumar tu negocio a Umarti?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100">
            Escribinos por WhatsApp y te contamos cómo empezar.
          </p>
          <a
            href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${encodeURIComponent(
              "Hola, tengo una consulta sobre el Ecosistema de Negocios de Umarti."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
