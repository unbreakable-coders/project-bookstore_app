import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const OrderSuccessPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 px-4">
      <div className="text-4xl">🎉</div>

      <h1 className="text-2xl font-semibold text-center">
        {t('orderSuccess.title')}
      </h1>

      <div className="flex flex-col gap-3 mt-4 w-full max-w-xs">
        <button
          onClick={() => navigate('/')}
          className="px-8 cursor-pointer py-3 bg-black text-white rounded-lg w-full"
        >
          {t('orderSuccess.continueShopping')}
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="px-8 cursor-pointer py-3 border border-black rounded-lg w-full"
        >
          {t('orderSuccess.viewOrder')}
        </button>
      </div>
    </div>
  );
};
