import Link from "next/link";

const navLinks = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Clasificados", href: "/clasificados" },
  { label: "Tiendas", href: "/tiendas" },
  { label: "Adicionales", href: "/adicionales" },
  { label: "Posventa", href: "/posventa" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xl font-bold text-umarti-navy">
            UMARTI<span className="text-umarti-orange">.com</span>
          </span>
          <span className="text-xs tracking-widest text-gray-400">
            movilidad
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="flex items-center gap-3">
          <Link
            href="/vender"
            className="hidden rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white md:inline-flex items-center"
          >
            Vender mi auto
          </Link>
          <Link
            href="/ecosistema-negocios"
            className="hidden rounded-md bg-umarti-navy px-4 py-2 text-sm font-semibold text-white hover:bg-umarti-navyDark md:inline-flex items-center"
          >
            Ecosistema de Negocios
          </Link>
          <Link
            href="/login"
            className="rounded-md bg-umarti-orange px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            Ingresar
          </Link>
        </div>
      </div>
    </header>
  );
}
