import { ContactDetails } from '@/components/molecules/Checkout/ContactDetails';
import { DeliveryMethod } from '@/components/molecules/Checkout/DeliveryMethod';
import { OrderComment } from '@/components/molecules/Checkout/OrderComment';
import { PaymentMethod } from '@/components/molecules/Checkout/PaymentMethod';
import type { FC } from 'react';

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  deliveryService: string;
  novaPoshtaType: string;
  deliveryDetail: string;
  paymentMethod: string;
}

export interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({ formData, onChange }) => (
  <div className="space-y-6 lg:col-span-2">
    <ContactDetails formData={formData} onChange={onChange} />
    <DeliveryMethod formData={formData} onChange={onChange} />
    <PaymentMethod formData={formData} onChange={onChange} />
    <OrderComment />
  </div>
);
