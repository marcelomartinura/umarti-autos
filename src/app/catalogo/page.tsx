import Link from "next/link";
import { Suspense } from "react";
import Header from "@/components/Header";
import CatalogoListado from "@/components/CatalogoListado";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";
import { createClient } from "@/lib/supabase/server";
import { aVehiculoPlano, VehiculoRealCrudo } from "./tipos";

export default async function CatalogoPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("vehiculos")
    .select(
      "id, slug, anio, tipo, motorizacion, transmision, precio, precio_moneda, plan_ahorro, destacado, fotos, versiones(nombre, modelos(nombre, marcas(nombre, logo_url)))"
    )
    .eq("publicado", true)
    .order("created_at", { ascending: false });

  const crudos = (data ?? []) as unknown as VehiculoRealCrudo[];
  const vehiculos = crudos.map(aVehiculoPlano);

  return (
    <main className="min-h-screen bg-umarti-cream">
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
          <AdSlot slot={AD_SLOTS.catalogoListado} />
        </div>

        <div className="mt-8">
          <Suspense fallback={null}>
            <CatalogoListado vehiculos={vehiculos} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
