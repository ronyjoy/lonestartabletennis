# Use Ubuntu base to avoid npm Alpine issues
FROM node:18-bullseye-slim

WORKDIR /app

# Install yarn and other essentials
RUN apt-get update && apt-get install -y git python3 make g++ && rm -rf /var/lib/apt/lists/*
RUN npm install -g yarn

# Copy package files
COPY frontend/package.json frontend/yarn.lock* ./frontend/
COPY backend/package.json backend/package-lock.json* ./backend/

# Install backend dependencies
WORKDIR /app/backend
RUN yarn install --production --frozen-lockfile --non-interactive

# Install frontend dependencies and build
WORKDIR /app/frontend
RUN yarn install --frozen-lockfile --non-interactive
COPY frontend/ ./
RUN yarn build

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

# Start backend
CMD ["node", "server.js"]