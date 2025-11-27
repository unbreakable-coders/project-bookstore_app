import { supabase } from '@/supabaseClient';

export interface CartItem {
  bookId: string;
  quantity: number;
}

export const cartApi = {
  async getByUser(userId: string): Promise<CartItem[]> {
    const { data, error } = await supabase
      .from('cart_items')
      .select('book_id, quantity')
      .eq('user_id', userId);

    if (error) throw error;

    return (data ?? []).map(row => ({
      bookId: row.book_id as string,
      quantity: row.quantity as number,
    }));
  },

  async setItem(userId: string, bookId: string, quantity: number) {
    const { error } = await supabase.from('cart_items').upsert({
      user_id: userId,
      book_id: bookId,
      quantity,
      updated_at: new Date().toISOString(),
    });

    if (error) throw error;
  },

  async remove(userId: string, bookId: string) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('book_id', bookId);

    if (error) throw error;
  },
};
