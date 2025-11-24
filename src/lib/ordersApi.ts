import { supabase } from './supabaseClient';

export interface OrderItem {
  id: string;
  book_id: string;
  book_title: string;
  book_cover_url: string | null;
  book_author: string | null;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  user_id: string;
  status: string;
  total_amount: number;
  delivery_address: string | null;
  payment_method: string | null;
  created_at: string;
  updated_at: string;
  items?: OrderItem[];
}

export const ordersApi = {
  async getByUser(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        items:order_items(*)
      `,
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Supabase] getByUser error:', error);
      throw error;
    }

    return data || [];
  },

  async getById(orderId: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select(
        `
        *,
        items:order_items(*)
      `,
      )
      .eq('id', orderId)
      .single();

    if (error) {
      console.error('[Supabase] getById error:', error);
      throw error;
    }

    return data;
  },

  async create(orderData: {
    user_id: string;
    total_amount: number;
    delivery_address: string;
    payment_method: string;
    items: {
      book_id: string;
      book_title: string;
      book_cover_url: string | null;
      book_author: string | null;
      quantity: number;
      price: number;
    }[];
  }): Promise<Order> {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: orderData.user_id,
        total_amount: orderData.total_amount,
        delivery_address: orderData.delivery_address,
        payment_method: orderData.payment_method,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError) {
      console.error('[Supabase] create order error:', orderError);
      throw orderError;
    }

    const itemsToInsert = orderData.items.map(item => ({
      order_id: order.id,
      book_id: item.book_id,
      book_title: item.book_title,
      book_cover_url: item.book_cover_url,
      book_author: item.book_author,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(itemsToInsert);

    if (itemsError) {
      console.error('[Supabase] create order items error:', itemsError);
      throw itemsError;
    }

    return order;
  },
};
