import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import VehiculoForm from "../../VehiculoForm";
import { actualizarVehiculo } from "../../actions";
import type { VehiculoRow, OfertaRow } from "../../tipos";

export default async function EditarVehiculoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(ADMIN_LOGIN_PATH);
  }

  const { data: perfil } = await supabase
    .from("profiles")
    .select("rol")
    .eq("id", user.id)
    .single();

  if (perfil?.rol !== "admin") {
    redirect(ADMIN_LOGIN_PATH);
  }

  const { data: vehiculo } = await supabase
    .from("vehiculos")
    .select("*")
    .eq("id", id)
    .single();

  if (!vehiculo) {
    notFound();
  }

  const { data: ofertas } = await supabase
    .from("ofertas_vehiculo")
    .select("*")
    .eq("vehiculo_id", id)
    .order("orden", { ascending: true });

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-umarti-navy">
            Editar {vehiculo.marca} {vehiculo.modelo}
          </h1>
          <Link
            href="/panel-mu9f3k7x/catalogo"
            className="text-sm font-semibold text-umarti-navy hover:underline"
          >
            ← Volver al listado
          </Link>
        </div>
        <VehiculoForm
          accion={actualizarVehiculo.bind(null, id)}
          vehiculo={vehiculo as VehiculoRow}
          ofertas={(ofertas ?? []) as OfertaRow[]}
        />
      </div>
    </main>
  );
}
