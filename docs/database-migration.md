# PostgreSQL migration — 2026-10-09

The application database was copied from Supabase PostgreSQL 17.6 to Coolify
PostgreSQL 18.6, database `metasoftco-site`. The source was read only; the destination
was empty before import. Restore used a single transaction and reassigned object
ownership to the destination user instead of importing Supabase roles and grants.

All application data in the `public` schema was transferred:

| Table | Rows |
| --- | ---: |
| AnalyticsEvent | 0 |
| BlogPost | 18 |
| ContactSubmission | 0 |
| IndustryPage | 8 |
| Media | 184 |
| PageView | 0 |
| Project | 23 |
| SectorPage | 6 |
| Service | 115 |
| ServiceCategory | 10 |
| SiteSetting | 0 |
| User | 2 |
| **Total** | **366** |

The 184 media database records, their URLs, and all media references in content
were preserved. Media files remain in Cloudinary. Supabase Auth users, Storage
buckets and objects, Realtime application data, and Vault secrets were empty.
Supabase service schemas contain platform migration metadata; these service
schemas were preserved in the full source backup and were not installed into
the standalone PostgreSQL application database.

## Backups and verification

Private, Git-ignored backups live in
`.db-backups/2026-10-09T10-15-16-575Z/`:

- `supabase-full.dump`: full source database archive, including platform schemas.
- `application.dump`: application schema and data from an exported repeatable-read
  snapshot.
- `source-verification.json` and `restore-verification.json`: per-table row counts,
  SHA-256 fingerprints of every complete row, and schema catalogs.
- `source-final-check.json`: checks whether the source changed after the snapshot.

All 12 table fingerprints matched. Visible column order, types, defaults,
nullability, primary and foreign keys, indexes, relations, views, and policies
matched. Schema comparison ignores physical ordinal gaps left by previously
dropped columns and PostgreSQL 18's additional explicit NOT NULL catalog entries.
NOT NULL behavior is compared through column nullability on both databases.

The Prisma schema now includes the existing `IndustryPage` table and previously
unmodeled fields: `BlogPost.faq`, `BlogPost.faq_en`, `Project.serviceIds`,
`Service.dataCapture`, `Service.presentationPoints`, and `Service.outputType`.
This preserves them during future Prisma schema operations. The database-to-Prisma
schema comparison reports no differences.

Validation includes TypeScript, Prisma schema comparison, runtime database
queries, all 12 Prisma models, and the concurrency check (30 operations with 15
workers). CRUD verification runs inside an intentionally rolled-back transaction.

## Connections

Only `DATABASE_URL` is used by the application, Prisma configuration, seeds,
imports, and Dockerfile. Local development uses `127.0.0.1:15432` while
`metasoftco-db-ssh` runs in another terminal. Coolify deployment uses the database's
internal URL on the same Docker network.

The Docker image build generates Prisma, checks TypeScript, and compiles Next.js
without connecting to the private database. The regular `pnpm build` still runs
`pnpm validate:runtime` against the configured database. Run that validation in a
connected environment before deploying the image. `.dockerignore` excludes
`.db-backups` as well as `.env` files, so backups and source credentials are not
sent in the build context.

This migration is a snapshot, not ongoing replication. If the old production app
writes to Supabase before its deployment switches to the new database, reconcile
those later changes before the production switch. Do not run the seed scripts to
initialize the restored database; some seeds delete existing content.
