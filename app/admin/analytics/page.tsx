'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Seg', pedidos: 12 },
  { name: 'Ter', pedidos: 19 },
  { name: 'Qua', pedidos: 8 },
  { name: 'Qui', pedidos: 22 },
  { name: 'Sex', pedidos: 28 },
  { name: 'Sab', pedidos: 15 },
  { name: 'Dom', pedidos: 10 },
];

export default function AdminAnalytics() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#000000] mb-8">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pedidos por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="pedidos" fill="#12c0e0" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Resumo da Semana</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between"><span>Total de pedidos</span><span className="font-bold">114</span></div>
              <div className="flex justify-between"><span>Ticket medio</span><span className="font-bold">R$ 162.28</span></div>
              <div className="flex justify-between"><span>Clientes unicos</span><span className="font-bold">42</span></div>
              <div className="flex justify-between"><span>Produto mais vendido</span><span className="font-bold">Racao Pedigree</span></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
