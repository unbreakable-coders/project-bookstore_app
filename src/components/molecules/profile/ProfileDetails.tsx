import type { FC } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/molecules/BookPreview/Card';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { useTranslation } from 'react-i18next';

interface Profile {
  full_name?: string | null;
  phone?: string | null;
  created_at?: string | null;
}

interface FormData {
  full_name: string;
  phone: string;
}

interface ProfileDetailsProps {
  profile: Profile | null;
  userEmail: string;
  isEditing: boolean;
  formData: FormData;
  profileLoading: boolean;
  onChangeField: (field: keyof FormData, value: string) => void;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onLogout: () => void;
}

export const ProfileDetails: FC<ProfileDetailsProps> = ({
  profile,
  userEmail,
  isEditing,
  formData,
  profileLoading,
  onChangeField,
  onEdit,
  onSave,
  onCancel,
  onLogout,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('My profile')}</CardTitle>

          <Button className="bg-primary" onClick={onLogout}>
            {t('Log out')}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {!isEditing ? (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t('Name')}</p>
                <p className="text-base font-semibold">
                  {profile?.full_name || '—'}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-base font-semibold">{userEmail || '—'}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">{t('Phone')}</p>
                <p className="text-base font-semibold">
                  {profile?.phone || '—'}
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {t('Registration date')}
                </p>
                <p className="text-base font-semibold">
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString('uk-UA')
                    : '—'}
                </p>
              </div>
            </div>

            <Button onClick={onEdit}>{t('Edit profile')}</Button>
          </>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {t('Name')}
                </label>

                <Input
                  value={formData.full_name}
                  className="border-border"
                  onChange={e => onChangeField('full_name', e.target.value)}
                  placeholder={t('Your name')}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Email</label>

                <Input value={userEmail} disabled className="border-border" />

                <p className="text-xs text-muted-foreground">
                  {t('Email cannot be changed')}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">
                  {t('Phone')}
                </label>

                <Input
                  value={formData.phone}
                  className="border-border"
                  onChange={e => onChangeField('phone', e.target.value)}
                  placeholder="+380 XX XXX XX XX"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={onSave} disabled={profileLoading}>
                {profileLoading ? t('Saving...') : t('Save')}
              </Button>

              <Button
                variant="outline"
                onClick={onCancel}
                disabled={profileLoading}
              >
                {t('Cancel')}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
