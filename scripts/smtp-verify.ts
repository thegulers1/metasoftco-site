import "dotenv/config";
import { getRecipient, getSender, getTransporter } from "../src/lib/mailer";

async function main() {
    console.log("host:", process.env.SMTP_HOST, "port:", process.env.SMTP_PORT, "secure:", Number(process.env.SMTP_PORT) === 465);
    console.log("from:", getSender(), "-> to:", getRecipient());
    await getTransporter().verify();
    console.log("SMTP bağlantısı ve kimlik doğrulama BAŞARILI.");
}

main().catch((error: unknown) => {
    console.error("SMTP verify FAILED:", error);
    process.exitCode = 1;
});
