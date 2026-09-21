import Link from "next/link";
import Header from "@/components/Header";
import TiendasListado from "@/components/TiendasListado";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";
import { tiendas } from "@/lib/mock-data";

export default function TiendasPage() {
  return (
    <main className="min-h-screen bg-umarti-cream">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span> Tiendas
        </nav>

        <h1 className="text-3xl font-bold text-umarti-navy">Tiendas</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          <span className="font-semibold text-umarti-navy">
            {tiendas.length} tiendas verificadas
          </span>{" "}
          publicando en la plataforma.
        </p>

        <div className="mt-8">
          <AdSlot slot={AD_SLOTS.tiendasListado} />
        </div>

        <div className="mt-8">
          <TiendasListado />
        </div>
      </div>
    </main>
  );
}
