FROM node:22-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy matches-service package files
COPY matches-service/package*.json ./matches-service/

# Copy prisma schemas
COPY prisma/ ./prisma/

# Install dependencies
RUN npm ci

# Create prisma config file
RUN echo 'module.exports = { schema: "prisma/matches/matches.prisma", datasource: { url: process.env.DATABASE_URL } };' > prisma.config.js

# Generate prisma client for matches
RUN npx prisma generate

# Copy source code
COPY matches-service/ ./matches-service/

# Build matches-service
RUN npm run build -w matches-service

EXPOSE 3003

# Run migrations and start the service
CMD ["sh", "-c", "npx prisma db push && npm run start:prod -w matches-service"]
