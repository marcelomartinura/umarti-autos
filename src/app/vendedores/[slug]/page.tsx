import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import { createClient } from "@/lib/supabase/server";

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join("")
    .toUpperCase();
}

type ConcesionariaEmbebida = { nombre: string; slug: string } | null;
type SucursalEmbebida = { nombre: string; direccion: string | null; telefono: string | null } | null;
type MarcaEmbebida = { nombre: string; logo_url: string | null } | null;

export default async function VendedorDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: vendedorCrudo } = await supabase
    .from("vendedores")
    .select(
      "*, concesionarias(nombre, slug), concesionaria_sucursales(nombre, direccion, telefono), marcas(nombre, logo_url)"
    )
    .eq("slug", slug)
    .single();

  if (!vendedorCrudo) {
    notFound();
  }

  const vendedorTipado = vendedorCrudo as unknown as {
    nombre_completo: string;
    email: string | null;
    whatsapp: string | null;
    concesionarias: ConcesionariaEmbebida;
    concesionaria_sucursales: SucursalEmbebida;
    marcas: MarcaEmbebida;
  };

  const concesionaria = vendedorTipado.concesionarias;
  const sucursal = vendedorTipado.concesionaria_sucursales;
  const marca = vendedorTipado.marcas;

  const mensajeWhatsapp = encodeURIComponent(
    `Hola ${vendedorTipado.nombre_completo}, te contacto desde tu perfil en Umarti Movilidad.`
  );

  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="mx-auto max-w-3xl px-6 py-10">
        <nav className="mb-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span>{" "}
          <Link href="/tiendas" className="hover:text-umarti-orange">
            Tiendas
          </Link>{" "}
          <span className="mx-1">›</span> {vendedorTipado.nombre_completo}
        </nav>

        <div className="flex flex-wrap items-center gap-5 rounded-2xl border border-gray-100 bg-white p-6">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-umarti-navy text-xl font-bold text-white">
            {iniciales(vendedorTipado.nombre_completo)}
          </span>
          <div>
            <h1 className="text-2xl font-bold text-umarti-navy">
              {vendedorTipado.nombre_completo}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              {concesionaria ? (
                <>
                  Vendedor en{" "}
                  <Link
                    href={`/concesionarias/${concesionaria.slug}`}
                    className="font-semibold text-umarti-orange hover:underline"
                  >
                    {concesionaria.nombre}
                  </Link>
                  {sucursal && ` · ${sucursal.nombre}`}
                </>
              ) : (
                "Vendedor independiente"
              )}
            </p>
            {marca && (
              <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-umarti-cream px-3 py-1 text-xs font-medium text-umarti-navy">
                {marca.logo_url && (
                  <Image
                    src={marca.logo_url}
                    alt=""
                    width={16}
                    height={16}
                    className="h-4 w-4 object-contain"
                  />
                )}
                Vende {marca.nombre}
              </span>
            )}
          </div>
        </div>

        {sucursal && (sucursal.direccion || sucursal.telefono) && (
          <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5 text-sm text-gray-600">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-wide text-gray-400">
              Sucursal
            </h2>
            <p className="font-semibold text-umarti-navy">{sucursal.nombre}</p>
            {sucursal.direccion && <p className="mt-1 text-gray-500">{sucursal.direccion}</p>}
            {sucursal.telefono && <p className="mt-1 text-gray-500">📞 {sucursal.telefono}</p>}
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {vendedorTipado.whatsapp && (
            <a
              href={`https://wa.me/${vendedorTipado.whatsapp}?text=${mensajeWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Contactar por WhatsApp
            </a>
          )}
          {vendedorTipado.email && (
            <a
              href={`mailto:${vendedorTipado.email}`}
              className="rounded-md border border-umarti-navy px-6 py-3 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
            >
              Escribir por correo
            </a>
          )}
        </div>

        <div className="mt-10 rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          Muy pronto vas a poder ver acá los vehículos publicados por{" "}
          {vendedorTipado.nombre_completo}.
        </div>
      </div>
    </main>
  );
}
