FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build



FROM node:18-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


ENV DATABASE_URL=postgres://pg:Gz7rTG3GCR8g8LZ7mki530Esr8TLHAnE@dpg-cok2jsnsc6pc738k1mcg-a/db_p60m


WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]