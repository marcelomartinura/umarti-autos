"use client";

export default function BuscadorInteligente({
  valor,
  onChange,
  placeholder,
}: {
  valor: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="shrink-0 text-gray-400"
        aria-hidden
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Buscá por marca, modelo o versión"}
        className="flex-1 border-none text-sm text-gray-700 outline-none placeholder:text-gray-400"
      />
      <span
        title="Búsqueda inteligente — hoy busca por texto, más adelante va a entender lenguaje natural"
        className="shrink-0 rounded-full bg-umarti-navy px-3 py-1 text-xs font-semibold text-white"
      >
        IA
      </span>
    </div>
  );
}
