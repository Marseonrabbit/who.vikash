#!/bin/bash
# This script builds the client and server for production

echo "Starting build process..."

# Build client with Vite
echo "Building client with Vite..."
npx vite build

# Build server with esbuild
echo "Building server with esbuild..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Make the scripts executable
chmod +x start.sh

# Verify that files exist
echo "Verifying build output..."
if [ -d "dist" ] && [ -f "dist/index.js" ]; then
  echo "Build files verified successfully!"
else
  echo "ERROR: Build files are missing!"
  ls -la dist/
  exit 1
fi

echo "Build completed successfully!"