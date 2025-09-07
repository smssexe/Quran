# --- Base deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN   if [ -f package-lock.json ]; then npm ci --legacy-peer-deps;   elif [ -f yarn.lock ]; then yarn install --frozen-lockfile;   elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm i --frozen-lockfile;   else npm i;   fi

# --- Build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Next.js needs a non-root user for best practice
RUN addgroup -g 1001 -S nextjs && adduser -S nextjs -u 1001
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
EXPOSE 3000
USER nextjs
CMD ["npm","start"]
