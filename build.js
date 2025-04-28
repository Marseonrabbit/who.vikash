// Direct build script for React application
const { build } = require('vite');
const { resolve } = require('path');
const { writeFileSync, mkdirSync, existsSync } = require('fs');
const react = require('@vitejs/plugin-react');

async function buildClient() {
  console.log('Starting direct build of React application...');
  
  try {
    // Ensure dist/public directory exists
    const publicDir = resolve(__dirname, 'dist/public');
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    // Build with Vite directly
    await build({
      plugins: [react()],
      root: resolve(__dirname, 'client'),
      build: {
        outDir: resolve(__dirname, 'dist/public'),
        emptyOutDir: true,
        minify: true,
        sourcemap: false,
        rollupOptions: {
          input: {
            main: resolve(__dirname, 'client/index.html'),
          },
        },
      },
      resolve: {
        alias: {
          '@': resolve(__dirname, 'client/src'),
          '@shared': resolve(__dirname, 'shared'),
          '@assets': resolve(__dirname, 'attached_assets'),
        },
      },
    });
    
    console.log('React application build successful!');
    return true;
  } catch (err) {
    console.error('Failed to build React application:', err);
    return false;
  }
}

// Create a simple server
function createServer() {
  console.log('Creating server file...');
  
  try {
    const serverFile = `
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware for static files
app.use(express.static(join(__dirname, 'public')));

// Serve index.html for all routes (SPA support)
app.get('*', (req, res) => {
  const indexPath = join(__dirname, 'public', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application error: index.html not found');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;
    
    // Write server file
    writeFileSync(resolve(__dirname, 'dist/index.js'), serverFile);
    
    // Create start script
    const startScript = `
try {
  console.log("Starting application...");
  import('./index.js').catch(err => {
    console.error('Error importing index.js:', err);
    process.exit(1);
  });
} catch (err) {
  console.error('Failed to start application:', err);
  process.exit(1);
}
`;
    
    writeFileSync(resolve(__dirname, 'dist/start.js'), startScript);
    console.log('Server files created successfully!');
    return true;
  } catch (err) {
    console.error('Failed to create server files:', err);
    return false;
  }
}

// Main build function
async function main() {
  console.log('Starting build process...');
  
  const clientSuccess = await buildClient();
  const serverSuccess = createServer();
  
  if (clientSuccess && serverSuccess) {
    console.log('Build completed successfully!');
    process.exit(0);
  } else {
    console.error('Build failed!');
    process.exit(1);
  }
}

main();