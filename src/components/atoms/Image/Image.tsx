import type { FC, ImgHTMLAttributes } from 'react';

import BannerFirst from '../../../assets/images/promo/image-promo-1.jpg';
import BannerSecond from '../../../assets/images/promo/image-promo-2.jpg';
import BannerThird from '../../../assets/images/promo/image-promo-3.jpg';
import BookUkrainer from '../../../assets/images/books/image-book-ukrainer.png';
import BookTreasuresOfUkr from '../../../assets/images/books/image-book-treasures-of-ukr.png';
import BookNarcHisUkr from '../../../assets/images/books/image-book-narcissus-of-hist-ukr.png';
import BookITJS from '../../../assets/images/books/image-book-it-js.jpg';
import BookITCleanCode from '../../../assets/images/books/image_book_it_clean_code.jpg';
import BookBSRichDPoorD from '../../../assets/images/bookS/image-book-RDPD.jpg';
import BookBSWither from '../../../assets/images/bookS/image-book-wither.jpg';

const imageName = {
  bannerUA: BannerFirst,
  bannerIT: BannerSecond,
  bannerBooksSales: BannerThird,
  bookUA1: BookUkrainer,
  bookUA2: BookTreasuresOfUkr,
  bookUA3: BookNarcHisUkr,
  bookIT1: BookITJS,
  bookIT2: BookITCleanCode,
  bookBS1: BookBSRichDPoorD,
  bookBS2: BookBSWither,
  bookBS3: BookBSRichDPoorD,
  bookBS4: BookBSWither,
  bookBS5: BookBSRichDPoorD,
} as const;

export type ImageName = keyof typeof imageName;

type ImageProps = {
  name: ImageName;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export const Image: FC<ImageProps> = ({ name, className, alt, ...rest }) => {
  const src = imageName[name];

  return <img src={src} alt={alt ?? name} className={className} {...rest} />;
};
