import Link from "next/link";
import Header from "@/components/Header";
import AdSlot from "@/components/AdSlot";
import ComunidadCategoriaCard from "@/components/ComunidadCategoriaCard";
import { AD_SLOTS } from "@/lib/adsense";
import { UMARTI_WHATSAPP_ECOSISTEMA, categoriasComunidad } from "@/lib/mock-data";

export const metadata = {
  title: "Comunidad | Umarti Movilidad",
  description:
    "La comunidad de habla hispana de la industria de la movilidad: un espacio para conversar sobre autos, motos y camiones, todo el año y 100% digital.",
};

export default function ComunidadPage() {
  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark py-14">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="mb-4 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>{" "}
            <span className="mx-1">›</span>{" "}
            <Link href="/ecosistema-negocios" className="hover:text-white">
              Ecosistema de Negocios
            </Link>{" "}
            <span className="mx-1">›</span> Comunidad
          </nav>
          <h1 className="text-3xl font-bold text-white">Comunidad Umarti</h1>
          <p className="mt-2 max-w-2xl text-sm text-blue-100">
            ¿Te gustaría saber qué están haciendo en otros países? La
            comunidad de habla hispana de la industria de la movilidad: un
            espacio para conversar con colegas de autos, motos y camiones —
            como Auto.Tienda, pero todo el año y 100% digital.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-8 rounded-2xl border border-dashed border-umarti-navy/20 bg-white p-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-umarti-navy">
              Estamos arrancando:
            </span>{" "}
            por ahora esto es una lista de interés. Primero queremos generar
            contenido y validar que esto le sirva a la industria — a medida
            que se sume gente, vamos a definir la plataforma final de
            conversación (grupo de WhatsApp, foro propio u otra herramienta).
            Sumate y te avisamos apenas esté lista.
          </p>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-umarti-navy">
            Elegí tu categoría
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Separamos la comunidad en tres mundos, para que la conversación
            sea siempre relevante.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {categoriasComunidad.map((categoria) => (
              <ComunidadCategoriaCard
                key={categoria.categoria}
                categoria={categoria}
              />
            ))}
          </div>
        </div>

        <div className="mt-12">
          <AdSlot slot={AD_SLOTS.comunidad} />
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-xl font-bold text-umarti-navy">
            ¿Qué te vas a encontrar acá?
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <h3 className="font-semibold text-umarti-navy">
                Qué se hace en otros países
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Tendencias, modelos de negocio y casos de la industria de la
                movilidad en otros mercados de habla hispana.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <h3 className="font-semibold text-umarti-navy">
                Preguntas entre colegas
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Un espacio para consultar dudas del día a día con otras
                concesionarias, agencias y talleres.
              </p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <h3 className="font-semibold text-umarti-navy">
                Novedades del sector
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Lanzamientos, cambios normativos y contenido que ya estamos
                publicando en el blog de Ecosistema de Negocios.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-umarti-navy to-umarti-navyDark p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            ¿Tenés una idea para la comunidad?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100">
            Contanos qué te gustaría encontrar acá y lo tenemos en cuenta
            para cuando la lancemos.
          </p>
          <a
            href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${encodeURIComponent(
              "Hola, tengo una idea para la Comunidad Umarti."
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
