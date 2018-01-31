FROM registry.cn-hangzhou.aliyuncs.com/livenowhy/node:alpine

RUN mkdir /src
ADD . /src
WORKDIR /src/dist

EXPOSE 3000

CMD ["node", "server.js"]
