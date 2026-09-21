import { VendedorDestacado } from "@/lib/types";

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((palabra) => palabra[0])
    .join("")
    .toUpperCase();
}

export default function VendedorCard({
  vendedor,
}: {
  vendedor: VendedorDestacado;
}) {
  const mensajeWhatsapp = encodeURIComponent(
    `Hola ${vendedor.nombre}, te contacto desde Umarti Movilidad.`
  );

  return (
    <div className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {vendedor.tienda}
      </span>
      <span className="mt-3 flex h-16 w-16 items-center justify-center rounded-full bg-umarti-orange text-lg font-bold text-white">
        {iniciales(vendedor.nombre)}
      </span>
      <h3 className="mt-3 font-semibold text-umarti-navy">{vendedor.nombre}</h3>
      <p className="text-xs text-gray-400">Vendo en {vendedor.tienda}</p>
      <p className="mt-2 text-sm italic text-gray-500">
        &ldquo;{vendedor.mensaje}&rdquo;
      </p>
      {vendedor.marca && (
        <span className="mt-2 rounded-full bg-umarti-cream px-2 py-0.5 text-[11px] font-medium text-umarti-navy">
          Marca: {vendedor.marca}
        </span>
      )}
      <a
        href={`https://wa.me/${vendedor.whatsapp}?text=${mensajeWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 w-full rounded-full bg-green-600 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        Contactar
      </a>
    </div>
  );
}
