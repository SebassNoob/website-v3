FROM oven/bun:latest AS builder
WORKDIR /home/app

COPY . .

RUN apt-get update && apt-get install -y git

RUN bun install --frozen-lockfile
RUN bun run build
RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

FROM oven/bun:alpine AS runner
WORKDIR /home/app

COPY --from=builder /home/app/.next/standalone/ .

ENV HOSTNAME=0.0.0.0
ENV PORT=8999
ENV NODE_ENV=production

CMD ["bun", "--bun", "run", "server.js"]