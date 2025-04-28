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

This project is set up for easy deployment on Render.com.

### Automatic Deployment with Render Dashboard

1. Fork or push this repository to GitHub or GitLab
2. Log in to [Render](https://dashboard.render.com/)
3. Click "New +" and select "Web Service"
4. Connect your GitHub/GitLab account and select the repository
5. Use the following settings:
   - Name: `your-portfolio` (or any name you prefer)
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. Click "Create Web Service"

### Using Render Blueprint

This project includes a `render.yaml` file for Blueprint deployments:

1. Push your code to GitHub or GitLab
2. Go to the Render Dashboard
3. Click "New +" and select "Blueprint"
4. Connect and select your repository
5. Render will automatically detect and use the configurations in render.yaml
6. Click "Apply" to create the web service

### Environment Variables

No environment variables are required for basic functionality.

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Customization

Update the content in the section files under `/client/src/components/sections/` to customize your portfolio.