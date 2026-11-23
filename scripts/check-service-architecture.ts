import 'dotenv/config';
import assert from 'node:assert/strict';
import { prisma } from '../src/lib/db';
import { isEnglishCategoryPublishable, isEnglishServicePublishable } from '../src/lib/publication';
import { softwareCaseStudies } from '../src/lib/software-case-studies';
import { SOFTWARE_CATEGORY_SLUG } from '../src/lib/software';

const base = process.env.ROUTE_CHECK_BASE_URL || 'http://localhost:3000';
async function html(path: string) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    return response.text();
}
function structuredData(source: string): Record<string, unknown>[] {
    function flatten(value: unknown): Record<string, unknown>[] {
        if (Array.isArray(value)) return value.flatMap(flatten);
        if (!value || typeof value !== 'object') return [];
        const node = value as Record<string, unknown>;
        return [node, ...flatten(node['@graph'])];
    }
    return [...source.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
        .flatMap(match => flatten(JSON.parse(match[1])));
}
async function main() {
    const [hub, enHub, categories, products] = await Promise.all([
        html('/hizmetler'), html('/en/services'),
        prisma.serviceCategory.findMany({ include: { services: { where: { published: true, type: 'RENTAL' } } } }),
        prisma.service.findMany({ where: { published: true, type: 'SALE' } }),
    ]);
    let hubs = 0;
    let rentalSchemas = 0;
    for (const category of categories) {
        if (!category.services.length) continue;
        if (category.slug !== SOFTWARE_CATEGORY_SLUG) {
            const path = `/hizmetler/${category.slug}`;
            assert.ok(hub.includes(`href="${path}"`), `TR hub must link to ${path}`);
            await html(path);
            hubs++;
        }
        const english = isEnglishCategoryPublishable(category)
            && category.services.some(service => isEnglishServicePublishable(service, category));
        if (english && category.slug !== SOFTWARE_CATEGORY_SLUG) {
            const path = `/en/services/${category.slug_en}`;
            assert.ok(enHub.includes(`href="${path}"`), `EN hub must link to ${path}`);
            await html(path);
        }
        for (const service of category.services) {
            const path = `/hizmetler/${category.slug}/${service.slug}`;
            const nodes = structuredData(await html(path));
            const schemas = nodes.filter(node => node['@type'] === 'Service');
            assert.equal(schemas.length, 1, `${path}: one Service`);
            assert.equal(schemas[0].url, 'https://www.metasoftco.com' + path);
            assert.ok(schemas[0].name, `${path}: service name`);
            assert.ok(schemas[0].description, `${path}: service description`);
            assert.ok(schemas[0].provider, `${path}: provider`);
            assert.ok(!nodes.some(node => node['@type'] === 'Product'), `${path}: rental is a service`);
            rentalSchemas++;
        }
    }
    for (const product of products) {
        const path = `/urunler/${product.slug}`;
        const schemas = structuredData(await html(path)).filter(node => node['@type'] === 'Product');
        assert.equal(schemas.length, 1, `${path}: one Product`);
        assert.equal(schemas[0].url, 'https://www.metasoftco.com' + path);
        assert.ok(schemas[0].offers, `${path}: published sale offer`);
    }
    assert.ok(hub.includes('href="/sunum"'), 'Services hub links to PDF presentation');
    assert.match(await html('/sunum'), /PDF/);
    assert.match(await html('/hizmetler/magaza-ici-kalici-photobooth'), /Uzaktan yönetim ve içerik güncelleme/);
    assert.match(await html('/hizmetler/yapay-zeka-etkinlik-cozumleri/ai-greenbox-kiralama'), /<title>AI Greenbox Kiralama \| Yapay Zekâ Fotoğraf Aktivasyonu/);
    for (const [slug, frame] of Object.entries(softwareCaseStudies)) {
        const page = await html(`/projeler/${slug}`);
        assert.match(page, /İhtiyaçtan çalışan yazılıma/);
        for (const service of frame.services) assert.ok(page.includes(`href="/hizmetler/yazilim-gelistirme/${service}"`), `${slug}: related software service`);
    }
    const mirror = await html('/hizmetler/photobooth-ve-fotograf-aktivasyonlari/mirror-booth');
    assert.match(mirror, /Mirror Booth etkinliğiniz için doğru seçim mi/);
    assert.match(mirror, /href="\/hizmetler\/photobooth-kiralama-fiyatlari"/);
    assert.match(mirror, /Saatte 60–80 kişi/);
    console.log(`Architecture checks passed: ${hubs} category hub links, ${rentalSchemas} Service schemas, ${products.length} Product schema; PDF access, remote management and Greenbox title.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => prisma.$disconnect());
