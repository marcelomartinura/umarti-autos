import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import EliminarMarcaBoton from "./EliminarMarcaBoton";
import MarcaForm from "./MarcaForm";
import { crearMarca } from "./actions";
import type { MarcaRow } from "../tipos";

export default async function MarcasAdminPage() {
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

  const { data: marcas } = await supabase.from("marcas").select("*").order("nombre");
  const listado = (marcas ?? []) as MarcaRow[];

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Panel de administración
            </p>
            <h1 className="text-2xl font-bold text-umarti-navy">Marcas</h1>
          </div>
          <Link
            href="/panel-mu9f3k7x/catalogo"
            className="rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
          >
            ← Volver al catálogo
          </Link>
        </div>

        <nav className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/panel-mu9f3k7x/catalogo"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Vehículos
          </Link>
          <span className="rounded-md bg-umarti-navy px-4 py-2 text-sm font-semibold text-white">
            Marcas
          </span>
          <Link
            href="/panel-mu9f3k7x/catalogo/modelos"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Modelos
          </Link>
          <Link
            href="/panel-mu9f3k7x/catalogo/versiones"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Versiones
          </Link>
        </nav>

        <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white">
          {listado.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-400">
              Todavía no hay marcas cargadas. Usá el formulario de abajo para agregar la primera.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">País</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {listado.map((m) => (
                  <tr key={m.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-umarti-navy">{m.nombre}</td>
                    <td className="px-4 py-3 text-gray-500">{m.pais || "—"}</td>
                    <td className="px-4 py-3">
                      {m.activa ? (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                          Activa
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                          Inactiva
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/panel-mu9f3k7x/catalogo/marcas/${m.id}/editar`}
                          className="text-sm font-semibold text-umarti-orange hover:underline"
                        >
                          Editar
                        </Link>
                        <EliminarMarcaBoton marcaId={m.id} nombre={m.nombre} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <section className="rounded-xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-umarti-navy">Nueva marca</h2>
          <MarcaForm accion={crearMarca} textoBoton="Crear marca" />
        </section>
      </div>
    </main>
  );
}
