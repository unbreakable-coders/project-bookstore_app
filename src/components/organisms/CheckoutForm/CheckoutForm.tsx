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
  paymentMethod: 'card' | 'cod' | '';
  comment?: string;
}
export interface CheckoutFormProps {
  formData: CheckoutFormData;
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => void;
  errors: Record<string, string | undefined>;
}

export const CheckoutForm: FC<CheckoutFormProps> = ({
  formData,
  onChange,
  errors,
}) => (
  <div className="space-y-6 lg:col-span-2">
    <ContactDetails formData={formData} onChange={onChange} errors={errors} />
    <DeliveryMethod formData={formData} onChange={onChange} errors={errors} />
    <PaymentMethod formData={formData} onChange={onChange} errors={errors} />
    <OrderComment />
  </div>
);
