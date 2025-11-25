import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/molecules/BookPreview/Card';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { useProfile } from '@/hooks/useProfile';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Loader } from '@/components/atoms/Loader/Loader';
import { useTranslation } from 'react-i18next';

export const ProfilePage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { signOut, getCurrentUser } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = useProfile();
  const { orders, loading: ordersLoading } = useOrders();

  const [activeTab, setActiveTab] = useState('profile');
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

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: t('Pending processing'),
      processing: t('Processing'),
      completed: t('Completed'),
      cancelled: t('Cancelled'),
    };
    return statusMap[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colorMap: Record<string, string> = {
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colorMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold text-primary transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('Orders')}
          </button>
        </div>

        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{t('My profile')}</CardTitle>
                <Button
                  className="bg-muted-foreground text-input"
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  {t('Log out')}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isEditing ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {t('Name')}
                      </p>
                      <p className="text-base font-semibold">
                        {profile?.full_name || '—'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-base font-semibold">
                        {userEmail || '—'}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {t('Phone')}
                      </p>
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
                          ? new Date(profile.created_at).toLocaleDateString(
                              'uk-UA',
                            )
                          : '—'}
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => setIsEditing(true)}>
                    {t('Edit profile')}
                  </Button>
                </>
              ) : (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2 ">
                      <label className="text-sm text-muted-foreground ">
                        {t('Name')}
                      </label>
                      <Input
                        value={formData.full_name}
                        className="border-border"
                        onChange={e =>
                          setFormData({
                            ...formData,
                            full_name: e.target.value,
                          })
                        }
                        placeholder={t('Your name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">
                        Email
                      </label>
                      <Input
                        value={userEmail}
                        disabled
                        className="border-border"
                      />
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
                        onChange={e =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+380 XX XXX XX XX"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={profileLoading}>
                      {profileLoading ? t('Saving...') : t('Save')}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      disabled={profileLoading}
                    >
                      {t('Cancel')}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle>{t('Order history')}</CardTitle>
            </CardHeader>
            <CardContent>
              {ordersLoading ? (
                <Loader />
              ) : orders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    {t('You have no orders yet')}
                  </p>
                  <Button onClick={() => navigate('/')}>
                    {t('Start shopping')}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="border border-border rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">
                            {t('Order')} #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(order.created_at)}
                          </p>
                          {order.delivery_address && (
                            <p className="text-xs text-muted-foreground">
                              📍 {order.delivery_address}
                            </p>
                          )}
                        </div>
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(order.status)}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>

                      {order.items && order.items.length > 0 && (
                        <div className="space-y-3 pt-4 border-t border-border">
                          {order.items.map(item => (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              {item.book_cover_url && (
                                <img
                                  src={item.book_cover_url}
                                  alt={item.book_title}
                                  className="w-16 h-20 object-cover rounded shadow-sm"
                                />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-foreground truncate">
                                  {item.book_title}
                                </p>
                                {item.book_author && (
                                  <p className="text-xs text-muted-foreground">
                                    {item.book_author}
                                  </p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                  {item.quantity} шт. × {item.price.toFixed(2)}{' '}
                                  {t('UAH')}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-semibold">
                                  {(item.quantity * item.price).toFixed(2)}{' '}
                                  {t('UAH')}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="pt-4 border-t border-border flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          {t('Total')}:
                        </p>
                        <p className="text-lg font-bold text-foreground">
                          {order.total_amount.toFixed(2)} {t('UAH')}
                        </p>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          {t('Order details')}
                        </Button>
                        {order.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            {t('Repeat order')}
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
