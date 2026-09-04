export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  orders_count: number;
  total_spent: number;
  last_order_date: string;
  consumption_habits: string[];
  purchase_frequency_days: number;
  cashback_balance: number;
  notes?: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  image?: string;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  created_at: string;
  payment_method?: string;
  observation?: string;
  items: OrderItem[];
}

export interface AdminProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  sku?: string;
}

const STORAGE_KEYS = {
  CUSTOMERS: 'agropet_admin_customers_v2',
  ORDERS: 'agropet_admin_orders_v2',
  PRODUCTS: 'agropet_admin_products_v2',
};

// Seed de Clientes com caracteres acentuados 100% perfeitos
const SEED_CUSTOMERS: Customer[] = [
  {
    id: 'cli-001',
    name: 'Carlos Mendes',
    email: 'carlos.mendes@gmail.com',
    phone: '(15) 99823-4120',
    address: 'Rua das Palmeiras, 142 - Centro, Itapetininga/SP',
    orders_count: 6,
    total_spent: 1340.50,
    last_order_date: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
    consumption_habits: ['Rações Super Premium', 'Pitbull & Porte Grande', 'Antipulgas Simparic'],
    purchase_frequency_days: 30,
    cashback_balance: 67.00,
    notes: 'Costuma comprar saco de 15kg de ração a cada mês. Tutor de Pitbull.',
    created_at: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'cli-002',
    name: 'Juliana Paes Fagundes',
    email: 'juliana.fagundes@hotmail.com',
    phone: '(15) 99712-8834',
    address: 'Av. Brasil, 850 - Apto 42 - Jardim Paulista, Itapetininga/SP',
    orders_count: 4,
    total_spent: 620.00,
    last_order_date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    consumption_habits: ['Sachês & Petiscos Gourmet', 'Gatos Castrados', 'Areia Sílica'],
    purchase_frequency_days: 20,
    cashback_balance: 31.00,
    notes: 'Tem 2 gatos persas. Adora novidades em caminhas e brinquedos.',
    created_at: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'cli-003',
    name: 'Fazenda Boa Esperança (Dr. Roberto)',
    email: 'contato@boaesperanca.agr.br',
    phone: '(15) 99655-0921',
    address: 'Rodovia SP-127, Km 15 - Zona Rural, Itapetininga/SP',
    orders_count: 9,
    total_spent: 4890.00,
    last_order_date: new Date(Date.now() - 38 * 24 * 60 * 60 * 1000).toISOString(),
    consumption_habits: ['Suplementação Equina', 'Selaria & Couro', 'Vermífugos Grandes Animais'],
    purchase_frequency_days: 35,
    cashback_balance: 244.50,
    notes: 'Criação de cavalos Quarto de Milha. Compra em grande volume.',
    created_at: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'cli-004',
    name: 'Fernanda Lima Souza',
    email: 'fernanda.lima@yahoo.com.br',
    phone: '(15) 99188-7744',
    address: 'Rua Pedro Voss, 310 - Vila Aparecida, Itapetininga/SP',
    orders_count: 2,
    total_spent: 239.80,
    last_order_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    consumption_habits: ['Shampoos Veganos', 'Escovas de Bambu', 'Petiscos Naturais'],
    purchase_frequency_days: 45,
    cashback_balance: 11.99,
    notes: 'Prefere linhas naturais e ecológicas para seu Golden Retriever.',
    created_at: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Seed de Pedidos com nomes e pagamentos acentuados corretamente
const SEED_ORDERS: Order[] = [
  {
    id: 'PED-1024',
    customer_name: 'Carlos Mendes',
    customer_phone: '(15) 99823-4120',
    customer_address: 'Rua das Palmeiras, 142 - Centro, Itapetininga/SP',
    total: 379.80,
    status: 'delivered',
    created_at: new Date(Date.now() - 42 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: 'PIX',
    observation: 'Entregar na portaria com cuidado.',
    items: [
      {
        product_id: '1',
        product_name: 'Ração Super Premium Aurora Holistic Nutrition Cães Adultos 12kg',
        quantity: 2,
        unit_price: 189.90,
        image: '/images/prod-dog-food.jpg',
      },
    ],
  },
  {
    id: 'PED-1025',
    customer_name: 'Juliana Paes Fagundes',
    customer_phone: '(15) 99712-8834',
    customer_address: 'Av. Brasil, 850 - Apto 42 - Jardim Paulista, Itapetininga/SP',
    total: 199.80,
    status: 'delivered',
    created_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: 'Cartão de Crédito',
    observation: 'Interfone 42.',
    items: [
      {
        product_id: '2',
        product_name: 'Caminha Donut Faux-Fur Nuvem Ultra Macia Bege',
        quantity: 1,
        unit_price: 149.90,
        image: '/images/prod-pet-bed.jpg',
      },
      {
        product_id: '3',
        product_name: 'Brinquedo Pelúcia Raposinha Plush Squeaky com Corda',
        quantity: 1,
        unit_price: 49.90,
        image: '/images/prod-pet-toy.jpg',
      },
    ],
  },
  {
    id: 'PED-1026',
    customer_name: 'Fernanda Lima Souza',
    customer_phone: '(15) 99188-7744',
    customer_address: 'Rua Pedro Voss, 310 - Vila Aparecida, Itapetininga/SP',
    total: 89.90,
    status: 'shipped',
    created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: 'PIX',
    observation: 'Deixar com a vizinha se eu não estiver.',
    items: [
      {
        product_id: '4',
        product_name: 'Kit Banho & Tosa: Shampoo Ultra-Gentle 473ml + Escova Bambu Natural',
        quantity: 1,
        unit_price: 89.90,
        image: '/images/prod-grooming.jpg',
      },
    ],
  },
  {
    id: 'PED-1027',
    customer_name: 'Fazenda Boa Esperança (Dr. Roberto)',
    customer_phone: '(15) 99655-0921',
    customer_address: 'Rodovia SP-127, Km 15 - Zona Rural, Itapetininga/SP',
    total: 749.70,
    status: 'processing',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    payment_method: 'Boleto Bancário',
    observation: 'Nota fiscal de produtor rural solicitada.',
    items: [
      {
        product_id: '6',
        product_name: 'Suplemento Vitamínico Mineral Equino Muscle Horse Turbo 2.5kg',
        quantity: 3,
        unit_price: 249.90,
        image: '/images/prod-pet-bed.jpg',
      },
    ],
  },
];

// Seed de Produtos com nomes e categorias acentuados corretamente
const SEED_PRODUCTS: AdminProduct[] = [
  {
    id: '1',
    name: 'Ração Super Premium Aurora Holistic Nutrition Cães Adultos 12kg',
    category: 'Rações',
    price: 189.90,
    stock: 45,
    sku: 'RAC-AUR-12KG',
    image: '/images/prod-dog-food.jpg',
  },
  {
    id: '2',
    name: 'Caminha Donut Faux-Fur Nuvem Ultra Macia Bege',
    category: 'Acessórios',
    price: 149.90,
    stock: 6,
    sku: 'CAM-DON-BEG',
    image: '/images/prod-pet-bed.jpg',
  },
  {
    id: '3',
    name: 'Brinquedo Pelúcia Raposinha Plush Squeaky com Corda',
    category: 'Brinquedos',
    price: 49.90,
    stock: 60,
    sku: 'BRINQ-RAP-PLUSH',
    image: '/images/prod-pet-toy.jpg',
  },
  {
    id: '4',
    name: 'Kit Banho & Tosa: Shampoo Ultra-Gentle 473ml + Escova Bambu Natural',
    category: 'Higiene & Farmácia',
    price: 89.90,
    stock: 0,
    sku: 'HIG-KIT-BAMBU',
    image: '/images/prod-grooming.jpg',
  },
  {
    id: '5',
    name: 'Antipulgas e Carrapatos NexGard Spectra para Cães 15 a 30kg',
    category: 'Farmácia Veterinária',
    price: 135.00,
    stock: 4,
    sku: 'FAR-NEX-1530',
    image: '/images/prod-dog-food.jpg',
  },
  {
    id: '6',
    name: 'Suplemento Vitamínico Mineral Equino Muscle Horse Turbo 2.5kg',
    category: 'Campo & Fazenda',
    price: 249.90,
    stock: 12,
    sku: 'AGR-MUSCLE-25',
    image: '/images/prod-pet-bed.jpg',
  },
];

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function getStoredCustomers(): Customer[] {
  if (!isBrowser()) return SEED_CUSTOMERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(SEED_CUSTOMERS));
      return SEED_CUSTOMERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_CUSTOMERS;
  } catch {
    return SEED_CUSTOMERS;
  }
}

export function saveCustomer(data: Omit<Customer, 'id' | 'created_at'>): Customer {
  const customers = getStoredCustomers();
  const newCustomer: Customer = {
    ...data,
    id: 'cli-' + Date.now().toString(36),
    created_at: new Date().toISOString(),
  };
  const updated = [newCustomer, ...customers];
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(updated));
  }
  return newCustomer;
}

export function updateCustomer(id: string, data: Partial<Customer>): Customer | null {
  const customers = getStoredCustomers();
  const idx = customers.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  const updatedCustomer = { ...customers[idx], ...data };
  customers[idx] = updatedCustomer;
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }
  return updatedCustomer;
}

export function deleteCustomer(id: string): boolean {
  const customers = getStoredCustomers();
  const filtered = customers.filter((c) => c.id !== id);
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(filtered));
  }
  return true;
}

export function getStoredOrders(): Order[] {
  if (!isBrowser()) return SEED_ORDERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_ORDERS;
  } catch {
    return SEED_ORDERS;
  }
}

export function saveOrder(data: Omit<Order, 'id' | 'created_at'>): Order {
  const orders = getStoredOrders();
  const newOrder: Order = {
    ...data,
    id: 'PED-' + Math.floor(1000 + Math.random() * 9000),
    created_at: new Date().toISOString(),
  };
  const updated = [newOrder, ...orders];
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  }
  return newOrder;
}

export function updateOrder(id: string, data: Partial<Order>): Order | null {
  const orders = getStoredOrders();
  const idx = orders.findIndex((o) => o.id === id);
  if (idx === -1) return null;
  const updatedOrder = { ...orders[idx], ...data };
  orders[idx] = updatedOrder;
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }
  return updatedOrder;
}

export function deleteOrder(id: string): boolean {
  const orders = getStoredOrders();
  const filtered = orders.filter((o) => o.id !== id);
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(filtered));
  }
  return true;
}

export function recordCheckoutOrder(params: {
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  total: number;
  observation?: string;
  items: OrderItem[];
}): Order {
  const order = saveOrder({
    customer_name: params.customerName,
    customer_phone: params.customerPhone,
    customer_address: params.customerAddress,
    total: params.total,
    status: 'pending',
    payment_method: 'WhatsApp / PIX',
    observation: params.observation,
    items: params.items,
  });

  const customers = getStoredCustomers();
  const normalizedPhone = params.customerPhone.replace(/\D/g, '');
  const existingIdx = customers.findIndex(
    (c) => c.phone.replace(/\D/g, '') === normalizedPhone || c.name.toLowerCase() === params.customerName.toLowerCase()
  );

  const inferredHabits: string[] = [];
  params.items.forEach((item) => {
    const lower = item.product_name.toLowerCase();
    if (lower.includes('ração') || lower.includes('holistic')) inferredHabits.push('Rações Super Premium');
    if (lower.includes('cão') || lower.includes('cães') || lower.includes('pitbull')) inferredHabits.push('Cães Adultos');
    if (lower.includes('gato') || lower.includes('persa')) inferredHabits.push('Gatos Castrados');
    if (lower.includes('banho') || lower.includes('shampoo')) inferredHabits.push('Higiene & Banho');
    if (lower.includes('brinquedo')) inferredHabits.push('Brinquedos & Acessórios');
  });

  const cashbackEarned = Math.round(params.total * 0.05 * 100) / 100;

  if (existingIdx !== -1) {
    const existing = customers[existingIdx];
    const uniqueHabits = Array.from(new Set([...existing.consumption_habits, ...inferredHabits]));
    customers[existingIdx] = {
      ...existing,
      orders_count: existing.orders_count + 1,
      total_spent: Math.round((existing.total_spent + params.total) * 100) / 100,
      last_order_date: new Date().toISOString(),
      cashback_balance: Math.round((existing.cashback_balance + cashbackEarned) * 100) / 100,
      consumption_habits: uniqueHabits.length > 0 ? uniqueHabits : existing.consumption_habits,
    };
  } else {
    const newCustomer: Customer = {
      id: 'cli-' + Date.now().toString(36),
      name: params.customerName,
      email: params.customerName.toLowerCase().replace(/\s+/g, '.') + '@cliente.com',
      phone: params.customerPhone,
      address: params.customerAddress,
      orders_count: 1,
      total_spent: params.total,
      last_order_date: new Date().toISOString(),
      consumption_habits: inferredHabits.length > 0 ? inferredHabits : ['Cliente Novo'],
      purchase_frequency_days: 30,
      cashback_balance: cashbackEarned,
      notes: 'Cadastrado automaticamente via checkout online.',
      created_at: new Date().toISOString(),
    };
    customers.unshift(newCustomer);
  }

  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }

  params.items.forEach((item) => {
    decrementStock(item.product_id, item.quantity);
  });

  return order;
}

export function getStoredProducts(): AdminProduct[] {
  if (!isBrowser()) return SEED_PRODUCTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(SEED_PRODUCTS));
      return SEED_PRODUCTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_PRODUCTS;
  } catch {
    return SEED_PRODUCTS;
  }
}

export function updateProductStock(id: string, newStock: number): AdminProduct | null {
  const products = getStoredProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx === -1) return null;
  products[idx].stock = Math.max(0, newStock);
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }
  return products[idx];
}

export function decrementStock(id: string, qty: number): void {
  const products = getStoredProducts();
  const idx = products.findIndex((p) => p.id === id);
  if (idx !== -1) {
    products[idx].stock = Math.max(0, products[idx].stock - qty);
    if (isBrowser()) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    }
  }
}

export function addProductToStore(product: Omit<AdminProduct, 'id'>): AdminProduct {
  const products = getStoredProducts();
  const newProd: AdminProduct = {
    ...product,
    id: 'prod-' + Date.now().toString(36),
  };
  const updated = [newProd, ...products];
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  }
  return newProd;
}

export function getDaysSinceLastOrder(dateStr: string): number {
  if (!dateStr) return 999;
  const last = new Date(dateStr).getTime();
  const diff = Date.now() - last;
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function getCustomerStatus(customer: Customer): {
  status: 'active' | 'at_risk' | 'churned';
  label: string;
  days: number;
  badgeClass: string;
} {
  const days = getDaysSinceLastOrder(customer.last_order_date);
  if (days <= 30) {
    return {
      status: 'active',
      label: 'Ativo (' + days + 'd)',
      days,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  } else if (days <= 60) {
    return {
      status: 'at_risk',
      label: 'Em Risco (' + days + 'd sem comprar)',
      days,
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    };
  } else {
    return {
      status: 'churned',
      label: 'Inativo (+' + days + 'd sem comprar)',
      days,
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    };
  }
}

export function generateReactivationWhatsAppLink(customer: Customer): string {
  const cleanPhone = customer.phone.replace(/\D/g, '');
  const finalPhone = cleanPhone.length <= 11 ? '55' + cleanPhone : cleanPhone;
  const days = getDaysSinceLastOrder(customer.last_order_date);
  const primaryHabit = customer.consumption_habits[0] || 'seus produtos favoritos';

  const text = encodeURIComponent(
    'Olá ' + customer.name + '! Tudo bem?\n\n' +
    'Aqui é da equipe da *AgroPet Pr1me* 🐾\n\n' +
    'Sentimos sua falta! Notamos que faz cerca de *' + days + ' dias* desde a sua última compra com a gente (' + primaryHabit + ').\n\n' +
    'Seu pet já deve estar precisando de reposição! Para comemorar seu retorno, você tem:\n' +
    '🎁 *R$ ' + customer.cashback_balance.toFixed(2) + '* de Cashback acumulado disponível para abater no pedido!\n' +
    '🚚 Use o cupom *VOLTOUPRIME* e ganhe *Frete Grátis* na sua entrega hoje!\n\n' +
    'Posso separar o seu pedido agora mesmo?'
  );

  return 'https://wa.me/' + finalPhone + '?text=' + text;
}