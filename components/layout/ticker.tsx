export function Ticker() {
  return (
    <section className="w-full bg-[#0B0F17] text-white py-3 overflow-hidden border-t border-gray-800">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-[11px] font-extrabold uppercase tracking-wider">
        <span className="flex items-center gap-1.5 text-[#12C0E0]">
          <span className="material-symbols-outlined text-[16px]">distance</span>
          <span>Atendemos Todos os Bairros de Sorocaba e Votorantim</span>
        </span>
        <span className="hidden md:flex items-center gap-1.5 text-gray-200">
          <span className="material-symbols-outlined text-[#D97706] text-[16px]">bolt</span>
          <span>Desconto de 5% à Vista no PIX</span>
        </span>
        <a
          href="https://wa.me/5515996580804"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#10B981] hover:underline"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>Televendas: (15) 9 9658.0804</span>
        </a>
        <span className="hidden lg:flex items-center gap-1.5 text-gray-400">
          <span className="material-symbols-outlined text-[16px]">verified</span>
          <span>Parque Vitória Régia - R. Antônio Silva Saladino, 878</span>
        </span>
      </div>
    </section>
  );
}