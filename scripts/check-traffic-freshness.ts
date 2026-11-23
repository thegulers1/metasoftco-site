import assert from 'node:assert/strict';
import { generateKeyPairSync } from 'node:crypto';
import { buildTrafficReport } from '../src/lib/traffic-report';
async function main() {
    const names = ['GOOGLE_SERVICE_ACCOUNT_JSON', 'GA4_PROPERTY_ID', 'GSC_SITE_URL'] as const;
    const saved = names.map(name => process.env[name]);
    try {
        delete process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
        process.env.GA4_PROPERTY_ID = '413240077';
        for (const days of [7, 14, 30]) {
            const report = await buildTrafficReport(days);
            assert.equal(report.source, 'unavailable');
            assert.equal(report.days, days);
            assert.deepEqual(report.daily, []);
            assert.equal(report.totals.sessions, 0);
            assert.ok(report.warnings.length);
        }
        process.env.GOOGLE_SERVICE_ACCOUNT_JSON = 'invalid-json';
        assert.equal((await buildTrafficReport(14)).source, 'unavailable');
        process.env.GOOGLE_SERVICE_ACCOUNT_JSON = JSON.stringify({client_email:'test@example.invalid',private_key:'test'});
        delete process.env.GA4_PROPERTY_ID;
        delete process.env.GSC_SITE_URL;
        assert.equal((await buildTrafficReport(14)).source, 'unavailable');
        const { privateKey } = generateKeyPairSync('rsa', { modulusLength: 2048 });
        process.env.GOOGLE_SERVICE_ACCOUNT_JSON = JSON.stringify({ client_email: 'test@example.invalid', private_key: privateKey.export({ type: 'pkcs8', format: 'pem' }) });
        process.env.GA4_PROPERTY_ID = 'test-property';
        const originalFetch = globalThis.fetch;
        const requests: Record<string, unknown>[] = [];
        globalThis.fetch = async (input, init) => {
            if (String(input).includes('oauth2.googleapis.com')) return Response.json({ access_token: 'test-only-token', expires_in: 3600 });
            const body = JSON.parse(String(init?.body));
            requests.push(body);
            const dimensions = body.dimensions.map((d: { name: string }) => d.name);
            const row = (values: number[]) => ({ metricValues: values.map(value => ({ value: String(value) })) });
            if (dimensions.length === 0) return Response.json({ rows: [row(body.metrics.length === 5 ? [10, 7, 20, 2, 0.6] : [5, 4, 1])] });
            if (dimensions[0] === 'date') return Response.json({ rows: [
                { dimensionValues: [{ value: '20261122' }], ...row([4, 5, 9, 1]) },
                { dimensionValues: [{ value: '20261123' }], ...row([6, 5, 11, 1]) },
            ] });
            return Response.json({ rows: [] });
        };
        try {
            const live = await buildTrafficReport(7);
            assert.equal(live.source, 'live');
            assert.equal(live.totals.users, 7, 'unique period users, not sum of daily users');
            assert.equal(live.totals.sessions, 10, 'full total, not capped channel rows');
            assert.ok(requests.some(request => JSON.stringify(request.dateRanges) === JSON.stringify([{ startDate: '6daysAgo', endDate: 'today' }])));
            assert.ok(requests.some(request => JSON.stringify(request.dateRanges) === JSON.stringify([{ startDate: '13daysAgo', endDate: '7daysAgo' }])));
        } finally { globalThis.fetch = originalFetch; }
        console.log('Traffic freshness checks passed: missing config; live totals; equal comparison periods.');
    } finally { names.forEach((name,i)=>{ if(saved[i]===undefined)delete process.env[name];else process.env[name]=saved[i]; }); }
}
main().catch(error=>{console.error(error);process.exitCode=1});
