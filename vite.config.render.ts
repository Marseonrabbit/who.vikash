// This file is a simplified version of the Vite config for Render.com deployment
// It removes the dependencies on React plugins and Replit-specific plugins
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  // No plugins to avoid dependency issues
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