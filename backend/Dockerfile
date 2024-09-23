# film-react-nest/backend/Dockerfile
FROM node:20-alpine

WORKDIR /film-react-nest

COPY package.json package-lock.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["node", "dist/main"]