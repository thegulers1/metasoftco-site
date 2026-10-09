# Database migration code review — 2026-10-09

Reviewed all migration changes: PostgreSQL runtime connection pooling, Prisma
configuration and schema, seeds/imports, local environment cleanup, backups,
Docker configuration, and setup/migration documentation.

## Findings and fixes

1. **P1 — Private backups were included in the Docker build context.**
   `.gitignore` does not control Docker's `COPY . .`. The new `.db-backups`
   directory contains database archives and the previous source connection.
   Added `.db-backups` to `.dockerignore` so this directory is excluded from
   image builds and uploaded build contexts.
2. **P1 — Docker image build attempted to connect to a nonexistent database.**
   The Dockerfile sets a dummy `DATABASE_URL`, but `pnpm build` runs the real
   `validate:runtime` database probe. Reproduced the probe failure with an
   unreachable connection. The Dockerfile now runs Prisma generation, TypeScript,
   and Next.js compilation directly. The regular connected `pnpm build` retains
   its runtime database validation. Before deployment, run `pnpm validate:runtime`
   where the real database is accessible.

No further actionable defect was found in the reviewed changes after these fixes.

## Validation

| Check | Result |
| --- | --- |
| Regular `pnpm build` against the new PostgreSQL database | Passed |
| Dockerfile compilation steps using an unreachable `DATABASE_URL` | Passed |
| Actual multi-stage Docker image build (`linux/arm64`, Node 22 Alpine) | Passed |
| Generated standalone server using the real local database connection | Passed |
| All sitemap routes, status 200 and canonical/hreflang hosts | 232 passed in standalone and Docker runtimes |
| Auth providers, CSRF, login, and blog/project/service/sector APIs | Passed in standalone and Docker runtimes |
| Final Docker image excludes database backups, env files, and baked DB URLs | Passed |
| Unauthenticated management panel | Redirected to login |
| Prisma database-to-model comparison | No differences |
| Complete current target records compared with source snapshot hashes | All 12 tables and 366 records matched |
| Both database backup archive checksums | Matched saved manifest |
| Database concurrency | 30/30 operations, 15 workers |
| TypeScript, lint on changed TypeScript files, whitespace checks | Passed |

Validation used the existing SSH tunnel without changing the source or target
records. The temporary standalone server and Docker container were stopped after
testing. The tested image is available locally as
`metasoftco-site:db-review-20261009`.
