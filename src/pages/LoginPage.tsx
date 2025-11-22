import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/molecules/BookPreview/Card';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { useAuth } from '@/hooks/useAuth';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, loading, error } = useAuth();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleLogin = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(null);

    if (!loginData.email || !loginData.password) {
      setLocalError('Заповніть всі поля');
      return;
    }

    const { data, error: authError } = await signIn(
      loginData.email,
      loginData.password,
    );

    if (authError) {
      setLocalError('Невірний email або пароль');
    } else if (data) {
      setSuccess('Успішний вхід!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  const handleRegister = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(null);

    if (!registerData.name || !registerData.email || !registerData.password) {
      setLocalError('Заповніть всі поля');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setLocalError('Паролі не збігаються');
      return;
    }

    if (registerData.password.length < 6) {
      setLocalError('Пароль повинен містити мінімум 6 символів');
      return;
    }

    const { data, error: authError } = await signUp(
      registerData.email,
      registerData.password,
      registerData.name,
    );

    if (authError) {
      if (authError.includes('already registered')) {
        setLocalError('Цей email вже зареєстрований');
      } else {
        setLocalError(authError);
      }
    } else if (data) {
      setSuccess('Реєстрація успішна! Перевірте email для підтвердження.');
      setRegisterData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        setIsLogin(true);
        setSuccess(null);
      }, 3000);
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? 'Вхід' : 'Реєстрація'}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {isLogin ? 'Увійдіть у свій акаунт' : 'Створіть новий акаунт'}
          </p>
        </CardHeader>

        <CardContent>
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">{success}</p>
            </div>
          )}

          {displayError && (
            <div className="mb-4 p-3 bg-destructive/10 border border-destructive rounded-lg">
              <p className="text-sm text-destructive">{displayError}</p>
            </div>
          )}

          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
            <button
              onClick={() => {
                setIsLogin(true);
                setLocalError(null);
                setSuccess(null);
              }}
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                isLogin
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Вхід
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                setLocalError(null);
                setSuccess(null);
              }}
              disabled={loading}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all ${
                !isLogin
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              } ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              Реєстрація
            </button>
          </div>

          {isLogin ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="login-email"
                  className="text-sm font-semibold text-foreground"
                >
                  Email
                </label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={e =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="login-password"
                  className="text-sm font-semibold text-foreground"
                >
                  Пароль
                </label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="Введіть пароль"
                  value={loginData.password}
                  onChange={e =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  disabled={loading}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !loading) {
                      handleLogin(e);
                    }
                  }}
                />
              </div>

              <div className="text-right">
                <button
                  className="text-sm text-secondary hover:text-foreground transition-colors"
                  disabled={loading}
                >
                  Забули пароль?
                </button>
              </div>

              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Завантаження...' : 'Увійти'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="register-name"
                  className="text-sm font-semibold text-foreground"
                >
                  Ім'я
                </label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="Іван Петренко"
                  value={registerData.name}
                  onChange={e =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-email"
                  className="text-sm font-semibold text-foreground"
                >
                  Email
                </label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="name@example.com"
                  value={registerData.email}
                  onChange={e =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-password"
                  className="text-sm font-semibold text-foreground"
                >
                  Пароль
                </label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="Мінімум 6 символів"
                  value={registerData.password}
                  onChange={e =>
                    setRegisterData({
                      ...registerData,
                      password: e.target.value,
                    })
                  }
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="register-confirm"
                  className="text-sm font-semibold text-foreground"
                >
                  Підтвердіть пароль
                </label>
                <Input
                  id="register-confirm"
                  type="password"
                  placeholder="Повторіть пароль"
                  value={registerData.confirmPassword}
                  onChange={e =>
                    setRegisterData({
                      ...registerData,
                      confirmPassword: e.target.value,
                    })
                  }
                  disabled={loading}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !loading) {
                      handleRegister(e);
                    }
                  }}
                />
              </div>

              <Button
                onClick={handleRegister}
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Завантаження...' : 'Зареєструватися'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
