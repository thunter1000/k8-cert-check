FROM node:16-alpine as base
WORKDIR /app

FROM base as deps

COPY package.json package-lock.json .
RUN npm ci
COPY . .

FROM deps as build

RUN npm run build

FROM deps as test

RUN mkdir /output ; \
  npm run test | tee /output/test-result.log

FROM base
COPY --from=test /output/ /test/
COPY --from=build /app/build/src .
ENTRYPOINT [ "node", "index.js" ]