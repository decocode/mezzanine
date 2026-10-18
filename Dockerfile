FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:site && node scripts/generate-routes.mjs > routes.inc

FROM nginx:alpine
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/routes.inc /etc/nginx/conf.d/routes.inc
COPY --from=build /app/site-dist /usr/share/nginx/html
# Fail the build, rather than the deploy, if the server configuration or generated routes are invalid.
RUN nginx -t
# `COPY . .` above carries each source file's mode into site-dist/. An asset saved
# as 0600 is unreadable by the nginx worker and is served as 403, so normalise
# the modes rather than depend on how a file happened to be written locally.
RUN chmod -R a+rX /usr/share/nginx/html
EXPOSE 8080
