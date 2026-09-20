import Link from "next/link";
import Header from "@/components/Header";
import CatalogoListado from "@/components/CatalogoListado";

export default function CatalogoPage() {
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span> Catálogo
        </nav>

        <h1 className="text-3xl font-bold text-umarti-navy">
          Catálogo de vehículos 0km
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Autos, motos y camiones nuevos con garantía oficial. Filtrá por
          marca, segmento, motorización, transmisión o presupuesto.
        </p>

        <div className="mt-8">
          <CatalogoListado />
        </div>
      </div>
    </main>
  );
}
