import React from 'react';
import { ProductDetailLabel } from '../molecules/ProductDetailLabel';

interface AboutAndCharacteristicsProps {
  aboutTitle: string;
  aboutContent: string[];
  characteristics: { label: string; value: string | number }[];
}

/**
 * Організм, що містить секції About та Characteristics
 */
export const AboutAndCharacteristics: React.FC<
  AboutAndCharacteristicsProps
> = ({ aboutTitle, aboutContent, characteristics }) => {
  return (
    <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-16">
      {/* ABOUT SECTION */}
      <div>
        <p className="text-[20px] leading-5 md:text-[22px] font-semibold mb-4">
          About
        </p>
        <div className="h-px bg-border mb-6"></div>
        <h5 className=" mb-4">{aboutTitle}</h5>
        {aboutContent.map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>

      {/* CHARACTERISTICS SECTION */}
      <div className="mt-8 sm:mt-10 lg:mt-0">
        <h2 className="text-[20px] leading-5 font-semibold mb-4">
          Characteristics
        </h2>
        <div className="h-px bg-border mb-6"></div>
        <div className="">
          {characteristics.map((detail, index) => (
            // Reusing the same Atom for the list
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
