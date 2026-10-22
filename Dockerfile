FROM node:22-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build the application
FROM base AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build sırasında ESLint ve telemetry'yi devre dışı bırak
ENV NEXT_DISABLE_ESLINT=1
ENV NEXT_TELEMETRY_DISABLED=1
# Prisma'nın DB'ye bağlanmadan client generate etmesi için dummy URL
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"

RUN pnpm prisma generate
# The private database is available to the running application, not the image
# builder. Keep the regular pnpm build database check for connected local builds.
RUN pnpm typecheck && pnpm exec next build

# Production runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN apk add --no-cache curl

# Headless Chrome for the PDF routes (/api/sunum/pdf, teklif PDF'leri).
# See src/lib/pdf-browser.ts; without it those routes answer 500.
RUN apk add --no-cache chromium nss freetype harfbuzz ca-certificates ttf-freefont font-noto
ENV CHROME_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Standalone output files
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
