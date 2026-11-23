import assert from 'node:assert/strict';
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
        console.log('Traffic freshness checks passed: no missing/invalid configuration returns historical snapshot data.');
    } finally { names.forEach((name,i)=>{ if(saved[i]===undefined)delete process.env[name];else process.env[name]=saved[i]; }); }
}
main().catch(error=>{console.error(error);process.exitCode=1});
