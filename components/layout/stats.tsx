import { Store, Zap, HeartHandshake, BadgePercent } from 'lucide-react';

export function Stats() {
  const pillars = [
    {
      title: 'Loja Física em Sorocaba',
      desc: 'Estrutura ampla e acolhedora na R. Antônio Silva Saladino, 878 no Parque Vitória Régia. Venha tomar um café conosco!',
      icon: Store,
      color: 'bg-[#12c0e0]/15 text-[#00829B]',
    },
    {
      title: 'Entrega Expressa Ágil',
      desc: 'Acabou a ração de repente? Despachamos seu pedido com agilidade para que seu pet nunca fique sem a refeição favorita.',
      icon: Zap,
      color: 'bg-[#E06F12]/15 text-[#E06F12]',
    },
    {
      title: 'Atendimento Amigo & Cuidadoso',
      desc: 'Orientação atenciosa por quem realmente entende e ama animais, desde cães e gatos de apartamento até a lida do campo.',
      icon: HeartHandshake,
      color: 'bg-[#10b981]/15 text-[#10b981]',
    },
    {
      title: 'Preço Justo & Cashback',
      desc: 'Promoções reais semanais, combos de saca fechada e 5% de cashback em todas as compras para abater no próximo pedido.',
      icon: BadgePercent,
      color: 'bg-[#3591A1]/15 text-[#00829B]',
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 bg-[#f7f4ec]/60 border-t border-[#8B5F3A]/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#E06F12] uppercase tracking-wider block mb-1">
            Diferenciais AgroPet Prime
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#20241F]">
            A certeza de um cuidado genuíno com o seu animal
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 sm:p-7 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col items-start border border-[#8B5F3A]/15 hover:border-[#12c0e0]/40"
              >
                <div className={`w-12 h-12 rounded-2xl ${p.color} flex items-center justify-center mb-5`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base sm:text-lg text-[#20241F] mb-2 font-serif">
                  {p.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#20241F]/70 leading-relaxed">
                  {p.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}