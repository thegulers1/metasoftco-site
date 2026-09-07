import "dotenv/config";
import { prisma } from "../src/lib/db";

const total = Number(process.env.CONCURRENCY_TOTAL ?? 30);
const concurrency = Number(process.env.CONCURRENCY_WORKERS ?? 15);

async function main() {
    if (!Number.isInteger(total) || !Number.isInteger(concurrency) || total < 1 || concurrency < 1) {
        throw new Error("CONCURRENCY_TOTAL and CONCURRENCY_WORKERS must be positive integers.");
    }

    let next = 0;
    const failures: unknown[] = [];
    const worker = async () => {
        while (next < total) {
            next += 1;
            try {
                await Promise.all([
                    prisma.service.findFirst({ where: { published: true }, select: { id: true } }),
                    prisma.project.findFirst({ where: { published: true }, select: { id: true } }),
                    prisma.serviceCategory.findFirst({ select: { id: true } }),
                ]);
            } catch (error) {
                failures.push(error);
            }
        }
    };

    await Promise.all(Array.from({ length: Math.min(total, concurrency) }, worker));
    if (failures.length > 0) throw new Error(`${failures.length}/${total} database operations failed: ${String(failures[0])}`);
    console.log(`Database concurrency check passed: ${total}/${total} request-equivalent operations at concurrency ${concurrency}.`);
}

main()
    .catch((error: unknown) => {
        console.error("Database concurrency check failed.", error);
        process.exitCode = 1;
    })
    .finally(async () => prisma.$disconnect());
