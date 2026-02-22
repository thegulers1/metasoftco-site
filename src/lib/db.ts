import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
    var prismaGlobal: PrismaClient | undefined;
    var poolGlobal: Pool | undefined;
}

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL environment variable is not set");
    }

    if (!global.poolGlobal) {
        global.poolGlobal = new Pool({
            connectionString,
            max: 2,                         // Serverless'ta az bağlantı tut
            idleTimeoutMillis: 10000,
            connectionTimeoutMillis: 10000, // Timeout'u artır
        });
    }

    const adapter = new PrismaPg(global.poolGlobal);

    return new PrismaClient({ adapter });
}

export const prisma = global.prismaGlobal ?? createPrismaClient();

// Hem dev hem production'da cache - serverless'ta her istekte yeni bağlantı açılmasın
global.prismaGlobal = prisma;
