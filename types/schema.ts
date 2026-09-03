export type UserRole = 'customer' | 'admin';

export type OrderStatus = 'pending' | 'confirmed' | 'delivered' | 'cancelled';

export type AnimalType = 'dog' | 'cat' | 'bird' | 'horse';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Address {
  id: string;
  profile_id: string;
  street: string;
  number: string;
  complement: string | null;
  zip_code: string;
  city: string;
  state: string;
  is_default: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  stock: number;
  category_id: string;
  brand: string | null;
  image_urls: string[];
  animal_types: AnimalType[];
  featured: boolean;
  active: boolean;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  profile_id: string | null;
  status: OrderStatus;
  total: number;
  observation: string | null;
  whatsapp_message_id: string | null;
  requested_at: string;
  scheduled_date: string | null;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  consent_marketing: boolean;
  consent_terms: boolean;
  created_at: string;
  last_order_at: string | null;
  total_orders: number;
  total_spent: number;
}

export interface Notification {
  id: string;
  order_id: string | null;
  type: string;
  channel: string;
  content: string;
  recipient: string;
  sent_at: string;
  status: string;
}

export interface Settings {
  id: string;
  store_name: string;
  store_phone: string | null;
  store_whatsapp: string | null;
  store_address: string | null;
  whatsapp_number: string;
  created_at: string;
  updated_at: string;
}
