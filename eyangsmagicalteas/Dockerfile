# Use an official Node.js runtime as a parent image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# --- Server Dependencies ---
# Copy server package.json and package-lock.json (or yarn.lock)
COPY server/package*.json server/

# Install server dependencies
RUN npm install --prefix server

# --- Client Dependencies and Build ---
# Copy client package.json and package-lock.json
COPY client/package*.json client/

# Install client dependencies
RUN npm install --prefix client

# Copy the rest of the client application code
COPY client/ client/

# Build the client application
RUN npm run build --prefix client

# --- Final Image Setup ---
FROM node:18-alpine

WORKDIR /app

# Copy server code from the context (after dependencies are handled by builder stage or if not using multi-stage for server code)
COPY server/ server/

# Copy installed server node_modules from builder stage
COPY --from=builder /app/server/node_modules server/node_modules

# Copy the built client application from the builder stage
COPY --from=builder /app/client/build server/public

# Set environment variables (optional, can be overridden at runtime)
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port the app runs on
EXPOSE ${PORT}

# Command to run the application
CMD ["node", "server/server.js"]
