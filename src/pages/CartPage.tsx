import React, { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { booksData } from '../books/data/books';
import type { Book } from '../types/book';

interface CartItem {
  book: Book;
  quantity: number;
}

export const CartPage: React.FC = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const books = await booksData();
        setAllBooks(books);

        const saved = localStorage.getItem('cart');
        if (saved) setCart(JSON.parse(saved));
      } catch (err) {
        console.error('Failed to load books:', err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const saveCart = (newCart: Record<string, number>) => {
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCart(newCart);
  };

  const handleRemove = (bookId: string) => {
    const newCart = { ...cart };
    delete newCart[bookId];
    saveCart(newCart);
  };

  const handleQuantityChange = (bookId: string, delta: number) => {
    const newQuantity = (cart[bookId] || 0) + delta;

    if (newQuantity <= 0) {
      handleRemove(bookId);
    } else {
      saveCart({ ...cart, [bookId]: newQuantity });
    }
  };

  const cartItems: CartItem[] = Object.entries(cart)
    .map(([bookId, quantity]) => {
      const book = allBooks.find(b => b.id === bookId);
      return book ? { book, quantity } : null;
    })
    .filter((item): item is CartItem => item !== null);

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = item.book.priceDiscount ?? item.book.priceRegular;
    const priceInUAH = Math.ceil(price * 42);
    return sum + priceInUAH * item.quantity;
  }, 0);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-foreground">Завантаження...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-secondary mb-6 hover:text-foreground transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-sm font-semibold">Back</span>
        </button>

        <h1 className="mb-8">Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-secondary text-lg">Ваш кошик порожній</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(({ book, quantity }) => {
                const price = book.priceDiscount ?? book.priceRegular;
                const priceInUAH = Math.ceil(price * 42);
                const discountPriceInUAH = book.priceDiscount
                  ? Math.ceil(book.priceDiscount * 42)
                  : null;
                const regularPriceInUAH = Math.ceil(book.priceRegular * 42);

                return (
                  <div
                    key={book.id}
                    className="bg-card rounded-xl border border-border p-6 flex items-center gap-6"
                  >
                    <button
                      onClick={() => handleRemove(book.id)}
                      className="text-accent hover:text-destructive transition-colors"
                      aria-label="Remove item"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18 6L6 18M6 6L18 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <div className="flex-shrink-0">
                      <img
                        src={book.images[0]}
                        alt={book.name}
                        className="w-16 h-24 object-cover rounded"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-foreground mb-1 truncate">
                        {book.name}
                      </h4>
                      <p className="text-sm text-secondary">{book.author}</p>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleQuantityChange(book.id, -1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="text-foreground font-semibold w-8 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(book.id, 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right flex-shrink-0">
                      {book.priceDiscount ? (
                        <div className="space-y-1">
                          <p className="text-lg font-bold text-foreground">
                            ₴{discountPriceInUAH}
                          </p>
                          <p className="text-sm text-secondary line-through">
                            ₴{regularPriceInUAH}
                          </p>
                        </div>
                      ) : (
                        <p className="text-lg font-bold text-foreground">
                          ₴{priceInUAH}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-card rounded-xl border border-border p-6 sticky top-8">
                <div className="mb-6">
                  <p className="text-[32px] md:text-[48px] font-bold text-foreground leading-tight">
                    ₴{totalPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-secondary mt-2">
                    Total for {totalItems} items
                  </p>
                </div>

                <Button
                  className="w-full bg-foreground text-background hover:bg-primary"
                  size="lg"
                  onClick={() => {
                    alert('Checkout functionality coming soon!');
                  }}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
