# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /app/node_modules/.bin:$PATH

# add app
COPY . /app

# install app dependencies
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm i -g cross-env
RUN npm ci

# start app
# CMD ["npm", "start"]
ENTRYPOINT ["npm", "run", "start:dev"]