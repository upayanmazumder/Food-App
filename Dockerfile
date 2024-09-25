from node

workdir /app

copy . .

run npm ci

cmd ["npm", "run", "api"]