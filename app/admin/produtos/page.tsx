'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  AlertTriangle,
  CheckCircle2,
  X,
  Sparkles,
  Package,
  ArrowUpDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  stock: number;
  image: string;
  badge?: string;
  active: boolean;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Ração Premier Formula Cães Adultos Raças Médias e Grandes 15kg',
    brand: 'Premier Pet',
    category: 'Cães',
    price: 237.70,
    oldPrice: 289.90,
    stock: 24,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLjV5W5nC3XQkXwwsJ-zzHFDaLwjYLTA3ssLwdXzElv8_P7lHBDs1L-QhUTr5zi_5OwUmPNgYJY0H52HdccZq6zVIB4RfvOZ0kgpsAsuHQo5a693llZYG_zeQAK6uoqobber8rtXLZdo3HJOGY9GNxuhzY9rTXVziGzsBk8mA-hliNviiGhab6U6qTifNtPGWVcfDmoCWYegn1Da1SyoixARlehvRhkHTi9mVV0yyr3TsuFYMHe-7Q',
    badge: '-18% OFF',
    active: true,
  },
  {
    id: '2',
    name: 'Ração Royal Canin Gatos Adultos Castrados 7.5kg',
    brand: 'Royal Canin',
    category: 'Gatos',
    price: 254.15,
    oldPrice: 299.00,
    stock: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMy1FziA-yfwim1xT-Wn8N3lJbm5ol9mTnf6WV-Ye4uOQK5noAIQOsf2JLeEtjRgVpBxqyVQEfyDRieCThPgYYgxUDQ5Y-eoeXnsqVCYGA6cyQniSkFkq90-zWpTeXwCDEif7WSyrCGrP8-izPrc71_doPw8wFPdBVVFZZbYRp9dbMI2sZHxHaaZAgUsvPdy1xoOtbpO7SFS8HhLB7QOPUHijJ6BpMsdraW0ktAsmnZrcnfugLDzZl',
    badge: '-15% OFF',
    active: true,
  },
  {
    id: '3',
    name: 'Antipulgas e Carrapatos Simparic 80mg (Cães 20 a 40kg) 1 Comp.',
    brand: 'Zoetis',
    category: 'Farmácia',
    price: 119.90,
    oldPrice: 139.90,
    stock: 5,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2RTizwlF1mzVgaRF1qk68KmR2VEOQ-WXa1EqTJnJbxHTVnhyPfjucaPx03Wb8iMYh_Hd13I6My3WkGxl2AQxjnPuzjJDqqm4ZAnDTiBRj9QDDYH85CNmGcRAtHGN3k-tTVwrItbU98jOlK7yCcgBsjWzIgLmqqC7fvZlpsaGN6Pd-q5tj3ILni7MqVWNy6v4N8QYby3jRMMwZORCiyKkQWBtRJ513BZxkLApP9DdgKX--UHwoeV9b',
    badge: 'Frete Grátis',
    active: true,
  },
  {
    id: '4',
    name: 'Ração Equinos Alta Energia Cavalo Atleta Laminada 25kg',
    brand: 'Agro & Equinos',
    category: 'Linha Agro',
    price: 142.50,
    oldPrice: 165.00,
    stock: 32,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFOUHyxrytUlqlsTBQlJLc4lggzz0Fk_vbmBw6NEG5KPDCK5-xkM05zxBotxoezEjf2JJFlMYPDqehqb-4NrODO8w6BlJ4b-n59s96gKBEOstH4c89_24D3O3adObsrGkmzM66cF43PCbImsbMLOeaGuHldTM5CprpsF8-akfeAGJFjfxjs3VDPKzuQ7lKABWe1wvGokxdlR7UlAYkO3nSj067agsKupRJEeibt4hEhK0WwCvJnezg',
    badge: 'Linha Campo',
    active: true,
  },
  {
    id: '5',
    name: 'Bravecto Cães de 10 a 20kg Comprimido Mastigável (500mg)',
    brand: 'MSD Saúde Animal',
    category: 'Farmácia',
    price: 219.90,
    oldPrice: 259.00,
    stock: 14,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuXLWGzzXajtsjUTNXpDxiXgdfG_n88d5xfszvRvUGJ0qx6bnXDxByU-joakfC7wXeyPfJRvUALgVwIMSUtM43HRPz89Qfb1mgERS96qSsjKEn42ZJiFuZ_0SvJ9HdgQXY_2GYXNld9WghFVNK9YlxuQXLrHlXv0Y0LJ_Vy7oComedc_XceAv7fEhvihJweqaGZWNx4IC2qmukYkUNaxxbJ1R0mx8wbZn0KtWdZJA9PSv2xUeplkQa',
    badge: 'Original MSD',
    active: true,
  },
  {
    id: '6',
    name: 'Caminha Donut Faux-Fur Nuvem Ultra Macia Bege',
    brand: 'Conforto Pet',
    category: 'Camas',
    price: 149.90,
    oldPrice: 189.90,
    stock: 8,
    image: '/images/prod-pet-bed.jpg',
    badge: 'Super Conforto',
    active: true,
  },
];

export default function AdminProdutosPage() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Cães',
    price: '',
    oldPrice: '',
    stock: '',
    image: '',
    badge: '',
    active: true,
  });

  const categories = ['Todas', 'Cães', 'Gatos', 'Farmácia', 'Linha Agro', 'Camas'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'Todas' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenNewModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      brand: '',
      category: 'Cães',
      price: '',
      oldPrice: '',
      stock: '10',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLjV5W5nC3XQkXwwsJ-zzHFDaLwjYLTA3ssLwdXzElv8_P7lHBDs1L-QhUTr5zi_5OwUmPNgYJY0H52HdccZq6zVIB4RfvOZ0kgpsAsuHQo5a693llZYG_zeQAK6uoqobber8rtXLZdo3HJOGY9GNxuhzY9rTXVziGzsBk8mA-hliNviiGhab6U6qTifNtPGWVcfDmoCWYegn1Da1SyoixARlehvRhkHTi9mVV0yyr3TsuFYMHe-7Q',
      badge: '',
      active: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price.toString(),
      oldPrice: product.oldPrice ? product.oldPrice.toString() : '',
      stock: product.stock.toString(),
      image: product.image,
      badge: product.badge || '',
      active: product.active,
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.price) {
      toast.error('Preencha o nome e o preço do produto!');
      return;
    }

    const priceNum = parseFloat(formData.price.replace(',', '.'));
    const oldPriceNum = formData.oldPrice
      ? parseFloat(formData.oldPrice.replace(',', '.'))
      : undefined;
    const stockNum = parseInt(formData.stock, 10) || 0;

    if (editingProduct) {
      // Update
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                brand: formData.brand,
                category: formData.category,
                price: priceNum,
                oldPrice: oldPriceNum,
                stock: stockNum,
                image: formData.image || '/images/prod-dog-food.jpg',
                badge: formData.badge,
                active: formData.active,
              }
            : p
        )
      );
      toast.success('Produto atualizado com sucesso! ✓');
    } else {
      // Create
      const newProd: Product = {
        id: Date.now().toString(),
        name: formData.name,
        brand: formData.brand || 'AgroPet Pr1me',
        category: formData.category,
        price: priceNum,
        oldPrice: oldPriceNum,
        stock: stockNum,
        image: formData.image || '/images/prod-dog-food.jpg',
        badge: formData.badge,
        active: formData.active,
      };
      setProducts((prev) => [newProd, ...prev]);
      toast.success('Novo produto cadastrado com sucesso! ✓');
    }

    setIsModalOpen(false);
  };

  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Deseja realmente excluir o produto "${name}"?`)) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.info('Produto removido do catálogo.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-black text-[#0B0F17]">Catálogo de Produtos</h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Cadastre, edite fotos, controle estoque e gerencie preços dos itens da loja.
          </p>
        </div>
        <Button
          onClick={handleOpenNewModal}
          className="bg-[#12C0E0] hover:bg-[#00A8C7] text-black font-extrabold text-xs px-5 py-2.5 rounded-xl shadow-xs hover-lift active-press flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Cadastrar Novo Produto</span>
        </Button>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nome ou marca..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#f8f9ff] border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                categoryFilter === cat
                  ? 'bg-[#0B0F17] text-white shadow-xs'
                  : 'bg-[#f8f9ff] text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f8f9ff] border-b border-gray-200 text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                <th className="p-4">Produto &amp; Imagem</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Preço (R$)</th>
                <th className="p-4">Estoque</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                  {/* Image & Name */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-xl bg-[#f8f9ff] overflow-hidden border border-gray-200 shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="48px"
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="min-w-0 max-w-xs">
                        <p className="font-bold text-[#0B0F17] truncate">{product.name}</p>
                        <span className="text-[11px] text-gray-400 font-medium">
                          {product.brand}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="p-4 font-semibold text-gray-700">
                    <span className="bg-[#eff4ff] text-[#00687b] px-2.5 py-1 rounded-full text-[11px] font-extrabold">
                      {product.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="p-4">
                    <div className="font-extrabold text-[#00687b] text-sm">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </div>
                    {product.oldPrice && (
                      <span className="text-[10px] text-gray-400 line-through">
                        R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </td>

                  {/* Stock */}
                  <td className="p-4">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`font-bold text-xs ${
                          product.stock < 10 ? 'text-amber-600' : 'text-gray-800'
                        }`}
                      >
                        {product.stock} un
                      </span>
                      {product.stock < 10 && (
                        <span
                          title="Estoque baixo!"
                          className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded"
                        >
                          Baixo
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                        product.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          product.active ? 'bg-green-600' : 'bg-gray-400'
                        }`}
                      />
                      {product.active ? 'Ativo na Loja' : 'Pausado'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(product)}
                        className="p-1.5 text-gray-500 hover:text-[#00687b] hover:bg-gray-100 rounded-lg transition-colors"
                        title="Editar Produto & Foto"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProduct(product.id, product.name)}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Excluir Produto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Cadastrar / Editar Produto com Preview de Imagem */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-gray-200 animate-fade-in-up">
            {/* Modal Header */}
            <div className="bg-[#f8f9ff] px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-[#12C0E0]" />
                <h3 className="font-extrabold text-lg text-[#0B0F17]">
                  {editingProduct ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-gray-400 hover:text-black rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Nome Completo do Produto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: Ração Premier Adultos 15kg"
                    className="w-full bg-[#f8f9ff] px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Marca / Fabricante
                  </label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Ex: Premier Pet, Zoetis, MSD"
                    className="w-full bg-[#f8f9ff] px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#f8f9ff] px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
                  >
                    <option value="Cães">Cães</option>
                    <option value="Gatos">Gatos</option>
                    <option value="Farmácia">Farmácia</option>
                    <option value="Linha Agro">Linha Agro</option>
                    <option value="Camas">Camas</option>
                    <option value="Pássaros">Pássaros</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Preço de Venda (R$) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="189,90"
                    className="w-full bg-[#f8f9ff] px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Preço De / Riscado (R$)
                  </label>
                  <input
                    type="text"
                    value={formData.oldPrice}
                    onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                    placeholder="229,90"
                    className="w-full bg-[#f8f9ff] px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Quantidade em Estoque
                  </label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="20"
                    className="w-full bg-[#f8f9ff] px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Badge / Selo Promocional
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ex: -15% OFF, Frete Grátis"
                    className="w-full bg-[#f8f9ff] px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
                  />
                </div>
              </div>

              {/* Image URL with Live Image Preview Box! */}
              <div className="p-4 bg-[#f8f9ff] rounded-2xl border border-gray-200 space-y-3">
                <label className="block text-xs font-bold text-gray-800">
                  Foto do Produto (URL ou Arquivo Local)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Ex: /images/prod-dog-food.jpg ou URL externa"
                  className="w-full bg-white px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-medium focus:outline-none focus:border-[#12C0E0]"
                />

                {/* Live Preview */}
                <div className="flex items-center gap-4 pt-1">
                  <div className="relative w-20 h-20 rounded-xl bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
                    {formData.image ? (
                      <Image
                        src={formData.image}
                        alt="Preview"
                        fill
                        className="object-contain p-1"
                        onError={(e) => {
                          // fallback
                        }}
                      />
                    ) : (
                      <span className="text-[10px] text-gray-400">Sem Foto</span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    <p className="font-bold text-gray-700">Preview em Tempo Real da Foto</p>
                    <p className="text-[11px] text-gray-400">
                      A foto aparecerá exatamente assim nos cards da loja.
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="activeCheck"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded text-[#12C0E0] focus:ring-[#12C0E0]"
                />
                <label htmlFor="activeCheck" className="text-xs font-bold text-gray-700">
                  Produto Ativo (visível para os clientes na loja)
                </label>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl text-xs font-bold"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#12C0E0] hover:bg-[#00A8C7] text-black font-extrabold text-xs px-6 rounded-xl hover-lift"
                >
                  {editingProduct ? 'Salvar Alterações' : 'Cadastrar Produto'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}