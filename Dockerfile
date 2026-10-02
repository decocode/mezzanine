FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:site

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/site-dist /usr/share/nginx/html
# `COPY . .` above carries each source file's mode into site-dist/. An asset saved
# as 0600 is unreadable by the nginx worker and is served as 403, so normalise
# the modes rather than depend on how a file happened to be written locally.
RUN chmod -R a+rX /usr/share/nginx/html
EXPOSE 8080
