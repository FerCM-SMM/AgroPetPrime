import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

const mockClients = [
  { name: 'Joao Silva', email: 'joao@email.com', orders: 5, total: 589.50 },
  { name: 'Maria Santos', email: 'maria@email.com', orders: 3, total: 249.70 },
  { name: 'Pedro Costa', email: 'pedro@email.com', orders: 8, total: 1020.00 },
];

export default function AdminClients() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#000000] mb-8">Clientes</h1>
      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 text-sm font-medium text-gray-500">Nome</th>
              <th className="p-4 text-sm font-medium text-gray-500">Email</th>
              <th className="p-4 text-sm font-medium text-gray-500">Pedidos</th>
              <th className="p-4 text-sm font-medium text-gray-500">Total Gasto</th>
            </tr>
          </thead>
          <tbody>
            {mockClients.map((client) => (
              <tr key={client.name} className="border-b">
                <td className="p-4 font-medium text-[#000000]">{client.name}</td>
                <td className="p-4 text-gray-500">{client.email}</td>
                <td className="p-4">{client.orders}</td>
                <td className="p-4 font-bold text-[#000000]">R$ {client.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
