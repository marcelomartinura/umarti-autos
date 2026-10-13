import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import EliminarVendedorBoton from "./EliminarVendedorBoton";
import VendedorForm from "./VendedorForm";
import { crearVendedor } from "./actions";
import type { ConcesionariaArbol, VendedorListado } from "./tipos";

export default async function VendedoresAdminPage() {
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

  const [{ data: vendedores }, { data: concesionarias }, { data: marcas }] = await Promise.all([
    supabase
      .from("vendedores")
      .select("*, concesionarias(nombre), concesionaria_sucursales(nombre), marcas(nombre)")
      .order("nombre_completo"),
    supabase
      .from("concesionarias")
      .select("id, nombre, sucursales:concesionaria_sucursales(id, nombre)")
      .order("nombre"),
    supabase.from("marcas").select("id, nombre").order("nombre"),
  ]);

  const listado = (vendedores ?? []) as unknown as VendedorListado[];
  const concesionariasArbol = (concesionarias ?? []) as unknown as ConcesionariaArbol[];
  const marcasDisponibles = marcas ?? [];

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Panel de administración
            </p>
            <h1 className="text-2xl font-bold text-umarti-navy">Vendedores</h1>
          </div>
          <Link
            href="/panel"
            className="rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
          >
            ← Volver al panel
          </Link>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Prototipo inicial: cada vendedor activo tiene su propia miniweb en{" "}
          <span className="font-mono text-xs text-umarti-navy">/vendedores</span>. Puede
          pertenecer a una concesionaria (con su sucursal) o ser independiente. Todavía no
          muestra vehículos reales — eso se suma en una próxima etapa.
        </p>

        <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white">
          {listado.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-400">
              Todavía no hay vendedores cargados. Usá el formulario de abajo para agregar
              el primero.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Concesionaria / Sucursal</th>
                  <th className="px-4 py-3">Marca</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {listado.map((v) => (
                  <tr key={v.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-umarti-navy">
                      {v.nombre_completo}
                      {v.activo && (
                        <Link
                          href={`/vendedores/${v.slug}`}
                          target="_blank"
                          className="ml-2 text-xs font-normal text-umarti-orange hover:underline"
                        >
                          Ver landing ↗
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {v.concesionarias
                        ? `${v.concesionarias.nombre}${
                            v.concesionaria_sucursales
                              ? ` · ${v.concesionaria_sucursales.nombre}`
                              : ""
                          }`
                        : "Independiente"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{v.marcas?.nombre || "—"}</td>
                    <td className="px-4 py-3">
                      {v.activo ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                          Activo
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                          Inactivo
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/panel/vendedores/${v.id}/editar`}
                          className="text-sm font-semibold text-umarti-orange hover:underline"
                        >
                          Editar
                        </Link>
                        <EliminarVendedorBoton vendedorId={v.id} nombre={v.nombre_completo} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <section className="rounded-xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-umarti-navy">Nuevo vendedor</h2>
          <VendedorForm
            accion={crearVendedor}
            concesionarias={concesionariasArbol}
            marcas={marcasDisponibles}
            textoBoton="Crear vendedor"
          />
        </section>
      </div>
    </main>
  );
}
