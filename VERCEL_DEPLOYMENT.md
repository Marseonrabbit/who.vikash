# Deploying Your Portfolio to Vercel

This guide explains how to deploy your React portfolio application to Vercel.

## Prerequisites

1. A GitHub account with your portfolio code
2. A Vercel account (you can sign up at [vercel.com](https://vercel.com) using your GitHub account)

## Deployment Steps

### 1. Prepare Your Repository

Ensure your repository includes:
- All project code
- The `vercel.json` configuration file

### 2. Push to GitHub

Make sure all your code is pushed to GitHub:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 3. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel should automatically detect Vite, but if not, configure your project:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`

### 4. Deploy

1. Click "Deploy"
2. Wait for the build and deployment to complete
3. When finished, Vercel will provide you with a deployment URL (e.g., `https://your-portfolio.vercel.app`)

## Custom Domains (Optional)

To add a custom domain:

1. From your project dashboard, go to "Settings" → "Domains"
2. Add your domain and follow the verification steps
3. Update your domain's DNS settings as instructed by Vercel

## Automatic Deployments

By default, Vercel will:
- Deploy automatically when you push changes to your main branch
- Create preview deployments for pull requests

## Environment Variables (If Needed)

If your project requires environment variables:

1. Go to "Settings" → "Environment Variables"
2. Add each variable with its name and value
3. Choose which environments should use each variable (Production, Preview, Development)

## Troubleshooting

If you encounter deployment issues:

1. Check the build logs for specific errors
2. Ensure your `package.json` has the correct build script: `"build": "vite build"`
3. Verify that the `vercel.json` file is properly configured
4. Try a manual redeploy from the Vercel dashboard

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [React on Vercel](https://vercel.com/guides/deploying-react-with-vercel)