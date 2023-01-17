#Apecify nde version
FROM node:18.12.1  AS develompment

# Specify working directory inside controller
WORKDIR /Documents/Linkedin-Clone

#Copy package-lock.json & package.json from host to inside container
COPY package*.json ./

#install deps inside container 
RUN npm install -g yarn

COPY . .

RUN yarn start:dev

EXPOSE 3000

#PRODUCTION

FROM node:18.12.1  AS PRODUCTION

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

#set working directory
WORKDIR /Documents/Linkedin-Clone

COPY --from=development /Documents/Linkedin-Clone/ .


