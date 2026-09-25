import { pasosTurnoService } from "@/lib/mock-data";

export default function ComoPedirTurno() {
  return (
    <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold text-umarti-navy">
          ¿Cómo pido un turno de service?
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Del filtro al turno confirmado, en cinco pasos.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
        {pasosTurnoService.map((paso) => (
          <div key={paso.numero} className="text-center">
            <div className="relative mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-umarti-navy">
              <span className="text-xl font-bold text-umarti-navy">
                {paso.numero}
              </span>
              <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-umarti-orange text-xs font-bold text-white">
                {paso.numero}
              </span>
            </div>
            <h3 className="text-sm font-bold text-umarti-navy">
              {paso.titulo}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{paso.descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
