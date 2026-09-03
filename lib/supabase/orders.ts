import { createSupabaseBrowserClient } from './client';

export async function createOrderBrowser(payload: {
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  observation?: string;
  items: { product_id: string; quantity: number; unit_price: number }[];
}) {
  const supabase = createSupabaseBrowserClient();
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      customer_name: payload.customer_name,
      customer_phone: payload.customer_phone,
      customer_address: payload.customer_address,
      total: payload.total,
      observation: payload.observation ?? null,
      status: 'pending',
    })
    .select()
    .single();
  if (error) throw error;
  if (payload.items.length > 0) {
    const items = payload.items.map((i) => ({
      order_id: order.id,
      product_id: i.product_id,
      quantity: i.quantity,
      unit_price: i.unit_price,
      subtotal: i.quantity * i.unit_price,
    }));
    const { error: itemsError } = await supabase.from('order_items').insert(items);
    if (itemsError) throw itemsError;
  }
  return order;
}
