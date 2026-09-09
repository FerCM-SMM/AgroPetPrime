import { Store, Zap, HeartHandshake, BadgePercent, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function Stats() {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#FAF7F2] border-t border-[#8B5F3A]/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header da Seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-[#1C4E47] tracking-wider uppercase mb-2 block">
              Diferenciais da Nossa Loja
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#20241F] tracking-tight">
              A certeza de um cuidado genuíno com a saúde do seu animal
            </h2>
          </div>
          <p className="text-sm text-[#20241F]/70 max-w-sm leading-relaxed">
            Nutrição de precisão, farmácia ética e a hospitalidade tradicional do interior paulista para tutores exigentes.
          </p>
        </div>

        {/* Grid Editorial Assimétrico (Quebra de padrão genérico) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card Principal de Destaque: Loja Física no Parque Vitória Régia */}
          <div className="lg:col-span-7 bg-[#1C4E47] text-white p-8 sm:p-10 rounded-3xl shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-64 h-64 bg-[#D8E934]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#D8E934] text-[#1C4E47] text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                <Store className="w-4 h-4" />
                <span>Loja Física Aberta em Sorocaba</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4 leading-tight">
                Venha nos visitar na R. Antônio Silva Saladino, 878
              </h3>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-lg mb-8">
                Estrutura ampla e climatizada no Parque Vitória Régia. Traga seu pet, tome um café especial conosco e converse pessoalmente com quem entende de nutrição e dosagem de antipulgas.
              </p>
            </div>
            
            <div className="relative z-10 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-gray-300">
                <span className="font-semibold text-white">Horário:</span> Seg a Sáb das 08h às 19h
              </div>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 text-xs font-bold bg-white text-[#1C4E47] px-5 py-2.5 rounded-full hover:bg-[#D8E934] transition-all self-start sm:self-auto"
              >
                <span>Como Chegar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Coluna Secundária: 3 Pilares em Cards Aconchegantes */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Pilar 1: Entrega Rápida */}
            <div className="bg-white p-6 rounded-3xl border border-[#8B5F3A]/15 shadow-xs hover:border-[#12c0e0]/40 transition-all flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#E06F12]/10 text-[#E06F12] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#20241F] mb-1 font-serif">
                  Entrega Expressa em Sorocaba &amp; Região
                </h4>
                <p className="text-xs text-[#20241F]/70 leading-relaxed">
                  Despacho ágil de rações e medicamentos para que o prato do seu companheiro nunca fique vazio.
                </p>
              </div>
            </div>

            {/* Pilar 2: Apoio Veterinário */}
            <div className="bg-white p-6 rounded-3xl border border-[#8B5F3A]/15 shadow-xs hover:border-[#10b981]/40 transition-all flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#10b981]/10 text-[#10b981] flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#20241F] mb-1 font-serif">
                  Orientação Amiga &amp; Cuidadosa
                </h4>
                <p className="text-xs text-[#20241F]/70 leading-relaxed">
                  Suporte humanizado para tirar dúvidas sobre troca de ração, prevenção de parasitas e cuidados na lida.
                </p>
              </div>
            </div>

            {/* Pilar 3: Cashback & Preço Justo */}
            <div className="bg-white p-6 rounded-3xl border border-[#8B5F3A]/15 shadow-xs hover:border-[#12c0e0]/40 transition-all flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-[#12c0e0]/10 text-[#00829B] flex items-center justify-center shrink-0">
                <BadgePercent className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#20241F] mb-1 font-serif">
                  5% de Cashback em Todo o Catálogo
                </h4>
                <p className="text-xs text-[#20241F]/70 leading-relaxed">
                  Economia transparente acumulada em cada compra para ser descontada no seu próximo pedido.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}