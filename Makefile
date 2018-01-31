all: push

TAG = dev
PREFIX = registry.cn-hangzhou.aliyuncs.com
IMAGE_NAME = livenowhy/node

container:
	npm run build
	docker build -t ${PREFIX}/${IMAGE_NAME}:${TAG} .

push: container
	docker push ${PREFIX}/${IMAGE_NAME}:${TAG}

clean:
	docker rmi -f $(PREFIX):$(TAG) || true
