FROM node:25-alpine AS dependencies

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:25-alpine AS builder

WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:25-alpine AS runner

WORKDIR /app
RUN chown node:node /app
COPY --from=dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/server.js ./
USER node
EXPOSE 3000
CMD ["node", "server.js"]
