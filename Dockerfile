###### BASE ######
FROM node:14-buster-slim as base
ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update -qq \
  && apt-get install -yq --no-install-recommends \
  nginx \
  make \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

WORKDIR /app

###### BUILDER ######

FROM base as builder

COPY ./package.json ./package.json

RUN npm install

COPY ./Makefile ./postcss.config.js ./tsconfig.json ./webpack.config.js .eslintrc .eslintignore .prettierrc .stylelintrc .babelrc ./ 
COPY ./src ./src
RUN mkdir ./dist

# Build assets
RUN make build

###### DEPLOY #######
FROM nginx:alpine as deploy

RUN apk add --update --no-cache sed && apk add --update --no-cache bash && rm -rf /var/cache/apk/*

ARG PORT
ENV PORT=${PORT:-80}
RUN echo $PORT

COPY --from=builder /app/dist /app/dist
COPY default.conf /etc/nginx/conf.d/default.conf
RUN cp -r /app/dist  /usr/share/nginx/html/

EXPOSE 80

STOPSIGNAL SIGQUIT

# Run Nginx and strean logs to stdout

CMD ["/bin/bash", "-c", "sed -i -e \"s/HEROKUPORT/$PORT/g\" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;error_log /dev/stdout info;'"]


# CMD ["nginx", "-g", "daemon off;error_log /dev/stdout info;"]