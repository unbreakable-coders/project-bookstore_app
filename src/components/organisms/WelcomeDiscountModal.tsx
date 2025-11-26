import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';

export const WelcomeDiscountModal = () => {
  const { t } = useTranslation();
  const { user, initializing } = useAuth();

  const [showGuestModal, setShowGuestModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (initializing) {
      return;
    }

    if (user) {
      setShowGuestModal(false);
      return;
    }

    const dismissed = localStorage.getItem('welcomeModalDismissed');

    setShowGuestModal(!dismissed);
  }, [user, initializing]);

  const handleCloseGuest = () => {
    localStorage.setItem('welcomeModalDismissed', 'true');
    setShowGuestModal(false);
  };

  const handleGoToRegister = () => {
    localStorage.setItem('welcomeModalDismissed', 'true');
    setShowGuestModal(false);
    navigate('/login?mode=register');
  };

  if (!showGuestModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-lg rounded-2xl bg-card p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-accent">
            {t('Welcome to our store')}
          </h2>

          <button
            type="button"
            onClick={handleCloseGuest}
            className="text-xl text-gray-400 transition hover:text-gray-600"
          >
            ×
          </button>
        </div>

        <p className="mb-6 text-sm text-gray-700">
          {t('Register now and get 10% discount on purchases for 24 hours.')}
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleGoToRegister}
            className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            {t('Get 10% discount')}
          </button>

          <button
            type="button"
            onClick={handleCloseGuest}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
          >
            {t('Maybe later')}
          </button>
        </div>
      </div>
    </div>
  );
};
