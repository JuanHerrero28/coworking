# Etapa 1: Build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine
WORKDIR /app

# Copiamos solo lo necesario del build
COPY --from=builder /app ./

EXPOSE 3000

# Ejecuta Next.js en modo producción
CMD ["npm", "start"]