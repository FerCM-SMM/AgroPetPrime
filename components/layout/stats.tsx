import { ShoppingBag, Users, Truck, Award } from 'lucide-react';

export function Stats() {
  return (
    <section className="bg-[#f8fafc] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShoppingBag, label: 'Produtos', value: '+' },
            { icon: Users, label: 'Clientes Atendidos', value: '+' },
            { icon: Truck, label: 'Pedidos/Mes', value: '300+' },
            { icon: Award, label: 'Anos de Mercado', value: '+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-8 h-8 text-[#12c0e0] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#000000]">{stat.value}</p>
              <p className="text-gray-600 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
