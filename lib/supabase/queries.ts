import { createSupabaseServerClient } from './server';
import type { Product, Category, Settings } from '@/types/schema';
import { MOCK_PRODUCTS } from '@/lib/mock-data';

// Fallback to mocks when Supabase env not configured (dev without DB)
function useMocks() {
  return !process.env.NEXT_PUBLIC_SUPABASE_URL;
}

export async function getFeaturedProductsServer(): Promise<Product[]> {
  if (useMocks()) return MOCK_PRODUCTS.filter((p) => p.featured);
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .eq('active', true)
      .limit(8);
    if (error) throw error;
    return (data as Product[]) ?? [];
  } catch {
    return MOCK_PRODUCTS.filter((p) => p.featured);
  }
}

export async function getProductsByCategoryServer(slug: string): Promise<{ products: Product[]; category: Category | null }> {
  if (useMocks()) return { products: MOCK_PRODUCTS, category: null };
  try {
    const supabase = await createSupabaseServerClient();
    const { data: cat } = await supabase.from('categories').select('*').eq('slug', slug).single();
    if (!cat) return { products: [], category: null };
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', cat.id)
      .eq('active', true);
    return { products: (data as Product[]) ?? [], category: cat as Category };
  } catch {
    return { products: MOCK_PRODUCTS, category: null };
  }
}

export async function getProductBySlugServer(slug: string): Promise<Product | null> {
  if (useMocks()) return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (error) return null;
    return data as Product;
  } catch {
    return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function getCategoriesServer(): Promise<Category[]> {
  if (useMocks()) return [];
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('categories').select('*').eq('active', true).order('sort_order');
    return (data as Category[]) ?? [];
  } catch {
    return [];
  }
}

export async function getSettingsServer(): Promise<Settings | null> {
  if (useMocks()) return null;
  try {
    const supabase = await createSupabaseServerClient();
    const { data } = await supabase.from('settings').select('*').limit(1).single();
    return data as Settings;
  } catch {
    return null;
  }
}


