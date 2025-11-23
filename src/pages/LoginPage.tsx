import React, { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/molecules/BookPreview/Card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/supabaseClient';
import { SocialAuthButtons } from '@/components/molecules/auth/SocialAuthButtons';
import { AuthTabs } from '@/components/molecules/auth/AuthTabs';
import { LoginForm } from '@/components/organisms/auth/LoginForm';
import {
  RegisterForm,
  type RegisterFormValues,
} from '@/components/organisms/auth/RegisterForm';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const { signIn, signUp, signOut, getCurrentUser, loading, error } = useAuth();

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState<RegisterFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [localError, setLocalError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const isAuthenticated = Boolean(currentUser);

  useEffect(() => {
    const load = async () => {
      const user = await getCurrentUser();

      if (user) {
        setCurrentUser(user);
        setLoginData(prev => ({
          ...prev,
          email: user.email ?? '',
        }));
        setIsLogin(true);
      }
    };

    void load();
  }, []);

  const handleGoogleLogin = async () => {
    setLocalError(null);
    setSuccess(null);

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });

    if (authError) {
      setLocalError('Не вдалося увійти через Google');
    }
  };

  const handleFacebookLogin = async () => {
    setLocalError(null);
    setSuccess(null);

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: { redirectTo: window.location.origin },
    });

    if (authError) {
      setLocalError('Не вдалося увійти через Facebook');
    }
  };

  const handleLogin = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
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

  const handleLogout = async () => {
    setLocalError(null);
    setSuccess(null);

    const { error: logoutError } = await signOut();

    if (logoutError) {
      setLocalError(logoutError);
    } else {
      setSuccess('Ви вийшли з акаунту');
      setCurrentUser(null);
      setLoginData({ email: '', password: '' });
    }
  };

  const handleRegister = async (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLInputElement>,
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

  const fullName =
    (currentUser?.user_metadata as { full_name?: string } | undefined)?.full_name ||
    '';
  const displayName = fullName || currentUser?.email || '';

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
          {isAuthenticated && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-800">
                Ви вже авторизовані як{' '}
                <span className="font-semibold">{displayName}</span>.
              </p>
            </div>
          )}

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

          {!isAuthenticated && (
            <SocialAuthButtons
              loading={loading}
              onGoogle={handleGoogleLogin}
              onFacebook={handleFacebookLogin}
            />
          )}

          {!isAuthenticated && (
            <AuthTabs
              isLogin={isLogin}
              loading={loading}
              onChange={mode => {
                setIsLogin(mode === 'login');
                setLocalError(null);
                setSuccess(null);
              }}
            />
          )}

          {isLogin ? (
            <LoginForm
              values={loginData}
              isAuthenticated={isAuthenticated}
              loading={loading}
              onChange={values => setLoginData(values)}
              onSubmit={isAuthenticated ? handleLogout : handleLogin}
            />
          ) : (
            <RegisterForm
              values={registerData}
              loading={loading}
              isAuthenticated={isAuthenticated}
              onChange={values => setRegisterData(values)}
              onSubmit={handleRegister}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
