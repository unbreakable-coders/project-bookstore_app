import React, { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { OrdersHistory } from '@/components/molecules/profile/OrdersHistory';
import { ProfileDetails } from '@/components/molecules/profile/ProfileDetails';

export const ProfilePage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { signOut, getCurrentUser } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { orders, loading: ordersLoading } = useOrders();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loadUserEmail = async () => {
      const user = await getCurrentUser();

      if (user?.email) {
        setUserEmail(user.email);
      }
    };

    loadUserEmail();
  }, [getCurrentUser]);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        phone: profile.phone || '',
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const { error } = await updateProfile(formData);

    if (!error) {
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const handleChangeField = (field: 'full_name' | 'phone', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (profileLoading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10 space-y-6 max-w-5xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            {t('Personal account')}
          </h1>

          <p className="text-muted-foreground">
            {t('Manage your profile and view order history')}
          </p>
        </div>

        {saveSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              {t('Profile updated successfully!')}
            </p>
          </div>
        )}

        <div className="flex gap-2 p-1 bg-muted rounded-lg max-w-md">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 text-primary py-2 px-4 rounded-md text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('Profile')}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 px-4 rounded-md text-sm text-primary font-semibold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('Orders')}
          </button>
        </div>

        {activeTab === 'profile' && (
          <ProfileDetails
            profile={profile}
            userEmail={userEmail}
            isEditing={isEditing}
            formData={formData}
            profileLoading={profileLoading}
            onChangeField={handleChangeField}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onCancel={() => setIsEditing(false)}
            onLogout={handleLogout}
          />
        )}

        {activeTab === 'orders' && (
          <OrdersHistory
            orders={orders}
            loading={ordersLoading}
            onStartShopping={() => navigate('/')}
          />
        )}
      </div>
    </div>
  );
};
