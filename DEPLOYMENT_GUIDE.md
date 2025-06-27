# 🚀 DigitalOcean Deployment Guide for Lone Star Table Tennis Academy

## Prerequisites
- ✅ Code pushed to GitHub: https://github.com/ronyjoy/lonestartabletennis
- DigitalOcean Account (get $200 free credit for new users)

## Step 1: Create DigitalOcean App

1. **Go to**: https://cloud.digitalocean.com/apps
2. **Click**: "Create App"
3. **Choose Source**: GitHub
4. **Authorize**: DigitalOcean to access your GitHub
5. **Select Repository**: ronyjoy/lonestartabletennis
6. **Branch**: main
7. **Click**: Next

## Step 2: Configure Backend Service

**DigitalOcean will auto-detect your services. Configure the backend:**

- **Service Type**: Web Service
- **Service Name**: `backend`
- **Source Directory**: `/backend-starter`
- **Build Command**: `npm install`
- **Run Command**: `npm start`
- **HTTP Port**: `3001`
- **Instance Size**: Basic ($5/month)

**Environment Variables for Backend:**
```
NODE_ENV=production
JWT_SECRET=lonestartabletennis-super-secret-key-2024
PORT=3001
```

## Step 3: Configure Frontend Service

- **Service Type**: Static Site
- **Service Name**: `frontend`
- **Source Directory**: `/frontend-starter`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Instance Size**: Basic ($5/month)

**Environment Variables for Frontend:**
```
VITE_API_URL=${backend.PUBLIC_URL}/api
VITE_ENVIRONMENT=production
```

## Step 4: Add PostgreSQL Database

1. **Click**: "Add Database"
2. **Engine**: PostgreSQL
3. **Version**: 14
4. **Plan**: Basic ($7/month)
5. **Database Name**: `tt-academy-db`
6. **Database User**: Keep default

## Step 5: Review and Deploy

1. **Review** all configurations
2. **Total Cost**: ~$17/month
3. **Click**: "Create Resources"
4. **Wait**: 5-10 minutes for deployment

## Step 6: Database Setup (After Deployment)

### 6.1 Get Database Connection Details
1. Go to **Databases** in DigitalOcean dashboard
2. Click on your `tt-academy-db`
3. Copy connection details

### 6.2 Connect to Database
Use the connection string provided, it will look like:
```
postgresql://username:password@host:port/database?sslmode=require
```

### 6.3 Import Schema
Run this SQL to create all tables:

```sql
-- Copy the contents of tt-academy-schema.sql here
-- This will create all necessary tables
```

### 6.4 Add Admin and Coach Accounts
```sql
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('admin@lonestartabletennis.com', '$2a$10$VF2KjpbaGe5SoEYDNXN7UeXcxUKD.SDrIX/cm0A.Yp/4lFVasJFAK', 'Admin', 'User', 'admin'),
('bright@lonestartabletennis.com', '$2a$10$uyb7sg1nw.W7vjZ6MaWxJeqh0PWQwTCwSQLBD9JaOY/0NWIpPviUi', 'Bright', 'Coach', 'coach'),
('eday@lonestartabletennis.com', '$2a$10$uyb7sg1nw.W7vjZ6MaWxJeqh0PWQwTCwSQLBD9JaOY/0NWIpPviUi', 'Eday', 'Coach', 'coach'),
('maba@lonestartabletennis.com', '$2a$10$uyb7sg1nw.W7vjZ6MaWxJeqh0PWQwTCwSQLBD9JaOY/0NWIpPviUi', 'Maba', 'Coach', 'coach');
```

**Default password for all accounts**: `password123`

## Step 7: Test Your Deployment

After deployment, you'll get URLs like:
- **Frontend**: https://lonestartabletennis-frontend-xyz.ondigitalocean.app
- **Backend**: https://lonestartabletennis-backend-xyz.ondigitalocean.app

### Test Login:
1. **Admin**: admin@lonestartabletennis.com / password123
2. **Coach**: bright@lonestartabletennis.com / password123
3. **Register as Student**: Any email / password

## Monthly Cost Breakdown
- Frontend Service: $5/month
- Backend Service: $5/month
- PostgreSQL Database: $7/month
- **Total**: ~$17/month

## Automatic Deployments
Once set up, any push to your `main` branch will automatically deploy!

## Troubleshooting

### If deployment fails:
1. Check build logs in DigitalOcean console
2. Verify environment variables are set correctly
3. Ensure database is running

### If app doesn't load:
1. Check if services are running
2. Verify CORS settings in backend
3. Check browser console for errors

## Support
- DigitalOcean Documentation: https://docs.digitalocean.com/products/app-platform/
- Your app dashboard: https://cloud.digitalocean.com/apps