import { supabase } from '@/supabaseClient';

export const wishlistApi = {
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('wishlist_items')
      .select('book_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(row => row.book_id as string);
  },

  async add(userId: string, bookId: string) {
    const { error } = await supabase
      .from('wishlist_items')
      .insert({ user_id: userId, book_id: bookId });

    if (error) throw error;
  },

  async remove(userId: string, bookId: string) {
    const { error } = await supabase
      .from('wishlist_items')
      .delete()
      .eq('user_id', userId)
      .eq('book_id', bookId);

    if (error) throw error;
  }
};
