import type { FC, ImgHTMLAttributes } from 'react';

import BannerFirst from '../../../../public/books/img/banner/bannerTablet1.webp';
import BannerSecond from '../../../../public/books/img/banner/bannerTablet2.webp';
import BannerThird from '../../../../public/books/img/banner/bannerTablet3.webp';

const imageName = {
  bannerConstitution: BannerFirst,
  bannerUAAuthors: BannerSecond,
  bannerBestSellers: BannerThird,
} as const;

export type ImageName = keyof typeof imageName;

type ImageProps = {
  name: ImageName;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export const Image: FC<ImageProps> = ({ name, className, alt, ...rest }) => {
  const src = imageName[name];

  return <img src={src} alt={alt ?? name} className={className} {...rest} />;
};
