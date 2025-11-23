import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/molecules/BookPreview/Card';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';

// Mock дані для демонстрації
const mockUser = {
  full_name: 'Іван Петренко',
  email: 'ivan.petrenko@example.com',
  phone: '+380 95 123 45 67',
  created_at: '2024-01-15',
};

const mockOrders = [
  {
    id: '1',
    created_at: '2024-11-20T10:30:00',
    status: 'completed',
    total_amount: 599.0,
    delivery_address: 'м. Київ, вул. Хрещатик, 22',
    items: [
      {
        id: '1',
        book_title: 'Кобзар',
        book_cover_url:
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200',
        quantity: 1,
        price: 299.0,
      },
      {
        id: '2',
        book_title: 'Тіні забутих предків',
        book_cover_url:
          'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200',
        quantity: 1,
        price: 300.0,
      },
    ],
  },
  {
    id: '2',
    created_at: '2024-11-15T14:20:00',
    status: 'processing',
    total_amount: 450.0,
    delivery_address: 'м. Київ, вул. Хрещатик, 22',
    items: [
      {
        id: '3',
        book_title: 'Захар Беркут',
        book_cover_url:
          'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=200',
        quantity: 1,
        price: 450.0,
      },
    ],
  },
  {
    id: '3',
    created_at: '2024-10-28T09:15:00',
    status: 'cancelled',
    total_amount: 350.0,
    delivery_address: 'м. Київ, вул. Хрещатик, 22',
    items: [
      {
        id: '4',
        book_title: 'Лісова пісня',
        book_cover_url:
          'https://images.unsplash.com/photo-1589998059171-988d887df646?w=200',
        quantity: 1,
        price: 350.0,
      },
    ],
  },
];

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: mockUser.full_name,
    phone: mockUser.phone,
  });

  const handleSave = () => {
    console.log('Збереження:', formData);
    setIsEditing(false);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      pending: 'Очікує обробки',
      processing: 'В обробці',
      completed: 'Завершено',
      cancelled: 'Скасовано',
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-10 space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Особистий кабінет
          </h1>
          <p className="text-muted-foreground">
            Керуйте своїм профілем та переглядайте історію замовлень
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-muted rounded-lg max-w-md">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Профіль
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Замовлення
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Мій профіль</CardTitle>
                <Button variant="outline" size="sm">
                  Вийти
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isEditing ? (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Ім'я</p>
                      <p className="text-base font-semibold">
                        {mockUser.full_name}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-base font-semibold">
                        {mockUser.email}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Телефон</p>
                      <p className="text-base font-semibold">
                        {mockUser.phone}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Дата реєстрації
                      </p>
                      <p className="text-base font-semibold">
                        {new Date(mockUser.created_at).toLocaleDateString(
                          'uk-UA',
                        )}
                      </p>
                    </div>
                  </div>
                  <Button onClick={() => setIsEditing(true)}>
                    Редагувати профіль
                  </Button>
                </>
              ) : (
                <>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Ім'я
                      </label>
                      <Input
                        value={formData.full_name}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            full_name: e.target.value,
                          })
                        }
                        placeholder="Ваше ім'я"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Email
                      </label>
                      <Input
                        value={mockUser.email}
                        disabled
                        className="opacity-60"
                      />
                      <p className="text-xs text-muted-foreground">
                        Email неможливо змінити
                      </p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-foreground">
                        Телефон
                      </label>
                      <Input
                        value={formData.phone}
                        onChange={e =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="+380 XX XXX XX XX"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Зберегти</Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Скасувати
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle>Історія замовлень</CardTitle>
            </CardHeader>
            <CardContent>
              {mockOrders.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    У вас поки немає замовлень
                  </p>
                  <Button>Почати покупки</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockOrders.map(order => (
                    <div
                      key={order.id}
                      className="border border-border rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow"
                    >
                      {/* Order Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-foreground">
                            Замовлення #{order.id}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(order.created_at)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            📍 {order.delivery_address}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getStatusColor(order.status)}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        {order.items.map(item => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4"
                          >
                            <img
                              src={item.book_cover_url}
                              alt={item.book_title}
                              className="w-16 h-20 object-cover rounded shadow-sm"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-foreground truncate">
                                {item.book_title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {item.quantity} шт. × {item.price.toFixed(2)}{' '}
                                грн
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold">
                                {(item.quantity * item.price).toFixed(2)} грн
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Total */}
                      <div className="pt-4 border-t border-border flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">Всього:</p>
                        <p className="text-lg font-bold text-foreground">
                          {order.total_amount.toFixed(2)} грн
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline">
                          Деталі замовлення
                        </Button>
                        {order.status === 'completed' && (
                          <Button size="sm" variant="outline">
                            Повторити замовлення
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
