FROM node:12-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install react-scripts@3.0.1 -g
COPY . .
CMD ["npm","start"]