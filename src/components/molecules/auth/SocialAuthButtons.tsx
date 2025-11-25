import type { FC } from 'react';
import { Button } from '@/components/atoms/Button';
import { useTranslation } from 'react-i18next';

interface SocialAuthButtonsProps {
  loading: boolean;
  onGoogle: () => void;
  onFacebook: () => void;
}

export const SocialAuthButtons: FC<SocialAuthButtonsProps> = ({
  loading,
  onGoogle,
  onFacebook,
}) => {
  const { t } = useTranslation();

  return (
    <div className="mb-6 space-y-3">
      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-3"
        onClick={onGoogle}
        disabled={loading}
      >
        <span className="text-2xl font-bold text-[#4285F4]">G</span>
        <span className="text-sm text-secondary font-semibold">
          {t('auth.loginWithGoogle')}
        </span>
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full flex items-center justify-center gap-3"
        onClick={onFacebook}
        disabled={loading}
      >
        <span className="text-2xl font-bold text-[#1877F2]">f</span>
        <span className="text-sm text-secondary font-semibold">
          {t('auth.loginWithFacebook')}
        </span>
      </Button>
    </div>
  );
};
