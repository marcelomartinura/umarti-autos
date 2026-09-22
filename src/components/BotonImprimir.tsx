"use client";

export default function BotonImprimir() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-md border border-umarti-navy px-4 py-2 text-sm font-semibold text-umarti-navy hover:bg-umarti-navy hover:text-white print:hidden"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden
      >
        <path d="M6 9V3h12v6" />
        <rect x="6" y="14" width="12" height="7" />
        <path d="M6 18H4a1 1 0 0 1-1-1v-5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v5a1 1 0 0 1-1 1h-2" />
      </svg>
      Imprimir esta página
    </button>
  );
}
