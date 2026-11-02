import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import ListadoModelos from "./ListadoModelos";
import ModeloForm from "./ModeloForm";
import { crearModelo } from "./actions";
import type { ModeloListado } from "../tipos";

export default async function ModelosAdminPage() {
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

  const { data: marcas } = await supabase
    .from("marcas")
    .select("id, nombre")
    .order("nombre");

  const { data: modelos } = await supabase
    .from("modelos")
    .select("*, marcas(nombre)")
    .order("nombre");

  const listadoMarcas = marcas ?? [];
  const listado = (modelos ?? []) as unknown as ModeloListado[];

  // Agrupar los modelos por marca (marcas en orden alfabético, y los
  // modelos de cada marca también en orden alfabético) para que el
  // listado se pueda recorrer/buscar más rápido — a pedido de Marcelo.
  const gruposPorMarca = new Map<string, ModeloListado[]>();
  for (const m of listado) {
    const marca = m.marcas?.nombre ?? "Sin marca";
    if (!gruposPorMarca.has(marca)) gruposPorMarca.set(marca, []);
    gruposPorMarca.get(marca)!.push(m);
  }
  const marcasConModelos = Array.from(gruposPorMarca.keys()).sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" })
  );
  for (const modelosDeMarca of gruposPorMarca.values()) {
    modelosDeMarca.sort((a, b) =>
      a.nombre.localeCompare(b.nombre, "es", { sensitivity: "base" })
    );
  }
  const grupos = marcasConModelos.map((marca) => ({
    marca,
    modelos: gruposPorMarca.get(marca)!,
  }));

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Panel de administración
            </p>
            <h1 className="text-2xl font-bold text-umarti-navy">Modelos</h1>
          </div>
          <Link
            href="/panel/catalogo"
            className="rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
          >
            ← Volver al catálogo
          </Link>
        </div>

        <nav className="mb-6 flex flex-wrap gap-2">
          <Link
            href="/panel/catalogo"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Vehículos
          </Link>
          <Link
            href="/panel/catalogo/marcas"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Marcas
          </Link>
          <span className="rounded-md bg-umarti-navy px-4 py-2 text-sm font-semibold text-white">
            Modelos
          </span>
          <Link
            href="/panel/catalogo/versiones"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Versiones
          </Link>
        </nav>

        {listadoMarcas.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Primero necesitás cargar al menos una{" "}
            <Link href="/panel/catalogo/marcas" className="underline">
              marca
            </Link>
            .
          </p>
        ) : (
          <>
            {listado.length === 0 ? (
              <div className="mb-6 overflow-hidden rounded-xl border border-gray-100 bg-white">
                <p className="p-8 text-center text-sm text-gray-400">
                  Todavía no hay modelos cargados. Usá el formulario de abajo.
                </p>
              </div>
            ) : (
              <ListadoModelos grupos={grupos} />
            )}

            <section className="rounded-xl border border-gray-100 bg-white p-6">
              <h2 className="mb-4 text-lg font-bold text-umarti-navy">Nuevo modelo</h2>
              <ModeloForm accion={crearModelo} marcas={listadoMarcas} textoBoton="Crear modelo" />
            </section>
          </>
        )}
      </div>
    </main>
  );
}
