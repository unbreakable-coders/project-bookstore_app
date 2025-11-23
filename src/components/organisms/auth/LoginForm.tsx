import type { FC, MouseEvent, KeyboardEvent } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

type SubmitEvent =
  | MouseEvent<HTMLButtonElement>
  | KeyboardEvent<HTMLInputElement>;

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  values: LoginFormValues;
  isAuthenticated: boolean;
  loading: boolean;
  onChange: (values: LoginFormValues) => void;
  onSubmit: (e: SubmitEvent) => void;
}

export const LoginForm: FC<LoginFormProps> = ({
  values,
  isAuthenticated,
  loading,
  onChange,
  onSubmit,
}) => {
  const handleEmailChange = (value: string) => {
    onChange({
      ...values,
      email: value,
    });
  };

  const handlePasswordChange = (value: string) => {
    onChange({
      ...values,
      password: value,
    });
  };

  const canSubmit = !loading && !isAuthenticated;

  return (
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
          value={values.email}
          onChange={
            isAuthenticated
              ? undefined
              : e => handleEmailChange(e.target.value)
          }
          disabled={loading || isAuthenticated}
          className={
            isAuthenticated ? 'opacity-60 cursor-not-allowed' : ''
          }
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
          placeholder={
            isAuthenticated ? '********' : 'Введіть пароль'
          }
          value={isAuthenticated ? '********' : values.password}
          onChange={
            isAuthenticated
              ? undefined
              : e => handlePasswordChange(e.target.value)
          }
          disabled={loading || isAuthenticated}
          className={
            isAuthenticated ? 'opacity-60 cursor-not-allowed' : ''
          }
          onKeyDown={e => {
            if (e.key === 'Enter' && canSubmit) {
              onSubmit(e);
            }
          }}
        />
      </div>

      {!isAuthenticated && (
        <div className="text-right">
          <button
            className="text-sm text-secondary hover:text-foreground transition-colors"
            disabled={loading}
          >
            Забули пароль?
          </button>
        </div>
      )}

      <Button
        onClick={onSubmit}
        disabled={loading}
        className="w-full"
      >
        {isAuthenticated
          ? 'Вийти'
          : loading
            ? 'Завантаження...'
            : 'Увійти'}
      </Button>
    </div>
  );
};
