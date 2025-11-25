import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Radio } from '@/components/atoms/Form/Radio';
import { Input } from '@/components/atoms/Form/Input';

interface DeliveryMethodProps {
  formData: {
    deliveryService: string;
    novaPoshtaType: string;
    deliveryDetail: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DeliveryMethod: FC<DeliveryMethodProps> = ({
  formData,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-xl text-secondary font-semibold">
        {t('Delivery')}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="mb-3 block text-sm font-medium text-accent">
            {t('Delivery method *')}
          </label>
          <div className="space-y-3">
            {/* Nova Poshta */}
            <div className="rounded-lg border border-border bg-card p-4">
              <Radio
                name="deliveryService"
                value="novaPoshta"
                checked={formData.deliveryService === 'novaPoshta'}
                onChange={onChange}
                label={t('Nova Poshta')}
                description={t("at the carrier's rates")}
              />

              {formData.deliveryService === 'novaPoshta' && (
                <div className="mt-4 space-y-4 ml-6">
                  <div>
                    <Radio
                      name="novaPoshtaType"
                      value="branch"
                      checked={formData.novaPoshtaType === 'branch'}
                      onChange={onChange}
                      label={t('Nova Poshta branch')}
                    />
                    {formData.novaPoshtaType === 'branch' && (
                      <div className="mt-3 ml-7">
                        <Input
                          label={t('Enter Nova Poshta branch number *')}
                          name="deliveryDetail"
                          value={formData.deliveryDetail}
                          onChange={onChange}
                          placeholder={t('Branch number')}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Radio
                      name="novaPoshtaType"
                      value="locker"
                      checked={formData.novaPoshtaType === 'locker'}
                      onChange={onChange}
                      label={t('Nova Poshta parcel locker')}
                    />
                    {formData.novaPoshtaType === 'locker' && (
                      <div className="mt-3 ml-7">
                        <Input
                          label={t('Enter parcel locker number *')}
                          name="deliveryDetail"
                          value={formData.deliveryDetail}
                          onChange={onChange}
                          placeholder={t('Parcel locker number')}
                          required
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Radio
                      name="novaPoshtaType"
                      value="courier"
                      checked={formData.novaPoshtaType === 'courier'}
                      onChange={onChange}
                      label={t('Courier delivery')}
                      description="150 ₴"
                    />
                    {formData.novaPoshtaType === 'courier' && (
                      <div className="mt-3 ml-7">
                        <Input
                          label={t('Enter delivery address *')}
                          name="deliveryDetail"
                          value={formData.deliveryDetail}
                          onChange={onChange}
                          placeholder={t('Street, house number, apartment')}
                          required
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Ukrposhta */}
            <div className="rounded-lg border border-border bg-card p-4">
              <Radio
                name="deliveryService"
                value="ukrposhta"
                checked={formData.deliveryService === 'ukrposhta'}
                onChange={onChange}
                label={t('Ukrposhta')}
                description={t("at the carrier's rates")}
              />
              {formData.deliveryService === 'ukrposhta' && (
                <div className="mt-3 ml-7">
                  <Input
                    label={t('Enter Ukrposhta branch number *')}
                    name="deliveryDetail"
                    value={formData.deliveryDetail}
                    onChange={onChange}
                    placeholder={t('Branch number')}
                    required
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
