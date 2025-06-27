#!/bin/bash

echo "🏓 Applying database setup to local PostgreSQL..."

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL client (psql) not found. Please install PostgreSQL first."
    echo "Install with: brew install postgresql"
    exit 1
fi

# Prompt for database details
read -p "Database name (default: ttacademy): " DB_NAME
DB_NAME=${DB_NAME:-ttacademy}

read -p "PostgreSQL username (default: postgres): " DB_USER
DB_USER=${DB_USER:-postgres}

read -p "PostgreSQL host (default: localhost): " DB_HOST
DB_HOST=${DB_HOST:-localhost}

read -p "PostgreSQL port (default: 5432): " DB_PORT
DB_PORT=${DB_PORT:-5432}

echo ""
echo "Applying to: $DB_USER@$DB_HOST:$DB_PORT/$DB_NAME"
echo ""

# First apply the schema
echo "📝 Creating database schema..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f tt-academy-schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Schema applied successfully"
else
    echo "⚠️  Schema might already exist (this is OK if updating)"
fi

# Then apply the data setup
echo "👥 Adding admin/coach accounts and skill categories..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f database-setup.sql

if [ $? -eq 0 ]; then
    echo "✅ Database setup complete!"
    echo ""
    echo "🔑 Login credentials:"
    echo "Admin: admin@lonestartabletennis.com / lonestaradmin@austin"
    echo "Coaches: bright@lonestartabletennis.com / lonestarcoach@austin"
    echo ""
    echo "🚀 You can now test locally with:"
    echo "Backend: cd backend && npm start"
    echo "Frontend: cd frontend && npm run dev"
else
    echo "❌ Setup failed. Check the error messages above."
fi