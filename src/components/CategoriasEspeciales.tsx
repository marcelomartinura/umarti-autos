import Link from "next/link";
import SeccionIcono from "./SeccionIcono";

const categorias = [
  {
    slug: "planes-de-ahorro",
    titulo: "Planes de ahorro",
    descripcion:
      "Accedé a tu 0km con cuotas mensuales, sin necesidad de un crédito tradicional.",
  },
  {
    slug: "autos-electricos",
    titulo: "Autos eléctricos",
    descripcion:
      "La nueva generación de movilidad: 0 emisiones, menor costo por km y tecnología de punta.",
  },
  {
    slug: "pickups-4x4",
    titulo: "Pickups y 4x4",
    descripcion:
      "Fuerza y versatilidad para el trabajo y la aventura, en 0km y usados verificados.",
  },
];

export default function CategoriasEspeciales() {
  return (
    <section className="bg-umarti-cream py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-umarti-navy">
              Categorías especiales
            </h2>
            <p className="text-sm text-gray-500">
              Formas de comprar y tipos de vehículo con contenido propio.
            </p>
          </div>
          <Link
            href="/secciones-especiales"
            className="text-sm font-semibold text-umarti-orange hover:underline"
          >
            Ver todas las categorías especiales →
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categorias.map((categoria) => (
            <Link
              key={categoria.slug}
              href={`/secciones-especiales/${categoria.slug}`}
              className="group rounded-xl border border-gray-100 bg-white p-6 hover:border-umarti-orange"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-umarti-navy text-white">
                <SeccionIcono slug={categoria.slug} />
              </span>
              <h3 className="mt-4 font-semibold text-umarti-navy">
                {categoria.titulo}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {categoria.descripcion}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-umarti-orange">
                Explorar →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
