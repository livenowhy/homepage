FROM registry.cn-hangzhou.aliyuncs.com/livenowhy/node:vue


ADD . /src
WORKDIR /src
CMD cd /src
CMD chmod a+x /src/start.sh

EXPOSE 8080

CMD ["/src/start.sh"]
