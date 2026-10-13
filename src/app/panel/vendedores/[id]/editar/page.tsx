import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import VendedorForm from "../../VendedorForm";
import { actualizarVendedor } from "../../actions";
import type { ConcesionariaArbol, VendedorRow } from "../../tipos";

export default async function EditarVendedorPage({
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

  const { data: vendedor } = await supabase
    .from("vendedores")
    .select("*")
    .eq("id", id)
    .single();

  if (!vendedor) {
    notFound();
  }

  const [{ data: concesionarias }, { data: marcas }] = await Promise.all([
    supabase
      .from("concesionarias")
      .select("id, nombre, sucursales:concesionaria_sucursales(id, nombre)")
      .order("nombre"),
    supabase.from("marcas").select("id, nombre").order("nombre"),
  ]);

  const concesionariasArbol = (concesionarias ?? []) as unknown as ConcesionariaArbol[];
  const marcasDisponibles = marcas ?? [];

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-umarti-navy">Editar vendedor</h1>
          <Link
            href="/panel/vendedores"
            className="text-sm font-semibold text-umarti-navy hover:underline"
          >
            ← Volver al listado
          </Link>
        </div>
        <section className="rounded-xl border border-gray-100 bg-white p-6">
          <VendedorForm
            accion={actualizarVendedor.bind(null, id)}
            vendedor={vendedor as VendedorRow}
            concesionarias={concesionariasArbol}
            marcas={marcasDisponibles}
            textoBoton="Guardar cambios"
          />
        </section>
      </div>
    </main>
  );
}
