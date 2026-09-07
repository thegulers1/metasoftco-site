import "dotenv/config";
import { prisma } from "../src/lib/db";

async function main() {
    // A release is invalid if the database cannot serve the public content
    // models. This runs before next build and intentionally propagates errors.
    await Promise.all([
        prisma.$queryRaw`SELECT 1`,
        prisma.serviceCategory.count(),
        prisma.service.count({ where: { published: true } }),
        prisma.project.count({ where: { published: true } }),
        prisma.blogPost.count({ where: { published: true } }),
    ]);
    console.log("Runtime database validation passed.");
}

main()
    .catch((error: unknown) => {
        console.error("Runtime database validation failed.", error);
        process.exitCode = 1;
    })
    .finally(async () => prisma.$disconnect());
