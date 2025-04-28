# Deployment Guide for Portfolio Website

This document outlines the complete deployment process for the portfolio website on Render.com.

## Key Deployment Files

1. **render.yaml**: Defines the Render.com deployment configuration
2. **build.js**: A Node.js script that handles the build process
3. **enhanced-fallback.html**: A standalone HTML version of the portfolio for fallback

## New Direct Build Approach

The latest approach uses `build.js` instead of `render-build.sh`. This provides better control over the build process by:

1. Directly utilizing Vite's JavaScript API to build the React application
2. Ensuring proper directory structure for deployment
3. Creating a reliable Express server to serve the application
4. Providing fallback mechanisms if the build process encounters issues

## Step-by-Step Deployment Guide

### 1. Preparation

Make sure the following files are in your repository:
- `build.js` - The build script
- `render.yaml` - Render.com configuration
- `enhanced-fallback.html` - Fallback content

### 2. Repository Setup

Push your code to a GitHub/GitLab repository:

```bash
git add .
git commit -m "Ready for deployment"
git push
```

### 3. Render.com Setup

1. Create a new Web Service on Render.com linked to your repository
2. Configure the service with the following settings:
   - **Name**: Your choice (e.g., "portfolio")
   - **Environment**: Node
   - **Build Command**: `npm install && npm install --save-dev @vitejs/plugin-react autoprefixer tailwindcss esbuild postcss vite && node build.js`
   - **Start Command**: `node dist/start.js`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `PORT`: `10000`

### 4. Deployment Process

When you deploy, Render.com will:
1. Clone your repository
2. Install the necessary dependencies
3. Run the build script which:
   - Builds the React application using Vite
   - Creates an Express server to serve the application
   - Sets up fallback content in case of build failure
4. Start the server using the generated start script

### 5. Troubleshooting

#### Common Issues:

1. **Build failures**:
   - Check the build logs for specific error messages
   - Ensure all dependencies are properly installed
   - Consider clearing the build cache and redeploying

2. **Missing assets**:
   - Verify that paths to assets use the correct aliases
   - Ensure images and other assets are properly included in the repository

3. **Server issues**:
   - Check that the environment variables are correctly set
   - Verify that the server is listening on the correct port

## Testing the Deployment

Once deployed, you can visit your portfolio at the URL provided by Render.com (typically `https://{service-name}.onrender.com`).

## Local Testing

To test the build process locally:

```bash
# Install required dependencies
npm install
npm install --save-dev @vitejs/plugin-react autoprefixer tailwindcss esbuild postcss vite

# Run the build script
node build.js

# Start the server locally
node dist/start.js
```

This will simulate the same build process that happens on Render.com.