import Link from "next/link";

const exploreLinks = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Clasificados", href: "/clasificados" },
  { label: "Tiendas", href: "/tiendas" },
  { label: "Secciones especiales", href: "/secciones-especiales" },
  { label: "Adicionales", href: "/adicionales" },
  { label: "Posventa", href: "/posventa" },
  { label: "Vender mi auto", href: "/vender" },
];

const empresaLinks = [
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Ecosistema de Negocios", href: "/ecosistema-negocios" },
  { label: "Noticias", href: "/noticias" },
  { label: "Contacto", href: "/contacto" },
];

const ayudaLinks = [
  { label: "Preguntas frecuentes", href: "/#preguntas-frecuentes" },
  { label: "Términos y condiciones", href: "/terminos" },
  { label: "Políticas de privacidad", href: "/privacidad" },
];

const redes = [
  { label: "Facebook", inicial: "f" },
  { label: "Instagram", inicial: "ig" },
  { label: "LinkedIn", inicial: "in" },
  { label: "X", inicial: "X" },
];

export default function Footer() {
  return (
    <footer className="bg-umarti-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <span className="text-lg font-bold">
              UMARTI<span className="text-umarti-orange">.com</span>
            </span>
            <p className="mt-1 text-xs tracking-widest text-blue-200">
              movilidad
            </p>
            <p className="mt-4 max-w-xs text-sm text-blue-100">
              El marketplace de movilidad de Argentina: autos, motos y
              camiones 0km y usados, adicionales, posventa y el ecosistema de
              negocios de la industria.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-200">
              Explorá
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-200">
              Empresa
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {empresaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-200">
              Ayuda
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {ayudaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-blue-100 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-3">
              {redes.map((item) => (
                <span
                  key={item.label}
                  title={item.label}
                  aria-hidden
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-xs font-semibold"
                >
                  {item.inicial}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-blue-200">
          © {new Date().getFullYear()} Umarti.com. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  );
}
