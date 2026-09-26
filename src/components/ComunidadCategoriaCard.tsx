import { ComunidadCategoria } from "@/lib/types";
import { UMARTI_WHATSAPP_ECOSISTEMA } from "@/lib/mock-data";

const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  "aria-hidden": true,
} as const;

function IconoCategoria({ categoria }: { categoria: string }) {
  if (categoria === "Motos") {
    return (
      <svg {...iconProps}>
        <circle cx="5.5" cy="17.5" r="2.5" />
        <circle cx="18.5" cy="17.5" r="2.5" />
        <path d="M8 17.5h6l-2-6h-3" />
        <path d="M12 11.5 15 7h3" />
        <path d="M14 17.5 17 9" />
      </svg>
    );
  }
  if (categoria === "Camiones") {
    return (
      <svg {...iconProps}>
        <rect x="1" y="7" width="11" height="9" rx="1" />
        <path d="M12 10h4l4 3v3h-8z" />
        <circle cx="5.5" cy="18" r="1.5" />
        <circle cx="17.5" cy="18" r="1.5" />
      </svg>
    );
  }
  return (
    <svg {...iconProps}>
      <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
      <path d="M3 13h18" />
      <rect x="3" y="13" width="18" height="5" rx="1.5" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}

export default function ComunidadCategoriaCard({
  categoria,
}: {
  categoria: ComunidadCategoria;
}) {
  const mensajeWhatsapp = encodeURIComponent(
    `Hola, quiero sumarme a la Comunidad Umarti de ${categoria.categoria}.`
  );

  return (
    <div className="flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-6 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-umarti-navy text-white">
        <IconoCategoria categoria={categoria.categoria} />
      </span>
      <h3 className="mt-4 text-lg font-bold text-umarti-navy">
        {categoria.categoria}
      </h3>
      <p className="mt-1 flex-1 text-sm text-gray-500">
        {categoria.descripcion}
      </p>
      <a
        href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${mensajeWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 w-full rounded-full bg-green-600 py-2.5 text-sm font-semibold text-white hover:opacity-90"
      >
        Quiero sumarme
      </a>
    </div>
  );
}
