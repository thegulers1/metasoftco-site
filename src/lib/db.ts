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

    const connectionUrl = new URL(configuredConnectionString);
    // Supabase pooler port 5432 is session mode. The audit reproduced
    // EMAXCONNSESSION there under concurrent Next workers. Runtime traffic
    // must use the transaction pool; DIRECT_URL remains available for Prisma
    // migrations and other direct administrative work.
    if (connectionUrl.hostname.endsWith(".pooler.supabase.com") && connectionUrl.port === "5432") {
        connectionUrl.port = "6543";
    }
    const connectionString = connectionUrl.toString();

    if (!global.poolGlobal) {
        global.poolGlobal = new Pool({
            connectionString,
            // Transaction pooling makes a modest per-process queue safe while
            // avoiding the session-pool exhaustion reproduced in the audit.
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
