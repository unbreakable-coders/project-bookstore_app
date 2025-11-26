import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useWelcomeDiscount } from '@/context/WelcomeDiscountContext';
import { useTranslation } from 'react-i18next';

export const WelcomeDiscountModal = () => {
  const { t } = useTranslation();

  const { user, initializing } = useAuth();
  const { hasActiveWelcomeDiscount, remainingMs } = useWelcomeDiscount();

  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const [timerDismissed, setTimerDismissed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (initializing) {
      return;
    }

    if (!user) {
      const dismissed = localStorage.getItem('welcomeModalDismissed');

      if (!dismissed) {
        setShowGuestModal(true);
      }

      setShowTimerModal(false);
      setTimerDismissed(false);

      return;
    }

    setShowGuestModal(false);

    if (hasActiveWelcomeDiscount && remainingMs > 0 && !timerDismissed) {
      setShowTimerModal(true);
    } else {
      setShowTimerModal(false);
    }
  }, [
    user,
    initializing,
    hasActiveWelcomeDiscount,
    remainingMs,
    timerDismissed,
  ]);

  useEffect(() => {
    if (!hasActiveWelcomeDiscount || remainingMs <= 0) {
      setShowTimerModal(false);
      setTimerDismissed(false);
    }
  }, [hasActiveWelcomeDiscount, remainingMs]);

  const handleCloseGuest = () => {
    localStorage.setItem('welcomeModalDismissed', 'true');
    setShowGuestModal(false);
  };

  const handleGoToRegister = () => {
    localStorage.setItem('welcomeModalDismissed', 'true');
    setShowGuestModal(false);
    navigate('/login?mode=register');
  };

  const handleCloseTimer = () => {
    setTimerDismissed(true);
    setShowTimerModal(false);
  };

  const handleGoToCatalog = () => {
    setTimerDismissed(true);
    setShowTimerModal(false);
    navigate('/catalog');
  };

  if (!showGuestModal && !showTimerModal) {
    return null;
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const isTimerMode = showTimerModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-lg rounded-2xl bg-card p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl text-accent font-semibold">
            {isTimerMode
              ? t('Your discount is active')
              : t('Welcome to our store')}
          </h2>

          <button
            type="button"
            onClick={isTimerMode ? handleCloseTimer : handleCloseGuest}
            className="text-xl w-5 h-5 cursor-pointer text-gray-400 transition hover:text-gray-600"
          >
            ×
          </button>
        </div>

        {isTimerMode ? (
          <>
            <p className="mb-6 text-sm text-gray-700">
              {t(
                'You received 10% discount on purchases. Hurry up to use it while time is running.',
              )}
            </p>

            <div className="mb-8 flex items-center justify-center">
              <div className="rounded-xl bg-primary px-8 py-4 text-3xl font-mono font-semibold text-white">
                {timeString}
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoToCatalog}
              className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-[#230c02]"
            >
              {t('To catalog')}
            </button>
          </>
        ) : (
          <>
            <p className="mb-6 text-sm text-gray-700">
              {t(
                'Register now and get 10% discount on purchases for 24 hours.',
              )}
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
          </>
        )}
      </div>
    </div>
  );
};
