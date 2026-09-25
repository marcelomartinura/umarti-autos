import Link from "next/link";
import Header from "@/components/Header";
import AdSlot from "@/components/AdSlot";
import PosventaListados from "@/components/PosventaListados";
import CalculadoraProximoService from "@/components/CalculadoraProximoService";
import ComoPedirTurno from "@/components/ComoPedirTurno";
import { AD_SLOTS } from "@/lib/adsense";
import { articulosPosventa } from "@/lib/mock-data";

export const metadata = {
  title: "Posventa | Umarti Movilidad",
  description:
    "Service oficial por marca y talleres independientes en toda Argentina. Buscá por marca y provincia, pedí tu turno por WhatsApp y calculá cuándo te toca el próximo service.",
};

export default function PosventaPage() {
  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark py-14">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="mb-4 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>{" "}
            <span className="mx-1">›</span> Posventa
          </nav>
          <h1 className="text-3xl font-bold text-white">Posventa</h1>
          <p className="mt-2 max-w-2xl text-sm text-blue-100">
            Encontrá service oficial de tu marca o un taller independiente
            de confianza, filtrando por marca y por provincia. Pedí el turno
            directo por WhatsApp, sin intermediarios.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-8">
          <AdSlot slot={AD_SLOTS.posventaTope} />
        </div>

        <div className="mt-10">
          <PosventaListados />
        </div>

        <div className="mt-12">
          <CalculadoraProximoService />
        </div>

        <div className="mt-12">
          <AdSlot slot={AD_SLOTS.posventaMedio} />
        </div>

        <div className="mt-12">
          <ComoPedirTurno />
        </div>

        <div className="mt-12">
          <h2 className="mb-1 text-xl font-bold text-umarti-navy">
            Notas sobre posventa
          </h2>
          <p className="mb-6 text-sm text-gray-500">
            Contenido en preparación para ayudarte a cuidar tu vehículo.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {articulosPosventa.map((articulo) => (
              <div
                key={articulo.titulo}
                className="rounded-xl border border-gray-100 bg-white p-5"
              >
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-umarti-navy">
                    {articulo.titulo}
                  </h3>
                  <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Próximamente
                  </span>
                </div>
                <p className="text-sm text-gray-500">{articulo.resumen}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <AdSlot slot={AD_SLOTS.posventaPie} />
        </div>
      </div>
    </main>
  );
}
