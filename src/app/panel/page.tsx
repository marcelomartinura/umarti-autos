import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { cerrarSesionAdmin } from "./actions";

export const metadata: Metadata = {
  title: "Panel de administración | Umarti Movilidad",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: perfil } = user
    ? await supabase
        .from("profiles")
        .select("nombre, rol")
        .eq("id", user.id)
        .single()
    : { data: null };

  return (
    <main className="min-h-screen bg-umarti-cream">
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
              Umarti Movilidad
            </p>
            <h1 className="text-lg font-bold text-umarti-navy">
              Panel de administración
            </h1>
          </div>
          <form action={cerrarSesionAdmin}>
            <button
              type="submit"
              className="rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="rounded-2xl border border-gray-100 bg-white p-6">
          <p className="text-sm text-gray-500">Ingresaste como</p>
          <p className="mt-1 font-semibold text-umarti-navy">
            {perfil?.nombre || user?.email}
          </p>
          <p className="text-xs text-gray-400">
            {user?.email} · rol: {perfil?.rol}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/panel/catalogo"
            className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:border-umarti-orange hover:shadow-sm"
          >
            <p className="text-lg font-bold text-umarti-navy">Catálogo</p>
            <p className="mt-1 text-sm text-gray-500">
              Marcas, modelos, versiones y la ficha de cada vehículo.
            </p>
          </Link>
          <Link
            href="/panel/concesionarias"
            className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:border-umarti-orange hover:shadow-sm"
          >
            <p className="text-lg font-bold text-umarti-navy">Concesionarias</p>
            <p className="mt-1 text-sm text-gray-500">
              Landing propia para cada agencia: logo, portada, descripción y contacto.
            </p>
          </Link>
          <Link
            href="/panel/vendedores"
            className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:border-umarti-orange hover:shadow-sm"
          >
            <p className="text-lg font-bold text-umarti-navy">Vendedores</p>
            <p className="mt-1 text-sm text-gray-500">
              Miniwebs individuales, de concesionaria o independientes.
            </p>
          </Link>
          <Link
            href="/panel/registros"
            className="rounded-2xl border border-gray-100 bg-white p-6 transition hover:border-umarti-orange hover:shadow-sm"
          >
            <p className="text-lg font-bold text-umarti-navy">Registros</p>
            <p className="mt-1 text-sm text-gray-500">
              Particulares y concesionarias que dejaron sus datos en Mi
              Cuenta.
            </p>
          </Link>
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-6 opacity-60">
            <p className="text-lg font-bold text-gray-400">Publicaciones</p>
            <p className="mt-1 text-sm text-gray-400">
              &quot;Vender mi auto&quot; — próximamente.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-umarti-navy/20 bg-white p-6 text-sm text-gray-500">
          El login ya está andando, el catálogo ya se puede cargar, las landings de
          Concesionarias, el prototipo de Vendedores y ahora los Registros de Mi Cuenta.
          Las publicaciones de &quot;Vender mi auto&quot; se van a ir sumando acá en las
          próximas entregas.
        </div>
      </div>
    </main>
  );
}
