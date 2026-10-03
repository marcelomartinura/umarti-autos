import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

// Solo corre sobre la ruta del panel de administración: el resto del sitio
// (público) no paga el costo de esta verificación en cada request.
export const config = {
  matcher: ["/panel-mu9f3k7x/:path*"],
};
