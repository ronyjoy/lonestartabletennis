# Multi-stage Docker build for full-stack app
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install --production=false
COPY frontend/ ./
RUN npm run build

# Backend stage
FROM node:18-alpine as backend

WORKDIR /app
COPY backend/package*.json ./
RUN npm install --production
COPY backend/ ./

# Final stage - serve both
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=backend /app ./

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./public

# Expose port
EXPOSE 3001

# Start both services
CMD ["sh", "-c", "node server.js & npx serve -s public -l 8080 & wait"]