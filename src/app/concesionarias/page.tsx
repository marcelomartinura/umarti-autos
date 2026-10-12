import Link from "next/link";
import Header from "@/components/Header";
import ConcesionariaCard from "@/components/ConcesionariaCard";
import { createClient } from "@/lib/supabase/server";

export default async function ConcesionariasPage() {
  const supabase = await createClient();
  const { data: concesionarias } = await supabase
    .from("concesionarias")
    .select("nombre, slug, descripcion, direccion, logo_url")
    .eq("activa", true)
    .order("nombre");

  const listado = concesionarias ?? [];

  return (
    <main className="min-h-screen bg-umarti-cream">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span> Concesionarias
        </nav>

        <h1 className="text-3xl font-bold text-umarti-navy">Concesionarias</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Conocé a las agencias y concesionarias que forman parte de Umarti Movilidad.
        </p>

        <div className="mt-8">
          {listado.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
              Todavía no hay concesionarias publicadas. Muy pronto vas a poder ver acá
              a las agencias de Umarti Movilidad.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listado.map((c) => (
                <ConcesionariaCard key={c.slug} concesionaria={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
