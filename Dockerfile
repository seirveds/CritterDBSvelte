# Build stage
FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json ./
COPY rollup.config.js ./

RUN npm install

COPY src ./src
COPY public ./public

RUN npm run build

# Production stage
FROM nginx:stable-alpine as production-stage

COPY --from=build-stage /app/public /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port
EXPOSE 80

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]