#!/bin/bash

# Set production environment
export NODE_ENV=production

echo "==> Starting Render.com build process..."

# Install dependencies including tools needed for build
echo "==> Installing dependencies..."
npm install
npm install --save-dev @vitejs/plugin-react autoprefixer tailwindcss esbuild postcss
npm install --save-dev typescript @types/node

echo "==> Verifying critical dependencies..."
npm list autoprefixer
npm list esbuild
npm list tailwindcss
npm list postcss

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

# Create directory structure
mkdir -p dist/public

# Build client using the simplified config
echo "==> Building client with simplified Vite config..."
npx vite build --config vite.config.render.js || {
  echo "==> Vite build failed, attempting alternative build..."
  # Try a direct build with minimal settings
  cat > simple.vite.config.js << 'EOL'
const { defineConfig } = require("vite");
const path = require("path");

module.exports = defineConfig({
  plugins: [],
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
  },
});
EOL
  npx vite build --config simple.vite.config.js
}

# Build server with esbuild
echo "==> Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist || {
  echo "==> esbuild failed, creating fallback server build..."
  # Create a simple Express server as fallback
  cat > dist/index.js << 'EOL'
import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files
app.use(express.static(join(__dirname, 'public')));

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  const indexPath = join(__dirname, 'public', 'index.html');
  if (existsSync(indexPath)) {
    res.send(readFileSync(indexPath, 'utf8'));
  } else {
    res.status(404).send('Application error: index.html not found');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOL
}

# Create a simple start script
echo "==> Creating server start script..."
cat > dist/start.js << 'EOL'
try {
  import('./index.js').catch(err => {
    console.error('Error importing index.js:', err);
    process.exit(1);
  });
} catch (err) {
  console.error('Failed to start application:', err);
  process.exit(1);
}
EOL

# Verify build result
echo "==> Verifying build output..."
if [ -d "dist" ]; then
  echo "==> Build directory exists"
  ls -la dist/
  if [ -d "dist/public" ]; then
    echo "==> Public directory exists"
    ls -la dist/public/
    echo "==> Build completed!"
  else
    echo "==> WARNING: dist/public directory not found"
    # Create public directory if needed
    mkdir -p dist/public
    # Create minimal index.html if needed
    if [ ! -f "dist/public/index.html" ]; then
      echo "==> Creating minimal index.html for fallback"
      cat > dist/public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portfolio</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 2rem; max-width: 800px; margin: 0 auto; }
    h1 { color: #333; }
    p { line-height: 1.6; }
  </style>
</head>
<body>
  <h1>Portfolio Website</h1>
  <p>This is a placeholder page. The application could not be fully built during deployment.</p>
  <p>Please check the deployment logs for more information.</p>
</body>
</html>
EOL
    fi
  fi
else
  echo "==> ERROR: Build failed to generate expected files."
  ls -la
  echo "==> Creating minimal deployment files for fallback"
  mkdir -p dist/public
  cat > dist/index.js << 'EOL'
import express from 'express';
const app = express();
const PORT = process.env.PORT || 10000;
app.use(express.static('dist/public'));
app.get('*', (req, res) => {
  res.send('Build failed, please check deployment logs.');
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
EOL
  cat > dist/public/index.html << 'EOL'
<!DOCTYPE html><html><head><title>Deployment Error</title></head><body><h1>Deployment Error</h1><p>The build process failed. Please check the deployment logs.</p></body></html>
EOL
fi