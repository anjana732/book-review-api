# Step 1: Use an official Node.js image as base
FROM node:18

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy only package.json and package-lock.json first
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your project
COPY . .

# Step 6: Expose the port your app uses (e.g., 3000)
EXPOSE 3000

# Step 7: Start the application
CMD ["npm", "start"]
