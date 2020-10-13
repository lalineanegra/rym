#STAGE I
FROM node:current-alpine3.12 AS BUILD_IMAGE

# couchbase sdk requirements
RUN apk update && apk add --no-cache curl bash npm && rm -rf /var/cache/apk/*

# install node-prune 
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /server

COPY package.json package-lock.json tsconfig.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

#STAGE II
FROM node:current-alpine3.12

WORKDIR /server

COPY --from=BUILD_IMAGE /server/dist ./dist
COPY --from=BUILD_IMAGE /server/package.json .
COPY --from=BUILD_IMAGE /server/node_modules ./node_modules

EXPOSE 5000

CMD ["npm", "start"]