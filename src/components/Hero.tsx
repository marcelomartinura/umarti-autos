import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-umarti-navy">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-6 px-6 py-8 md:flex-row md:py-10">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
            Encontrá el auto perfecto para vos
          </h1>
          <p className="mt-4 max-w-lg text-blue-100">
            Miles de vehículos verificados, financiación a tu medida y la
            mejor experiencia de compra.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-md bg-umarti-orange px-6 py-3 font-semibold text-white hover:opacity-90">
              Buscar vehículos
            </button>
            <button className="rounded-md border border-white/40 px-6 py-3 font-semibold text-white hover:bg-white/10">
              Vender mi auto
            </button>
          </div>
        </div>

        <Image
          src="/avatar-home.jpg"
          alt="Asistente de Umarti Motors"
          width={310}
          height={512}
          priority
          className="w-40 shrink-0 rounded-2xl shadow-2xl sm:w-48"
        />
      </div>
    </section>
  );
}
