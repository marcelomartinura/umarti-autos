import type { Metadata } from "next";
import SetupForm from "./SetupForm";

export const metadata: Metadata = {
  title: "Configuración inicial",
  robots: { index: false, follow: false },
};

// Página de UN SOLO USO para crear la primera cuenta de administrador.
// No está linkeada desde ningún lugar del sitio. Una vez usada, lo más
// prolijo es borrar esta carpeta (src/app/configurar-primer-admin) —
// el endpoint que llama (/api/bootstrap-admin) igual se autodesactiva
// solo en cuanto ya existe un administrador.
export default function ConfigurarPrimerAdminPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-umarti-cream px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-lg font-bold text-umarti-navy">
          Crear la primera cuenta de administrador
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Usala una sola vez. Después de crear tu cuenta, borrá esta página.
        </p>
        <div className="mt-6">
          <SetupForm />
        </div>
      </div>
    </main>
  );
}
