import 'dotenv/config';
import assert from 'node:assert/strict';
import { writeFileSync, mkdirSync } from 'node:fs';
import { prisma } from '../src/lib/db';
import { containsServiceSchema } from '../src/lib/service-schema';
const base = process.env.ROUTE_CHECK_BASE_URL || 'http://localhost:3000';
function schemas(html: string): Record<string, unknown>[] {
    const flatten = (value: unknown): Record<string, unknown>[] => Array.isArray(value) ? value.flatMap(flatten) : value && typeof value === 'object' ? [value as Record<string, unknown>, ...flatten((value as Record<string, unknown>)['@graph'])] : [];
    return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(match => flatten(JSON.parse(match[1])));
}
async function get(path: string) { const res = await fetch(base + path); assert.equal(res.status, 200, path); return res.text(); }
async function main() {
    assert.equal(containsServiceSchema('{"@graph":[{"@type":["Service","Thing"]}]}'), true);
    assert.equal(containsServiceSchema('[{"@type":"FAQPage"},{"@type":"Service"}]'), true);
    assert.equal(containsServiceSchema('{"@type":"FAQPage"}'), false);
    assert.equal(containsServiceSchema('{broken'), false);
    const hub = await get('/hizmetler');
    for (const slug of ['kurumsal-etkinlik-teknolojisi', 'fuar-aktivasyonlari']) { assert.ok(hub.includes(`href="/hizmetler/${slug}"`)); assert.ok((await get('/sitemap.xml')).includes(`/hizmetler/${slug}`)); }
    const products = await get('/urunler'); assert.match(products, /href="\/sunum"/);
    const pricePath = '/hizmetler/photobooth-kiralama-fiyatlari';
    const price = await get(pricePath); assert.match(price, /Etkinliğime|ETKİNLİĞİME/);
    assert.doesNotMatch(price.replace(/<script[\s\S]*?<\/script>/g, ''), /\d[\d.,]*\s*(?:₺|TL|USD|EUR|\$|€)/);
    assert.match(await get('/sitemap.xml'), /https:\/\/www.metasoftco.com\/hizmetler\/photobooth-kiralama-fiyatlari/);
    const routes = [pricePath, '/hizmetler/fuar-aktivasyonlari', '/hizmetler/kurumsal-etkinlik-teknolojisi', '/hizmetler/magaza-ici-kalici-photobooth', '/hizmetler/ankara-photobooth-kiralama', '/en/services/ankara-photo-booth-rental', '/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama'];
    for (const path of routes) {
        const html = await get(path); const services = schemas(html).filter(item => item['@type'] === 'Service'); assert.equal(services.length, 1, `${path}: exactly one Service`);
        assert.equal(services[0].url, 'https://www.metasoftco.com' + path);
        if (path.includes('kalici')) assert.match(html, /Uzaktan yönetim ve içerik güncelleme/);
        if (path.includes('greenbox')) assert.match(html, /<title>AI Greenbox Kiralama \| Yapay Zekâ Fotoğraf Aktivasyonu/);
    }
    assert.match(await get('/hizmetler/photobooth-ve-fotograf-aktivasyonlari/photobooth-kirala'), /href="\/hizmetler\/photobooth-kiralama-fiyatlari"/);
    const service = await prisma.service.findFirstOrThrow({ where: { published: true, type: 'RENTAL', slug: 'ai-photobooth-kirala' } });
    assert.match(await get('/sunum'), /api\/sunum\/pdf|PDF/);
    const invalid = await fetch(base + '/api/sunum/pdf?s=nonexistent-test-id'); assert.equal(invalid.status, 400);
    const pdf = await fetch(base + '/api/sunum/pdf?s=' + service.id); assert.equal(pdf.status, 200); assert.match(pdf.headers.get('content-type') || '', /application\/pdf/);
    const bytes = Buffer.from(await pdf.arrayBuffer()); assert.equal(bytes.subarray(0, 5).toString(), '%PDF-'); assert.ok(bytes.length > 1000);
    mkdirSync('output/seo-release-local', { recursive: true }); writeFileSync('output/seo-release-local/selected-services.pdf', bytes);
    console.log(`Local SEO checks passed: ${routes.length} service schemas; pricing links; existing selective PDF (${bytes.length} bytes); invalid selection rejected.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
