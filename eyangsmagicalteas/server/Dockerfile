FROM node:18-alpine

WORKDIR /app/server

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the server code
COPY . .

# Expose the port the server runs on
EXPOSE 3000

# Command to run the server
CMD ["node", "server.js"]
