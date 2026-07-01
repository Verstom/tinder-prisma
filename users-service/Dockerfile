FROM node:22-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy users-service package files
COPY users-service/package*.json ./users-service/

# Copy prisma schemas
COPY prisma/ ./prisma/

# Install dependencies
RUN npm ci

# Create prisma config file
RUN echo 'module.exports = { schema: "prisma/users/users.prisma", datasource: { url: process.env.DATABASE_URL } };' > prisma.config.js

# Generate prisma client for users
RUN npx prisma generate

# Copy source code
COPY users-service/ ./users-service/

# Build users-service
RUN npm run build -w users-service

EXPOSE 3001

# Run migrations and start the service
CMD ["sh", "-c", "npx prisma db push && npm run start:prod -w users-service"]
