#!/bin/bash

echo "Starting build process..."

# Build the client
echo "Building client with Vite..."
npx vite build

# Build the server
echo "Building server with esbuild..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Ensure the proper dist structure for Render
echo "Setting up proper dist structure..."
if [ ! -d "dist/public" ]; then
  echo "Moving client build to dist/public..."
  mkdir -p dist/public
  cp -r dist/*.* dist/public/ 2>/dev/null || :
  cp -r dist/assets dist/public/ 2>/dev/null || :
fi

echo "Build completed successfully!"