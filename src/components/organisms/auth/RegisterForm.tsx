import type { FC, MouseEvent, KeyboardEvent } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

type SubmitEvent =
  | MouseEvent<HTMLButtonElement>
  | KeyboardEvent<HTMLInputElement>;

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFormProps {
  values: RegisterFormValues;
  loading: boolean;
  isAuthenticated: boolean;
  onChange: (values: RegisterFormValues) => void;
  onSubmit: (e: SubmitEvent) => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({
  values,
  loading,
  isAuthenticated,
  onChange,
  onSubmit,
}) => {
  const handleFieldChange = <K extends keyof RegisterFormValues>(
    key: K,
    value: string,
  ) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  const canSubmit = !loading && !isAuthenticated;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label
          htmlFor="register-name"
          className="text-sm font-semibold text-foreground"
        >
          Ім&apos;я
        </label>
        <Input
          id="register-name"
          type="text"
          placeholder="Іван Петренко"
          value={values.name}
          onChange={e => handleFieldChange('name', e.target.value)}
          disabled={loading || isAuthenticated}
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
          value={values.email}
          onChange={e => handleFieldChange('email', e.target.value)}
          disabled={loading || isAuthenticated}
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
          value={values.password}
          onChange={e => handleFieldChange('password', e.target.value)}
          disabled={loading || isAuthenticated}
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
          value={values.confirmPassword}
          onChange={e =>
            handleFieldChange('confirmPassword', e.target.value)
          }
          disabled={loading || isAuthenticated}
          onKeyDown={e => {
            if (e.key === 'Enter' && canSubmit) {
              onSubmit(e);
            }
          }}
        />
      </div>

      <Button
        onClick={onSubmit}
        disabled={loading || isAuthenticated}
        className="w-full"
      >
        {loading ? 'Завантаження...' : 'Зареєструватися'}
      </Button>
    </div>
  );
};
