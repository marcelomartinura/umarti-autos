import Header from "@/components/Header";
import VenderAutoWizard from "@/components/VenderAutoWizard";

export const metadata = {
  title: "Vender mi auto | Umarti Movilidad",
  description:
    "Publicá tu auto en minutos, sin necesidad de crear una cuenta. Llegá a miles de compradores en Umarti Movilidad.",
};

export default function VenderPage() {
  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark pb-24 pt-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-3xl font-bold text-white">
            Publicá tu auto en minutos
          </h1>
          <p className="mt-2 text-sm text-blue-100">
            Llegá a miles de compradores y vendé tu vehículo al mejor precio.
            No hace falta crear una cuenta.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-blue-100">
            <span className="flex items-center gap-1.5">
              <span className="text-umarti-orange">✓</span> Publicar es
              gratis
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-umarti-orange">✓</span> Sin registro ni
              contraseñas
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-umarti-orange">✓</span> Revisamos cada
              publicación
            </span>
          </div>
        </div>
      </div>

      <VenderAutoWizard />
    </main>
  );
}
