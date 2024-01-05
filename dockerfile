# Use the official Node.js 20.2.0 image as the base image
FROM node:20.10.0

# Set environment variables as your credentials
ENV AWS_ACCESS_KEY_ID=
ENV AWS_SECRET_ACCESS_KEY=
ENV AWS_REGION=
ENV MONGODB_URI=
ENV PORT=8000

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Expose port 8000
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]