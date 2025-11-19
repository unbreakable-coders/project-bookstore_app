import type { FC, ImgHTMLAttributes } from 'react';

type ImageProps = ImgHTMLAttributes<HTMLImageElement>;

export const Image: FC<ImageProps> = ({ className, alt, ...rest }) => {
  return <img className={className} alt={alt} {...rest} />;
};
