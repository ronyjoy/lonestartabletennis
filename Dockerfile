# Multi-stage build - separate frontend build from runtime
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install
RUN echo "=== Debug vite installation ===" && \
    ls -la node_modules/.bin/ && \
    npm list vite && \
    which vite || echo "vite not in PATH"
COPY frontend/ ./
RUN cat package.json | grep -A 5 '"scripts"'
RUN npm run build

# Backend runtime image
FROM node:18-alpine

WORKDIR /app

# Copy backend files and install dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm ci --only=production

COPY backend/ ./

# Copy frontend build from previous stage
COPY --from=frontend-build /app/frontend/dist ./public

# Environment variables
ENV PORT=3001
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]