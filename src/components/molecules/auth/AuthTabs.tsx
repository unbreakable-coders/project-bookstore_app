import type { FC } from 'react';

interface AuthTabsProps {
  isLogin: boolean;
  loading: boolean;
  onChange: (mode: 'login' | 'register') => void;
}

export const AuthTabs: FC<AuthTabsProps> = ({
  isLogin,
  loading,
  onChange,
}) => {
  return (
    <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
      <button
        onClick={() => onChange('login')}
        disabled={loading}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
          isLogin
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        } ${
          loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        Вхід
      </button>

      <button
        onClick={() => onChange('register')}
        disabled={loading}
        className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
          !isLogin
            ? 'bg-card text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        } ${
          loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        Реєстрація
      </button>
    </div>
  );
};
