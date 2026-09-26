const iconProps = {
  width: 28,
  height: 28,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  "aria-hidden": true,
} as const;

// Ícono compartido para representar cada categoría de la Comunidad (Autos /
// Motos / Camiones): lo usan la tarjeta de categoría en /comunidad, el banner
// de Ecosistema de Negocios y la cabecera de cada /comunidad/[categoria].
export default function IconoCategoriaComunidad({
  categoria,
}: {
  categoria: string;
}) {
  if (categoria === "Motos") {
    return (
      <svg {...iconProps}>
        <circle cx="5.5" cy="17.5" r="2.5" />
        <circle cx="18.5" cy="17.5" r="2.5" />
        <path d="M8 17.5h6l-2-6h-3" />
        <path d="M12 11.5 15 7h3" />
        <path d="M14 17.5 17 9" />
      </svg>
    );
  }
  if (categoria === "Camiones") {
    return (
      <svg {...iconProps}>
        <rect x="1" y="7" width="11" height="9" rx="1" />
        <path d="M12 10h4l4 3v3h-8z" />
        <circle cx="5.5" cy="18" r="1.5" />
        <circle cx="17.5" cy="18" r="1.5" />
      </svg>
    );
  }
  return (
    <svg {...iconProps}>
      <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h11.2a2 2 0 0 1 1.9 1.5L21 13" />
      <path d="M3 13h18" />
      <rect x="3" y="13" width="18" height="5" rx="1.5" />
      <circle cx="7" cy="18" r="1.5" />
      <circle cx="17" cy="18" r="1.5" />
    </svg>
  );
}
