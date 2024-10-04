# film-react-nest/backend/Dockerfile
FROM node:20-alpine as builder

WORKDIR /film-react-nest

COPY package.json ./

RUN yarn install

COPY . .

# RUN DB_HOST=${DB_HOST} DB_PORT=${DB_PORT} DB_USERNAME=${DB_USERNAME} DB_PASSWORD=${DB_PASSWORD} DB_NAME=${DB_NAME} yarn build
RUN yarn build

FROM node:20-alpine as production
WORKDIR /film-react-nest

COPY --from=builder /film-react-nest/package*.json ./

RUN yarn --prod

COPY --from=builder /film-react-nest/dist ./dist/
COPY --from=builder /film-react-nest/public ./public/

EXPOSE 3000

CMD ["node", "dist/main"]