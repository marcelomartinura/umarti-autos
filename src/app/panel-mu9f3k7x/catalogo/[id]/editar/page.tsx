import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_LOGIN_PATH } from "@/lib/admin-config";
import VehiculoForm from "../../VehiculoForm";
import { actualizarVehiculo } from "../../actions";
import type { CatalogoMarca, ColorCatalogo, VehiculoConCadena } from "../../tipos";

export default async function EditarVehiculoPage({
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

  const { data: vehiculo } = await supabase
    .from("vehiculos")
    .select("*, versiones(id, nombre, modelo_id, modelos(id, nombre, marca_id, marcas(id, nombre)))")
    .eq("id", id)
    .single();

  if (!vehiculo) {
    notFound();
  }

  const vehiculoConCadena = vehiculo as unknown as VehiculoConCadena;
  const modeloInfo = vehiculoConCadena.versiones?.modelos;

  const { data: marcas } = await supabase
    .from("marcas")
    .select("id, nombre, modelos(id, nombre, versiones(id, nombre))")
    .order("nombre");

  const { data: colores } = await supabase
    .from("colores_catalogo")
    .select("id, nombre, hex, orden")
    .order("orden");

  const catalogoColores = (colores ?? []) as ColorCatalogo[];
  const coloresSeleccionadosInicial = catalogoColores
    .filter((c) => vehiculoConCadena.colores?.some((vc) => vc.nombre === c.nombre))
    .map((c) => `${c.id}|${c.nombre}|${c.hex}`);

  const nombreVehiculo = [modeloInfo?.marcas?.nombre, modeloInfo?.nombre]
    .filter(Boolean)
    .join(" ");

  return (
    <main className="min-h-screen bg-umarti-cream p-6">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-umarti-navy">
            Editar {nombreVehiculo || "vehículo"}
          </h1>
          <Link
            href="/panel-mu9f3k7x/catalogo"
            className="text-sm font-semibold text-umarti-navy hover:underline"
          >
            ← Volver al listado
          </Link>
        </div>
        <VehiculoForm
          accion={actualizarVehiculo.bind(null, id)}
          vehiculo={vehiculoConCadena}
          catalogoMarcas={(marcas ?? []) as unknown as CatalogoMarca[]}
          catalogoColores={catalogoColores}
          marcaIdInicial={modeloInfo?.marcas?.id}
          modeloIdInicial={modeloInfo?.id}
          coloresSeleccionadosInicial={coloresSeleccionadosInicial}
        />
      </div>
    </main>
  );
}
