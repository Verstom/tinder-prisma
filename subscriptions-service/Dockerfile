FROM node:22-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy subscriptions-service package files
COPY subscriptions-service/package*.json ./subscriptions-service/

# Copy prisma schemas
COPY prisma/ ./prisma/

# Install dependencies
RUN npm ci

# Create prisma config file
RUN echo 'module.exports = { schema: "prisma/subscriptions/subscriptions.prisma", datasource: { url: process.env.DATABASE_URL } };' > prisma.config.js

# Generate prisma client for subscriptions
RUN npx prisma generate

# Copy source code
COPY subscriptions-service/ ./subscriptions-service/

# Build subscriptions-service
RUN npm run build -w subscriptions-service

EXPOSE 3005

# Run migrations and start the service
CMD ["sh", "-c", "npx prisma db push && npm run start:prod -w subscriptions-service"]
