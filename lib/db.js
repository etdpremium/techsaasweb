// Drizzle instance — Cloudflare Workers (D1) via binding env.DB
//
// OpenNext Cloudflare mengekspos binding worker (D1, ASSETS, dll) lewat
// getCloudflareContext() — BUKAN globalThis.env maupun process.env.
//
// db dibuat LAZY (Proxy) agar `next build` / SSG collection gak crash saat modul
// di-impor di Node tanpa binding. Binding baru dibaca saat query pertama dijalankan.

import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '../db/schema.js';

let _db = null;

function getDb() {
  if (_db) return _db;

  // OpenNext: akses binding worker via Cloudflare context
  const ctx = getCloudflareContext();
  const d1 = ctx?.env?.DB ?? globalThis.env?.DB ?? process.env.DB;

  if (!d1 || typeof d1.prepare !== 'function') {
    throw new Error(
      'D1 binding (env.DB) tidak ditemukan. Cek d1_databases binding di wrangler.jsonc. ' +
      'Untuk dev: `npm run preview` (wrangler dev).'
    );
  }
  _db = drizzle(d1, { schema });
  return _db;
}

// Proxy: setiap akses method query (db.select(), db.insert(), dll) memanggil getDb()
// lebih dulu. Import modul saja tidak membuka binding.
export const db = new Proxy(
  {},
  {
    get(_target, prop) {
      const d = getDb();
      const val = d[prop];
      return typeof val === 'function' ? val.bind(d) : val;
    },
  },
);
