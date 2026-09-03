import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';
import Link from 'next/link';

const mockProducts = [
  { name: 'Racao Pedigree Adulto', price: 129.90, stock: 50, category: 'Racoes' },
  { name: 'Racao Whiskas Adulto', price: 49.90, stock: 100, category: 'Racoes' },
  { name: 'Coleira Luxo', price: 39.90, stock: 30, category: 'Acessorios' },
];

export default function AdminProducts() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#000000]">Produtos</h1>
        <Button asChild size="sm" className="bg-[#12c0e0] text-black hover:bg-[#0ea5e9]">
          <Link href="/admin/produtos/novo">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Link>
        </Button>
      </div>
      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left">
              <th className="p-4 text-sm font-medium text-gray-500">Produto</th>
              <th className="p-4 text-sm font-medium text-gray-500">Preco</th>
              <th className="p-4 text-sm font-medium text-gray-500">Estoque</th>
              <th className="p-4 text-sm font-medium text-gray-500">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <tr key={product.name} className="border-b">
                <td className="p-4 font-medium text-[#000000]">{product.name}</td>
                <td className="p-4 text-[#12c0e0] font-bold">R$ {product.price.toFixed(2)}</td>
                <td className="p-4">{product.stock}</td>
                <td className="p-4 text-gray-500">{product.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
