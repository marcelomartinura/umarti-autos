import Link from "next/link";
import Header from "@/components/Header";
import VendedorListadoCard, { type VendedorResumen } from "@/components/VendedorListadoCard";
import { createClient } from "@/lib/supabase/server";

export default async function VendedoresPage() {
  const supabase = await createClient();
  const { data: vendedores } = await supabase
    .from("vendedores")
    .select("slug, nombre_completo, concesionarias(nombre), marcas(nombre)")
    .eq("activo", true)
    .order("nombre_completo");

  const listado = (vendedores ?? []) as unknown as VendedorResumen[];

  return (
    <main className="min-h-screen bg-umarti-cream">
      <Header />
      <div className="mx-auto max-w-7xl px-6 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span> Vendedores
        </nav>

        <h1 className="text-3xl font-bold text-umarti-navy">Vendedores</h1>
        <p className="mt-2 max-w-2xl text-sm text-gray-500">
          Conocé a los vendedores de Umarti Movilidad, de concesionaria o independientes.
        </p>

        <div className="mt-8">
          {listado.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
              Todavía no hay vendedores publicados. Muy pronto vas a poder ver acá a los
              vendedores de Umarti Movilidad.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {listado.map((v) => (
                <VendedorListadoCard key={v.slug} vendedor={v} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
