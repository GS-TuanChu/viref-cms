FROM node:16.16.0 as build-stage

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.15.1

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build:dev

FROM nginx as production-stage

COPY ./nginx_config/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
