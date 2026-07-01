FROM node:22-alpine

WORKDIR /app

# Copy root package files
COPY package*.json ./

# Copy tinder package files
COPY tinder/package*.json ./tinder/

# Copy prisma schemas
COPY prisma/ ./prisma/

# Install dependencies
RUN npm ci

# Generate prisma clients for all microservices in the shared generated directory
RUN npx prisma generate --schema prisma/users/users.prisma && \
    npx prisma generate --schema prisma/interactions/interactions.prisma && \
    npx prisma generate --schema prisma/matches/matches.prisma && \
    npx prisma generate --schema prisma/messages/messages.prisma && \
    npx prisma generate --schema prisma/subscriptions/subscriptions.prisma

# Copy source code
COPY tinder/ ./tinder/

# Build tinder package
RUN npm run build -w tinder

EXPOSE 3000

CMD ["npm", "run", "start:prod", "-w", "tinder"]
