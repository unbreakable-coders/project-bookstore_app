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
  errors: Record<string, string | undefined>;
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
  errors,
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

      if (!error && data) setCities(data as NPCity[]);
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
      }
      setLoadingWarehouses(false);
    };
    void loadWarehouses();
  }, [formData.deliveryService, selectedCityRef]);

  const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const ref = e.target.value;
    setSelectedCityRef(ref);
    const city = cities.find(c => c.ref === ref);
    const syntheticEvent = {
      target: { name: 'novaPoshtaCity', value: city ? city.present : '' },
    } as ChangeEvent<HTMLSelectElement>;
    onChange(syntheticEvent);
  };

  const showDeliveryTypeError =
    formData.deliveryService === 'novaPoshta' &&
    formData.novaPoshtaCity &&
    !formData.novaPoshtaType;

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold text-secondary">
        {t('Delivery')}
      </h2>

      {errors.deliveryService && (
        <p className="mb-4 text-sm text-red-500">{errors.deliveryService}</p>
      )}

      <div className="space-y-4">
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
              <div className="mt-4 space-y-5 ml-6">
                {/* City */}
                <div>
                  <label className="block text-sm font-medium text-muted mb-1">
                    {t('City *')}
                  </label>
                  <select
                    name="novaPoshtaCity"
                    value={selectedCityRef}
                    onChange={handleCityChange}
                    className={`w-full rounded-lg border ${errors.novaPoshtaCity ? 'border-red-500' : 'border-border'} text-primary  bg-card px-4 py-3 focus:border-primary focus:ring-1 focus:ring-primary`}
                  >
                    <option value="">{t('Select city')}</option>
                    {cities.map(city => (
                      <option key={city.ref} value={city.ref}>
                        {city.description}
                      </option>
                    ))}
                  </select>
                  {errors.novaPoshtaCity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.novaPoshtaCity}
                    </p>
                  )}
                  {loadingCities && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {t('Loading cities...')}
                    </p>
                  )}
                </div>

                {showDeliveryTypeError && (
                  <div className="mb-3 -mt-2">
                    <p className="text-sm text-red-500 font-medium">
                      {t('Choose delivery type')}
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <Radio
                    name="novaPoshtaType"
                    value="branch"
                    checked={formData.novaPoshtaType === 'branch'}
                    onChange={onChange}
                    label={t('Nova Poshta branch')}
                  />
                  {formData.novaPoshtaType === 'branch' && (
                    <div className="mt-3 ml-7">
                      <select
                        name="novaPoshtaBranch"
                        value={formData.novaPoshtaBranch}
                        onChange={onChange}
                        className={`w-full rounded-lg text-primary  border ${errors.novaPoshtaBranch ? 'border-red-500' : 'border-border'} bg-card px-4 py-3`}
                        disabled={!selectedCityRef || loadingWarehouses}
                      >
                        <option value="">{t('Select branch')}</option>
                        {branches.map(w => (
                          <option key={w.id} value={w.description}>
                            {w.description} — {w.short_address || ''}
                          </option>
                        ))}
                      </select>
                      {errors.novaPoshtaBranch && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.novaPoshtaBranch}
                        </p>
                      )}
                      {loadingWarehouses && (
                        <p className="mt-1 text-xs text-muted-foreground">
                          {t('Loading branches...')}
                        </p>
                      )}
                    </div>
                  )}

                  <Radio
                    name="novaPoshtaType"
                    value="locker"
                    checked={formData.novaPoshtaType === 'locker'}
                    onChange={onChange}
                    label={t('Nova Poshta parcel locker')}
                  />
                  {formData.novaPoshtaType === 'locker' && (
                    <div className="mt-3 ml-7">
                      <select
                        name="novaPoshtaLocker"
                        value={formData.novaPoshtaLocker}
                        onChange={onChange}
                        className={`w-full rounded-lg text-primary  border ${errors.novaPoshtaLocker ? 'border-red-500' : 'border-border'} bg-card px-4 py-3`}
                        disabled={!selectedCityRef || loadingWarehouses}
                      >
                        <option value="">{t('Select parcel locker')}</option>
                        {lockers.map(w => (
                          <option key={w.id} value={w.number}>
                            {w.description} — {w.short_address || ''}
                          </option>
                        ))}
                      </select>
                      {errors.novaPoshtaLocker && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.novaPoshtaLocker}
                        </p>
                      )}
                    </div>
                  )}

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
                        name="novaPoshtaAddress"
                        value={formData.novaPoshtaAddress}
                        onChange={onChange}
                        placeholder={t('Street, house number, apartment')}
                      />
                      {errors.novaPoshtaAddress && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.novaPoshtaAddress}
                        </p>
                      )}
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
              <div className="mt-4 ml-7 space-y-4">
                <div>
                  <Input
                    label={t('City *')}
                    name="ukrposhtaCity"
                    value={formData.ukrposhtaCity}
                    onChange={onChange}
                    placeholder={t('City')}
                  />
                  {errors.ukrposhtaCity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.ukrposhtaCity}
                    </p>
                  )}
                </div>

                <div>
                  <Input
                    label={t('Enter Ukrposhta branch number *')}
                    name="ukrposhtaBranch"
                    value={formData.ukrposhtaBranch}
                    onChange={onChange}
                    placeholder={t('Branch number')}
                  />
                  {errors.ukrposhtaBranch && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.ukrposhtaBranch}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
