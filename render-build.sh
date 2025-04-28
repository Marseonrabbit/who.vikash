#!/bin/bash

# Set production environment
export NODE_ENV=production

echo "==> Starting Render.com build process..."

# Install dependencies
echo "==> Installing dependencies..."
npm install
npm install --save-dev @vitejs/plugin-react  # Ensure React plugin is installed

# Check for simplified config
if [ ! -f "vite.config.render.ts" ]; then
  echo "==> WARNING: vite.config.render.ts not found. Creating simple version..."
  cat > vite.config.render.js << 'EOL'
// Simplified Vite config for Render.com deployment
const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  plugins: [],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
});
EOL
else
  echo "==> Using existing vite.config.render.ts..."
  # Convert TypeScript config to JavaScript for compatibility
  cat vite.config.render.ts | sed 's/import.meta.dirname/__dirname/g' > vite.config.render.js
fi

# Build client using the simplified config
echo "==> Building client with simplified Vite config..."
npx vite build --config vite.config.render.js

# Build server with esbuild
echo "==> Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Create a simple start script
echo "==> Creating server start script..."
cat > dist/start.js << 'EOL'
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import './index.js';
EOL

# Verify build result
echo "==> Verifying build output..."
if [ -d "dist" ] && [ -d "dist/public" ]; then
  echo "==> Build completed successfully!"
  ls -la dist/
  ls -la dist/public/
else
  echo "==> ERROR: Build failed to generate expected files."
  ls -la
  exit 1
fi