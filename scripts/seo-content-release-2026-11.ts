/** Preview: pnpm exec tsx scripts/seo-content-release-2026-11.ts
 * Publish ONLY at coordinated release: append --apply.
 * Restore exact field backups with --rollback /absolute/path/to/backup.json.
 * No external writes without an explicit flag. Updates are atomic and refuse stale fields.
 */
import "dotenv/config";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { prisma } from "../src/lib/db";

type Patch = {
    table: "blogPost" | "serviceCategory" | "service" | "sectorPage";
    id: string;
    slug: string;
    before: Record<string, string | null>;
    after: Record<string, string | null>;
};
async function main() {
    const rollback = process.argv.indexOf("--rollback");
    if (rollback >= 0 && !process.argv[rollback + 1]) throw new Error("Backup path required");
    const file = rollback >= 0 ? process.argv[rollback + 1] : "scripts/content/seo-2026-11/patches.json";
    const original = JSON.parse(readFileSync(resolve(file), "utf8")) as Patch[];
    const patches = rollback >= 0 ? original.map(p => ({ ...p, before: p.after, after: p.before })) : original;
    const apply = process.argv.includes("--apply") || rollback >= 0;
    await prisma.$transaction(async tx => {
        const pending: Patch[] = [];
        for (const patch of patches) {
            // Restrict the checked-in release format to editorial fields on known models.
            if (!["blogPost", "serviceCategory", "service", "sectorPage"].includes(patch.table)) throw new Error("Unknown table");
            const keys = Object.keys(patch.after);
            if (keys.some(k => !/^(title|excerpt|content|description|metaTitle|metaDescription|metaKeywords|faq|heroTitle|heroContent|services)(_en)?$/.test(k))) throw new Error("Non-editorial field");
            const model = tx[patch.table];
            // These models share findUnique/updateMany but their generated generic signatures differ.
            const row = await (model.findUnique as unknown as (args: { where: { id: string } }) => Promise<Record<string, unknown> | null>)({ where: { id: patch.id } });
            if (!row || row.slug !== patch.slug) throw new Error(`Record identity changed: ${patch.slug}`);
            if (keys.every(k => row[k] === patch.after[k])) {
                console.log(`Already current: ${patch.slug}`);
                continue;
            }
            const conflicts = keys.filter(k => row[k] !== patch.before[k]);
            if (conflicts.length) throw new Error(`Content changed since review: ${patch.slug}: ${conflicts.join(", ")}`);
            pending.push(patch);
            console.log(`${apply ? "Apply" : "Preview"}: ${patch.table}/${patch.slug} (${keys.length} fields)`);
        }
        if (!apply || !pending.length) return;
        mkdirSync("tmp/seo-release/backups", { recursive: true });
        const backup = `tmp/seo-release/backups/${Date.now()}.json`;
        writeFileSync(backup, JSON.stringify(pending, null, 2), { mode: 0o600 });
        for (const patch of pending) {
            const result = await (tx[patch.table].updateMany as unknown as (args: { where: Record<string, unknown>; data: Record<string, string | null> }) => Promise<{ count: number }>)({
                where: { id: patch.id, ...patch.before }, data: patch.after,
            });
            if (result.count !== 1) throw new Error(`Concurrent edit: ${patch.slug}`);
        }
        console.log(`Updated ${pending.length} records. Backup: ${backup}`);
    }, { maxWait: 10000, timeout: 30000 });
    console.log(apply ? "Transaction committed." : "Preview complete. No database changes.");
}
main().catch(e => { console.error(e); process.exitCode = 1; }).finally(() => prisma.$disconnect());
