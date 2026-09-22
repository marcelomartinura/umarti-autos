import Link from "next/link";
import Header from "@/components/Header";
import SeccionEspecialCard from "@/components/SeccionEspecialCard";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";
import { seccionesEspeciales } from "@/lib/mock-data";

export const metadata = {
  title: "Secciones especiales | Umarti Movilidad",
  description:
    "Planes de ahorro, autos eléctricos, pickups y 4x4, agro y más: catálogo, clasificados y contenido agrupado por tema en Umarti Movilidad.",
};

export default function SeccionesEspecialesPage() {
  return (
    <main className="min-h-screen bg-umarti-cream">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span> Secciones especiales
        </nav>

        <h1 className="text-3xl font-bold text-umarti-navy">
          Secciones especiales
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Formas de comprar y tipos de vehículo con su propio catálogo,
          clasificados, notas y herramientas. Elegí la que te interesa.
        </p>

        <div className="mt-8">
          <AdSlot slot={AD_SLOTS.seccionesEspeciales} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {seccionesEspeciales.map((seccion) => (
            <SeccionEspecialCard key={seccion.slug} seccion={seccion} />
          ))}
        </div>
      </div>
    </main>
  );
}
