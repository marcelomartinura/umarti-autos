import Image from "next/image";
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
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-umarti-navy text-white">
          <IconoServicioIndustria slug={servicio.slug} />
        </span>
        {servicio.logoExterno && (
          <span className="flex items-center gap-1.5 rounded-full border border-gray-100 bg-gray-50 py-1 pl-1 pr-2.5 text-[10px] font-medium text-gray-400">
            <Image
              src={servicio.logoExterno}
              alt={servicio.nombreExterno || ""}
              width={16}
              height={16}
              className="h-4 w-4 object-contain"
            />
            {servicio.nombreExterno}
          </span>
        )}
      </div>
      <h3 className="mt-4 font-bold text-umarti-navy">{servicio.nombre}</h3>
      <p className="mt-1 text-sm font-medium text-gray-500">
        {servicio.resumen}
      </p>
      <p className="mt-2 flex-1 text-sm text-gray-500">
        {servicio.descripcion}
      </p>
      <div className="mt-5 flex flex-col gap-2 sm:flex-row">
        <a
          href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${mensajeWhatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-green-600 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
        >
          Consultar
        </a>
        {servicio.enlaceExterno && (
          <a
            href={servicio.enlaceExterno}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 rounded-full border border-umarti-navy py-2 text-center text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
          >
            Ver más información
          </a>
        )}
      </div>
    </div>
  );
}
