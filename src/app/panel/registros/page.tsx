import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";

export const metadata: Metadata = {
  title: "Registros | Panel de administración",
  robots: { index: false, follow: false },
};

interface LeadRegistro {
  id: string;
  tipo: "particular" | "concesionaria";
  nombre: string;
  email: string | null;
  whatsapp: string | null;
  nombre_negocio: string | null;
  mensaje: string | null;
  created_at: string;
}

export default async function RegistrosAdminPage() {
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

  const { data: registros } = await supabase
    .from("leads_registro")
    .select("*")
    .order("created_at", { ascending: false });

  const listado = (registros ?? []) as LeadRegistro[];

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Panel de administración
            </p>
            <h1 className="text-2xl font-bold text-umarti-navy">Registros</h1>
          </div>
          <Link
            href="/panel"
            className="rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
          >
            ← Volver al panel
          </Link>
        </div>

        <p className="mb-6 text-sm text-gray-500">
          Personas y negocios que dejaron sus datos en{" "}
          <span className="font-mono text-xs text-umarti-navy">
            /mi-cuenta
          </span>{" "}
          o en{" "}
          <span className="font-mono text-xs text-umarti-navy">
            /mi-cuenta/concesionaria
          </span>
          . Todavía es solo lectura: el seguimiento y contacto se hace por
          fuera, con los datos de contacto de cada fila.
        </p>

        <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
          {listado.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-400">
              Todavía no hay registros. Van a aparecer acá apenas alguien
              complete el formulario de Mi Cuenta.
            </p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400">
                <tr>
                  <th className="px-4 py-3">Fecha</th>
                  <th className="px-4 py-3">Tipo</th>
                  <th className="px-4 py-3">Nombre</th>
                  <th className="px-4 py-3">Negocio</th>
                  <th className="px-4 py-3">Contacto</th>
                  <th className="px-4 py-3">Mensaje</th>
                </tr>
              </thead>
              <tbody>
                {listado.map((registro) => (
                  <tr key={registro.id} className="border-t border-gray-100 align-top">
                    <td className="whitespace-nowrap px-4 py-3 text-gray-500">
                      {new Date(registro.created_at).toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      {registro.tipo === "concesionaria" ? (
                        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          Concesionaria
                        </span>
                      ) : (
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
                          Particular
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-umarti-navy">
                      {registro.nombre}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {registro.nombre_negocio || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500">
                      {registro.whatsapp && <div>{registro.whatsapp}</div>}
                      {registro.email && <div>{registro.email}</div>}
                      {!registro.whatsapp && !registro.email && "—"}
                    </td>
                    <td className="max-w-xs px-4 py-3 text-gray-500">
                      {registro.mensaje || "—"}
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
