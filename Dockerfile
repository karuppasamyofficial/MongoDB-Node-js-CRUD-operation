FROM node:latest
WORKDIR D:\Node js Sample\Node Js Example\CloudAPp
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 9001
CMD ["node","index.js"]