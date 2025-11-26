import { useTranslation } from 'react-i18next';
import { useWelcomeDiscount } from '@/context/WelcomeDiscountContext';

export const HeaderDiscountBar = () => {
  const { t } = useTranslation();
  const { hasActiveWelcomeDiscount, remainingMs } = useWelcomeDiscount();

  if (!hasActiveWelcomeDiscount || remainingMs <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const countdownTime = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="sticky bottom-6 left-6 z-40 flex justify-start px-6">
      <div className="inline-flex items-stretch rounded-full bg-[#0F9952] px-4 py-2 text-white shadow-md">
        <div className="flex flex-col justify-center border-r border-white/30 pr-4">
          <span className="text-xs font-bold leading-tight">-10%</span>
          <span className="text-[10px] leading-tight">{t('Discount')}</span>
        </div>

        <div className="flex items-center pl-4">
          <span className="font-mono text-2xl font-semibold leading-none">
            {countdownTime}
          </span>
        </div>
      </div>
    </div>
  );
};
