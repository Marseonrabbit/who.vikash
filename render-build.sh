#!/bin/bash

# Set production environment
export NODE_ENV=production

echo "==> Starting Render.com build process..."

# Install dependencies
echo "==> Installing dependencies..."
npm install

# Use the simplified vite config for Render deployment
echo "==> Building client with simplified Vite config..."
cp vite.config.render.ts vite.config.render.js
npx vite build --config vite.config.render.js

# Build server with esbuild
echo "==> Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Verify build result
echo "==> Verifying build output..."
if [ -d "dist" ] && [ -d "dist/public" ]; then
  echo "==> Build completed successfully!"
else
  echo "==> ERROR: Build failed to generate expected files."
  ls -la dist/
  exit 1
fi