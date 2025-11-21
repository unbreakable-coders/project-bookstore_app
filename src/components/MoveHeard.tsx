import {
  createContext,
  useContext,
  useRef,
  useCallback,
  type ReactNode,
  type RefObject,
} from 'react';
import gsap from 'gsap';
import HeartIcon from '@/assets/icons/icon-heart.svg';

interface MoveHeartContextValue {
  headerHeartRef: RefObject<HTMLElement | null>;
  flyToWishlist: (sourceElement: HTMLElement) => void;
}

const MoveHeartContext = createContext<MoveHeartContextValue | null>(null);

export const MoveHeartProvider = ({ children }: { children: ReactNode }) => {
  const headerHeartRef = useRef<HTMLElement | null>(null);

  const flyToWishlist = useCallback((sourceElement: HTMLElement) => {
    const targetEl = headerHeartRef.current;
    if (!targetEl) {
      console.warn('[MoveHeart] Header heart ref not found');
      return;
    }

    const sourceRect = sourceElement.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();

    const flyingHeart = document.createElement('img');
    flyingHeart.src = HeartIcon;
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
      duration: 0.6,
      left: targetRect.left + targetRect.width / 2 - 10,
      top: targetRect.top + targetRect.height / 2 - 10,
      scale: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        flyingHeart.remove();

        gsap.fromTo(
          targetEl,
          { scale: 1 },
          {
            scale: 1.3,
            duration: 0.15,
            yoyo: true,
            repeat: 1,
            ease: 'power2.out',
          },
        );
      },
    });
  }, []);

  return (
    <MoveHeartContext.Provider value={{ headerHeartRef, flyToWishlist }}>
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
