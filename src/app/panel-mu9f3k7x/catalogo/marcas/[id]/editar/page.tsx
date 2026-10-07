import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import MarcaForm from "../../MarcaForm";
import { actualizarMarca } from "../../actions";
import type { MarcaRow } from "../../../tipos";

export default async function EditarMarcaPage({
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

  const { data: marca } = await supabase.from("marcas").select("*").eq("id", id).single();

  if (!marca) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-umarti-navy">Editar marca</h1>
          <Link
            href="/panel-mu9f3k7x/catalogo/marcas"
            className="text-sm font-semibold text-umarti-navy hover:underline"
          >
            ← Volver al listado
          </Link>
        </div>
        <section className="rounded-xl border border-gray-100 bg-white p-6">
          <MarcaForm
            accion={actualizarMarca.bind(null, id)}
            marca={marca as MarcaRow}
            textoBoton="Guardar cambios"
          />
        </section>
      </div>
    </main>
  );
}
