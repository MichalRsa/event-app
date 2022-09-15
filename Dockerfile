FROM node:17

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

USER 1000

CMD ["npm", "run", "dev:ts"]

