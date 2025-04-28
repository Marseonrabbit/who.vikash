#!/bin/bash

# This script is used to build the application for production deployment to Render

# Set production environment
export NODE_ENV=production

# Install dependencies
echo "Installing dependencies..."
npm install
npm install --save-dev @vitejs/plugin-react

# Build client
echo "Building client..."
npx vite build

# Build server
echo "Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist