FROM node:16-alpine as base
WORKDIR /app

FROM base as build

COPY package.json package-lock.json .
RUN npm ci
COPY . .
RUN npm run build

FROM base

COPY --from=build /app/build/src .
ENTRYPOINT [ "node", "index.js" ]