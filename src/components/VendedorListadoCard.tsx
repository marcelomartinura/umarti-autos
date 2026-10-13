import Link from "next/link";

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join("")
    .toUpperCase();
}

export type VendedorResumen = {
  slug: string;
  nombre_completo: string;
  concesionarias: { nombre: string } | null;
  marcas: { nombre: string } | null;
};

export default function VendedorListadoCard({
  vendedor,
}: {
  vendedor: VendedorResumen;
}) {
  return (
    <Link
      href={`/vendedores/${vendedor.slug}`}
      className="group flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center transition hover:border-umarti-orange hover:shadow-md"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-umarti-navy text-lg font-bold text-white">
        {iniciales(vendedor.nombre_completo)}
      </span>
      <h3 className="mt-3 font-semibold text-umarti-navy group-hover:text-umarti-orange">
        {vendedor.nombre_completo}
      </h3>
      <p className="text-xs text-gray-400">
        {vendedor.concesionarias ? vendedor.concesionarias.nombre : "Vendedor independiente"}
      </p>
      {vendedor.marcas && (
        <span className="mt-2 rounded-full bg-umarti-cream px-2 py-0.5 text-[11px] font-medium text-umarti-navy">
          Marca: {vendedor.marcas.nombre}
        </span>
      )}
    </Link>
  );
}
