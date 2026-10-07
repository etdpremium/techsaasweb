import { PrismaClient } from '@prisma/client';

// Singleton: hindari bikin client baru tiap hot-reload di dev
const globalForPrisma = globalThis;
export const prisma = globalForPrisma.prisma || new PrismaClient({ log: ['error'] });
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
