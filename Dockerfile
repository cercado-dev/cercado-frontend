# Multi-stage Dockerfile for Cercado Frontend
# Development and production builds for SvelteKit application

# Base stage with Node.js
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
ENV NODE_ENV=development
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Build stage for production
FROM base AS builder
ENV NODE_ENV=production
RUN npm ci
COPY . .
# Build the SvelteKit app
RUN npm run build

# Production stage with Node adapter
# Note: For Cloudflare Pages deployment, use their platform instead
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production

# Copy built assets and dependencies
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.svelte-kit ./build
RUN npm ci --omit=dev

EXPOSE 3000
CMD ["node", "build"]
