# Use an official Node.js runtime as a base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install --force

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run dev

# Expose the port that your Next.js app will run on
EXPOSE 3000

# Command to run your Next.js app
CMD ["npm", "run dev"]
