import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface BackButtonProps {
  onClick: () => void;
  label: string;
}

export const BackButton: FC<BackButtonProps> = ({ onClick, label }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="mb-6 cursor-pointer flex items-center gap-2 text-secondary transition-colors hover:text-foreground"
      type="button"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 15L7.5 10L12.5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-sm font-semibold">{t(label)}</span>
    </button>
  );
};
