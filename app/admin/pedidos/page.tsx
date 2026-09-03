import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Order } from '@/types/schema';

const mockOrders: Order[] = [
  { id: '1', status: 'pending', total: 169.80, customer_name: 'Joao Silva', customer_phone: '(11)99999-9999', created_at: '2026-01-15' },
  { id: '2', status: 'confirmed', total: 49.90, customer_name: 'Maria Santos', customer_phone: '(11)98888-8888', created_at: '2026-01-15' },
  { id: '3', status: 'pending', total: 279.80, customer_name: 'Pedro Costa', customer_phone: '(11)97777-7777', created_at: '2026-01-14' },
];

export default function AdminOrders() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-[#000000] mb-8">Pedidos</h1>
      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 text-sm font-medium text-gray-500">Cliente</th>
              <th className="p-4 text-sm font-medium text-gray-500">Status</th>
              <th className="p-4 text-sm font-medium text-gray-500">Total</th>
              <th className="p-4 text-sm font-medium text-gray-500">Data</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-4">
                  <div className="font-medium text-[#000000]">{order.customer_name}</div>
                  <div className="text-sm text-gray-500">{order.customer_phone}</div>
                </td>
                <td className="p-4">
                  <Badge variant={order.status === 'confirmed' ? 'default' : 'outline'}>
                    {order.status}
                  </Badge>
                </td>
                <td className="p-4 font-bold text-[#000000]">R$ {order.total.toFixed(2)}</td>
                <td className="p-4 text-gray-500">{order.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
