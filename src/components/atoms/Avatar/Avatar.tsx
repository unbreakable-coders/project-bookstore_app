interface AvatarProps {
  initial: string;
  src?: string;
  alt?: string;
  size?: 'md' | 'lg';
}

export const Avatar = ({ initial, src, alt, size = 'lg' }: AvatarProps) => {
  const sizes = {
    md: 'w-16 h-16 text-2xl',
    lg: 'w-24 h-24 md:w-32 md:h-32 text-3xl',
  };

  return (
    <div
      className={`${sizes[size]} rounded-full bg-muted text-primary flex items-center justify-center font-bold overflow-hidden`}
    >
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        initial
      )}
    </div>
  );
};
