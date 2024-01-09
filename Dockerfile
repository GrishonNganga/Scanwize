FROM node:18

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN npm install --yes

COPY . .
COPY start.sh ./

RUN chmod +x ./start.sh

ENTRYPOINT ["./start.sh", "Run Migrations"]