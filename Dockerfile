# Multi-stage Docker build for full-stack app
FROM node:18-alpine as frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --only=production
COPY frontend/ ./
RUN npm run build

# Backend stage
FROM node:18-alpine as backend

WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ ./

# Final stage - serve both
FROM node:18-alpine

WORKDIR /app

# Copy backend
COPY --from=backend /app ./

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./public

# Install serve to handle frontend
RUN npm install -g serve

# Expose port
EXPOSE 3001

# Start script that runs both frontend and backend
COPY start.sh ./
RUN chmod +x start.sh

CMD ["./start.sh"]