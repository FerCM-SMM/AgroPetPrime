'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  AdminProduct,
  getStoredProducts,
  updateProductStock,
  addProductToStore,
} from '@/lib/admin-store';
import {
  Boxes,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  TrendingDown,
  RefreshCw,
  Save,
  Package,
  Layers,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function AdminEstoquePage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'low' | 'out' | 'normal'>('all');

  // Input temporário para cada produto enquanto o usuário digita
  const [inputStocks, setInputStocks] = useState<Record<string, number>>({});

  // Modal Novo Produto no Estoque
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [newProdData, setNewProdData] = useState({
    name: '',
    category: 'Rações',
    price: 99.90,
    stock: 20,
    sku: '',
    image: '/images/prod-dog-food.jpg',
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    const list = getStoredProducts();
    setProducts(list);
    const initialMap: Record<string, number> = {};
    list.forEach((p) => {
      initialMap[p.id] = p.stock;
    });
    setInputStocks(initialMap);
  };

  const handleStockDelta = (product: AdminProduct, delta: number) => {
    const nextStock = Math.max(0, product.stock + delta);
    updateProductStock(product.id, nextStock);
    toast.success(`Estoque de "${product.name.slice(0, 25)}..." ajustado para ${nextStock} un.`);
    loadProducts();
  };

  const handleDirectInputBlurOrSave = (productId: string) => {
    const newQty = inputStocks[productId];
    if (typeof newQty === 'number' && !isNaN(newQty)) {
      updateProductStock(productId, Math.max(0, newQty));
      toast.success('Estoque atualizado com sucesso!');
      loadProducts();
    }
  };

  const handleCreateNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdData.name) {
      toast.error('Informe o nome do produto.');
      return;
    }

    addProductToStore({
      name: newProdData.name,
      category: newProdData.category,
      price: Number(newProdData.price),
      stock: Number(newProdData.stock),
      sku: newProdData.sku || `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      image: newProdData.image,
    });

    toast.success(`Produto "${newProdData.name}" adicionado ao inventário!`);
    setIsNewModalOpen(false);
    loadProducts();
  };

  // Status visual
  const getStockStatus = (stock: number) => {
    if (stock === 0) {
      return {
        label: 'Esgotado',
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
        icon: XCircle,
      };
    } else if (stock <= 10) {
      return {
        label: `Baixo (${stock} un)`,
        badge: 'bg-amber-50 text-amber-700 border-amber-200',
        icon: AlertTriangle,
      };
    } else {
      return {
        label: `Normal (${stock} un)`,
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        icon: CheckCircle2,
      };
    }
  };

  // Filtragem
  const filteredProducts = products.filter((p) => {
    const matchesFilter =
      filterMode === 'all' ||
      (filterMode === 'out' && p.stock === 0) ||
      (filterMode === 'low' && p.stock > 0 && p.stock <= 10) ||
      (filterMode === 'normal' && p.stock > 10);

    const term = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term) ||
      (p.sku && p.sku.toLowerCase().includes(term));

    return matchesFilter && matchesSearch;
  });

  // Métricas
  const totalItems = products.length;
  const outCount = products.filter((p) => p.stock === 0).length;
  const lowCount = products.filter((p) => p.stock > 0 && p.stock <= 10).length;
  const normalCount = products.filter((p) => p.stock > 10).length;
  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-[#0B0F17] tracking-tight">
              Controle de Estoque Ágil
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#12C0E0]/15 text-[#00829B] border border-[#12C0E0]/30">
              Ajuste em 1 Clique
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Gestão rápida de inventário, alertas de reposição imediata e botões de incremento/decremento práticos.
          </p>
        </div>

        <button
          onClick={() => setIsNewModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 bg-[#12C0E0] hover:bg-[#00ADC9] text-black font-extrabold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-4 h-4 text-black" />
          <span>+ Cadastrar Item no Estoque</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Itens Monitorados</span>
            <span className="text-2xl font-black text-[#0B0F17] mt-1 block">{totalItems} Produtos</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Boxes className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">Estoque Normal</span>
            <span className="text-2xl font-black text-emerald-700 mt-1 block">{normalCount} Itens</span>
            <span className="text-[11px] font-semibold text-gray-400">&gt; 10 unidades</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-amber-400" />
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Estoque Baixo
            </span>
            <span className="text-2xl font-black text-amber-900 mt-1 block">{lowCount} Itens</span>
            <span className="text-[11px] font-semibold text-amber-700">1 a 10 unidades</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <TrendingDown className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-2 h-full bg-rose-500" />
          <div>
            <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block flex items-center gap-1">
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
              Esgotados
            </span>
            <span className="text-2xl font-black text-rose-900 mt-1 block">{outCount} Itens</span>
            <span className="text-[11px] font-semibold text-rose-700">Ruptura de estoque</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
            <Package className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nome, categoria ou SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#12C0E0] focus:bg-white transition-all text-[#0B0F17]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterMode === 'all' ? 'bg-[#0B0F17] text-white' : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            Todos ({products.length})
          </button>
          <button
            onClick={() => setFilterMode('low')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterMode === 'low' ? 'bg-amber-500 text-white' : 'text-amber-700 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            ⚠️ Estoque Baixo ({lowCount})
          </button>
          <button
            onClick={() => setFilterMode('out')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterMode === 'out' ? 'bg-rose-600 text-white' : 'text-rose-700 bg-rose-50 hover:bg-rose-100'
            }`}
          >
            🔴 Esgotados ({outCount})
          </button>
          <button
            onClick={() => setFilterMode('normal')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filterMode === 'normal' ? 'bg-emerald-600 text-white' : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
            }`}
          >
            🟢 Normal ({normalCount})
          </button>
        </div>
      </div>

      {/* Table with Quick Stock Actions */}
      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 text-[11px] font-extrabold uppercase tracking-wider">
                <th className="py-3.5 px-4">Produto / Categoria</th>
                <th className="py-3.5 px-4">Preço Unitário</th>
                <th className="py-3.5 px-4">Status Atual</th>
                <th className="py-3.5 px-4 text-center">Ajuste Rápido de Estoque</th>
                <th className="py-3.5 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400 font-medium">
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const status = getStockStatus(p.stock);
                  const StatusIcon = status.icon;

                  return (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition-colors group">
                      {/* Product */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-xl bg-gray-50 border border-gray-200 overflow-hidden shrink-0">
                            <Image src={p.image} alt={p.name} fill className="object-cover" />
                          </div>
                          <div>
                            <span className="font-extrabold text-[#0B0F17] text-sm block">
                              {p.name}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5 text-gray-400 text-[11px]">
                              <span className="font-semibold text-[#00687B]">{p.category}</span>
                              {p.sku && <span>• SKU: {p.sku}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-black text-[#0B0F17] text-sm">
                          R$ {p.price.toFixed(2)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${status.badge}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {status.label}
                        </span>
                      </td>

                      {/* Quick Adjust Buttons */}
                      <td className="py-4 px-4 whitespace-nowrap text-center">
                        <div className="inline-flex items-center gap-1 bg-gray-50 p-1.5 rounded-2xl border border-gray-200">
                          {/* -5 */}
                          <button
                            onClick={() => handleStockDelta(p, -5)}
                            className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 font-black hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all text-xs"
                            title="Diminuir 5 unidades"
                          >
                            -5
                          </button>

                          {/* -1 */}
                          <button
                            onClick={() => handleStockDelta(p, -1)}
                            className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 font-black hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all text-xs"
                            title="Diminuir 1 unidade"
                          >
                            -1
                          </button>

                          {/* Direct Input */}
                          <div className="relative mx-1">
                            <input
                              type="number"
                              min="0"
                              value={inputStocks[p.id] ?? p.stock}
                              onChange={(e) => {
                                setInputStocks({
                                  ...inputStocks,
                                  [p.id]: Number(e.target.value),
                                });
                              }}
                              onBlur={() => handleDirectInputBlurOrSave(p.id)}
                              className="w-16 text-center py-1 bg-white border border-gray-300 rounded-xl font-black text-sm text-[#0B0F17] focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                            />
                          </div>

                          {/* +1 */}
                          <button
                            onClick={() => handleStockDelta(p, 1)}
                            className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 font-black hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all text-xs"
                            title="Adicionar 1 unidade"
                          >
                            +1
                          </button>

                          {/* +5 */}
                          <button
                            onClick={() => handleStockDelta(p, 5)}
                            className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-gray-700 font-black hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-all text-xs"
                            title="Adicionar 5 unidades"
                          >
                            +5
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={() => handleDirectInputBlurOrSave(p.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 hover:text-black hover:bg-gray-100 border border-gray-200 transition-all"
                        >
                          <Save className="w-3.5 h-3.5 text-[#12C0E0]" />
                          <span>Salvar</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: NOVO ITEM NO ESTOQUE */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Boxes className="w-5 h-5 text-[#12C0E0]" />
                <h3 className="font-extrabold text-lg text-[#0B0F17]">Cadastrar Item no Estoque</h3>
              </div>
              <button onClick={() => setIsNewModalOpen(false)} className="text-gray-400 hover:text-black">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateNewProduct} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nome do Produto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ração Golden Special Cães 15kg"
                  value={newProdData.name}
                  onChange={(e) => setNewProdData({ ...newProdData, name: e.target.value })}
                  className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Categoria</label>
                  <select
                    value={newProdData.category}
                    onChange={(e) => setNewProdData({ ...newProdData, category: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  >
                    <option value="Rações">Rações</option>
                    <option value="Acessórios">Acessórios</option>
                    <option value="Brinquedos">Brinquedos</option>
                    <option value="Higiene & Farmácia">Higiene & Farmácia</option>
                    <option value="Campo & Fazenda">Campo & Fazenda</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">SKU / Código</label>
                  <input
                    type="text"
                    placeholder="RAC-GOLD-15"
                    value={newProdData.sku}
                    onChange={(e) => setNewProdData({ ...newProdData, sku: e.target.value })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Preço de Venda (R$)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newProdData.price}
                    onChange={(e) => setNewProdData({ ...newProdData, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Estoque Inicial (un)</label>
                  <input
                    type="number"
                    min="0"
                    value={newProdData.stock}
                    onChange={(e) => setNewProdData({ ...newProdData, stock: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#12C0E0] outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-extrabold bg-[#12C0E0] text-black hover:bg-[#00ADC9]"
                >
                  Cadastrar no Estoque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}