import { ServicioIndustria } from "@/lib/types";
import IconoServicioIndustria from "./IconoServicioIndustria";
import { UMARTI_WHATSAPP_ECOSISTEMA } from "@/lib/mock-data";

export default function ServicioIndustriaCard({
  servicio,
}: {
  servicio: ServicioIndustria;
}) {
  const mensajeWhatsapp = encodeURIComponent(
    `Hola, quiero consultar por el servicio de ${servicio.nombre}.`
  );

  return (
    <div className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-umarti-navy text-white">
        <IconoServicioIndustria slug={servicio.slug} />
      </span>
      <h3 className="mt-4 font-bold text-umarti-navy">{servicio.nombre}</h3>
      <p className="mt-1 text-sm font-medium text-gray-500">
        {servicio.resumen}
      </p>
      <p className="mt-2 flex-1 text-sm text-gray-500">
        {servicio.descripcion}
      </p>
      <a
        href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${mensajeWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 rounded-full bg-green-600 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
      >
        Consultar
      </a>
    </div>
  );
}
