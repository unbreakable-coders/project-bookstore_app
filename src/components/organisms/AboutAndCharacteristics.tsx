import React from 'react';
import { ProductDetailLabel } from '../molecules/ProductDetailLabel';
import { useTranslation } from 'react-i18next';

interface AboutAndCharacteristicsProps {
  aboutTitle: string;
  aboutContent: string[];
  characteristics: { label: string; value: string | number }[];
}

export const AboutAndCharacteristics: React.FC<
  AboutAndCharacteristicsProps
> = ({ aboutTitle, aboutContent, characteristics }) => {
  const { t } = useTranslation();

  return (
    <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="text-[20px] leading-5 md:text-[22px] font-semibold mb-4">
          {t('About')}
        </p>
        <div className="h-px bg-border mb-6"></div>
        <h5 className=" mb-4">{aboutTitle}</h5>
        {aboutContent.map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 sm:mt-10 lg:mt-0">
        <h2 className="text-[20px] leading-5 font-semibold mb-4">
          {t('Characteristics')}
        </h2>
        <div className="h-px bg-border mb-6"></div>
        <div className="">
          {characteristics.map((detail, index) => (
            <ProductDetailLabel
              key={`char-${index}`}
              label={detail.label}
              value={detail.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
