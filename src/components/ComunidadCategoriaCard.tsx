import Link from "next/link";
import { ComunidadCategoria } from "@/lib/types";
import IconoCategoriaComunidad from "@/components/IconoCategoriaComunidad";

export default function ComunidadCategoriaCard({
  categoria,
}: {
  categoria: ComunidadCategoria;
}) {
  return (
    <Link
      href={`/comunidad/${categoria.slug}`}
      className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center hover:border-umarti-navy/30"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-umarti-navy text-white">
        <IconoCategoriaComunidad categoria={categoria.categoria} />
      </span>
      <h3 className="mt-4 text-lg font-bold text-umarti-navy">
        {categoria.categoria}
      </h3>
      <p className="mt-1 flex-1 text-sm text-gray-500">
        {categoria.descripcion}
      </p>
      <span className="mt-5 w-full rounded-full bg-umarti-orange py-2.5 text-sm font-semibold text-white hover:opacity-90">
        Entrar a la comunidad →
      </span>
    </Link>
  );
}
