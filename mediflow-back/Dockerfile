
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY ./data-source.ts ./data-source.ts
COPY ./entrypoint.sh ./entrypoint.sh
RUN chmod +x /app/entrypoint.sh
EXPOSE 3000
CMD ["./entrypoint.sh"]
