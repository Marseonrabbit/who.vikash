#!/bin/bash
# This script builds the client and server for production

echo "Starting build process..."

# Build client with Vite
echo "Building client with Vite..."
npm run build

# Make the scripts executable
chmod +x start.sh

echo "Build completed successfully!"