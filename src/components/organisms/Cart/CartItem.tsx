import type { FC } from 'react';
import type { CartItem as CartItemType } from '@/hooks/useCart';
import { useTranslation } from 'react-i18next';

interface CartItemProps {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

const USD_TO_UAH_RATE = 42;
const toUAH = (amount: number) => Math.ceil(amount * USD_TO_UAH_RATE);

export const CartItem: FC<CartItemProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const { t } = useTranslation();
  const { book, quantity } = item;

  const discountPriceUAH = book.priceDiscount
    ? toUAH(book.priceDiscount)
    : null;

  const regularPriceUAH = toUAH(book.priceRegular);
  const effectivePriceUAH = discountPriceUAH ?? regularPriceUAH;

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-6">
      <button
        onClick={onRemove}
        className="text-accent hover:text-destructive transition-colors"
        aria-label="Remove item"
        type="button"
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
        <h4 className="text-foreground mb-1 truncate">{book.name}</h4>
        <p className="text-sm text-secondary mb-2">{book.author}</p>

        {/* Тип та мова */}
        <div className="flex gap-4 text-xs text-muted-foreground">
          {book.type && (
            <span className="flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H12V12H2V2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 2V12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-semibold">{t('Type')}:</span> {book.type}
            </span>
          )}
          {book.langAvailable && (
            <span className="flex items-center gap-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="7"
                  cy="7"
                  r="5.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 7H12M7 2C8.5 3.5 9 5 9 7C9 9 8.5 10.5 7 12C5.5 10.5 5 9 5 7C5 5 5.5 3.5 7 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-semibold">{t('Language')}:</span>{' '}
              {book.langAvailable}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onDecrease}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:bg-muted transition-colors"
          aria-label="Decrease quantity"
          type="button"
        >
          −
        </button>
        <span className="text-foreground font-semibold w-8 text-center">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:bg-muted transition-colors"
          aria-label="Increase quantity"
          type="button"
        >
          +
        </button>
      </div>

      <div className="text-right flex-shrink-0">
        {discountPriceUAH ? (
          <div className="space-y-1">
            <p className="text-lg font-bold text-foreground">
              ₴{discountPriceUAH}
            </p>
            <p className="text-sm text-secondary line-through">
              ₴{regularPriceUAH}
            </p>
          </div>
        ) : (
          <p className="text-lg font-bold text-foreground">
            ₴{effectivePriceUAH}
          </p>
        )}
      </div>
    </div>
  );
};
