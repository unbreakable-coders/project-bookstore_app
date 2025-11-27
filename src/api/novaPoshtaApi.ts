// src/api/novaPoshtaApi.ts
const NOVA_POSHTA_API_URL = 'https://api.novaposhta.ua/v2.0/json/';

// Витягуємо ключ з env (Vite)
const API_KEY = import.meta.env.VITE_NOVA_POSHTA_API_KEY as string;

if (!API_KEY) {
  // Можеш потім замінити на більш цивільний варіант / warning
  console.warn('[NovaPoshtaApi] VITE_NOVA_POSHTA_API_KEY is not set');
}

// ===== Типи відповіді можна спростити до потрібного мінімуму =====

interface NovaPoshtaResponse<T> {
  success: boolean;
  data: T[];
  errors: string[];
  warnings: string[];
  info: unknown;
  messageCodes: string[];
  errorCodes: string[];
  warningCodes: string[];
  infoCodes: string[];
}

// Населені пункти (searchSettlements)
export interface NovaPoshtaSettlement {
  Present: string;
  MainDescription: string; // назва міста
  Area: string;
  Region: string;
  DeliveryCity: string;
  Ref: string; // потрібен для пошуку відділень
}

// Відділення / поштомати (getWarehouses)
export interface NovaPoshtaWarehouse {
  SiteKey: string;
  Description: string;
  ShortAddress: string;
  Number: string;
  CityRef: string;
  TypeOfWarehouse: string; // "Branch", "Postomat" etc
}

// ===== Базова функція для запитів =====

async function callNovaPoshta<T>(
  modelName: string,
  calledMethod: string,
  methodProperties: Record<string, unknown>,
): Promise<T[]> {
  const res = await fetch(NOVA_POSHTA_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: API_KEY,
      modelName,
      calledMethod,
      methodProperties,
    }),
  });

  if (!res.ok) {
    throw new Error(`[NovaPoshtaApi] HTTP error: ${res.status}`);
  }

  const json = (await res.json()) as NovaPoshtaResponse<T>;

  if (!json.success) {
    const msg = json.errors?.join(', ') || 'Unknown NovaPoshta API error';
    throw new Error(`[NovaPoshtaApi] ${msg}`);
  }

  return json.data;
}

// ===== Публічні функції для твоєї форми =====

// Пошук міст (онлайн довідник) – Address/searchSettlements
export async function searchNovaPoshtaSettlements(query: string) {
  if (!query.trim()) return [];

  return callNovaPoshta<NovaPoshtaSettlement>('Address', 'searchSettlements', {
    CityName: query,
    Limit: 20,
    Page: 1,
  });
}

// Отримати відділення/поштомати для вибраного міста
export async function getNovaPoshtaWarehouses(
  cityRef: string,
  type?: 'branch' | 'locker',
) {
  const typeOfWarehouseRef =
    type === 'locker'
      ? 'f9316480-5f2d-425d-bc2c-ac7cd29decf0' // умовний ref для поштоматів (замінити на реальний при потребі)
      : undefined;

  return callNovaPoshta<NovaPoshtaWarehouse>('AddressGeneral', 'getWarehouses', {
    CityRef: cityRef,
    TypeOfWarehouseRef: typeOfWarehouseRef,
    Page: 1,
    Limit: 50,
  });
}
