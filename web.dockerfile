FROM node:9.8.0:alpine

WORKDIR /var/app

# ###Set System Timezone###
# Install base packages
RUN apk update
RUN apk upgrade
# Change TimeZone
RUN apk add --update tzdata
ENV TZ=Australia/Sydney

# Clean APK cache
RUN rm -rf /var/cache/apk/*

# copy package.json separately to install node modules. This is so it can be cached independently
COPY package.json .
RUN yarn install --loglevel warn

# copy the server folder if not exist or changed
COPY server server
RUN npm run build:dist
