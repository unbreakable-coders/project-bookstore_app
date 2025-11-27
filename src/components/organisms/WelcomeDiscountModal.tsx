import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useWelcomeDiscount } from '@/context/WelcomeDiscountContext';
import { useTranslation } from 'react-i18next';

export const WelcomeDiscountModal = () => {
  const { t } = useTranslation();
  const { user, initializing } = useAuth();
  const {
    hasActiveWelcomeDiscount,
    remainingMs,
    showModal,
    closeModal,
    discountPercent,
  } = useWelcomeDiscount();

  const [isDelayPassed, setIsDelayPassed] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);

  const navigate = useNavigate();

  // затримка перед показом будь-якої модалки
  useEffect(() => {
    const id = window.setTimeout(() => setIsDelayPassed(true), 9000);

    return () => {
      window.clearTimeout(id);
    };
  }, []);

  // вибір, яку модалку показувати після затримки
  useEffect(() => {
    if (!isDelayPassed || initializing) {
      return;
    }

    // гість
    if (!user) {
      const dismissed = localStorage.getItem('welcomeModalDismissed');

      if (!dismissed) {
        setShowGuestModal(true);
      } else {
        setShowGuestModal(false);
      }

      return;
    }

    // авторизований юзер
    setShowGuestModal(false);
  }, [user, initializing, isDelayPassed]);

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
    closeModal();
  };

  const handleGoToCatalog = () => {
    closeModal();
    navigate('/catalog');
  };

  if (!isDelayPassed) {
    return null;
  }

  const isTimerMode =
    Boolean(user) &&
    showModal &&
    hasActiveWelcomeDiscount &&
    remainingMs > 0;

  if (!showGuestModal && !isTimerMode) {
    return null;
  }

  const safeRemaining = remainingMs > 0 ? remainingMs : 0;
  const totalSeconds = Math.floor(safeRemaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const timeString = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

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
                'You received {{percent}}% discount on purchases. Hurry up to use it while time is running.',
                { percent: discountPercent },
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
                'Register now and get {{percent}}% discount on purchases for 24 hours.',
                { percent: discountPercent },
              )}
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleGoToRegister}
                className="flex-1 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                {t('Get {{percent}}% discount', { percent: discountPercent })}
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
