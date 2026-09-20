import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Umarti Movilidad | Marketplace de autos, motos y camiones en Argentina",
  description:
    "Comprá y vendé autos, motos y camiones 0km y usados, contratá adicionales, encontrá posventa y conocé concesionarias verificadas en Umarti Movilidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
