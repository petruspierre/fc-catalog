FROM node:16.17-slim

RUN apt update && apt install -y --no-install-recommends \
    git \
    ca-certificates

USER node

WORKDIR /home/node/api

CMD ["sh", "-c", "npm install && tail -f /dev/null"]