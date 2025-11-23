import React, { useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/molecules/BookPreview/Card';
import { useAuth } from '@/hooks/useAuth';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/supabaseClient';
import { SocialAuthButtons } from '@/components/molecules/auth/SocialAuthButtons';
import { AuthTabs } from '@/components/molecules/auth/AuthTabs';
import { LoginForm } from '@/components/organisms/auth/LoginForm';
import {
  RegisterForm,
  type RegisterFormValues,
} from '@/components/organisms/auth/RegisterForm';

export const LoginPage = () => {
  const { t } = useTranslation();

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
      setLocalError(t('auth.googleError'));
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
      setLocalError(t('auth.facebookError'));
    }
  };

  const handleLogin = async (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e.preventDefault();
    setLocalError(null);
    setSuccess(null);

    if (!loginData.email || !loginData.password) {
      setLocalError(t('auth.fillAllFields'));
      return;
    }

    const { data, error: authError } = await signIn(
      loginData.email,
      loginData.password,
    );

    if (authError) {
      setLocalError(t('auth.invalidCredentials'));
    } else if (data) {
      setSuccess(t('auth.loginSuccess'));
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
      setSuccess(t('auth.logoutSuccess'));
      setCurrentUser(null);
      setLoginData({ email: '', password: '' });
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
      setLocalError(t('auth.fillAllFields'));
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setLocalError(t('auth.passwordsNotMatch'));
      return;
    }

    if (registerData.password.length < 6) {
      setLocalError(t('auth.passwordMinLength'));
      return;
    }

    const { data, error: authError } = await signUp(
      registerData.email,
      registerData.password,
      registerData.name,
    );

    if (authError) {
      if (authError.includes('already registered')) {
        setLocalError(t('auth.emailAlreadyRegistered'));
      } else {
        setLocalError(authError);
      }
    } else if (data) {
      setSuccess(t('auth.registrationSuccess'));
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
    (currentUser?.user_metadata as { full_name?: string } | undefined)
      ?.full_name || '';
  const displayName = fullName || currentUser?.email || '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">
            {isLogin ? t('auth.login') : t('auth.registration')}
          </CardTitle>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {isLogin ? t('auth.signInToAccount') : t('auth.createNewAccount')}
          </p>
        </CardHeader>

        <CardContent>
          {isAuthenticated && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-sm text-emerald-800">
                {t('auth.alreadyLoggedIn')}{' '}
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
