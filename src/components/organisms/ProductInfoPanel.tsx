import { LanguageSelector } from '../molecules/LanguageSelector.tsx';
import { PriceAndActions } from '../molecules/PriceAndActions.tsx';
import { ProductDetailLabel } from '../molecules/ProductDetailLabel.tsx';

interface ProductInfoPanelProps {
  category: string;
  price: number;
  oldPrice: number | null;
  details: { label: string; value: string | number }[];
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
  isInWishlist: boolean;
  visibleLabels?: string[];
}

export const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({
  category,
  price,
  oldPrice,
  details,
  languages,
  selectedLanguage,
  onLanguageChange,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  visibleLabels = [
    'Author',
    'Cover type',
    'Number of pages',
    'Year of publication',
  ],
}) => {
  const filteredDetails = details.filter(detail =>
    visibleLabels.includes(detail.label),
  );

  return (
    <div className="mt-8 max-w-[280px] md:max-w-[267px] lg:max-w-[320px] w-full">
      {/* Category */}
      <div className="border-b border-border pb-4">
        <h5 className="font-bold text-secondary">Category</h5>
        <div className="inline-block mt-2 px-[10.5px] py-[5.5px] border border-border rounded-[5px]">
          {category}
        </div>
      </div>

      {/* Language Selector (Molecule) */}
      <LanguageSelector
        languages={languages}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
      />

      {/* Price and Actions (Molecule) */}
      <PriceAndActions
        price={price}
        oldPrice={oldPrice}
        onAddToCart={onAddToCart}
        onToggleWishlist={onToggleWishlist}
        isInWishlist={isInWishlist}
      />

      {/* Product details */}
      <div className="mt-6">
        {filteredDetails.map((detail, index) => (
          <ProductDetailLabel
            key={index}
            label={detail.label}
            value={detail.value}
          />
        ))}
      </div>
    </div>
  );
};
