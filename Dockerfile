ARG image=node:16-alpine
FROM ${image} as image-dev

WORKDIR /tmp/build

COPY package*.json ./
RUN npm install -g @ionic/cli
RUN npm install

FROM image-dev as image-build
COPY . ./
COPY --from=image-dev /tmp/build/. ./
RUN ionic build browser --prod

FROM nginx:1.14.2 as image-work
WORKDIR /usr/share/nginx/html
RUN rm -rf /usr/share/nginx/html/*
COPY --from=image-build /tmp/build/dist /usr/share/nginx/html