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

  const mensajeWhatsapp = encodeURIComponent(
    `Hola, te contacto desde tu perfil en Umarti Movilidad (${concesionaria.nombre}).`
  );

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

        <div className="mt-10 rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center text-sm text-gray-400">
          Muy pronto vas a poder ver acá los vehículos publicados por {concesionaria.nombre}.
        </div>
      </div>
    </main>
  );
}
