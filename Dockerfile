# Simple single-stage build with npm only
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

# Copy package files
COPY frontend/package.json ./frontend/
COPY frontend/package-lock.json ./frontend/
COPY backend/package.json ./backend/
COPY backend/package-lock.json ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN npm install --production --no-audit --no-fund

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN echo "Installing frontend dependencies..."
# Remove any existing lock file and install fresh
RUN rm -f package-lock.json
RUN npm install --no-audit --no-fund
RUN echo "Verifying vite installation..."
RUN npm list vite
RUN echo "Copying frontend source files..."
COPY frontend/ ./
RUN echo "Running build..."
RUN npm run build

# Copy backend files (excluding node_modules to preserve installed dependencies)
WORKDIR /app/backend
COPY backend/src ./src/
COPY backend/server.js ./
COPY backend/.env* ./ 2>/dev/null || true

# Move frontend build to backend public folder
RUN cp -r ../frontend/dist ./public

# Environment variables
ENV PORT=3001
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]