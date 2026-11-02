import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import ListadoVehiculos from "./ListadoVehiculos";
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
    .select("id, slug, anio, publicado, destacado, created_at, versiones(nombre, modelos(nombre, marcas(nombre)))")
    .order("created_at", { ascending: false });

  const listado = (vehiculos ?? []) as unknown as VehiculoListado[];

  // Agrupar los vehículos por marca y, dentro de cada marca, por modelo
  // (marcas y modelos en orden alfabético), y dentro de cada modelo ordenar
  // las versiones también alfabéticamente (y por año, el más nuevo primero)
  // para que el listado se pueda recorrer/buscar más rápido — a pedido de Marcelo.
  type GrupoModeloVehiculos = { modelo: string; vehiculos: VehiculoListado[] };
  const gruposPorMarca = new Map<string, Map<string, VehiculoListado[]>>();
  for (const v of listado) {
    const marca = v.versiones?.modelos?.marcas?.nombre ?? "Sin marca";
    const modelo = v.versiones?.modelos?.nombre ?? "Sin modelo";
    if (!gruposPorMarca.has(marca)) gruposPorMarca.set(marca, new Map());
    const gruposPorModelo = gruposPorMarca.get(marca)!;
    if (!gruposPorModelo.has(modelo)) gruposPorModelo.set(modelo, []);
    gruposPorModelo.get(modelo)!.push(v);
  }
  const marcasOrdenadas = Array.from(gruposPorMarca.keys()).sort((a, b) =>
    a.localeCompare(b, "es", { sensitivity: "base" })
  );
  const arbolOrdenado = marcasOrdenadas.map((marca) => {
    const gruposPorModelo = gruposPorMarca.get(marca)!;
    const modelosOrdenados = Array.from(gruposPorModelo.keys()).sort((a, b) =>
      a.localeCompare(b, "es", { sensitivity: "base" })
    );
    const modelos: GrupoModeloVehiculos[] = modelosOrdenados.map((modelo) => ({
      modelo,
      vehiculos: gruposPorModelo.get(modelo)!.sort((a, b) => {
        const nombreA = a.versiones?.nombre ?? "";
        const nombreB = b.versiones?.nombre ?? "";
        const porNombre = nombreA.localeCompare(nombreB, "es", { sensitivity: "base" });
        if (porNombre !== 0) return porNombre;
        return (b.anio ?? 0) - (a.anio ?? 0);
      }),
    }));
    return { marca, modelos };
  });

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
          <Link
            href="/panel"
            className="rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
          >
            ← Volver al panel
          </Link>
        </div>

        <nav className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-md bg-umarti-navy px-4 py-2 text-sm font-semibold text-white">
            Vehículos
          </span>
          <Link
            href="/panel/catalogo/marcas"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Marcas
          </Link>
          <Link
            href="/panel/catalogo/modelos"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Modelos
          </Link>
          <Link
            href="/panel/catalogo/versiones"
            className="rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-umarti-navy hover:border-umarti-navy"
          >
            Versiones
          </Link>
          <Link
            href="/panel/catalogo/nuevo"
            className="ml-auto rounded-md bg-umarti-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            + Nuevo vehículo
          </Link>
        </nav>

        {listado.length === 0 ? (
          <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
            <p className="p-8 text-center text-sm text-gray-400">
              Todavía no cargaste ningún vehículo. Si es la primera vez, primero cargá al menos
              una marca, un modelo y una versión en las pestañas de arriba.
            </p>
          </div>
        ) : (
          <ListadoVehiculos arbol={arbolOrdenado} />
        )}
      </div>
    </main>
  );
}
