import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const NP_API_URL = 'https://api.novaposhta.ua/v2.0/json/';
const API_KEY = process.env.NP_API_KEY;       // додаси в .env
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // важливо! не публічний!

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function callNP(modelName, calledMethod, methodProperties) {
  const res = await fetch(NP_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      apiKey: API_KEY,
      modelName,
      calledMethod,
      methodProperties,
    }),
  });

  const json = await res.json();
  if (!json.success) {
    console.log(json.errors);
    throw new Error('Nova Poshta error');
  }
  return json.data;
}

async function importData() {
  console.log('=== IMPORT NOVA POSHTA DATA ===');

  // 1. Завантажуємо всі міста
  console.log('Loading cities...');
  const cities = await callNP('Address', 'getCities', { Page: 1, Limit: 10000 });

  // Чистимо існуючі
  await supabase.from('np_warehouses').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await supabase.from('np_cities').delete().neq('id', '00000000-0000-0000-0000-000000000000');

  // Вставка міст
  console.log(`Inserting ${cities.length} cities...`);
  await supabase.from('np_cities').insert(
    cities.map(c => ({
      ref: c.Ref,
      present: c.Present,
      description: c.Description,
      area: c.Area,
      region: c.Region,
    }))
  );

  // 2. Завантажуємо відділення
  console.log('Loading warehouses...');
  let page = 1;
  let warehouses = [];

  while (true) {
    const chunk = await callNP('AddressGeneral', 'getWarehouses', {
      Page: page,
      Limit: 500,
    });

    if (chunk.length === 0) break;
    warehouses = warehouses.concat(chunk);
    page++;
  }

  console.log(`Inserting ${warehouses.length} warehouses...`);

  await supabase.from('np_warehouses').insert(
    warehouses.map(w => ({
      city_ref: w.CityRef,
      description: w.Description,
      short_address: w.ShortAddress,
      number: w.Number,
      type: w.TypeOfWarehouse === 'Postomat' ? 'locker' : 'branch',
    }))
  );

  console.log('=== DONE ===');
}

importData().catch(err => console.error(err));
