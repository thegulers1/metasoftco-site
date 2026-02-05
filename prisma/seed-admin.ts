import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import "dotenv/config";

const connectionString = process.env.DIRECT_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("👤 Creating admin user...");

    // Admin şifresini hashle
    const hashedPassword = await bcrypt.hash("Admin123!", 12);

    // Admin kullanıcısı oluştur veya güncelle
    const admin = await prisma.user.upsert({
        where: { email: "admin@metasoftco.com" },
        update: {},
        create: {
            email: "admin@metasoftco.com",
            password: hashedPassword,
            name: "Admin",
            role: "admin",
        },
    });

    console.log(`✅ Admin user created: ${admin.email}`);
    console.log("📧 Email: admin@metasoftco.com");
    console.log("🔑 Password: Admin123!");
    console.log("\n⚠️  Lütfen giriş yaptıktan sonra şifreyi değiştir!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
