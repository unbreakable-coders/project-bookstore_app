import type { FC, ImgHTMLAttributes } from 'react';

import BannerFirst from '../../../assets/images/promo/image-promo-1.jpg';
import BookUkrainer from '../../../assets/images/books/image-book-ukrainer.png';
import BookTreasuresOfUkr from '../../../assets/images/books/image-book-treasures-of-ukr.png';
import BookNarcHisUkr from '../../../assets/images/books/image-book-narcissus-of-hist-ukr.png';

const imageName = {
  banner: BannerFirst,
  bookUA1: BookUkrainer,
  bookUA2: BookTreasuresOfUkr,
  bookUA3: BookNarcHisUkr,
} as const;

export type ImageName = keyof typeof imageName;

type ImageProps = {
  name: ImageName;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export const Image: FC<ImageProps> = ({ name, className, alt, ...rest }) => {
  const src = imageName[name];

  return <img src={src} alt={alt ?? name} className={className} {...rest} />;
};
