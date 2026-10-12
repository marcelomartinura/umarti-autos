import type { Metadata } from "next";
import type { ReactNode } from "react";

// noindex/nofollow a nivel de metadata además de robots.ts (defensa en
// profundidad) y sin ningún link hacia esta sección desde el resto del sitio.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
