import Link from "next/link";

const categorias = [
  {
    titulo: "Planes de ahorro",
    descripcion:
      "Accedé a tu 0km con cuotas mensuales, sin necesidad de un crédito tradicional.",
    href: "/catalogo?planAhorro=1",
    icono: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    titulo: "Autos eléctricos",
    descripcion:
      "La nueva generación de movilidad: 0 emisiones, menor costo por km y tecnología de punta.",
    href: "/catalogo?combustible=Eléctrico",
    icono: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
      </svg>
    ),
  },
  {
    titulo: "Pickups y 4x4",
    descripcion:
      "Fuerza y versatilidad para el trabajo y la aventura, en 0km y usados verificados.",
    href: "/catalogo?segmento=Pickup",
    icono: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h6.2l3 3H21a1 1 0 0 1 1 1v2" />
        <path d="M3 13h19" />
        <rect x="3" y="13" width="19" height="5" rx="1.5" />
        <circle cx="7.5" cy="18" r="1.5" />
        <circle cx="17.5" cy="18" r="1.5" />
      </svg>
    ),
  },
];

export default function CategoriasEspeciales() {
  return (
    <section className="bg-umarti-cream py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-bold text-umarti-navy">
          Categorías especiales
        </h2>
        <p className="text-sm text-gray-500">
          Formas de comprar y tipos de vehículo con búsqueda propia.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {categorias.map((categoria) => (
            <Link
              key={categoria.titulo}
              href={categoria.href}
              className="group rounded-xl border border-gray-100 bg-white p-6 hover:border-umarti-orange"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-umarti-navy text-white">
                {categoria.icono}
              </span>
              <h3 className="mt-4 font-semibold text-umarti-navy">
                {categoria.titulo}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {categoria.descripcion}
              </p>
              <span className="mt-4 inline-block text-sm font-semibold text-umarti-orange">
                Ver vehículos →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
