import { Heart, Award, Headphones, RefreshCw } from 'lucide-react';

export function Stats() {
  const benefits = [
    {
      icon: Heart,
      title: 'Amado pelos Pets',
      description: 'Produtos testados e aprovados por milhares de tutores',
      color: 'bg-[#ef4444]/10 text-red-500',
    },
    {
      icon: Award,
      title: 'Qualidade Pr1me',
      description: 'Marcas líderes mundiais e fórmulas veterinárias',
      color: 'bg-[#fbbf24]/15 text-[#b45309]',
    },
    {
      icon: Headphones,
      title: 'Suporte no WhatsApp',
      description: 'Atendimento atencioso e ágil de seg a sáb',
      color: 'bg-[#12c0e0]/15 text-[#0284c7]',
    },
    {
      icon: RefreshCw,
      title: 'Troca Descomplicada',
      description: 'Até 30 dias para devolução ou troca sem burocracia',
      color: 'bg-[#10b981]/15 text-[#059669]',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-[#ede8dc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {benefits.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 text-left group hover-lift p-2 rounded-2xl transition-all"
            >
              <div className={`w-14 h-14 rounded-full ${item.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-108 duration-300`}>
                <item.icon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#111827] group-hover:text-[#0284c7] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
