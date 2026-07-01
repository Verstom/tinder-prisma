FROM node:22-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy messages-service package files
COPY messages-service/package*.json ./messages-service/

# Copy prisma schemas
COPY prisma/ ./prisma/

# Install dependencies
RUN npm ci

# Create prisma config file
RUN echo 'module.exports = { schema: "prisma/messages/messages.prisma", datasource: { url: process.env.DATABASE_URL } };' > prisma.config.js

# Generate prisma client for messages
RUN npx prisma generate

# Copy source code
COPY messages-service/ ./messages-service/

# Build messages-service
RUN npm run build -w messages-service

EXPOSE 3004

# Run migrations and start the service
CMD ["sh", "-c", "npx prisma db push && npm run start:prod -w messages-service"]
