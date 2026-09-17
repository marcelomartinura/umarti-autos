import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CatalogoBuscador from "@/components/CatalogoBuscador";
import FeaturedVehicles from "@/components/FeaturedVehicles";
import ClasificadosDestacados from "@/components/ClasificadosDestacados";
import EcosistemaCrossSell from "@/components/EcosistemaCrossSell";
import ComoComprar from "@/components/ComoComprar";
import PreguntasFrecuentes from "@/components/PreguntasFrecuentes";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <CatalogoBuscador />
      <FeaturedVehicles />
      <ClasificadosDestacados />
      <EcosistemaCrossSell />
      <ComoComprar />
      <PreguntasFrecuentes />
    </main>
  );
}
