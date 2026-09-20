import { pasosCompra } from "@/lib/mock-data";

export default function ComoComprarDetalle() {
  return (
    <section>
      <h2 className="mb-6 text-xl font-bold text-umarti-navy">
        ¿Cómo comprar este vehículo en Umarti Movilidad?
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
        <ol className="relative space-y-8 border-l-2 border-umarti-navy/20 pl-8">
          {pasosCompra.map((paso) => (
            <li key={paso.numero} className="relative">
              <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-umarti-navy text-sm font-bold text-white">
                {paso.numero}
              </span>
              <h3 className="font-semibold text-umarti-navy">
                {paso.titulo}
              </h3>
              <p className="text-sm text-gray-500">{paso.descripcion}</p>
            </li>
          ))}
        </ol>

        <div className="h-fit rounded-xl bg-umarti-navy p-6 text-white">
          <h3 className="text-lg font-bold">Compra segura garantizada</h3>
          <p className="mt-2 text-sm text-blue-100">
            Nos aseguramos de que toda tu experiencia en Umarti Movilidad sea
            transparente y confiable.
          </p>
          <div className="mt-4 space-y-3 text-sm">
            <div>
              <p className="font-semibold">Concesionarias verificadas</p>
              <p className="text-blue-100">
                Todas pasan por un proceso de validación comercial y legal
                antes de publicar.
              </p>
            </div>
            <div>
              <p className="font-semibold">Datos protegidos</p>
              <p className="text-blue-100">
                Tus datos solo se comparten con la concesionaria cuando
                decidís avanzar con la operación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
