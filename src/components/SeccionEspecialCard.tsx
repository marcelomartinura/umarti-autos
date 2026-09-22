import Link from "next/link";
import { SeccionEspecial } from "@/lib/types";
import { vehiculosNuevosDeSeccion, vehiculosUsadosDeSeccion } from "@/lib/secciones";
import SeccionIcono from "./SeccionIcono";

export default function SeccionEspecialCard({
  seccion,
}: {
  seccion: SeccionEspecial;
}) {
  const total =
    vehiculosNuevosDeSeccion(seccion).length +
    vehiculosUsadosDeSeccion(seccion).length;

  return (
    <Link
      href={`/secciones-especiales/${seccion.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 transition hover:-translate-y-0.5 hover:border-umarti-orange hover:shadow-md"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-umarti-navy text-white transition group-hover:bg-umarti-orange">
        <SeccionIcono slug={seccion.slug} />
      </span>
      <h3 className="mt-4 text-lg font-bold text-umarti-navy">
        {seccion.nombre}
      </h3>
      <p className="mt-1 flex-1 text-sm text-gray-500">{seccion.resumen}</p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-400">
          {total} vehículo{total === 1 ? "" : "s"}
        </span>
        <span className="font-semibold text-umarti-orange">Explorar →</span>
      </div>
    </Link>
  );
}
