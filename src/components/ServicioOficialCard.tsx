import { ServicioOficialMarca } from "@/lib/types";

export default function ServicioOficialCard({
  servicio,
}: {
  servicio: ServicioOficialMarca;
}) {
  const mensajeWhatsapp = encodeURIComponent(
    `Hola, quiero pedir un turno de service para mi ${servicio.marca} en ${servicio.nombre}.`
  );

  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <span className="rounded-full bg-umarti-navy px-3 py-1 text-xs font-semibold text-white">
          {servicio.marca}
        </span>
        {servicio.verificado && (
          <span
            className="text-xs text-umarti-orange"
            title="Service verificado"
            aria-hidden
          >
            ✓ Verificado
          </span>
        )}
      </div>

      <h3 className="mt-3 font-semibold text-umarti-navy">
        {servicio.nombre}
      </h3>
      <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2C7.6 2 4 5.6 4 10c0 5.4 7 11.5 7.3 11.7a1 1 0 0 0 1.4 0C13 21.5 20 15.4 20 10c0-4.4-3.6-8-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
        </svg>
        {servicio.ciudad}, {servicio.provincia}
      </p>

      <p className="mt-2 flex-1 text-sm text-gray-500">
        {servicio.descripcion}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {servicio.servicios.map((s) => (
          <span
            key={s}
            className="rounded-full bg-umarti-cream px-2 py-0.5 text-[11px] font-medium text-umarti-navy"
          >
            {s}
          </span>
        ))}
      </div>

      <a
        href={`https://wa.me/${servicio.whatsapp}?text=${mensajeWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 rounded-full bg-green-600 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
      >
        Pedir turno
      </a>
    </div>
  );
}
