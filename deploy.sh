#!/bin/bash

# Exit on error
set -e

echo "Starting deployment process..."

# Build the frontend
echo "Building frontend..."
npm run build --production=false

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Install PM2 if not already installed
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    npm install -g pm2
fi

# Start/Restart the application
echo "Starting application with PM2..."
pm2 startOrRestart ecosystem.config.js --env production

echo "Deployment completed successfully!"
