# 🔧 Manual DigitalOcean Deployment Fix

## Problem: "No component detected"
DigitalOcean couldn't auto-detect the Node.js applications. Here's how to fix it:

## Solution 1: Manual Service Configuration

### 1. Create App (Start Over)
1. Go to: https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Choose GitHub → ronyjoy/lonestartabletennis → main branch

### 2. **SKIP Auto-Detection**
When you see "No component detected", click **"Edit your App Spec"** instead of trying auto-detection.

### 3. **Manually Add Backend Service**
Click "Add Component" → "Web Service":
```
Service Name: backend
Source Directory: backend-starter
Build Command: npm install
Run Command: npm start
HTTP Port: 3001
Instance Size: Basic ($5/month)
```

**Environment Variables:**
```
NODE_ENV=production
JWT_SECRET=lonestartabletennis-super-secret-key-2024
PORT=3001
```

### 4. **Manually Add Frontend Service** 
Click "Add Component" → "Static Site":
```
Service Name: frontend
Source Directory: frontend-starter
Build Command: npm run build
Output Directory: dist
Instance Size: Basic ($5/month)
```

**Environment Variables:**
```
VITE_API_URL=${backend.PUBLIC_URL}/api
VITE_ENVIRONMENT=production
```

### 5. **Add Database**
Click "Add Database":
```
Engine: PostgreSQL
Version: 14
Plan: Basic ($7/month)
Name: ttacademy
```

### 6. **Deploy**
- Review configuration
- Click "Create Resources"
- Wait 5-10 minutes

## Solution 2: Use App Spec YAML

Alternatively, you can use the app.yaml file I created:

1. In DigitalOcean, choose "Import from App Spec" 
2. Copy the contents of `.do/app.yaml` from your repository
3. Paste it into the YAML editor
4. Click "Create Resources"

## Solution 3: Alternative - Deploy Each Service Separately

### Backend Only First:
1. Create new app with just backend-starter directory
2. DigitalOcean should detect it as Node.js
3. Add database
4. Deploy

### Then Frontend:
1. Create second app with just frontend-starter directory  
2. Set backend URL in environment variables
3. Deploy

## Troubleshooting

### If still having issues:
1. **Check package.json exists** in both directories
2. **Verify Node.js version** in package.json (we set >=18.0.0)
3. **Try smaller directory names** (sometimes helps)
4. **Contact DigitalOcean support** - they're very helpful

### Alternative Platforms:
If DigitalOcean continues to have issues:
- **Vercel** (frontend) + **Railway** (backend + database)
- **Render** (full-stack)
- **Heroku** (traditional option)

Let me know which approach works for you!