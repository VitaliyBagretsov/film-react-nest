# film-react-nest/frontend/Dockerfile
FROM node:20-alpine as builder

WORKDIR /film-react-nest

COPY package.json ./

RUN npm i

COPY . .

# CMD ["npm", "run", "build"]
RUN npm run build

FROM node:20-alpine as production
WORKDIR /film-react-nest

COPY --from=builder /film-react-nest/package*.json ./

RUN npm i --prod

COPY --from=builder /film-react-nest/dist ./dist/

CMD ["echo", "start frontend"]