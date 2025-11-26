import type { FC, ChangeEvent } from 'react';

import { ContactDetails } from '@/components/molecules/Checkout/ContactDetails';
import {
  DeliveryMethod,
  type DeliveryFormData,
} from '@/components/molecules/Checkout/DeliveryMethod';
import { OrderComment } from '@/components/molecules/Checkout/OrderComment';
import { PaymentMethod } from '@/components/molecules/Checkout/PaymentMethod';

export interface CheckoutFormData extends DeliveryFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  paymentMethod: string;
  comment?: string;
}

export interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({ formData, onChange }) => (
  <div className="space-y-6 lg:col-span-2">
    <ContactDetails formData={formData} onChange={onChange} />
    <DeliveryMethod formData={formData} onChange={onChange} />
    <PaymentMethod formData={formData} onChange={onChange} />
    <OrderComment />
  </div>
);
