import { supabase } from '@/supabaseClient';

export type OrderStatus =
  | 'pending'
  | 'pending_payment'
  | 'paid'
  | 'awaiting_shipment'
  | 'cancelled';

export type OrderProcessStatus = 'processing' | 'completed' | 'cancelled';

export type PaymentMethod = 'card' | 'cod';

export type DeliveryService = 'novaPoshta' | 'ukrposhta';

export type NovaPoshtaType = 'branch' | 'locker' | 'courier' | null;

export interface OrderItem {
  title: string;
  bookId: string;
  quantity: number;
  totalPriceUAH: number;
  image?: string;
}

export interface OrderRecord {
  id: number;
  user_id: string | null;

  status: OrderStatus;
  order_status: OrderProcessStatus;
  payment_method: PaymentMethod;

  created_at: string;
  updated_at: string;

  total_price: number;
  subtotal_uah: number;
  total_items: number;
  discount_uah: number;
  delivery_price_uah: number;

  items: OrderItem[];

  delivery_service: DeliveryService;

  nova_poshta_type: NovaPoshtaType;
  nova_poshta_city: string | null;
  nova_poshta_branch: string | null;
  nova_poshta_locker: string | null;
  nova_poshta_address: string | null;

  ukrposhta_city: string | null;
  ukrposhta_branch: string | null;

  first_name: string;
  last_name: string;
  phone: string;
  email: string;

  comment: string | null;
}

export type Order = OrderRecord;

export interface CreateOrderPayload {
  user_id: string | null;

  status: OrderStatus;
  order_status: OrderProcessStatus;
  payment_method: PaymentMethod;

  total_price: number;
  subtotal_uah: number;
  total_items: number;
  discount_uah: number;
  delivery_price_uah: number;

  items: OrderItem[];

  delivery_service: DeliveryService;

  nova_poshta_type: NovaPoshtaType;
  nova_poshta_city: string | null;
  nova_poshta_branch: string | null;
  nova_poshta_locker: string | null;
  nova_poshta_address: string | null;

  ukrposhta_city: string | null;
  ukrposhta_branch: string | null;

  first_name: string;
  last_name: string;
  phone: string;
  email: string;

  comment: string | null;
}

export const ordersApi = {
  async createOrder(payload: CreateOrderPayload): Promise<OrderRecord> {
    const { data, error } = await supabase
      .from('orders')
      .insert(payload)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data as OrderRecord;
  },

  async updateOrderStatus(
    id: number,
    order_status: OrderProcessStatus,
  ): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .update({ order_status })
      .eq('id', id);

    if (error) {
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
      throw error;
    }

    return (data as OrderRecord[]) || [];
  },
};
