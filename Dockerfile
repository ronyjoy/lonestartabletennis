# Multi-stage build - separate frontend build from runtime  
FROM node:18-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package.json ./
RUN rm -f package-lock.json
RUN npm install --verbose
RUN echo "=== Checking vite installation ==="
RUN npm list vite
RUN ls -la node_modules/.bin/vite
RUN ./node_modules/.bin/vite --version
COPY frontend/ ./
RUN ./node_modules/.bin/vite build

# Backend runtime image
FROM node:18-alpine

WORKDIR /app

# Copy backend files and install dependencies
COPY backend/package.json ./
RUN rm -f package-lock.json
RUN npm install --verbose
RUN echo "=== Checking dotenv installation ==="
RUN npm list dotenv
RUN ls -la node_modules/dotenv/

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