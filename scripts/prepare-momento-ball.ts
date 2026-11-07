import { writeFileSync, mkdirSync } from 'node:fs';
import { momentoBallUpdate } from '../src/content/momento-ball/update';

// Always offline and read-only by default. Applying requires a reviewed baseline
// from a fresh DB read, so concurrent editor changes cannot be overwritten.
async function main() {
  mkdirSync('output/momento-ball', { recursive: true });
  writeFileSync('output/momento-ball/proposed-update.json', JSON.stringify(momentoBallUpdate, null, 2));
  if (!process.argv.includes('--apply')) {
    console.log('Prepared proposed-update.json. No database writes.');
    return;
  }
  const baseline = process.env.MOMENTO_REVIEWED_UPDATED_AT;
  if (!baseline || Number.isNaN(Date.parse(baseline))) throw new Error('Provide MOMENTO_REVIEWED_UPDATED_AT from a fresh reviewed DB record.');
  const { prisma } = await import('../src/lib/db');
  try {
    await prisma.$transaction(async tx => {
      const row = await tx.service.findFirst({
        where: { slug: 'momento-ball', type: 'RENTAL', category: { slug: 'photobooth-ve-fotograf-aktivasyonlari' } },
      });
      if (!row || row.id !== 'cmkjohog500082orrvw62idw2') throw new Error('Expected existing Momento Ball service was not found.');
      writeFileSync(`output/momento-ball/backup-${Date.now()}.json`, JSON.stringify(row, null, 2));
      const result = await tx.service.updateMany({
        where: { id: row.id, updatedAt: new Date(baseline) }, data: momentoBallUpdate,
      });
      if (result.count !== 1) throw new Error('Record changed since review. Read and review it again before applying.');
    });
    console.log('Updated only the existing Momento Ball service. No deploy performed.');
  } finally { await prisma.$disconnect(); }
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
