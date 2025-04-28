# Personal Portfolio Website

A sophisticated personal portfolio website showcasing professional experience with an elegant, Samsung-inspired design and interactive user interface.

## Tech Stack

- React with TypeScript
- Vite build system
- Tailwind CSS
- Framer Motion for advanced animations
- Custom interactive components with smooth transitions

## Features

- Interactive navigation between different sections
- Elegant animations and transitions
- Responsive design that works on all devices
- Sections for Projects, Experience, Skills, Courses & Certifications, and Books

## Deployment to Render.com

Follow these steps to deploy your portfolio on Render.com:

### Step 1: Prepare Your Repository

1. First, install the missing dependency:
   ```bash
   npm install --save-dev @vitejs/plugin-react
   ```

2. Create a new repository on GitHub or GitLab
3. Push your code to the repository
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_REPOSITORY_URL
   git push -u origin main
   ```

### Step 2: Set Up on Render.com

1. Sign up or log in to [Render](https://dashboard.render.com/)
2. From your dashboard, click "New +" and select "Web Service"
3. Connect your GitHub/GitLab account if you haven't already
4. Find and select your portfolio repository

### Step 3: Configure Your Web Service

Use these settings in the Render dashboard:
- **Name**: `your-portfolio` (or any name you prefer)
- **Environment**: `Node`
- **Region**: Choose the closest to your audience
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm install && npx vite build && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
- **Start Command**: `node dist/index.js`
- **Plan**: Free (can upgrade later)

### Step 4: Advanced Options (Required)

Click "Advanced" and add the following environment variables:
- **PORT**: `10000`
- **NODE_ENV**: `production`

### Step 5: Deploy

Click "Create Web Service" and wait for the deployment to complete. Render will provide you with a URL like `https://your-portfolio.onrender.com` when it's ready.

### Troubleshooting

If you encounter any deployment errors, check the detailed troubleshooting guide in the DEPLOYMENT.md file.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (not needed for Render deployment)
npm run build

# Start production server (not needed for Render deployment)
npm start
```

## Customization

Update the content in the section files under `/client/src/components/sections/` to customize your portfolio.