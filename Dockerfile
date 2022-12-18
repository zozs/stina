FROM node:18

WORKDIR /app
RUN chown node:node /app
USER node

COPY --chown=node:node . .
RUN npm install

CMD ["node", "stina.js"]
