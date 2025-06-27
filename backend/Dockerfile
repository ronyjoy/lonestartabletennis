FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (include prod deps explicitly)
RUN npm install --legacy-peer-deps --production=false

# Copy source code
COPY . .

# Set production after install
ENV NODE_ENV=production

EXPOSE 3001

CMD ["npm", "start"]