import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CartItem as CartItemType } from '@/hooks/useCart';
import { useTranslation } from 'react-i18next';
import { Icon } from '@/components/atoms/Icon';

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
  const navigate = useNavigate();
  const { book, quantity } = item;

  const openDetails = () => {
    navigate(`/books/${book.namespaceId}?lang=${book.lang}`, {
      state: { bookId: book.id },
    });
  };

  const discountPriceUAH = book.priceDiscount
    ? toUAH(book.priceDiscount)
    : null;

  const regularPriceUAH = toUAH(book.priceRegular);
  const effectivePriceUAH = discountPriceUAH ?? regularPriceUAH;

  return (
    <div className="bg-card rounded-xl border border-border p-6 flex items-center gap-6">
      <button
        onClick={onRemove}
        className="text-accent hover:text-destructive transition-colors cursor-pointer hover:scale-110"
        aria-label="Remove item"
        type="button"
      >
        <Icon name="close" />
      </button>

      <div className="flex-shrink-0">
        <img
          src={book.images[0]}
          alt={book.name}
          className="w-16 h-24 object-cover rounded cursor-pointer"
          onClick={openDetails}
        />
      </div>

      <div className="flex-1 min-w-0">
        <h4
          className="text-primary mb-1 truncate cursor-pointer"
          onClick={openDetails}
        >
          {book.name}
        </h4>
        <p className="text-sm text-secondary">{book.author}</p>

        <div className="flex gap-4 text-xs text-muted-foreground">
          {book.type && (
            <span className="flex items-center gap-1">
              <Icon name="type" />
              <span className="font-semibold">{t('Type')}:</span> {book.type}
            </span>
          )}
          {book.lang && (
            <span className="flex items-center gap-1">
              <Icon name="lang" />
              <span className="font-semibold">{t('Language')}:</span>{' '}
              {book.lang}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onDecrease}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:bg-muted transition-colors cursor-pointer"
          aria-label="Decrease quantity"
          type="button"
        >
          −
        </button>
        <span className="text-muted-foreground font-semibold w-8 text-center">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-border text-secondary hover:bg-muted transition-colors cursor-pointer"
          aria-label="Increase quantity"
          type="button"
        >
          +
        </button>
      </div>

      <div className="text-right flex-shrink-0">
        {discountPriceUAH ? (
          <div className="space-y-1">
            <p className="text-lg font-bold text-primary">
              ₴{discountPriceUAH}
            </p>
            <p className="text-sm text-muted line-through">
              ₴{regularPriceUAH}
            </p>
          </div>
        ) : (
          <p className="text-lg font-bold text-primary">₴{effectivePriceUAH}</p>
        )}
      </div>
    </div>
  );
};
