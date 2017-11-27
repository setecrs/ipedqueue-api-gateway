FROM node:7.10.0-alpine

#mkDVD.sh
#coreutils -> stdbuf
#cdrkit -> mkisofs
#xargs -> findutils
RUN apk add --no-cache bash coreutils cdrkit findutils

WORKDIR /usr/local/src/
COPY package.json .
RUN npm install
ADD . .
EXPOSE 80
CMD npm start
