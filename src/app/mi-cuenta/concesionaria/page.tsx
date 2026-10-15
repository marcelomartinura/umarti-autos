import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RegistroForm from "../RegistroForm";
import { UMARTI_WHATSAPP_ECOSISTEMA } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Sumá tu concesionaria o agencia | Umarti Movilidad",
  description:
    "Sumá tu concesionaria o agencia a Umarti Movilidad: publicá tu inventario, aparecé en Tiendas, Catálogo y Clasificados, y accedé a herramientas para tu negocio.",
};

const beneficios = [
  {
    titulo: "Tu propia miniweb",
    descripcion:
      "Aparecé en Tiendas con tu logo, portada, descripción y todos tus datos de contacto.",
  },
  {
    titulo: "Más alcance",
    descripcion:
      "Tu inventario visible en Catálogo y Clasificados, donde miles de personas buscan su próximo auto.",
  },
  {
    titulo: "Vendedores con landing propia",
    descripcion:
      "Cada vendedor de tu equipo puede tener su propia miniweb, vinculada a tu concesionaria.",
  },
  {
    titulo: "Herramientas para tu negocio",
    descripcion:
      "Subastas, renting, seguros y financiamiento, pensados para potenciar tus ventas (en camino).",
  },
];

export default function ConcesionariaRegistroPage() {
  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark py-10">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <nav className="mb-4 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>{" "}
            <span className="mx-1">›</span>{" "}
            <Link href="/mi-cuenta" className="hover:text-white">
              Mi Cuenta
            </Link>{" "}
            <span className="mx-1">›</span> Concesionaria o agencia
          </nav>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Sumá tu concesionaria o agencia a Umarti Movilidad
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100">
            Publicá tu inventario, aparecé en Tiendas, Catálogo y
            Clasificados, y accedé a herramientas pensadas para hacer crecer
            tu negocio.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {beneficios.map((beneficio) => (
            <div
              key={beneficio.titulo}
              className="rounded-xl border border-gray-100 bg-white p-5"
            >
              <h3 className="font-semibold text-umarti-navy">
                {beneficio.titulo}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {beneficio.descripcion}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-umarti-navy/20 bg-white p-6 text-center">
          <p className="text-sm font-medium text-umarti-navy">
            Todavía estamos definiendo los planes y precios.
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Dejanos tus datos abajo y te vamos a contactar apenas estén
            disponibles, con toda la información que necesitás para decidir.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-gray-100 bg-white p-6">
          <h2 className="text-lg font-bold text-umarti-navy">
            Registrá tu concesionaria o agencia
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Completá tus datos y te contactamos a la brevedad.
          </p>
          <div className="mt-5">
            <RegistroForm
              tipo="concesionaria"
              textoBoton="Registrar mi concesionaria"
              whatsappUmarti={UMARTI_WHATSAPP_ECOSISTEMA}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
