import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import EliminarVehiculoBoton from "./EliminarVehiculoBoton";
import type { VehiculoListado } from "./tipos";

export default async function CatalogoAdminPage() {
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

  const { data: vehiculos } = await supabase
    .from("vehiculos")
    .select("id, slug, marca, modelo, version, anio, publicado, destacado, created_at")
    .order("created_at", { ascending: false });

  const listado = (vehiculos ?? []) as VehiculoListado[];

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Panel de administración
            </p>
            <h1 className="text-2xl font-bold text-umarti-navy">Catálogo de vehículos</h1>
          </div>
          <div className="flex gap-2">
            <Link
              href="/panel-mu9f3k7x"
              className="rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
            >
              ← Volver al panel
            </Link>
            <Link
              href="/panel-mu9f3k7x/catalogo/nuevo"
              className="rounded-md bg-umarti-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
              + Nuevo vehículo
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          {listado.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-400">
              Todavía no cargaste ningún vehículo.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 py-3">Vehículo</th>
                  <th className="px-4 py-3">Año</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3">Destacado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {listado.map((v) => (
                  <tr key={v.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-umarti-navy">
                      {v.marca} {v.modelo} {v.version}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{v.anio}</td>
                    <td className="px-4 py-3">
                      {v.publicado ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                          Publicado
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                          Borrador
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{v.destacado ? "✓" : "—"}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/panel-mu9f3k7x/catalogo/${v.id}/editar`}
                          className="text-sm font-semibold text-umarti-orange hover:underline"
                        >
                          Editar
                        </Link>
                        <EliminarVehiculoBoton
                          vehiculoId={v.id}
                          nombre={`${v.marca} ${v.modelo}`}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
