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

function formatFecha(fecha: string) {
  try {
    return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return fecha;
  }
}

export default async function ConcesionariaDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: concesionaria } = await supabase
    .from("concesionarias")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!concesionaria) {
    notFound();
  }

  const [{ data: marcasVinculadas }, { data: sucursales }, { data: novedades }] =
    await Promise.all([
      supabase
        .from("concesionaria_marcas")
        .select("marcas(nombre, logo_url)")
        .eq("concesionaria_id", concesionaria.id),
      supabase
        .from("concesionaria_sucursales")
        .select("*")
        .eq("concesionaria_id", concesionaria.id)
        .order("orden"),
      supabase
        .from("concesionaria_novedades")
        .select("*")
        .eq("concesionaria_id", concesionaria.id)
        .order("fecha", { ascending: false }),
    ]);

  type MarcaEmbebida = { nombre: string; logo_url: string | null } | null;
  const marcasVinculadasTipadas = (marcasVinculadas ?? []) as unknown as {
    marcas: MarcaEmbebida;
  }[];
  const marcas = marcasVinculadasTipadas
    .map((m) => m.marcas)
    .filter((m): m is NonNullable<MarcaEmbebida> => Boolean(m));

  const listaSucursales = sucursales ?? [];
  const listaNovedades = novedades ?? [];

  const mensajeWhatsapp = encodeURIComponent(
    `Hola, te contacto desde tu perfil en Umarti Movilidad (${concesionaria.nombre}).`
  );

  const tieneFinanciacion = concesionaria.ofrece_plan_ahorro || concesionaria.financiacion_nota;

  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="relative h-48 overflow-hidden bg-gradient-to-r from-umarti-navy to-umarti-navyDark sm:h-64">
        {concesionaria.portada_url && (
          <>
            <Image
              src={concesionaria.portada_url}
              alt=""
              fill
              priority
              className="object-cover"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-umarti-navy/80 via-umarti-navy/20 to-transparent" />
          </>
        )}
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <nav className="mb-4 mt-4 text-xs text-gray-400">
          <Link href="/" className="hover:text-umarti-orange">
            Inicio
          </Link>{" "}
          <span className="mx-1">›</span>{" "}
          <Link href="/concesionarias" className="hover:text-umarti-orange">
            Concesionarias
          </Link>{" "}
          <span className="mx-1">›</span> {concesionaria.nombre}
        </nav>

        <div className="-mt-16 flex flex-wrap items-end justify-between gap-6 sm:-mt-20">
          <div className="flex items-end gap-4">
            {concesionaria.logo_url ? (
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-umarti-cream bg-white shadow-lg sm:h-28 sm:w-28">
                <Image
                  src={concesionaria.logo_url}
                  alt={concesionaria.nombre}
                  width={80}
                  height={80}
                  className="h-16 w-16 object-contain sm:h-20 sm:w-20"
                />
              </span>
            ) : (
              <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-4 border-umarti-cream bg-umarti-navy text-2xl font-bold text-white shadow-lg sm:h-28 sm:w-28">
                {iniciales(concesionaria.nombre)}
              </span>
            )}
            <div>
              <h1 className="text-2xl font-bold text-umarti-navy sm:text-3xl">
                {concesionaria.nombre}
              </h1>
              {concesionaria.direccion && (
                <p className="text-sm text-gray-500">{concesionaria.direccion}</p>
              )}
            </div>
          </div>

          {concesionaria.whatsapp && (
            <a
              href={`https://wa.me/${concesionaria.whatsapp}?text=${mensajeWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Contactar por WhatsApp
            </a>
          )}
        </div>

        {concesionaria.descripcion && (
          <div className="mt-6 rounded-xl border border-gray-100 bg-white p-5 text-sm text-gray-600">
            <p className="max-w-3xl whitespace-pre-line">{concesionaria.descripcion}</p>
          </div>
        )}

        {marcas.length > 0 && (
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
              Marcas que vende
            </h2>
            <div className="flex flex-wrap gap-3">
              {marcas.map((marca) => (
                <Link
                  key={marca.nombre}
                  href={`/catalogo?marca=${encodeURIComponent(marca.nombre)}`}
                  className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-umarti-navy hover:border-umarti-orange"
                >
                  {marca.logo_url ? (
                    <Image
                      src={marca.logo_url}
                      alt=""
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                  ) : null}
                  {marca.nombre}
                </Link>
              ))}
            </div>
          </div>
        )}

        {tieneFinanciacion && (
          <div className="mt-6">
            <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-500">
              Financiación
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {concesionaria.ofrece_plan_ahorro && (
                <span className="rounded-full bg-umarti-orange/10 px-4 py-2 text-sm font-semibold text-umarti-orange">
                  Plan de Ahorro disponible
                </span>
              )}
              {concesionaria.financiacion_nota && (
                <p className="text-sm text-gray-600">{concesionaria.financiacion_nota}</p>
              )}
            </div>
          </div>
        )}

        {listaSucursales.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-umarti-navy">Sucursales</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {listaSucursales.map((s) => (
                <div key={s.id} className="rounded-xl border border-gray-100 bg-white p-5">
                  <p className="font-bold text-umarti-navy">{s.nombre}</p>
                  {s.direccion && <p className="mt-1 text-sm text-gray-500">{s.direccion}</p>}
                  {s.telefono && (
                    <p className="mt-1 text-sm text-gray-500">📞 {s.telefono}</p>
                  )}
                  {s.email && <p className="mt-1 text-sm text-gray-500">✉️ {s.email}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {listaNovedades.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-umarti-navy">Novedades</h2>
            <div className="space-y-4">
              {listaNovedades.map((n) => (
                <div key={n.id} className="rounded-xl border border-gray-100 bg-white p-5">
                  <p className="text-xs text-gray-400">{formatFecha(n.fecha)}</p>
                  <p className="mt-1 font-bold text-umarti-navy">{n.titulo}</p>
                  {n.texto && <p className="mt-1 text-sm text-gray-600">{n.texto}</p>}
                  {n.link_url && (
                    <a
                      href={n.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm font-semibold text-umarti-orange hover:underline"
                    >
                      Ver más →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10 rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          Muy pronto vas a poder ver acá los vehículos publicados por {concesionaria.nombre}.
        </div>
      </div>
    </main>
  );
}
