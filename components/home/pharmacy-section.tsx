'use client';

import Image from 'next/image';
import { ShieldCheck, MessageCircle, FileText, CheckCircle2, Stethoscope, Sparkles } from 'lucide-react';

export function PharmacySection() {
  const blocks = [
    {
      title: 'Antiparasitários',
      description: 'Pipetas, coleiras e mastigáveis com ação rápida contra pulgas, carrapatos e sarnas.',
      icon: '🛡️',
      badge: 'Líderes de Mercado',
    },
    {
      title: 'Suplementos & Ômegas',
      description: 'Fortalecimento imunológico, brilho na pelagem e suporte nutricional sênior.',
      icon: '✨',
      badge: 'Alta Absorção',
    },
    {
      title: 'Dermatológicos',
      description: 'Shampoos terapêuticos, sprays calmantes e pomadas cicatrizantes de uso veterinário.',
      icon: '🧴',
      badge: 'Pele Sensível',
    },
    {
      title: 'Articulações & Dor',
      description: 'Condroitina, glicosamina, anti-inflamatórios e analgésicos com dosagem precisa.',
      icon: '🦴',
      badge: 'Mobilidade',
    },
  ];

  const labs = ['Zoetis', 'MSD', 'Elanco', 'Bravet', 'Ourofino', 'Biofarm'];

  return (
    <section id="farmacia" className="py-20 bg-black text-white relative overflow-hidden">
      {/* Detalhes de iluminação sutil no fundo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#20BEE2]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#51FFE6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 relative z-10">
        {/* Cabeçalho */}
        <div className="max-w-3xl mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-[#51FFE6] bg-white/10 px-4 py-1.5 rounded-full mb-4">
            <Stethoscope className="w-3.5 h-3.5 text-[#20BEE2]" />
            <span>Farmácia Veterinária Especializada</span>
          </span>
          <h2 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-white leading-tight">
            Cuide da saúde com quem entende. Farmácia completa com orientação segura.
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-4 leading-relaxed font-normal">
            Trabalhamos exclusivamente com laboratórios credenciados (<strong className="text-white">Zoetis, MSD, Elanco, Bravet, Ourofino</strong>). Medicamentos e antipulgas mantidos em armazenamento estritamente monitorado e climatizado em Sorocaba.
          </p>

          {/* Marcas/Laboratórios */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-6">
            <span className="text-xs font-bold text-gray-400">Laboratórios Oficiais:</span>
            {labs.map((lab, i) => (
              <span
                key={i}
                className="text-xs font-black text-white bg-neutral-900 border border-neutral-800 px-3 py-1 rounded-full"
              >
                {lab}
              </span>
            ))}
          </div>
        </div>

        {/* Grid de 4 Sub-blocos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {blocks.map((block, idx) => (
            <div
              key={idx}
              className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 hover:border-[#20BEE2] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{block.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#20BEE2] bg-[#20BEE2]/10 px-2.5 py-0.5 rounded-full">
                    {block.badge}
                  </span>
                </div>
                <h3 className="font-['Archivo_Black',sans-serif] text-xl font-black text-white mb-2 group-hover:text-[#51FFE6] transition-colors">
                  {block.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                  {block.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center text-xs font-bold text-[#20BEE2]">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                <span>Procedência 100% Garantida</span>
              </div>
            </div>
          ))}
        </div>

        {/* Box de CTA com Envio de Receita pelo WhatsApp */}
        <div className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950 border border-[#20BEE2]/40 rounded-3xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-[#20BEE2] text-black flex items-center justify-center shrink-0 font-black shadow-lg">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h4 className="font-['Archivo_Black',sans-serif] text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                Tem receita do médico veterinário?
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-1">
                Envie a foto da receita no WhatsApp para cotação imediata com nossa equipe em Sorocaba!
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/5515996580804?text=Ol%C3%A1!%20Gostaria%20de%20enviar%20a%20foto%20da%20receita%20veterin%C3%A1ria%20para%20cota%C3%A7%C3%A3o"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#20BEE2] hover:bg-[#51FFE6] text-black font-black text-sm px-8 py-4 rounded-full shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5 fill-black" />
            <span>Enviar Receita no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
