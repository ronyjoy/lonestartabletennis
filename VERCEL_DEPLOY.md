# 🚀 Vercel + Supabase Deployment Guide

## ✅ **Benefits:**
- **Frontend**: Free (Vercel)
- **Backend**: Free (Vercel Functions)  
- **Database**: Free tier (Supabase)
- **Total Cost**: $0/month for development, ~$10/month for production

---

## 🎯 **Step 1: Deploy Frontend to Vercel**

1. **Go to**: https://vercel.com
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Import Git Repository**: ronyjoy/lonestartabletennis
5. **Configure Project**:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build  
   Output Directory: dist
   Install Command: npm install
   ```
6. **Environment Variables** (add these):
   ```
   VITE_API_URL = https://your-backend-url.vercel.app/api
   VITE_ENVIRONMENT = production
   ```
7. **Click "Deploy"** - Takes 2-3 minutes

---

## 🗄️ **Step 2: Create Supabase Database**

1. **Go to**: https://supabase.com
2. **Sign up** with GitHub
3. **Create New Project**:
   ```
   Organization: Your GitHub username
   Name: lonestartabletennis
   Database Password: [Create strong password - SAVE THIS!]
   Region: [Choose closest to you]
   ```
4. **Wait 2-3 minutes** for creation

### **Import Schema:**
1. **Go to**: SQL Editor in Supabase dashboard
2. **Click "New Query"**
3. **Copy contents of `tt-academy-schema.sql`** and paste
4. **Run Query** (green play button)
5. **Copy contents of `database-setup.sql`** and paste  
6. **Run Query** to add admin/coach accounts

### **Get Database URL:**
1. **Go to**: Settings → Database
2. **Copy "Connection String"** (URI format)
3. **Replace [password] with your actual password**

---

## ⚡ **Step 3: Deploy Backend to Vercel**

1. **In Vercel Dashboard**: Create New Project
2. **Import**: Same repository (ronyjoy/lonestartabletennis)  
3. **Configure**:
   ```
   Framework: Other
   Root Directory: backend
   Build Command: npm install
   Output Directory: (leave empty)
   ```
4. **Environment Variables**:
   ```
   NODE_ENV = production
   DATABASE_URL = [Your Supabase connection string]
   JWT_SECRET = lonestartabletennis-super-secret-key-2024
   FRONTEND_URL = https://your-frontend-url.vercel.app
   ```
5. **Deploy**

---

## 🔧 **Step 4: Update Frontend Environment**

1. **Go to Frontend project** in Vercel
2. **Settings** → **Environment Variables**  
3. **Update**:
   ```
   VITE_API_URL = https://your-backend-url.vercel.app/api
   ```
4. **Redeploy** frontend

---

## ✅ **Step 5: Test Your App**

Your app will be live at:
- **Frontend**: https://lonestartabletennis-frontend.vercel.app
- **Backend**: https://lonestartabletennis-backend.vercel.app

**Test Login:**
- **Admin**: admin@lonestartabletennis.com / password123
- **Coach**: bright@lonestartabletennis.com / password123
- **Register**: Any email as student

---

## 🎯 **Advantages of This Setup:**

✅ **Free for development**  
✅ **Automatic deployments** on git push  
✅ **Global CDN** for fast loading  
✅ **Serverless scaling**  
✅ **Built-in SSL certificates**  
✅ **Zero server maintenance**

---

## 💰 **Cost Breakdown:**

**Free Tier Limits:**
- Vercel: 100GB bandwidth, 1000 serverless function invocations
- Supabase: 500MB database, 50K requests

**Paid (if needed):**
- Vercel Pro: $20/month (higher limits)
- Supabase Pro: $25/month (8GB database)

For a small academy, **free tier should be plenty!**

---

## 🚀 **Ready to Start?**

1. **Deploy frontend first** (easier)
2. **Create Supabase database**  
3. **Deploy backend**
4. **Connect everything**

**Let me know when you're ready to start with Step 1!** 🎯