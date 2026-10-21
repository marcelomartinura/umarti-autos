const props = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  "aria-hidden": true,
} as const;

export default function IconoServicioIndustria({ slug }: { slug: string }) {
  switch (slug) {
    case "marketing-agencias":
      return (
        <svg {...props}>
          <path d="M3 11v3a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
          <path d="M15 8a4 4 0 0 1 0 8" />
          <path d="M17.5 5.5a8 8 0 0 1 0 13" />
        </svg>
      );
    case "gestion-marketplaces":
      return (
        <svg {...props}>
          <path d="M3 9h18" />
          <path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9" />
          <path d="M8 9V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "agentes-conversacionales":
      return (
        <svg {...props}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
          <circle cx="9" cy="12" r="0.5" fill="currentColor" />
          <circle cx="12" cy="12" r="0.5" fill="currentColor" />
          <circle cx="15" cy="12" r="0.5" fill="currentColor" />
        </svg>
      );
    case "consultoria-transformacion-digital":
      return (
        <svg {...props}>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.7c.6.4 1 1.2 1 2.3h6c0-1.1.4-1.8 1-2.3A7 7 0 0 0 12 2Z" />
        </svg>
      );
    case "gestion-de-leads-crm":
      return (
        <svg {...props}>
          <path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3Z" />
        </svg>
      );
    case "empleos-industria":
      return (
        <svg {...props}>
          <path d="M4 7h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18" />
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
