import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}
