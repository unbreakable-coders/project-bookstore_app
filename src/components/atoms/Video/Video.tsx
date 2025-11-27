import type { FC, VideoHTMLAttributes } from 'react';

type VideoProps = VideoHTMLAttributes<HTMLVideoElement>;

export const Video: FC<VideoProps> = ({
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  controls = false,
  ...rest
}) => {
  return (
    <video
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      {...rest}
    />
  );
};
