import { useTranslation } from 'react-i18next';
import { LanguageSelector } from '../molecules/LanguageSelector.tsx';
import { PriceAndActions } from '../molecules/PriceAndActions.tsx';
import { ProductDetailLabel } from '../molecules/ProductDetailLabel.tsx';

interface ProductInfoPanelProps {
  bookId: string;
  category: string;
  price: number;
  oldPrice: number | null;
  details: { label: string; value: string | number }[];
  languages: string[];
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
  onAddToCart: () => void;
  onToggleWishlist: (bookId: string) => void;
  isInWishlist: (bookId: string) => boolean;
  visibleLabels?: string[];
  isInCart: (bookId: string) => boolean;
  inStock?: boolean;
  bookId: string;
}

export const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({
  bookId,
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
  isInCart,
  bookId,
  visibleLabels = [
    'Author',
    'Cover type',
    'Number of pages',
    'Year of publication',
  ],
}) => {
  const { t } = useTranslation();



  const handleAddToCart = () => {
 
    onAddToCart();
  };

  const handleToggleWishlist = () => {

    onToggleWishlist();
  };

  const filteredDetails = details.filter(detail =>
    visibleLabels.some(labelKey => detail.label === t(labelKey)),
  );

  return (
    <div className="mt-8 md:mt-0 max-w-[280px] md:max-w-[267px] lg:max-w-[320px] w-full">
      <div className="border-b border-border pb-4">
        <h5 className="font-bold text-secondary">{t('Category')}</h5>
        <div className="inline-block mt-2 px-[10.5px] py-[5.5px] border border-border rounded-[5px]">
          {t(`${category}`)}
        </div>
      </div>

      <LanguageSelector
        languages={languages}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
      />

<PriceAndActions
  bookId={bookId}
  price={price}
  oldPrice={oldPrice}
  onAddToCart={handleAddToCart}
  onToggleWishlist={handleToggleWishlist}
  isInWishlist={isInWishlist}
  isInCart={isInCart}
  inStock={true}
/>

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
