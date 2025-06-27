# Table Tennis Academy - Deployment Guide

## Recommended Tech Stack & Deployment Options

### Option 1: Full Cloud (Recommended for Production)

**Backend:** Railway.app / Render.com / Heroku
- **Why:** Easy PostgreSQL integration, auto-scaling, CI/CD built-in
- **Cost:** $5-20/month for small-medium scale
- **Setup:** Connect GitHub repo, set environment variables

**Database:** Railway PostgreSQL / Supabase / AWS RDS
- **Why:** Managed PostgreSQL with backups and monitoring
- **Cost:** $5-15/month for production workloads

**Frontend:** Vercel / Netlify
- **Why:** Optimized for React, global CDN, automatic deployments
- **Cost:** Free tier available, $20/month for pro features

**File Storage:** AWS S3 / Cloudinary
- **Why:** Profile pictures, document uploads
- **Cost:** Pay-per-use, very affordable for small apps

### Option 2: Firebase Ecosystem (Fastest Setup)

**Backend:** Firebase Functions
**Database:** Firestore
**Frontend:** Firebase Hosting
**Auth:** Firebase Authentication
**Storage:** Firebase Storage

**Pros:**
- Single ecosystem, easy setup
- Real-time features built-in
- Generous free tier

**Cons:**
- Vendor lock-in
- Less SQL flexibility
- More expensive at scale

### Option 3: Traditional VPS (Cost-Effective)

**Server:** DigitalOcean Droplet / Linode / Vultr
**Setup:** Docker + Docker Compose
**Database:** PostgreSQL in container or managed service
**Reverse Proxy:** Nginx
**SSL:** Let's Encrypt (Certbot)

**Cost:** $5-10/month for everything

## Deployment Steps (Option 1 - Recommended)

### 1. Database Setup (Railway/Supabase)

```bash
# Railway CLI setup
npm install -g @railway/cli
railway login
railway init
railway add postgresql
```

### 2. Backend Deployment (Railway)

```yaml
# railway.toml
[build]
  builder = "nixpacks"
  
[deploy]
  healthcheckPath = "/health"
  healthcheckTimeout = 100
  restartPolicyType = "on_failure"
```

Environment Variables:
```env
NODE_ENV=production
DB_HOST=your-railway-db-host
DB_NAME=railway
DB_USER=postgres
DB_PASSWORD=your-db-password
DB_PORT=5432
JWT_SECRET=your-super-secret-jwt-key
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 3. Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# In your frontend directory
vercel --prod
```

Environment Variables (.env.production):
```env
REACT_APP_API_URL=https://your-backend.railway.app/api
REACT_APP_ENVIRONMENT=production
```

### 4. Mobile App Deployment

**For React Native:**

**iOS:**
- Build with Expo EAS or Xcode
- Deploy to TestFlight → App Store

**Android:**
- Build with Expo EAS or Android Studio  
- Deploy to Google Play Console

## Production Configuration Files

### Backend Dockerfile (if needed)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

USER node

CMD ["npm", "start"]
```

### Docker Compose (for VPS deployment)
```yaml
version: '3.8'

services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: tt_academy
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./tt-academy-schema.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    environment:
      NODE_ENV: production
      DB_HOST: db
      DB_NAME: tt_academy
      DB_USER: postgres
      DB_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    ports:
      - "3001:3000"
    depends_on:
      - db

  frontend:
    build: ./frontend
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

### Nginx Configuration (for VPS)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Railway

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install Railway CLI
      run: npm install -g @railway/cli
      
    - name: Deploy to Railway
      run: railway up --service backend
      env:
        RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

## Monitoring & Analytics

**Application Monitoring:**
- Sentry.io for error tracking
- LogRocket for user session recording
- Railway/Vercel built-in analytics

**Database Monitoring:**
- Railway built-in monitoring
- Supabase dashboard

**Uptime Monitoring:**
- UptimeRobot (free tier available)
- Railway health checks

## Security Considerations

1. **Environment Variables:** Never commit secrets to Git
2. **HTTPS:** Always use SSL certificates (free with Let's Encrypt)
3. **CORS:** Configure properly for your domain
4. **Rate Limiting:** Implement in production
5. **Input Validation:** Validate all user inputs
6. **SQL Injection:** Use parameterized queries
7. **JWT Security:** Use strong secrets, implement refresh tokens

## Backup Strategy

1. **Database:** Daily automated backups (Railway/Supabase provide this)
2. **File Storage:** Versioning enabled on S3/Cloudinary
3. **Code:** Git repository serves as backup
4. **Environment Variables:** Store securely in password manager

## Cost Estimation (Monthly)

**Small Scale (< 1000 users):**
- Database: $5-10
- Backend: $5-10  
- Frontend: Free-$20
- **Total: $10-40/month**

**Medium Scale (1000-10000 users):**
- Database: $15-30
- Backend: $20-50
- Frontend: $20-50
- **Total: $55-130/month**

This setup provides excellent scalability, performance, and developer experience while keeping costs reasonable for a table tennis academy application.