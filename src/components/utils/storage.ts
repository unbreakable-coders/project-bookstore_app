import type { CartItem } from '@/api/cartApi';

const WISHLIST_KEY = 'wishlist';
const CART_KEY = 'cart';

export const storage = {
  getWishlist(): string[] {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  setWishlist(items: string[]) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  },

  getCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  setCart(items: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  },
};
