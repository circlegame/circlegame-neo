# Step 1: Build the React frontend
FROM node:20-alpine AS build

WORKDIR /app/frontend

# Install frontend dependencies
COPY ../frontend/package*.json ./
RUN npm install

# Copy the frontend code and build the React app
COPY ../frontend/ ./
RUN npm run build

# Step 2: Set up the Express backend
FROM node:20-alpine

WORKDIR /app/backend

# Install backend dependencies
COPY ../backend/package*.json ./
RUN npm install

# Copy the backend code
COPY ../backend/ ./

# Copy the built React frontend into the backend's public directory
COPY --from=build /app/frontend/dist /app/frontend/dist

# Expose backend port (default 5000)
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]