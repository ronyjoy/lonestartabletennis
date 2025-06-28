# Simple single-stage build
FROM node:18-bullseye-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y curl ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set npm config for registry access
RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set strict-ssl false && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Copy frontend files and build
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm install --no-audit --no-fund
RUN echo "=== Debugging npm run build ==="
RUN echo "Current directory:" && pwd
RUN echo "Files in current directory:" && ls -la
RUN echo "Node modules vite:" && ls -la node_modules/.bin/vite || echo "vite binary not found"
RUN echo "Package.json scripts:" && cat package.json | grep -A 10 '"scripts"'
RUN echo "Running build..." 
RUN npm run build

# Copy backend files and install dependencies
WORKDIR /app
COPY backend/ ./backend/
WORKDIR /app/backend
RUN npm install --production --no-audit --no-fund

# Move frontend build to backend public folder
RUN cp -r ../frontend/dist ./public

# Environment variables
ENV PORT=3001
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]