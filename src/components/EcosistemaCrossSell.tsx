import Link from "next/link";

const items = [
  {
    titulo: "Adicionales",
    descripcion:
      "Seguros, financiación, garantías extendidas y blindajes para tu vehículo.",
    href: "/adicionales",
    acento: "bg-umarti-navy",
  },
  {
    titulo: "Posventa",
    descripcion:
      "Talleres oficiales e independientes: mecánica, neumáticos y mucho más.",
    href: "/posventa",
    acento: "bg-umarti-orange",
  },
  {
    titulo: "Tiendas",
    descripcion:
      "Conocé las concesionarias y agencias verificadas del ecosistema.",
    href: "/tiendas",
    acento: "bg-umarti-navyDark",
  },
];

export default function EcosistemaCrossSell() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-umarti-navy">
            Todo lo que tu auto necesita, en un solo lugar
          </h2>
          <p className="text-sm text-gray-500">
            Más allá de comprar y vender, en Umarti Movilidad encontrás todo
            el ecosistema alrededor de tu vehículo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group overflow-hidden rounded-xl border border-gray-100 shadow-sm transition hover:shadow-md"
            >
              <div className={`h-2 w-full ${item.acento}`} />
              <div className="p-6">
                <h3 className="text-lg font-bold text-umarti-navy">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {item.descripcion}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-umarti-orange group-hover:underline">
                  Explorar →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
