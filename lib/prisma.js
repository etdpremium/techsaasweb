import { PrismaClient } from '@prisma/client';
import { PrismaD1 } from '@prisma/adapter-d1';

// Di Cloudflare Workers, binding D1 diakses lewat globalThis.env.DB.
// Di dev lokal, DATABASE_URL (file: SQLite) tetap dipakai.
const getPrisma = () => {
  const env = process.env;
  const d1Binding = globalThis.env?.DB ?? env.DB;

  if (d1Binding) {
    // Production (Cloudflare Workers): adapter D1
    const adapter = new PrismaD1(d1Binding);
    return new PrismaClient({ adapter, log: ['error'] });
  }

  // Dev lokal: SQLite file (prisma/dev.db) via DATABASE_URL
  return new PrismaClient({ log: ['error'] });
};

const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || getPrisma();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
