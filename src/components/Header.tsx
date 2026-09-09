import Link from "next/link";

const navLinks = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Clasificados", href: "/clasificados" },
  { label: "Tiendas", href: "/tiendas" },
  { label: "Servicios", href: "/servicios" },
  { label: "Vender Auto", href: "/vender" },
];

export default function Header() {
  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-xl font-bold text-umarti-navy">
            UMARTI<span className="text-umarti-orange">.com</span>
          </span>
          <span className="text-xs tracking-widest text-gray-400">motor</span>
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

        <div className="flex items-center gap-6">
          <button className="hidden text-sm font-medium text-gray-700 md:inline-flex items-center gap-1">
            Explorar Ecosistema
            <span aria-hidden>▾</span>
          </button>
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
