FROM node:20-alpine

COPY . ./app/ 

WORKDIR /app

RUN npm install -g npm --legacy-peer-deps # if we dont install this 

RUN npm install --legacy-peer-deps

# run the command to start the expo server, using commands: npx expo start
EXPOSE 19000 19001 19002  

CMD ["npx", "expo", "start"]

# To build the image, run the command: docker build -t <image-name> .cl