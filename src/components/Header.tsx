import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Clasificados", href: "/clasificados" },
  { label: "Tiendas", href: "/tiendas" },
  { label: "Adicionales", href: "/adicionales" },
  { label: "Posventa", href: "/posventa" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-header.png"
            alt="Umarti Motors"
            width={700}
            height={506}
            priority
            className="h-32 w-auto sm:h-48"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-umarti-orange"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2">
            <Link
              href="/mi-cuenta"
              className="rounded-md bg-umarti-orange px-5 py-2 text-center text-sm font-semibold text-white hover:opacity-90"
            >
              Mi Cuenta
            </Link>
            <Link
              href="/vender"
              className="rounded-md border border-umarti-navy px-5 py-2 text-center text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white"
            >
              Vender mi auto
            </Link>
          </div>
        </div>

        <Link
          href="/ecosistema-negocios"
          className="hidden flex-col items-center rounded-lg bg-umarti-navy px-8 py-4 leading-tight text-white shadow-md hover:bg-umarti-navyDark md:flex"
        >
          <span className="text-lg font-bold">Ecosistema de Negocios</span>
          <span className="text-sm font-normal text-white/80">
            Soy de la Industria de la Movilidad
          </span>
        </Link>

        {/* Mobile fallback: versión compacta, siempre visible por debajo de md */}
        <Link
          href="/mi-cuenta"
          className="rounded-md bg-umarti-orange px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 md:hidden"
        >
          Mi Cuenta
        </Link>
      </div>
    </header>
  );
}
