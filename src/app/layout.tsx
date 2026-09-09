import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Umarti Autos | Marketplace automotriz en Argentina",
  description:
    "Comprá y vendé autos 0km y usados, encontrá adicionales y conocé concesionarias verificadas en Umarti Autos.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-AR">
      <body>{children}</body>
    </html>
  );
}
