import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea: FC<TextareaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-secondary mb-2">
          {t(label)}
        </label>
      )}
      <textarea
        className={`w-full resize-none rounded-lg border border-border bg-background px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary ${className} ${
          error ? 'border-red-500' : ''
        }`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{t(error)}</p>}
    </div>
  );
};
