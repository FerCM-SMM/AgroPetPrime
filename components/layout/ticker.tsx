import { MapPin, Zap, Phone, ShieldCheck } from 'lucide-react';

export function Ticker() {
  return (
    <section className="w-full bg-[#20241F] text-white py-3 overflow-hidden border-t border-[#8B5F3A]/20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
        <span className="flex items-center gap-1.5 text-[#12c0e0]">
          <MapPin className="w-3.5 h-3.5 text-[#12c0e0]" />
          <span>Atendemos todos os bairros de Sorocaba e região</span>
        </span>
        <span className="hidden md:flex items-center gap-1.5 text-gray-200">
          <Zap className="w-3.5 h-3.5 text-[#E06F12]" />
          <span>5% de Cashback ou desconto à vista no PIX</span>
        </span>
        <a
          href="https://wa.me/5515996580804"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#10b981] hover:underline"
        >
          <Phone className="w-3.5 h-3.5 text-[#10b981]" />
          <span>WhatsApp / Pedidos: (15) 9 9658-0804</span>
        </a>
        <span className="hidden lg:flex items-center gap-1.5 text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#E06F12]" />
          <span>Parque Vitória Régia — R. Antônio Silva Saladino, 878</span>
        </span>
      </div>
    </section>
  );
}