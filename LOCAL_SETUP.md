# Table Tennis Academy - Local Development Setup

## Prerequisites

Before starting, make sure you have these installed:

1. **Node.js** (v18 or higher)
   ```bash
   # Check your version
   node --version
   npm --version
   ```

2. **PostgreSQL** (v13 or higher)
   ```bash
   # macOS with Homebrew
   brew install postgresql
   brew services start postgresql
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install postgresql postgresql-contrib
   sudo systemctl start postgresql
   
   # Windows - Download from postgresql.org
   ```

3. **Git**
   ```bash
   git --version
   ```

## Step 1: Create Project Structure

```bash
# Create main project directory
mkdir tt-academy
cd tt-academy

# Create backend and frontend directories
mkdir backend frontend

# Copy the starter files we created
```

## Step 2: Database Setup

### Create Database and User

```bash
# Connect to PostgreSQL as superuser
psql postgres

# In psql prompt:
CREATE DATABASE tt_academy;
CREATE USER tt_admin WITH ENCRYPTED PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE tt_academy TO tt_admin;
\q
```

### Run Database Schema

```bash
# Copy the schema file to your project
cp /Users/rojoy/tt-academy-schema.sql ./backend/

# Run the schema
psql -U tt_admin -d tt_academy -f backend/tt-academy-schema.sql
```

## Step 3: Backend Setup

### Create Backend Structure and Files

```bash
cd backend

# Initialize npm project
npm init -y

# Install dependencies
npm install express cors helmet dotenv bcryptjs jsonwebtoken joi pg pg-pool express-rate-limit morgan winston

# Install dev dependencies
npm install --save-dev nodemon jest supertest

# Create directory structure
mkdir -p src/{config,controllers,middleware,models,routes,services,utils}
mkdir -p tests/{unit,integration}
mkdir -p migrations seeds
```

### Create Environment File

```bash
# Create .env file
cat > .env << 'EOF'
NODE_ENV=development
PORT=3001

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tt_academy
DB_USER=tt_admin
DB_PASSWORD=your_password_here

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS
FRONTEND_URL=http://localhost:3000
EOF
```

### Copy Backend Starter Files

Copy these files from the starter code I created:

1. `src/app.js`
2. `src/config/database.js`
3. `src/middleware/auth.js`
4. `server.js`
5. Update `package.json` with the starter scripts

### Create Additional Required Files

```bash
# Create logger utility
cat > src/utils/logger.js << 'EOF'
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'tt-academy-api' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
EOF

# Create logs directory
mkdir logs

# Create error handler middleware
cat > src/middleware/errorHandler.js << 'EOF'
const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: err.message,
        details: err.details
      }
    });
  }

  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Invalid token'
      }
    });
  }

  res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: process.env.NODE_ENV === 'production' 
        ? 'Something went wrong!' 
        : err.message
    }
  });
};

module.exports = errorHandler;
EOF

# Create basic auth routes
cat > src/routes/auth.js << 'EOF'
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');
const logger = require('../utils/logger');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role = 'student' } = req.body;

    // Check if user exists
    const existingUser = await db.query('SELECT id FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        error: {
          code: 'USER_EXISTS',
          message: 'User already exists with this email'
        }
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const result = await db.query(
      'INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name, role',
      [email, hashedPassword, firstName, lastName, role]
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({
      error: {
        code: 'REGISTRATION_FAILED',
        message: 'Registration failed'
      }
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const result = await db.query(
      'SELECT id, email, password_hash, first_name, last_name, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    const user = result.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({
        error: {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password'
        }
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({
      error: {
        code: 'LOGIN_FAILED',
        message: 'Login failed'
      }
    });
  }
});

module.exports = router;
EOF

# Create placeholder route files
touch src/routes/users.js src/routes/skills.js src/routes/comments.js src/routes/leagues.js src/routes/matches.js
echo "const express = require('express'); const router = express.Router(); module.exports = router;" > src/routes/users.js
echo "const express = require('express'); const router = express.Router(); module.exports = router;" > src/routes/skills.js
echo "const express = require('express'); const router = express.Router(); module.exports = router;" > src/routes/comments.js
echo "const express = require('express'); const router = express.Router(); module.exports = router;" > src/routes/leagues.js
echo "const express = require('express'); const router = express.Router(); module.exports = router;" > src/routes/matches.js
```

### Test Backend

```bash
# Start the backend server
npm run dev

# Should see: "🏓 Table Tennis Academy API running on port 3001"

# Test in another terminal
curl http://localhost:3001/health
```

## Step 4: Frontend Setup

```bash
cd ../frontend

# Create React app with Vite
npm create vite@latest . -- --template react
npm install

# Install additional dependencies
npm install react-router-dom axios react-query @headlessui/react @heroicons/react clsx date-fns react-hook-form recharts

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Tailwind CSS

```bash
# Update tailwind.config.js
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
EOF

# Update src/index.css
cat > src/index.css << 'EOF'
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
EOF
```

### Create Environment File

```bash
cat > .env << 'EOF'
VITE_API_URL=http://localhost:3001/api
VITE_ENVIRONMENT=development
EOF
```

### Copy Frontend Starter Files

You'll need to create the frontend structure based on the starter files I provided earlier. Here's a minimal setup to get started:

```bash
# Create directory structure
mkdir -p src/{components/{common,auth,dashboard},context,services,pages,utils,styles}

# Create basic API service
cat > src/services/api.js << 'EOF'
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
EOF

# Create basic auth service
cat > src/services/authService.js << 'EOF'
import api from './api';

export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: (userData) => {
    return api.post('/auth/register', userData);
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};
EOF

# Create basic login page
cat > src/pages/LoginPage.jsx << 'EOF'
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      }
    } else {
      // Handle registration
      try {
        const response = await fetch('http://localhost:3001/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, firstName, lastName })
        });
        
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            🏓 Table Tennis Academy
          </h2>
          <h3 className="mt-2 text-center text-xl text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h3>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <>
                <input
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </>
            )}
            <input
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign in' : 'Register')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-indigo-600 hover:text-indigo-500"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Need an account? Register' : 'Already have an account? Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
EOF
```

Now copy the AuthContext and other components from the starter files I created earlier.

### Test Frontend

```bash
# Start the frontend development server
npm run dev

# Should open browser at http://localhost:5173
```

## Step 5: Quick Test

1. **Backend Test:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
   ```

2. **Frontend Test:**
   - Open http://localhost:5173
   - Try registering a new user
   - Try logging in

## Troubleshooting

### Common Issues:

1. **Database Connection Error:**
   ```bash
   # Check if PostgreSQL is running
   brew services list | grep postgresql  # macOS
   sudo systemctl status postgresql      # Linux
   
   # Check database exists
   psql -U tt_admin -d tt_academy -c "\dt"
   ```

2. **Port Already in Use:**
   ```bash
   # Find what's using the port
   lsof -i :3001  # Backend
   lsof -i :5173  # Frontend
   
   # Kill the process
   kill -9 <PID>
   ```

3. **CORS Issues:**
   - Make sure backend FRONTEND_URL matches frontend URL
   - Check browser console for specific CORS errors

4. **JWT Secret Error:**
   - Make sure JWT_SECRET is set in backend .env file
   - Restart backend after changing .env

## Quick Start (If Code Already Exists)

If you already have the code in place, here's how to start everything:

### 1. Start Database
```bash
# macOS with Homebrew
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
# Start PostgreSQL service from Services panel or:
net start postgresql-x64-13
```

### 2. Create Database and Tables (First time only)
```bash
# Connect and create database
psql postgres
CREATE DATABASE tt_academy;
CREATE USER tt_admin WITH ENCRYPTED PASSWORD 'your_password_here';
GRANT ALL PRIVILEGES ON DATABASE tt_academy TO tt_admin;
\q

# Run the schema file
psql -U tt_admin -d tt_academy -f tt-academy-schema.sql
```

### 3. Start Backend
```bash
cd backend-starter
npm install  # if not done yet
npm run dev
```

### 4. Start Frontend
```bash
cd frontend-starter
npm install  # if not done yet
npm run dev
```

**Application URLs:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## Next Steps

Once you have the basic setup running:

1. Copy all the starter component files I created
2. Implement additional API endpoints from the specification
3. Add more frontend components for skills, leagues, matches
4. Test the complete flow

The application should now be running locally with a working authentication system!