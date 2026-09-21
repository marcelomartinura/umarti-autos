import Link from "next/link";
import Header from "@/components/Header";
import ClasificadosListado from "@/components/ClasificadosListado";

export default function ClasificadosPage() {
  return (
    <main className="min-h-screen bg-umarti-cream pb-24">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span> Clasificados
        </nav>

        <h1 className="text-3xl font-bold text-umarti-navy">
          Clasificados de vehículos usados
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Publicados por concesionarias y particulares verificados en toda
          Argentina. Filtrá, compará y guardá tus favoritos.
        </p>

        <div className="mt-8">
          <ClasificadosListado />
        </div>
      </div>
    </main>
  );
}
