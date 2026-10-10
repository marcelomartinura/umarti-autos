import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="bg-umarti-navy">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-6 py-8 md:flex-row md:justify-start md:py-10">
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

        <div className="flex flex-col items-center gap-3 rounded-2xl bg-umarti-orange px-6 py-5 text-center shadow-lg sm:items-start sm:text-left">
          <p className="text-base font-bold text-white">
            ¿Tenés un negocio de la industria?
          </p>
          <p className="text-sm text-white/90">
            Sumate al Ecosistema y llegá a miles de compradores y
            concesionarias.
          </p>
          <Link
            href="/ecosistema-negocios#sumar-negocio"
            className="mt-1 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-umarti-orange hover:bg-umarti-cream"
          >
            Sumar mi negocio →
          </Link>
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
