export function Stats() {
  const pillars = [
    {
      title: 'Loja Física em Sorocaba',
      desc: 'Estrutura ampla e acolhedora na R. Antônio Silva Saladino, 878 no Parque Vitória Régia. Venha tomar um café conosco!',
      icon: 'store',
      color: 'bg-[#00c0e3]/20 text-[#00687b]',
    },
    {
      title: 'Entrega Expressa Ágil',
      desc: 'Acabou a ração de repente? Despachamos seu pedido com urgência para que seu pet nunca fique desabastecido.',
      icon: 'bolt',
      color: 'bg-[#10B981]/20 text-[#10B981]',
    },
    {
      title: 'Atendimento Humanizado',
      desc: 'Orientação técnica e amiga por quem ama bichos e compreende a lida do homem do campo e dos tutores urbanos.',
      icon: 'recommend',
      color: 'bg-[#5ab7fd]/20 text-[#006398]',
    },
    {
      title: 'Preço Justo & Fidelidade',
      desc: 'Promoções reais semanais, combos de saca fechada e descontos especiais pelo PIX para toda a família rural e pet.',
      icon: 'price_check',
      color: 'bg-[#D97706]/20 text-[#D97706]',
    },
  ];

  return (
    <section className="w-full py-16 bg-[#f8f9ff]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#00687b] uppercase tracking-wider">
            Por que comprar com a AgroPet Prime
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B0F17] mt-1">
            A certeza de um cuidado genuíno com o seu animal
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => (
            <div
              key={idx}
              className="bg-white p-6 sm:p-8 rounded-3xl shadow-xs hover:shadow-md transition-all flex flex-col items-start border border-gray-100 hover-lift"
            >
              <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center mb-5`}>
                <span className="material-symbols-outlined text-[30px]">{p.icon}</span>
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-[#0B0F17] mb-2">
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}