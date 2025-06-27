# 🏓 Quick Start - DigitalOcean Deployment

## 1. Go to DigitalOcean
👉 **https://cloud.digitalocean.com/apps**

## 2. Click "Create App"

## 3. Connect GitHub
- Choose **GitHub**
- Select **ronyjoy/lonestartabletennis**
- Branch: **main**

## 4. Configure Services

### Backend Service:
```
Service Name: backend
Source Directory: /backend-starter
Build Command: npm install
Run Command: npm start
HTTP Port: 3001
Instance Size: Basic ($5/month)

Environment Variables:
NODE_ENV=production
JWT_SECRET=lonestartabletennis-super-secret-key-2024
```

### Frontend Service:
```
Service Name: frontend
Source Directory: /frontend-starter
Build Command: npm run build
Output Directory: dist
Instance Size: Basic ($5/month)

Environment Variables:
VITE_API_URL=${backend.PUBLIC_URL}/api
VITE_ENVIRONMENT=production
```

## 5. Add Database
```
Type: PostgreSQL
Version: 14
Plan: Basic ($7/month)
Name: tt-academy-db
```

## 6. Deploy
- Review settings
- Click "Create Resources"
- Wait 5-10 minutes

## 7. Setup Database
After deployment:
1. Go to Databases → tt-academy-db
2. Run `tt-academy-schema.sql`
3. Run `database-setup.sql`

## 8. Test
Login with:
- **Admin**: admin@lonestartabletennis.com / password123
- **Coach**: bright@lonestartabletennis.com / password123

## Monthly Cost: ~$17

You're all set! 🚀