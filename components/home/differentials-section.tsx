'use client';

import { MapPin, Truck, HeartHandshake, Percent, Coffee, Sparkles } from 'lucide-react';

export function DifferentialsSection() {
  const differentials = [
    {
      icon: MapPin,
      number: '01',
      title: 'Loja Física em Sorocaba',
      description:
        'Estrutura ampla e acolhedora na R. Antônio Silva Saladino, 878, Parque Vitória Régia. "Venha tomar um café conosco!"',
      highlight: 'Fácil Estacionamento',
    },
    {
      icon: Truck,
      number: '02',
      title: 'Entrega Expressa Ágil',
      description:
        'Despachamos seu pedido com agilidade para seu pet nunca ficar sem a refeição favorita. Entregas no mesmo dia em Sorocaba e região.',
      highlight: 'No mesmo dia',
    },
    {
      icon: HeartHandshake,
      number: '03',
      title: 'Atendimento Amigo & Cuidadoso',
      description:
        'Orientação de quem realmente entende e ama animais, da convivência no apartamento à rotina pesada do campo e haras.',
      highlight: 'Prosa & Confiança',
    },
    {
      icon: Percent,
      number: '04',
      title: 'Preço Justo & Cashback',
      description:
        'Promoções semanais, combos de saca fechada para cães, gatos e equinos, e 5% de cashback creditado em todas as compras.',
      highlight: '5% de Volta',
    },
  ];

  return (
    <section id="diferenciais" className="py-20 bg-white text-black border-b border-neutral-100">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block text-xs font-black uppercase tracking-widest text-[#20BEE2] bg-[#20BEE2]/10 px-4 py-1.5 rounded-full mb-3">
            Por Que Escolher a AgroPet Pr1me
          </span>
          <h2 className="font-['Archivo_Black',sans-serif] text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase text-black">
            A certeza de um cuidado genuíno com o seu animal
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3 font-normal">
            Tradição do campo combinada com atendimento humano e os melhores produtos do mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentials.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={index}
                className="bg-[#FAF7F2] rounded-3xl p-7 border border-neutral-200 hover:border-[#20BEE2] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-black text-[#20BEE2] group-hover:bg-[#20BEE2] group-hover:text-black flex items-center justify-center transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-['Archivo_Black',sans-serif] text-xl font-black text-gray-300 group-hover:text-[#20BEE2] transition-colors">
                      {diff.number}
                    </span>
                  </div>

                  <span className="inline-block text-[10px] font-black uppercase tracking-wider text-black bg-white border border-neutral-200 px-2.5 py-0.5 rounded-full mb-3">
                    {diff.highlight}
                  </span>

                  <h3 className="font-['Archivo_Black',sans-serif] text-xl font-black text-black mb-3">
                    {diff.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                    {diff.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-200/80 flex items-center text-xs font-bold text-black group-hover:text-[#20BEE2] transition-colors">
                  <span>Padrão Prime de Qualidade</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
