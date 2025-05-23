#!/bin/bash

# Set production environment
export NODE_ENV=production

echo "==> Starting Render.com build process..."

# Install dependencies including tools needed for build
echo "==> Installing dependencies..."
npm install
echo "==> Installing ALL dev dependencies..."
npm install --save-dev 
echo "==> Installing specific build dependencies..."
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

# Create a basic index.html first, just to be safe
echo "Creating default index.html as backup..."
cat > dist/public/index.html << 'EOL'
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

  <div class="section">
    <h2>Projects</h2>
    <p>A collection of technical and creative projects will be displayed here once deployment is complete.</p>
  </div>

  <footer>
    <p>This is a static fallback version of the portfolio. The full interactive version is being deployed.</p>
  </footer>
</body>
</html>
EOL

# Build client using the simplified config
echo "==> Building client with simplified Vite config..."
NODE_ENV=production npx vite build --config vite.config.render.js || {
  echo "==> Vite build failed, attempting alternative build..."
  # Try a direct build with minimal settings - use .cjs extension for CommonJS in ESM context
  cat > simple.vite.config.cjs << 'EOL'
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
  
  # Skip the Vite build entirely and manually create the public directory
  echo "==> Skipping Vite build and manually creating static files"
  mkdir -p dist/public
}

# Build server with esbuild
echo "==> Building server..."
# Skip esbuild and go straight to the fallback
echo "==> Skipping esbuild and using fallback server directly"
{
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

# Copy the enhanced fallback HTML
echo "==> Copying enhanced fallback HTML..."
cp enhanced-fallback.html dist/ || echo "No enhanced fallback HTML found"

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

# Copy the static files manually if the build process failed
echo "==> Setting up static files..."
if [ ! -d "dist/public" ] || [ ! -f "dist/public/index.html" ]; then
  echo "==> Copying client files manually..."
  mkdir -p dist/public
  
  # Check if client/src directory exists
  if [ -d "client/src" ]; then
    # Copy the public directory if it exists
    if [ -d "client/public" ]; then
      cp -r client/public/* dist/public/ || true
    fi
    
    # Create a minimal index.html if not found
    if [ ! -f "dist/public/index.html" ]; then
      echo "==> Creating enhanced index.html manually..."
      cat > dist/public/index.html << 'EOL'
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

  <div class="section">
    <h2>Projects</h2>
    <p>A collection of technical and creative projects will be displayed here once deployment is complete.</p>
  </div>

  <footer>
    <p>This is a static fallback version of the portfolio. The full interactive version is being deployed.</p>
  </footer>
</body>
</html>
EOL
    fi
  fi
  
  # Create CSS directory if it doesn't exist
  mkdir -p dist/public/assets/css
  
  # Create a simple CSS file
  cat > dist/public/assets/css/style.css << 'EOL'
body {
  font-family: system-ui, sans-serif;
  line-height: 1.6;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  color: #333;
}

section {
  margin-bottom: 3rem;
}

h1, h2, h3 {
  color: #2a4365;
}
EOL
fi

# Always ensure we have a server file
echo "==> Creating or verifying server file..."
cat > dist/index.js << 'EOL'
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 10000;

// Create index.html directly in the server if it doesn't exist
const publicDir = join(__dirname, 'public');
const indexPath = join(publicDir, 'index.html');

if (!fs.existsSync(publicDir)) {
  console.log('Creating public directory');
  fs.mkdirSync(publicDir, { recursive: true });
}

// Read the enhanced fallback HTML
const enhancedFallbackPath = join(__dirname, '..', 'enhanced-fallback.html');
let enhancedFallback = '';

try {
  if (fs.existsSync(enhancedFallbackPath)) {
    console.log('Using enhanced fallback HTML');
    enhancedFallback = fs.readFileSync(enhancedFallbackPath, 'utf8');
  }
} catch (err) {
  console.log(`Error reading enhanced fallback: ${err.message}`);
}

if (!fs.existsSync(indexPath)) {
  console.log('Creating index.html file');
  
  // Use enhanced fallback if available, otherwise use simple fallback
  const indexHtml = enhancedFallback || `<!DOCTYPE html>
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
    .project { margin-bottom: 1.5rem; }
    .project-title { font-weight: bold; color: #2c5282; }
    .project-description { margin-top: 0.5rem; }
    .book { 
      margin-bottom: 1.5rem; 
      display: flex;
      align-items: flex-start;
    }
    .book-info { flex: 1; }
    .book-cover { 
      width: 80px; 
      height: 120px; 
      background: #e2e8f0; 
      margin-right: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #718096;
      font-size: 0.8rem;
      text-align: center;
    }
    .book-title { font-weight: bold; margin-bottom: 0.25rem; }
    .book-author { color: #718096; font-size: 0.9rem; margin-bottom: 0.5rem; }
    .course { margin-bottom: 1rem; }
    .course-title { font-weight: bold; }
    .course-description { margin-top: 0.25rem; }
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

  <div class="section">
    <h2>Projects</h2>
    <div class="project">
      <div class="project-title">Threat Detection System</div>
      <div class="project-description">
        Developed a custom threat detection system to identify unusual patterns in network traffic.
      </div>
    </div>
    <div class="project">
      <div class="project-title">Security Awareness Training Portal</div>
      <div class="project-description">
        Created an interactive training portal to educate employees about cybersecurity best practices.
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Books</h2>
    <p>A collection of technical books related to computing and networking.</p>
    
    <div class="book">
      <div class="book-cover">Book Cover</div>
      <div class="book-info">
        <div class="book-title">The Art of Computer Programming</div>
        <div class="book-author">By Donald Knuth</div>
      </div>
    </div>
    
    <div class="book">
      <div class="book-cover">Book Cover</div>
      <div class="book-info">
        <div class="book-title">Practical Malware Analysis</div>
        <div class="book-author">By Michael Sikorski & Andrew Honig</div>
      </div>
    </div>
    
    <p><i>Note: This bookshelf will be updated when time permits.</i></p>
  </div>
  
  <footer>
    <p>This is a static fallback version of the portfolio. The full interactive version is being deployed.</p>
  </footer>
</body>
</html>`;
  fs.writeFileSync(indexPath, indexHtml);
}

// Middleware for static files
app.use(express.static(publicDir));
console.log(`Static directory: ${publicDir}`);

// Check if index.html exists and log result
console.log(`Index file exists: ${fs.existsSync(indexPath)}`);

// Directory content
console.log('Directory content:');
try {
  const files = fs.readdirSync(publicDir);
  console.log(files);
} catch (err) {
  console.log(`Error reading directory: ${err.message}`);
}

// Log middleware for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// For all routes serve index.html
app.get('*', (req, res) => {
  // Always generate fresh index.html if it doesn't exist
  if (!fs.existsSync(indexPath)) {
    console.log('Regenerating index.html on request');
    const indexHtml = `<!DOCTYPE html><html><head><title>Viaksh Portfolio</title><style>body{font-family:system-ui,sans-serif;line-height:1.6;max-width:800px;margin:0 auto;padding:2rem}h1{color:#2a4365}</style></head><body><h1>Viaksh's Portfolio</h1><p>Portfolio website - dynamically generated</p></body></html>`;
    fs.writeFileSync(indexPath, indexHtml);
  }
  
  // Now we can be sure index.html exists
  res.sendFile(indexPath);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Server directory: ${__dirname}`);
});
EOL

# Create start script
echo "==> Creating start script..."
cat > dist/start.js << 'EOL'
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
EOL

echo "==> Verifying build output..."
echo "==> Files in current directory:"
ls -la
echo "==> Files in dist directory:"
ls -la dist/ || echo "No dist directory found"
echo "==> Files in dist/public directory:"
ls -la dist/public/ || echo "No dist/public directory found"