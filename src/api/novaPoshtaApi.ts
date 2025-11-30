const NOVA_POSHTA_API_URL = 'https://api.novaposhta.ua/v2.0/json/';

const API_KEY = import.meta.env.VITE_NOVA_POSHTA_API_KEY as string;

if (!API_KEY) {
  console.warn('[NovaPoshtaApi] VITE_NOVA_POSHTA_API_KEY is not set');
}


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

export interface NovaPoshtaSettlement {
  Present: string;
  MainDescription: string;
  Area: string;
  Region: string;
  DeliveryCity: string;
  Ref: string; 
}

export interface NovaPoshtaWarehouse {
  SiteKey: string;
  Description: string;
  ShortAddress: string;
  Number: string;
  CityRef: string;
  TypeOfWarehouse: string; 
}

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

export async function searchNovaPoshtaSettlements(query: string) {
  if (!query.trim()) return [];

  return callNovaPoshta<NovaPoshtaSettlement>('Address', 'searchSettlements', {
    CityName: query,
    Limit: 20,
    Page: 1,
  });
}

export async function getNovaPoshtaWarehouses(
  cityRef: string,
  type?: 'branch' | 'locker',
) {
  const typeOfWarehouseRef =
    type === 'locker'
      ? 'f9316480-5f2d-425d-bc2c-ac7cd29decf0' 
      : undefined;

  return callNovaPoshta<NovaPoshtaWarehouse>('AddressGeneral', 'getWarehouses', {
    CityRef: cityRef,
    TypeOfWarehouseRef: typeOfWarehouseRef,
    Page: 1,
    Limit: 50,
  });
}
