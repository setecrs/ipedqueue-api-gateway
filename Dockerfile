FROM node:7.10.0-alpine

#mkDVD.sh
#coreutils -> stdbuf
#cdrkit -> mkisofs
#xargs -> findutils
RUN apk add --no-cache bash coreutils cdrkit findutils

COPY ./ /usr/local/src/
WORKDIR /usr/local/src/
RUN npm install
EXPOSE 80
CMD npm start
