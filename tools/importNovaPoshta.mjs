// tools/importNovaPoshta.mjs
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const NP_API_URL = 'https://api.novaposhta.ua/v2.0/json/';

const API_KEY = process.env.NP_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!API_KEY) {
  console.error('❌ NP_API_KEY is not set in .env');
  process.exit(1);
}

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set in .env');
  process.exit(1);
}

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

  if (!res.ok) {
    throw new Error(`Nova Poshta HTTP error: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    console.error('Nova Poshta error:', json.errors);
    throw new Error('Nova Poshta API error');
  }

  return json.data;
}

function chunkArray(arr, size) {
  const chunks = [];

  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }

  return chunks;
}

async function importCities() {
  console.log('📦 Loading cities from Nova Poshta...');

  const cities = await callNP('Address', 'getCities', {
    Page: 1,
    Limit: 10000,
  });

  console.log(`✅ Loaded ${cities.length} cities`);

  console.log('🧹 Clearing np_cities table...');
  await supabase
    .from('np_cities')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('💾 Inserting cities into np_cities...');

  const chunks = chunkArray(cities, 500);

  for (let i = 0; i < chunks.length; i += 1) {
    const batch = chunks[i];

    const { error } = await supabase.from('np_cities').insert(
      batch.map(c => ({
        ref: c.Ref,
        present: c.Present,
        description: c.Description,
        area: c.Area,
        region: c.Region,
      })),
    );

    if (error) {
      console.error('Error inserting cities batch', i, error);
      throw error;
    }

    console.log(`  → cities batch ${i + 1}/${chunks.length} inserted`);
  }

  console.log('✅ Cities import done');
}

async function importWarehouses() {
  console.log('📦 Loading warehouses from Nova Poshta...');

  let page = 1;
  const limit = 500;
  const allWarehouses = [];

  // пагінація по всіх відділеннях
  // крутимося поки API повертає хоч щось
  // (у НП їх >10к)
  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(`  → loading page ${page}...`);
    const chunk = await callNP('AddressGeneral', 'getWarehouses', {
      Page: page,
      Limit: limit,
    });

    if (!chunk.length) {
      break;
    }

    allWarehouses.push(...chunk);
    page += 1;
  }

  console.log(`✅ Loaded ${allWarehouses.length} warehouses`);

  console.log('🧹 Clearing np_warehouses table...');
  await supabase
    .from('np_warehouses')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');

  console.log('💾 Inserting warehouses into np_warehouses...');

  const chunks = chunkArray(allWarehouses, 500);

  for (let i = 0; i < chunks.length; i += 1) {
    const batch = chunks[i];

    const { error } = await supabase.from('np_warehouses').insert(
      batch.map(w => ({
        city_ref: w.CityRef,
        description: w.Description,
        short_address: w.ShortAddress,
        number: w.Number,
        type: w.TypeOfWarehouse === 'Postomat' ? 'locker' : 'branch',
      })),
    );

    if (error) {
      console.error('Error inserting warehouses batch', i, error);
      throw error;
    }

    console.log(`  → warehouses batch ${i + 1}/${chunks.length} inserted`);
  }

  console.log('✅ Warehouses import done');
}

async function main() {
  try {
    console.log('=== NOVA POSHTA → SUPABASE IMPORT START ===');

    // Важливо: спочатку відділення, потім міста — або чистимо в правильному порядку.
    // Ми вже чистили у функціях, тому просто запускаємо по черзі:
    await importCities();
    await importWarehouses();

    console.log('🎉 All done!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Import failed:', err);
    process.exit(1);
  }
}

main();
