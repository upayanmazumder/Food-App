from node

workdir /app

copy package*.json ./

run npm ci

copy . .

cmd ["npm", "run", "api"]