// src/components/MoveHeart.tsx
import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  type ReactNode,
  type RefObject,
} from 'react';
import gsap from 'gsap';
import HeartIconRed from '@/assets/icons/icon-heart-red.svg';

interface MoveHeartContextValue {
  headerHeartRef: RefObject<HTMLElement | null>;
  flyToWishlist: (sourceElement: HTMLElement) => void;
  isWishlistActive: boolean;
  setWishlistActive: (active: boolean) => void;
}

const MoveHeartContext = createContext<MoveHeartContextValue | null>(null);

export const MoveHeartProvider = ({ children }: { children: ReactNode }) => {
  const headerHeartRef = useRef<HTMLElement | null>(null);
  const [isWishlistActive, setWishlistActive] = useState(false);

  const flyToWishlist = useCallback((sourceElement: HTMLElement) => {
    const targetEl = headerHeartRef.current;
    if (!targetEl) {
      console.warn('[MoveHeart] Header heart ref not found');
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

    // Створюємо ЧЕРВОНЕ літаюче серце
    const flyingHeart = document.createElement('img');
    flyingHeart.src = HeartIconRed;
    flyingHeart.style.cssText = `
      position: fixed;
      width: 20px;
      height: 20px;
      left: ${sourceRect.left + sourceRect.width / 2 - 10}px;
      top: ${sourceRect.top + sourceRect.height / 2 - 10}px;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(flyingHeart);

    gsap.to(flyingHeart, {
      duration: 2,
      x: deltaX,
      y: deltaY,
      scale: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        flyingHeart.remove();

        // Встановлюємо активний стан (червона іконка в хедері)
        setWishlistActive(true);

        // Пульсація в хедері
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
  }, []);

  return (
    <MoveHeartContext.Provider
      value={{
        headerHeartRef,
        flyToWishlist,
        isWishlistActive,
        setWishlistActive,
      }}
    >
      {children}
    </MoveHeartContext.Provider>
  );
};

export const useMoveHeart = () => {
  const ctx = useContext(MoveHeartContext);
  if (!ctx) {
    throw new Error('useMoveHeart must be used within MoveHeartProvider');
  }
  return ctx;
};
