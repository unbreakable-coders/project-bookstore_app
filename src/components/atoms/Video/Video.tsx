import type { FC, ImgHTMLAttributes } from 'react';

import videoPaperBooks from '../../../../public/books/img/categories/paper.mp4';
import videoAudioBooks from '../../../../public/books/img/categories/audio.mp4';
import videoKindleBooks from '../../../../public/books/img/categories/kindlebook.mp4';

const videoName = {
  videoPaperBooks,
  videoAudioBooks,
  videoKindleBooks,
} as const;

export type VideoName = keyof typeof videoName;

type VideoProps = {
  name: VideoName;
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'>;

export const Video: FC<VideoProps> = ({ name, className }) => {
  const src = videoName[name];

  return <video src={src} className={className} loop autoPlay muted />;
};
