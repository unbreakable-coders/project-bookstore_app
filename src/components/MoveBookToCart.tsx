// src/components/MoveBookToCart.tsx
import {
  createContext,
  useContext,
  useRef,
  useCallback,
  type ReactNode,
  type RefObject,
} from 'react';
import gsap from 'gsap';
import BookIcon from '@/assets/icons/icon-book.svg';
import { useCart } from '@/context/CartContext';

interface MoveBookToCartContextValue {
  headerCartRef: RefObject<HTMLElement | null>;
  flyToCart: (
    sourceElement: HTMLElement,
    bookId: string,
    onComplete?: () => void,
  ) => void;
  hasItemsInCart: boolean;
}

const MoveBookToCartContext = createContext<MoveBookToCartContextValue | null>(
  null,
);

export const MoveBookToCartProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const headerCartRef = useRef<HTMLElement | null>(null);
  const { totalItems, toggleCart } = useCart();

  const hasItemsInCart = totalItems > 0;

  const flyToCart = useCallback(
    (sourceElement: HTMLElement, bookId: string, onComplete?: () => void) => {
      const targetEl = headerCartRef.current;
      if (!targetEl) {
        console.warn('[MoveBookToCart] Header cart ref not found');
        toggleCart(bookId);
        onComplete?.();
        return;
      }

      const sourceRect = sourceElement.getBoundingClientRect();
      const targetRect = targetEl.getBoundingClientRect();

      const deltaX =
        targetRect.left +
        targetRect.width / 2 -
        (sourceRect.left + sourceRect.width / 2);
      const deltaY =
        targetRect.top +
        targetRect.height / 2 -
        (sourceRect.top + sourceRect.height / 2);

      const flyingBook = document.createElement('img');
      flyingBook.src = BookIcon;
      flyingBook.style.cssText = `
      position: fixed;
      width: 24px;
      height: 24px;
      left: ${sourceRect.left + sourceRect.width / 2 - 12}px;
      top: ${sourceRect.top + sourceRect.height / 2 - 12}px;
      z-index: 9999;
      pointer-events: none;
    `;
      document.body.appendChild(flyingBook);

      gsap.to(flyingBook, {
        duration: 1.5,
        x: deltaX,
        y: deltaY,
        scale: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          flyingBook.remove();

          toggleCart(bookId);
          onComplete?.();

          gsap.fromTo(
            targetEl,
            { scale: 1 },
            {
              scale: 1.3,
              duration: 0.2,
              yoyo: true,
              repeat: 1,
              ease: 'power2.out',
            },
          );
        },
      });
    },
    [toggleCart],
  );

  return (
    <MoveBookToCartContext.Provider
      value={{
        headerCartRef,
        flyToCart,
        hasItemsInCart,
      }}
    >
      {children}
    </MoveBookToCartContext.Provider>
  );
};

export const useMoveBookToCart = () => {
  const ctx = useContext(MoveBookToCartContext);
  if (!ctx) {
    throw new Error(
      'useMoveBookToCart must be used within MoveBookToCartProvider',
    );
  }
  return ctx;
};
