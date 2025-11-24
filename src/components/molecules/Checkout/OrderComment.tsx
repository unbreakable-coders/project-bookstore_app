import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Textarea } from '@/components/atoms/Form/Textarea';

export const OrderComment: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <Textarea
        label={t('Comment on the order')}
        rows={4}
        placeholder={t('Additional wishes for the order...')}
      />
    </div>
  );
};
