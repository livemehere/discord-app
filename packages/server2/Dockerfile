FROM node:18

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn

COPY . .

RUN npm install -g prisma

RUN yarn build

CMD ["yarn", "start:prod"]
