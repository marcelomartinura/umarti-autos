import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import RegistroForm from "./RegistroForm";
import { UMARTI_WHATSAPP_ECOSISTEMA } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Mi Cuenta | Umarti Movilidad",
  description:
    "Registrate en Umarti Movilidad: comprá o vendé tu auto como particular, o sumá tu concesionaria o agencia al ecosistema.",
};

export default function MiCuentaPage() {
  return (
    <main className="min-h-screen bg-umarti-cream pb-16">
      <Header />

      <div className="bg-gradient-to-r from-umarti-navy to-umarti-navyDark py-10">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <nav className="mb-4 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>{" "}
            <span className="mx-1">›</span> Mi Cuenta
          </nav>
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Mi Cuenta
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-blue-100">
            Decinos quién sos para ayudarte mejor: ¿sos una persona buscando o
            vendiendo un auto, o representás una concesionaria o agencia?
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-xl font-bold text-umarti-navy">
              Soy particular
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Comprá o vendé tu auto sin vueltas. Podés publicar tu vehículo
              gratis o buscar en el catálogo, sin necesidad de crear una
              cuenta con contraseña.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/vender"
                className="inline-flex items-center gap-2 rounded-full bg-umarti-orange px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90"
              >
                Publicá tu auto
              </Link>
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-full border border-umarti-navy px-5 py-2.5 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
              >
                Ver catálogo
              </Link>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-6">
              <p className="mb-4 text-sm font-medium text-gray-700">
                ¿Querés que te avisemos de novedades para particulares?
                Dejanos tus datos:
              </p>
              <RegistroForm
                tipo="particular"
                textoBoton="Avisarme cuando esté lista"
                whatsappUmarti={UMARTI_WHATSAPP_ECOSISTEMA}
              />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6">
            <h2 className="text-xl font-bold text-umarti-navy">
              Soy concesionaria o agencia
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Sumá tu negocio a Umarti Movilidad: publicá tu inventario,
              aparecé en Tiendas, Catálogo y Clasificados, y accedé a
              herramientas pensadas para tu negocio.
            </p>
            <div className="mt-4 rounded-xl bg-umarti-cream p-4 text-sm text-gray-600">
              Conocé los beneficios y dejanos tus datos para que te
              contactemos.
            </div>
            <Link
              href="/mi-cuenta/concesionaria"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-umarti-navy px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
            >
              Quiero sumar mi concesionaria o agencia →
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
