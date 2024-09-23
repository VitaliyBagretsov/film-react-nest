# film-react-nest/frontend/Dockerfile
FROM node:20-alpine

WORKDIR /film-react-nest

COPY package.json package-lock.json ./

RUN npm i

COPY . .

# ARG VITE_API_URL="//localhost/api"

RUN VITE_API_URL=${VITE_API_URL} npm run build