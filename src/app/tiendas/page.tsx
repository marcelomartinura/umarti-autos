import Link from "next/link";
import Header from "@/components/Header";
import AdSlot from "@/components/AdSlot";
import ConcesionariaCard from "@/components/ConcesionariaCard";
import VendedorListadoCard, { type VendedorResumen } from "@/components/VendedorListadoCard";
import { AD_SLOTS } from "@/lib/adsense";
import { createClient } from "@/lib/supabase/server";

export default async function TiendasPage() {
  const supabase = await createClient();

  const [{ data: concesionarias }, { data: vendedores }] = await Promise.all([
    supabase
      .from("concesionarias")
      .select("nombre, slug, descripcion, direccion, logo_url")
      .eq("activa", true)
      .order("nombre"),
    supabase
      .from("vendedores")
      .select("slug, nombre_completo, concesionarias(nombre), marcas(nombre)")
      .eq("activo", true)
      .order("nombre_completo"),
  ]);

  const listadoConcesionarias = concesionarias ?? [];
  const listadoVendedores = (vendedores ?? []) as unknown as VendedorResumen[];

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
          Conocé a las concesionarias y vendedores que forman parte de Umarti Movilidad,
          cada uno con su propia miniweb.
        </p>

        <div className="mt-8">
          <AdSlot slot={AD_SLOTS.tiendasListado} />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-bold text-umarti-navy">Concesionarias</h2>
          <p className="mt-1 text-sm text-gray-500">
            Landing propia para cada agencia: logo, marcas que vende, financiación,
            sucursales y novedades.
          </p>
          <div className="mt-6">
            {listadoConcesionarias.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
                Todavía no hay concesionarias publicadas. Muy pronto vas a poder ver acá
                a las agencias de Umarti Movilidad.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {listadoConcesionarias.map((c) => (
                  <ConcesionariaCard key={c.slug} concesionaria={c} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold text-umarti-navy">Vendedores</h2>
          <p className="mt-1 text-sm text-gray-500">
            Vendedores de concesionaria o independientes, con su propia miniweb de
            contacto.
          </p>
          <div className="mt-6">
            {listadoVendedores.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
                Todavía no hay vendedores publicados. Muy pronto vas a poder ver acá a
                los vendedores de Umarti Movilidad.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {listadoVendedores.map((v) => (
                  <VendedorListadoCard key={v.slug} vendedor={v} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-dashed border-umarti-navy/20 bg-white p-6 text-center text-sm text-gray-500">
          ¿Tenés una concesionaria, agencia o sos vendedor y querés sumarte?{" "}
          <Link
            href="/ecosistema-negocios#sumar-negocio"
            className="font-semibold text-umarti-orange hover:underline"
          >
            Conocé el Ecosistema de Negocios →
          </Link>
        </div>
      </div>
    </main>
  );
}
