
FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# buld NestJS 
RUN npm run build

# Open port 3000
EXPOSE 3000

# run app
CMD ["npm", "run", "start:prod"]
