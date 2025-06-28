# Multi-stage build for smaller image
FROM node:18-bullseye-slim as builder

WORKDIR /app

# Install build dependencies and clean up in same layer
RUN apt-get update && \
    apt-get install -y git python3 make g++ && \
    npm install -g yarn && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy package files
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/

# Install dependencies
WORKDIR /app/backend
RUN yarn install --production --frozen-lockfile --non-interactive

WORKDIR /app/frontend
RUN yarn install --frozen-lockfile --non-interactive

# Build frontend
COPY frontend/ ./
RUN yarn build

# Production stage
FROM node:18-bullseye-slim

WORKDIR /app

# Install curl for health checks and clean up
RUN apt-get update && \
    apt-get install -y curl && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy only production files
COPY --from=builder /app/backend/node_modules ./node_modules
COPY --from=builder /app/frontend/dist ./public
COPY backend/ ./

# Ensure proper port binding
ENV PORT=3001
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start backend with proper port binding
CMD ["node", "server.js"]