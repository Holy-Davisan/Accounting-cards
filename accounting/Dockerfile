FROM node:18-bullseye

# Install system dependencies needed to build native modules like better-sqlite3
RUN apt-get update && apt-get install -y --no-install-recommends \
  build-essential python3 pkg-config libsqlite3-dev && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Install production dependencies first
COPY package.json package-lock.json* ./
RUN npm install --production || npm install --legacy-peer-deps --production

# Copy source
COPY . .

# Run migration to create DB (best-effort)
RUN npm run migrate:db || true

EXPOSE 3001
CMD ["npm", "run", "start:api"]
