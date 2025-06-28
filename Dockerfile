# Simple single-stage build
FROM node:18.20.4-alpine

WORKDIR /app

# Install serve globally first
RUN npm install -g serve

# Copy all package files
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Install backend dependencies (minimal)
WORKDIR /app/backend
RUN npm install --only=production --no-optional --no-audit

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN npm install --no-optional --no-audit
COPY frontend/ ./
RUN npm run build

# Copy backend source
WORKDIR /app/backend
COPY backend/ ./

# Move frontend build to public
WORKDIR /app
RUN cp -r frontend/dist backend/public

# Final working directory
WORKDIR /app/backend

# Expose port
EXPOSE 3001

# Start backend only (serve static files from backend)
CMD ["node", "server.js"]