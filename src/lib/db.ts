import "server-only";

import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  process.env.DATABASE_URL && process.env.NODE_ENV !== "test"
    ? (globalForPrisma.prisma ??
      new PrismaClient({
        adapter: new PrismaMariaDb(process.env.DATABASE_URL),
      }))
    : null;

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}
