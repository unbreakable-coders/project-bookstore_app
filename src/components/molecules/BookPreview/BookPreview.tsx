import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/molecules/BookPreview/Card';
import { PriceDisplay } from '@/components/molecules/PriceDisplay';
import type { CatalogItem } from '@/features/catalog/catalogTypes'; // Використовуємо type import

interface BookPreviewCardProps {
  item: CatalogItem;
}

export const BookPreviewCard = ({ item }: BookPreviewCardProps) => {
  // TODO: Логіка кошика
  const isAdded = false;

  return (
    <Card className="w-full max-w-69 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardContent className="p-4 flex flex-col gap-2">
        <img
          src={item.images[0]}
          alt={item.name}
          className="w-full h-[263px] object-cover rounded-md"
        />
        <h3 className="text-lg font-semibold text-foreground truncate mt-2">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground">{item.author}</p>

        <PriceDisplay
          regularPrice={item.priceRegular}
          discountPrice={item.priceDiscount}
        />

        <p className="text-xs text-green-600 flex items-center">
          {item.inStock ? (
            <>
              <img
                src="/icons/icon-in-stock.svg"
                alt="In stock"
                className="inline h-3 w-3 mr-1"
              />
              In stock
            </>
          ) : (
            <span className="text-red-500">Out of stock</span>
          )}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {isAdded ? (
          <button className="w-full px-4 py-2 bg-muted text-muted-foreground rounded-md cursor-default">
            Added
          </button>
        ) : (
          <button className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Add to cart
          </button>
        )}
      </CardFooter>
    </Card>
  );
};
