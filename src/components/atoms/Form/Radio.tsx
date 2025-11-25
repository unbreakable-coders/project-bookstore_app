import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export const Radio: FC<RadioProps> = ({
  label,
  description,
  className = '',
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="radio"
        className={`mt-1 h-4 w-4 text-primary accent-[#0f9952] ${className}`}
        {...props}
      />
      <div className="flex-1">
        <div className="font-medium text-secondary">{t(label)}</div>
        {description && (
          <div className="mt-1 text-sm text-accent">{t(description)}</div>
        )}
      </div>
    </label>
  );
};
