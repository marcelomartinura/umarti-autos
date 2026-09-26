import { TemaDebate } from "@/lib/types";
import { UMARTI_WHATSAPP_ECOSISTEMA } from "@/lib/mock-data";

export default function TemaDebateCard({ tema }: { tema: TemaDebate }) {
  const mensajeWhatsapp = encodeURIComponent(
    `Hola, quiero sumarme al debate de la Comunidad Umarti sobre "${tema.titulo}".`
  );

  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-5">
      <span className="self-start rounded-full bg-umarti-cream px-2 py-0.5 text-[11px] font-medium text-umarti-navy">
        {tema.categoria}
      </span>
      <h3 className="mt-3 font-semibold text-umarti-navy">{tema.titulo}</h3>
      <p className="mt-2 flex-1 text-sm text-gray-500">{tema.resumen}</p>
      <a
        href={`https://wa.me/${UMARTI_WHATSAPP_ECOSISTEMA}?text=${mensajeWhatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 rounded-full bg-green-600 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
      >
        Sumarme al debate
      </a>
    </div>
  );
}
