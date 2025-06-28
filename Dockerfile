# Multi-stage Docker build for full-stack app
FROM node:18.20.4-alpine as frontend-build

# Install yarn
RUN npm install -g yarn

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN yarn install --frozen-lockfile || yarn install
RUN yarn list vite || echo "Vite not found, trying alternative..."
COPY frontend/ ./
RUN yarn build

# Backend stage
FROM node:18.20.4-alpine as backend

WORKDIR /app
COPY backend/package*.json ./
RUN npm cache clean --force
RUN npm install --legacy-peer-deps --no-audit --no-fund --production
COPY backend/ ./

# Final stage - serve both
FROM node:18.20.4-alpine

WORKDIR /app

# Copy backend
COPY --from=backend /app ./

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./public

# Expose port
EXPOSE 3001

# Start both services
CMD ["sh", "-c", "node server.js & npx serve -s public -l 8080 & wait"]