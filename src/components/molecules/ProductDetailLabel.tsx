import React from 'react';

interface ProductDetailLabelProps {
  label: string;
  value: string | number;
}

/**
 * Atom for a row of characteristics in a list
 */
export const ProductDetailLabel: React.FC<ProductDetailLabelProps> = ({
  label,
  value,
}) => {
  return (
    <div className="flex justify-between py-1.5 border-b border-border last:border-b-0">
      <span className="text-secondary">{label}</span>
      <span>{value}</span>
    </div>
  );
};
