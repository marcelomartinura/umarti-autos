import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import VersionForm from "../../VersionForm";
import { actualizarVersion } from "../../actions";
import type { VersionRow } from "../../../tipos";

export default async function EditarVersionPage({
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

  const { data: version } = await supabase
    .from("versiones")
    .select("*, modelos(marca_id)")
    .eq("id", id)
    .single();

  if (!version) {
    notFound();
  }

  const versionConModelo = version as unknown as VersionRow & {
    modelos: { marca_id: string } | null;
  };

  const { data: marcas } = await supabase
    .from("marcas")
    .select("id, nombre, modelos(id, nombre)")
    .order("nombre");

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-umarti-navy">Editar versión</h1>
          <Link
            href="/panel-mu9f3k7x/catalogo/versiones"
            className="text-sm font-semibold text-umarti-navy hover:underline"
          >
            ← Volver al listado
          </Link>
        </div>
        <section className="rounded-xl border border-gray-100 bg-white p-6">
          <VersionForm
            accion={actualizarVersion.bind(null, id)}
            marcas={
              (marcas ?? []) as {
                id: string;
                nombre: string;
                modelos: { id: string; nombre: string }[];
              }[]
            }
            version={versionConModelo}
            marcaIdInicial={versionConModelo.modelos?.marca_id}
            textoBoton="Guardar cambios"
          />
        </section>
      </div>
    </main>
  );
}
