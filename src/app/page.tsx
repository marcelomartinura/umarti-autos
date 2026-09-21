import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CatalogoBuscador from "@/components/CatalogoBuscador";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import ClasificadosDestacados from "@/components/ClasificadosDestacados";
import EcosistemaCrossSell from "@/components/EcosistemaCrossSell";
import ComoComprar from "@/components/ComoComprar";
import PreguntasFrecuentes from "@/components/PreguntasFrecuentes";
import AdSlot from "@/components/AdSlot";
import { AD_SLOTS } from "@/lib/adsense";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <CatalogoBuscador />
      <FeaturedVehicles />
      <ClasificadosDestacados />
      <div className="bg-white py-10">
        <div className="mx-auto max-w-7xl px-6">
          <AdSlot slot={AD_SLOTS.home} />
        </div>
      </div>
      <EcosistemaCrossSell />
      <ComoComprar />
      <PreguntasFrecuentes />
    </main>
  );
}
