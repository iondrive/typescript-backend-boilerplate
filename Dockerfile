FROM node:4.2.2

MAINTAINER Ion Drive Ltd

# Create the app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app
COPY . /usr/src/app
# TODO: Support local build
COPY .npmrc /usr/src/app/

RUN npm install \
  && npm run build \
  && rm -rf src \
  && rm -rf typings \
  && rm tsconfig.json

# CMD
CMD /bin/bash -c "node ./lib/server.js"
