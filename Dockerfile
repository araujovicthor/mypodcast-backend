FROM node:alpine

# ENV NODE_ENV=prod

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

# RUN npm run build

# CMD ["npm", "run", "start"]

CMD ["npm", "run", "dev"]
