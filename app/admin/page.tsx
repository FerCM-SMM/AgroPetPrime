import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { title: 'Pedidos no Mes', value: '156', icon: ShoppingCart, change: '+12%' },
    { title: 'Clientes Ativos', value: '342', icon: Users, change: '+8%' },
    { title: 'Produtos', value: '48', icon: Package, change: '+3' },
    { title: 'Faturamento', value: 'R$ 18.500', icon: TrendingUp, change: '+15%' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#000000] mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-[#12c0e0]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#000000]">{stat.value}</div>
              <p className="text-xs text-green-600 mt-1">{stat.change} vs mes anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
