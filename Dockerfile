# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies (including Jest)
RUN npm install

# Copy all source files (including tests)
COPY src/ ./src/
COPY tests/ ./tests/

# Command to run tests when the container starts
CMD ["npm", "test"]