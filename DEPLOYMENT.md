# Deploying Your Portfolio to Render.com

This document provides a detailed guide on how to deploy your portfolio website to Render.com. Render is a cloud platform that offers free hosting for static sites and web services with automatic SSL and continuous deployments from GitHub.

## Prerequisites

- A GitHub or GitLab account
- Your portfolio code committed to a repository
- A Render.com account (you can sign up for free at https://render.com)

## Before Deployment: Fix Missing Dependencies

Based on the deployment errors, you need to ensure all required dependencies are installed in your GitHub repository. Add these to your project:

```bash
# Install required development dependencies
npm install --save-dev @vitejs/plugin-react
```

## Deployment Steps

### 1. Prepare Your Repository

Make sure your code is properly committed to a GitHub or GitLab repository:

```bash
# Initialize git repository if not already done
git init

# Add all files
git add .

# Commit changes
git commit -m "Prepare for deployment"

# Add remote repository (replace with your actual repository URL)
git remote add origin https://github.com/yourusername/your-portfolio.git

# Push to repository
git push -u origin main
```

### 2. Set Up Web Service on Render

1. Log in to your Render.com account
2. From your Dashboard, click the "New" button and select "Web Service"
3. Connect your GitHub or GitLab account if you haven't already
4. Select the repository containing your portfolio
5. Configure the service with the following settings:

### 3. Basic Configuration

- **Name**: Choose a name for your service (e.g., "my-portfolio")
- **Environment**: Select "Node"
- **Region**: Choose the region closest to your target audience
- **Branch**: Select your main branch (usually "main" or "master")

### 4. Build Settings

- **Build Command**: `npm install && npm install --save-dev @vitejs/plugin-react && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- **Start Command**: `node dist/index.js`
- **Plan**: Select "Free" to start

### 5. Advanced Options (Required)

- Click "Advanced" to expand additional options
- Add the following environment variables:
  - Key: `PORT`
    Value: `10000`
  - Key: `NODE_ENV`
    Value: `production`

### 6. Create and Deploy

- Click "Create Web Service"
- Render will now build and deploy your application
- This process may take a few minutes

### 7. Access Your Deployed Portfolio

Once the deployment is complete:

- Render will provide you with a URL like `https://your-portfolio.onrender.com`
- You can access your portfolio through this URL
- The site will automatically receive an SSL certificate

## Troubleshooting Common Deployment Errors

If you encounter the error `Error: Cannot find module '/opt/render/project/src/dist/index.js'`:

1. Make sure your build command is actually creating the dist/index.js file
2. Try using the more explicit build command provided above rather than using scripts
3. Check the build logs for any errors during the build process

If you encounter the error `Cannot find package '@vitejs/plugin-react'`:

1. Make sure to add this dependency to your project before deploying
2. You can do this by running `npm install --save-dev @vitejs/plugin-react`
3. Push the updated package.json and package-lock.json to your repository

## Continuous Deployment

Render automatically sets up continuous deployment from your repository:

- Any changes pushed to your main branch will trigger a new build
- The new version will be automatically deployed once the build completes
- No manual deployments are needed after the initial setup

## Custom Domains (Optional)

To use your own domain with your Render service:

1. Go to your service dashboard on Render
2. Navigate to the "Settings" tab
3. Scroll down to "Custom Domains"
4. Click "Add Custom Domain"
5. Follow the instructions to verify your domain ownership
6. Update your domain's DNS settings as instructed by Render

## Resources

- [Render Docs: Node.js Services](https://render.com/docs/deploy-node-express-app)
- [Render Docs: Custom Domains](https://render.com/docs/custom-domains)
- [Render Status Page](https://status.render.com)