FROM node:16-alpine

USER root

ENV HOME=/app

WORKDIR $HOME

RUN npm update && \
    npm i -g typescript ts-node

ENTRYPOINT ["ts-node", "--transpile-only"]

COPY package*.json ./

RUN npm install --only=prod

COPY . /app

CMD ["entrypoint.ts"]
