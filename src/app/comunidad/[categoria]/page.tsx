import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import AdSlot from "@/components/AdSlot";
import TemaDebateCard from "@/components/TemaDebateCard";
import IconoCategoriaComunidad from "@/components/IconoCategoriaComunidad";
import { AD_SLOTS } from "@/lib/adsense";
import {
  UMARTI_WHATSAPP_ECOSISTEMA,
  categoriasComunidad,
  temasDebate,
} from "@/lib/mock-data";

function getCategoria(slug: string) {
  return categoriasComunidad.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categoria: string }>;
}): Promise<Metadata> {
  const { categoria: categoriaSlug } = await params;
  const categoria = getCategoria(categoriaSlug);
  if (!categoria) return {};
  return {
    title: `Comunidad de ${categoria.categoria} | Umarti Movilidad`,
    description: categoria.descripcion,
  };
}

export default async function ComunidadCategoriaPage({
  params,
}: {
  params: Promise<{ categoria: string }>;
}) {
  const { categoria: categoriaSlug } = await params;
  const categoria = getCategoria(categoriaSlug);

  if (!categoria) {
    notFound();
  }

  const temas = temasDebate.filter((t) =>
    t.industrias.includes(categoria.categoria)
  );
  const otrasCategorias = categoriasComunidad.filter(
    (c) => c.slug !== categoria.slug
  );

  const mensajeWhatsapp = encodeURIComponent(
    `Hola, quiero sumarme a la Comunidad Umarti de ${categoria.categoria}.`
  );

  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark py-14">
        <div className="mx-auto max-w-7xl px-6">
          <nav className="mb-4 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>{" "}
            <span className="mx-1">›</span>{" "}
            <Link href="/comunidad" className="hover:text-white">
              Comunidad
            </Link>{" "}
            <span className="mx-1">›</span> {categoria.categoria}
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/10 text-white">
                <IconoCategoriaComunidad categoria={categoria.categoria} />
              </span>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Comunidad de {categoria.categoria}
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-blue-100">
                  {categoria.descripcion}
                </p>
              </div>
            </div>
            <a
              href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${mensajeWhatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Quiero sumarme
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mt-8 rounded-2xl border border-dashed border-umarti-navy/20 bg-white p-6">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-umarti-navy">
              ¿Qué vas a encontrar acá?
            </span>{" "}
            en la Zona de Conocimiento de {categoria.categoria} subimos un
            tema — un Customer Journey, un funnel de venta, si los agentes
            conversacionales reemplazan o potencian al vendedor — y se debate
            entre los participantes de la comunidad. Por ahora esto es una
            lista de interés: primero generamos contenido y validamos que le
            sirva a la industria, y a medida que se sume gente definimos la
            plataforma final de conversación.
          </p>
        </div>

        <div className="mt-12">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold text-umarti-navy">
                Zona de Conocimiento
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Temas para debatir entre colegas de{" "}
                {categoria.categoria.toLowerCase()}.
              </p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-umarti-navy px-4 py-2 text-xs font-semibold text-white">
                Todos
              </span>
              <span
                className="flex items-center gap-1.5 rounded-full border border-dashed border-gray-200 px-4 py-2 text-xs font-medium text-gray-400"
                title="Próximamente"
              >
                Líder
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                  Próx.
                </span>
              </span>
              <span
                className="flex items-center gap-1.5 rounded-full border border-dashed border-gray-200 px-4 py-2 text-xs font-medium text-gray-400"
                title="Próximamente"
              >
                Vendedor
                <span className="rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-gray-400">
                  Próx.
                </span>
              </span>
            </div>
          </div>

          <div className="mb-6 rounded-xl border border-dashed border-umarti-navy/20 bg-white p-4 text-sm text-gray-600">
            <span className="font-semibold text-umarti-navy">
              Este espacio es para compartir conocimiento y debatir,
            </span>{" "}
            no para publicar avisos de venta ni autopromocionarse. Los temas
            comerciales tienen su lugar en Ecosistema de Negocios; acá la
            idea es aprender entre colegas de la industria.
          </div>

          {temas.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-400">
              Todavía no hay temas cargados para esta categoría.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {temas.map((tema) => (
                <TemaDebateCard key={tema.slug} tema={tema} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-12">
          <AdSlot slot={AD_SLOTS.comunidadCategoria} />
        </div>

        {otrasCategorias.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-bold text-umarti-navy">
              Otras comunidades
            </h2>
            <div className="flex flex-wrap gap-3">
              {otrasCategorias.map((c) => (
                <Link
                  key={c.slug}
                  href={`/comunidad/${c.slug}`}
                  className="rounded-full border border-umarti-navy px-4 py-2 text-sm font-medium text-umarti-navy hover:bg-umarti-navy hover:text-white"
                >
                  Comunidad de {c.categoria}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-umarti-navy to-umarti-navyDark p-8 text-center">
          <h2 className="text-xl font-bold text-white">
            ¿Tenés una idea para la Comunidad de {categoria.categoria}?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100">
            Contanos qué te gustaría encontrar acá y lo tenemos en cuenta
            para cuando la lancemos.
          </p>
          <a
            href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${encodeURIComponent(
              `Hola, tengo una idea para la Comunidad Umarti de ${categoria.categoria}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-600 px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </main>
  );
}
