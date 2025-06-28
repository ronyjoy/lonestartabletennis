# Simple single-stage build with npm only
FROM node:18-bullseye-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y curl ca-certificates && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set npm config for SSL issues
RUN npm config set strict-ssl false && \
    npm config set registry http://registry.npmjs.org/

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
RUN npm ci --no-audit --no-fund
RUN echo "Verifying vite installation..."
RUN npm list vite
RUN echo "Checking package.json..."
RUN cat package.json | grep vite
RUN echo "Copying frontend source files..."
COPY frontend/ ./
RUN echo "Running build..."
RUN npm run build

# Copy backend files
WORKDIR /app/backend
COPY backend/ ./

# Move frontend build to backend public folder
RUN cp -r ../frontend/dist ./public

# Environment variables
ENV PORT=3001
ENV NODE_ENV=production

# Expose port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]