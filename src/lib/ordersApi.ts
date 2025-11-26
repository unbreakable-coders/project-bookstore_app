import { supabase } from '@/supabaseClient';

export type OrderStatus =
  | 'processing_payment' // картка, ще оплачується
  | 'paid'               // картка, успішно оплачено
  | 'awaiting_shipment'  // післяплата, чекає відправки
  | 'cancelled';

export type PaymentMethod = 'card' | 'cod';

export interface OrderCartItem {
  bookId: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface OrderDeliveryInfo {
  service: 'novaPoshta' | 'ukrposhta';
  type: 'branch' | 'locker' | 'courier';
  city: string;
  branch?: string;
  address?: string; // для курʼєра
}

export interface OrderContactInfo {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface OrderItemsJson {
  cart: OrderCartItem[];
  delivery: OrderDeliveryInfo;
  contact: OrderContactInfo;
  paymentMethod: PaymentMethod;
  comment?: string;
}

export interface CreateOrderPayload {
  user_id: string;
  total_price: number;
  status: OrderStatus;
  items: OrderItemsJson;
}

export interface OrderRecord extends CreateOrderPayload {
  id: number;
  created_at: string;
  updated_at: string;
}

export type Order = OrderRecord;

export const ordersApi = {
  async createOrder(payload: CreateOrderPayload): Promise<OrderRecord> {
    const { data, error } = await supabase
      .from('orders')
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error('[ordersApi.createOrder]', error);
      throw error;
    }

    return data as OrderRecord;
  },

  async updateOrderStatus(id: number, status: OrderStatus): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('[ordersApi.updateOrderStatus]', error);
      throw error;
    }
  },

  async getOrderById(id: number): Promise<OrderRecord | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('[ordersApi.getOrderById]', error);
      throw error;
    }

    return (data as OrderRecord) || null;
  },

  async getByUser(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[ordersApi.getByUser]', error);
      throw error;
    }

    return (data as OrderRecord[]) || [];
  },
};
