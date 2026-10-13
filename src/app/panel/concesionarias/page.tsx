import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import EliminarConcesionariaBoton from "./EliminarConcesionariaBoton";
import ConcesionariaForm from "./ConcesionariaForm";
import { crearConcesionaria } from "./actions";
import type { ConcesionariaRow } from "./tipos";

export default async function ConcesionariasAdminPage() {
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

  const { data: concesionarias } = await supabase
    .from("concesionarias")
    .select("*")
    .order("nombre");
  const listado = (concesionarias ?? []) as ConcesionariaRow[];

  const { data: marcas } = await supabase.from("marcas").select("id, nombre").order("nombre");
  const marcasDisponibles = marcas ?? [];

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Panel de administración
            </p>
            <h1 className="text-2xl font-bold text-umarti-navy">Concesionarias</h1>
          </div>
          <Link
            href="/panel"
            className="rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
          >
            ← Volver al panel
          </Link>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Cada concesionaria que actives acá se publica automáticamente como una
          landing propia en{" "}
          <span className="font-mono text-xs text-umarti-navy">/concesionarias</span>: logo,
          portada, descripción, contacto, marcas que vende, financiación, sucursales y
          novedades propias. La carga de vehículos por concesionaria se suma en una
          próxima etapa.
        </p>

        <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white">
          {listado.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-400">
              Todavía no hay concesionarias cargadas. Usá el formulario de abajo para
              agregar la primera.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Dirección</th>
                  <th className="px-4 py-3">Estado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {listado.map((c) => (
                  <tr key={c.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium text-umarti-navy">
                      {c.nombre}
                      {c.activa && (
                        <Link
                          href={`/concesionarias/${c.slug}`}
                          target="_blank"
                          className="ml-2 text-xs font-normal text-umarti-orange hover:underline"
                        >
                          Ver landing ↗
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{c.direccion || "—"}</td>
                    <td className="px-4 py-3">
                      {c.activa ? (
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
                          href={`/panel/concesionarias/${c.id}/editar`}
                          className="text-sm font-semibold text-umarti-orange hover:underline"
                        >
                          Editar
                        </Link>
                        <EliminarConcesionariaBoton concesionariaId={c.id} nombre={c.nombre} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <section className="rounded-xl border border-gray-100 bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-umarti-navy">Nueva concesionaria</h2>
          <ConcesionariaForm
            accion={crearConcesionaria}
            marcasDisponibles={marcasDisponibles}
            textoBoton="Crear concesionaria"
          />
        </section>
      </div>
    </main>
  );
}
