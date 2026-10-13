import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import ConcesionariaForm from "../../ConcesionariaForm";
import { actualizarConcesionaria } from "../../actions";
import type { ConcesionariaRow, NovedadInput, SucursalInput } from "../../tipos";

export default async function EditarConcesionariaPage({
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

  const { data: concesionaria } = await supabase
    .from("concesionarias")
    .select("*")
    .eq("id", id)
    .single();

  if (!concesionaria) {
    notFound();
  }

  const [{ data: marcas }, { data: marcasVinculadas }, { data: sucursales }, { data: novedades }] =
    await Promise.all([
      supabase.from("marcas").select("id, nombre").order("nombre"),
      supabase.from("concesionaria_marcas").select("marca_id").eq("concesionaria_id", id),
      supabase
        .from("concesionaria_sucursales")
        .select("*")
        .eq("concesionaria_id", id)
        .order("orden"),
      supabase
        .from("concesionaria_novedades")
        .select("*")
        .eq("concesionaria_id", id)
        .order("fecha", { ascending: false }),
    ]);

  const marcasDisponibles = marcas ?? [];
  const marcasSeleccionadas = (marcasVinculadas ?? []).map((m) => m.marca_id as string);

  const sucursalesIniciales: SucursalInput[] = (sucursales ?? []).map((s) => ({
    nombre: s.nombre ?? "",
    direccion: s.direccion ?? "",
    telefono: s.telefono ?? "",
    email: s.email ?? "",
  }));

  const novedadesIniciales: NovedadInput[] = (novedades ?? []).map((n) => ({
    titulo: n.titulo ?? "",
    texto: n.texto ?? "",
    fecha: n.fecha ?? "",
    link_url: n.link_url ?? "",
  }));

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-umarti-navy">Editar concesionaria</h1>
          <Link
            href="/panel/concesionarias"
            className="text-sm font-semibold text-umarti-navy hover:underline"
          >
            ← Volver al listado
          </Link>
        </div>
        <section className="rounded-xl border border-gray-100 bg-white p-6">
          <ConcesionariaForm
            accion={actualizarConcesionaria.bind(null, id)}
            concesionaria={concesionaria as ConcesionariaRow}
            marcasDisponibles={marcasDisponibles}
            marcasSeleccionadas={marcasSeleccionadas}
            sucursalesIniciales={sucursalesIniciales}
            novedadesIniciales={novedadesIniciales}
            textoBoton="Guardar cambios"
          />
        </section>
      </div>
    </main>
  );
}
