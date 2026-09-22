const props = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  "aria-hidden": true,
} as const;

export default function SeccionIcono({ slug }: { slug: string }) {
  switch (slug) {
    case "planes-de-ahorro":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
    case "autos-electricos":
      return (
        <svg {...props}>
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
        </svg>
      );
    case "pickups-4x4":
      return (
        <svg {...props}>
          <path d="M3 13l1.5-4.5A2 2 0 0 1 6.4 7h6.2l3 3H21a1 1 0 0 1 1 1v2" />
          <path d="M3 13h19" />
          <rect x="3" y="13" width="19" height="5" rx="1.5" />
          <circle cx="7.5" cy="18" r="1.5" />
          <circle cx="17.5" cy="18" r="1.5" />
        </svg>
      );
    case "agro":
      return (
        <svg {...props}>
          <path d="M12 22c5-3 8-7.5 8-12a8 8 0 0 0-16 0c0 4.5 3 9 8 12Z" />
          <path d="M12 22V10" />
          <path d="M12 14c-3-1-4-3-4-6 3 0 5 1 6 4" />
          <path d="M12 12c3-1 4-2.5 4-5-2.7 0-4.5.8-5.5 2.7" />
        </svg>
      );
    case "mujeres-en-ruta":
      return (
        <svg {...props}>
          <path d="M12 3 4 6v6c0 5 3.4 8.2 8 9 4.6-.8 8-4 8-9V6l-8-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
  }
}
