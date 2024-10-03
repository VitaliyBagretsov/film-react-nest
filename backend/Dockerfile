# film-react-nest/backend/Dockerfile
FROM node:20-alpine

WORKDIR /film-react-nest

COPY package.json ./

RUN yarn install

COPY . .

RUN DB_HOST=${DB_HOST} DB_PORT=${DB_PORT} DB_USERNAME=${DB_USERNAME} DB_PASSWORD=${DB_PASSWORD} DB_NAME=${DB_NAME} yarn build

EXPOSE 3000

CMD ["node", "dist/main"]