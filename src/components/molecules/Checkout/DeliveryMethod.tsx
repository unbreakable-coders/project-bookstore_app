import type { FC, ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Radio } from '@/components/atoms/Form/Radio';
import { Input } from '@/components/atoms/Form/Input';
import { supabase } from '@/supabaseClient';

export interface DeliveryFormData {
  deliveryService: 'novaPoshta' | 'ukrposhta' | '';
  novaPoshtaType: 'branch' | 'locker' | 'courier' | '';

  novaPoshtaCity: string;
  novaPoshtaBranch: string;
  novaPoshtaLocker: string;
  novaPoshtaAddress: string;

  ukrposhtaCity: string;
  ukrposhtaBranch: string;
}

interface DeliveryMethodProps {
  formData: DeliveryFormData;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

interface NPCity {
  ref: string;
  description: string;
  present: string;
}

interface NPWarehouse {
  id: string;
  city_ref: string;
  description: string;
  short_address: string | null;
  number: string;
  type: 'branch' | 'locker';
}

export const DeliveryMethod: FC<DeliveryMethodProps> = ({
  formData,
  onChange,
}) => {
  const { t } = useTranslation();

  const [cities, setCities] = useState<NPCity[]>([]);
  const [branches, setBranches] = useState<NPWarehouse[]>([]);
  const [lockers, setLockers] = useState<NPWarehouse[]>([]);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingWarehouses, setLoadingWarehouses] = useState(false);
  const [selectedCityRef, setSelectedCityRef] = useState('');

  useEffect(() => {
    const loadCities = async () => {
      setLoadingCities(true);

      const { data, error } = await supabase
        .from('np_cities')
        .select('ref, description, present')
        .order('description', { ascending: true });

      if (!error && data) {
        setCities(data as NPCity[]);
      } else {
        console.error('[NovaPoshta] load cities error:', error);
      }

      setLoadingCities(false);
    };

    void loadCities();
  }, []);

  useEffect(() => {
    const loadWarehouses = async () => {
      if (formData.deliveryService !== 'novaPoshta' || !selectedCityRef) {
        setBranches([]);
        setLockers([]);
        return;
      }

      setLoadingWarehouses(true);

      const { data, error } = await supabase
        .from('np_warehouses')
        .select('id, city_ref, description, short_address, number, type')
        .eq('city_ref', selectedCityRef);

      if (!error && data) {
        const all = data as NPWarehouse[];

        setBranches(all.filter(w => w.type === 'branch'));
        setLockers(all.filter(w => w.type === 'locker'));
      } else {
        console.error('[NovaPoshta] load warehouses error:', error);
        setBranches([]);
        setLockers([]);
      }

      setLoadingWarehouses(false);
    };

    void loadWarehouses();
  }, [formData.deliveryService, selectedCityRef]);

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const ref = e.target.value;
    setSelectedCityRef(ref);

    const city = cities.find(c => c.ref === ref) || null;

    const syntheticEvent = {
      target: {
        name: 'novaPoshtaCity',
        value: city ? city.present : '',
      },
    } as unknown as ChangeEvent<HTMLSelectElement>;

    onChange(syntheticEvent);
  };

  const selectedCity = cities.find(c => c.ref === selectedCityRef);

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
            <div className="rounded-lg border border-border bg-card p-4">
              <Radio
                className="cursor-pointer"
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
                    <label className="mb-1 block text-sm font-medium text-muted">
                      {t('City *')}
                    </label>

                    <select
                      name="novaPoshtaCity"
                      value={selectedCityRef}
                      onChange={handleCityChange}
                      className="w-full text-primary cursor-pointer rounded-lg border border-border bg-card px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                      required
                    >
                      <option value="">{t('Select city')}</option>
                      {cities.map(city => (
                        <option
                          className="cursor-pointer"
                          key={city.ref}
                          value={city.ref}
                        >
                          {city.description}
                        </option>
                      ))}
                    </select>

                    {loadingCities && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {t('Loading cities...')}
                      </p>
                    )}
                  </div>

                  <div>
                    <Radio
                      className="cursor-pointer"
                      name="novaPoshtaType"
                      value="branch"
                      checked={formData.novaPoshtaType === 'branch'}
                      onChange={onChange}
                      label={t('Nova Poshta branch')}
                    />

                    {formData.novaPoshtaType === 'branch' && (
                      <div className="mt-3 ml-7 space-y-3">
                        <label className="mb-1 block text-sm font-medium text-accent">
                          {selectedCity
                            ? t('Select branch in {{city}}', {
                                city: selectedCity.description,
                              })
                            : t('Select branch')}
                        </label>

                        <select
                          name="novaPoshtaBranch"
                          value={formData.novaPoshtaBranch}
                          onChange={onChange}
                          className="w-full cursor-pointer text-primary rounded-lg border border-border bg-card px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                          disabled={!selectedCityRef || loadingWarehouses}
                          required
                        >
                          <option value="">{t('Select branch')}</option>
                          {branches.map(w => (
                            <option key={w.id} value={w.description}>
                              {w.description} — {w.short_address || ''}
                            </option>
                          ))}
                        </select>

                        {loadingWarehouses && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            {t('Loading branches...')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <Radio
                      className="cursor-pointer"
                      name="novaPoshtaType"
                      value="locker"
                      checked={formData.novaPoshtaType === 'locker'}
                      onChange={onChange}
                      label={t('Nova Poshta parcel locker')}
                    />

                    {formData.novaPoshtaType === 'locker' && (
                      <div className="mt-3 ml-7 space-y-3">
                        <label className="mb-1 block text-sm font-medium text-accent">
                          {selectedCity
                            ? t('Select parcel locker in {{city}}', {
                                city: selectedCity.description,
                              })
                            : t('Select parcel locker')}
                        </label>

                        <select
                          name="novaPoshtaLocker"
                          value={formData.novaPoshtaLocker}
                          onChange={onChange}
                          className="w-full text-primary cursor-pointer rounded-lg border border-border bg-card px-4 py-3 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary"
                          disabled={!selectedCityRef || loadingWarehouses}
                          required
                        >
                          <option value="">{t('Select parcel locker')}</option>
                          {lockers.map(w => (
                            <option key={w.id} value={w.number}>
                              {w.description} — {w.short_address || ''}
                            </option>
                          ))}
                        </select>

                        {loadingWarehouses && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            {t('Loading parcel lockers...')}
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <Radio
                      className="cursor-pointer"
                      name="novaPoshtaType"
                      value="courier"
                      checked={formData.novaPoshtaType === 'courier'}
                      onChange={onChange}
                      label={t('Courier delivery')}
                      description="150 ₴"
                    />

                    {formData.novaPoshtaType === 'courier' && (
                      <div className="mt-3 ml-7 space-y-3">
                        <Input
                          label={t('Enter delivery address *')}
                          name="novaPoshtaAddress"
                          value={formData.novaPoshtaAddress}
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

            <div className="rounded-lg border border-border bg-card p-4">
              <Radio
                className="cursor-pointer"
                name="deliveryService"
                value="ukrposhta"
                checked={formData.deliveryService === 'ukrposhta'}
                onChange={onChange}
                label={t('Ukrposhta')}
                description={t("at the carrier's rates")}
              />

              {formData.deliveryService === 'ukrposhta' && (
                <div className="mt-3 ml-7 space-y-3">
                  <Input
                    label={t('City *')}
                    name="ukrposhtaCity"
                    value={formData.ukrposhtaCity}
                    onChange={onChange}
                    placeholder={t('City')}
                    required
                  />

                  <Input
                    label={t('Enter Ukrposhta branch number *')}
                    name="ukrposhtaBranch"
                    value={formData.ukrposhtaBranch}
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
