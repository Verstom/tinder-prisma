FROM node:22-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy interactions-service package files
COPY interactions-service/package*.json ./interactions-service/

# Copy prisma schemas
COPY prisma/ ./prisma/

# Install dependencies
RUN npm ci

# Create prisma config file
RUN echo 'module.exports = { schema: "prisma/interactions/interactions.prisma", datasource: { url: process.env.DATABASE_URL } };' > prisma.config.js

# Generate prisma client for interactions
RUN npx prisma generate

# Copy source code
COPY interactions-service/ ./interactions-service/

# Build interactions-service
RUN npm run build -w interactions-service

EXPOSE 3002

# Run migrations and start the service
CMD ["sh", "-c", "npx prisma db push && npm run start:prod -w interactions-service"]
