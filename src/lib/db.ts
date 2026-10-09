import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
    var prismaGlobal: PrismaClient | undefined;
    var poolGlobal: Pool | undefined;
}

function createPrismaClient() {
    const configuredConnectionString = process.env.DATABASE_URL;

    if (!configuredConnectionString) {
        throw new Error("DATABASE_URL environment variable is not set");
    }

    if (!global.poolGlobal) {
        global.poolGlobal = new Pool({
            connectionString: configuredConnectionString,
            // Bound connections per Next.js worker to avoid exhausting PostgreSQL.
            max: Number(process.env.DATABASE_POOL_MAX ?? 5),
            idleTimeoutMillis: 5000,
            connectionTimeoutMillis: 5000,
            allowExitOnIdle: true,
        });
    }

    const adapter = new PrismaPg(global.poolGlobal);

    return new PrismaClient({ adapter });
}

export const prisma = global.prismaGlobal ?? createPrismaClient();

// Hem dev hem production'da cache - serverless'ta her istekte yeni bağlantı açılmasın
global.prismaGlobal = prisma;
