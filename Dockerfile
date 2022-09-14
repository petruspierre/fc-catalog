FROM node:16.17-slim

USER node

WORKDIR /home/node/api

CMD ["sh", "-c", "npm install && tail -f /dev/null"]