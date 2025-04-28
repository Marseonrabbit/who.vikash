// Direct build script for Render.com deployment
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { build } = require('vite');

async function buildClient() {
  console.log('Building client...');
  
  try {
    // Make sure client/dist directory exists
    const distDir = path.resolve(__dirname, 'dist/public');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Create simple Vite config
    const config = {
      configFile: false,
      root: path.resolve(__dirname, 'client'),
      build: {
        outDir: path.resolve(__dirname, 'dist/public'),
        emptyOutDir: true,
        sourcemap: false,
        minify: true,
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, 'client/src'),
          '@shared': path.resolve(__dirname, 'shared'),
          '@assets': path.resolve(__dirname, 'attached_assets'),
        },
      },
    };
    
    // Build client
    await build(config);
    console.log('Client build successful!');
    return true;
  } catch (error) {
    console.error('Client build failed:', error);
    
    // Create a minimal index.html if the build fails
    const fallbackHtml = fs.readFileSync(path.resolve(__dirname, 'enhanced-fallback.html'), 'utf8');
    const fallbackIndexPath = path.resolve(__dirname, 'dist/public/index.html');
    
    // Ensure directory exists
    const publicDir = path.resolve(__dirname, 'dist/public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write fallback HTML
    fs.writeFileSync(fallbackIndexPath, fallbackHtml);
    console.log('Fallback index.html created');
    
    return false;
  }
}

function createServer() {
  console.log('Creating server...');
  
  try {
    // Create dist directory if it doesn't exist
    const distDir = path.resolve(__dirname, 'dist');
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }
    
    // Create a simple Express server
    const serverCode = `
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 10000;

// Serve static files
const publicDir = join(__dirname, 'public');
console.log('Static directory:', publicDir);

// Check if directory exists and has index.html
if (fs.existsSync(publicDir)) {
  const indexExists = fs.existsSync(join(publicDir, 'index.html'));
  console.log('Index file exists:', indexExists);
  
  // List directory contents
  console.log('Directory content:');
  const files = fs.readdirSync(publicDir);
  console.log(files.join(', '));
  
  // Serve static files
  app.use(express.static(publicDir));
} else {
  console.error('Public directory not found!');
  fs.mkdirSync(publicDir, { recursive: true });
}

// For SPA routing - serve index.html for all routes
app.get('*', (req, res) => {
  const indexPath = join(publicDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Application error: index.html not found');
  }
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
    `;
    
    // Write server code to file
    fs.writeFileSync(path.resolve(__dirname, 'dist/index.js'), serverCode);
    
    // Create start script
    const startScript = `
console.log('Starting application...');
try {
  import('./index.js').catch(err => {
    console.error('Error importing index.js:', err);
    process.exit(1);
  });
} catch (err) {
  console.error('Failed to start application:', err);
  process.exit(1);
}
    `;
    
    fs.writeFileSync(path.resolve(__dirname, 'dist/start.js'), startScript);
    console.log('Server files created');
    
    return true;
  } catch (error) {
    console.error('Error creating server:', error);
    return false;
  }
}

async function main() {
  console.log('Starting build process...');
  
  // Check for required dependencies and install if missing
  try {
    console.log('Checking for required dependencies...');
    require('@tailwindcss/typography');
    console.log('Typography plugin found.');
  } catch (error) {
    console.log('Typography plugin not found, installing...');
    const { execSync } = require('child_process');
    try {
      execSync('npm install --save-dev @tailwindcss/typography', { stdio: 'inherit' });
      console.log('Typography plugin installed successfully.');
    } catch (installError) {
      console.error('Failed to install typography plugin:', installError);
    }
  }
  
  // Ensure the enhanced-fallback.html exists
  if (!fs.existsSync(path.resolve(__dirname, 'enhanced-fallback.html'))) {
    console.log('Creating enhanced-fallback.html...');
    // Copy from attached_assets if available, or create minimal version
    const fallbackHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Viaksh Portfolio</title>
  <style>
    body { 
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    header { margin-bottom: 2rem; }
    h1 { color: #2a4365; }
    h2 { color: #2c5282; border-bottom: 1px solid #e2e8f0; padding-bottom: 0.5rem; margin-top: 2rem; }
    .section { margin-bottom: 2rem; }
    .skill { margin-bottom: 0.5rem; }
    .skill-name { font-weight: bold; }
    .skill-bar { 
      height: 8px;
      background: #edf2f7;
      border-radius: 4px;
      margin-top: 0.25rem;
    }
    .skill-level { 
      height: 100%;
      background: #4299e1;
      border-radius: 4px;
    }
    .experience { margin-bottom: 1.5rem; }
    .experience-title { font-weight: bold; margin-bottom: 0.25rem; }
    .experience-period { color: #718096; font-size: 0.9rem; }
    .experience-description { margin-top: 0.5rem; }
  </style>
</head>
<body>
  <header>
    <h1>Viaksh's Portfolio</h1>
    <p>Cybersecurity Professional & Digital Marketing Specialist</p>
  </header>

  <div class="section">
    <h2>Skills</h2>
    <div class="skill">
      <div class="skill-name">SIEM/EDR</div>
      <div class="skill-bar"><div class="skill-level" style="width: 100%"></div></div>
    </div>
    <div class="skill">
      <div class="skill-name">Incident Management</div>
      <div class="skill-bar"><div class="skill-level" style="width: 90%"></div></div>
    </div>
    <div class="skill">
      <div class="skill-name">Digital Marketing</div>
      <div class="skill-bar"><div class="skill-level" style="width: 85%"></div></div>
    </div>
    <div class="skill">
      <div class="skill-name">Web Pentesting</div>
      <div class="skill-bar"><div class="skill-level" style="width: 35%"></div></div>
    </div>
  </div>

  <div class="section">
    <h2>Experience</h2>
    <div class="experience">
      <div class="experience-title">Cybersecurity Professional</div>
      <div class="experience-period">2020 - Present</div>
      <div class="experience-description">
        Working with cutting-edge security technology to protect organizations from cyber threats.
      </div>
    </div>
    <div class="experience">
      <div class="experience-title">Digital Marketing Specialist</div>
      <div class="experience-period">2018 - 2020</div>
      <div class="experience-description">
        Managed online marketing campaigns and optimized web presence for various clients.
      </div>
    </div>
  </div>

  <footer>
    <p>This is a static fallback version of the portfolio. The full interactive version is being deployed.</p>
  </footer>
</body>
</html>
    `;
    
    fs.writeFileSync(path.resolve(__dirname, 'enhanced-fallback.html'), fallbackHtml);
  }
  
  // Build client
  const clientSuccess = await buildClient();
  
  // Create server files
  const serverSuccess = createServer();
  
  if (clientSuccess && serverSuccess) {
    console.log('Build successful!');
  } else {
    console.log('Build completed with fallbacks');
  }
  
  // List build output
  console.log('Build output:');
  const distDir = path.resolve(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    const files = fs.readdirSync(distDir);
    console.log('dist:', files.join(', '));
    
    const publicDir = path.resolve(distDir, 'public');
    if (fs.existsSync(publicDir)) {
      const publicFiles = fs.readdirSync(publicDir);
      console.log('dist/public:', publicFiles.join(', '));
    }
  }
}

// Run the build
main().catch(error => {
  console.error('Build failed:', error);
  process.exit(1);
});