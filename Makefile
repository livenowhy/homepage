all: push

TAG = dev
PREFIX = registry.cn-hangzhou.aliyuncs.com
IMAGE_NAME = livenowhy/node
CNAME = homepage


container:
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f ${PREFIX}/${IMAGE_NAME}:${TAG} || true


restart: stop
	docker run -itd --name=${CNAME} -p 80:8080 ${PREFIX}/${IMAGE_NAME}:${TAG}


stop:
	docker stop ${CNAME} || true
	docker rm -f ${CNAME} || true
