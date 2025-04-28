#!/bin/bash
# This script starts the production server

# Get port from environment variable or use 10000 as default
PORT="${PORT:-10000}"

# Log info about the environment
echo "Starting production server..."
echo "NODE_ENV: production"
echo "PORT: $PORT"

# Set environment variables and start the server
export NODE_ENV=production
export PORT=$PORT
node dist/index.js