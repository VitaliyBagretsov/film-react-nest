# film-react-nest/frontend/Dockerfile
FROM node:20-alpine

WORKDIR /film-react-nest

COPY package.json ./

RUN npm i

COPY . .

# RUN npm run build

# EXPOSE 3001

CMD ["npm", "run", "build"]