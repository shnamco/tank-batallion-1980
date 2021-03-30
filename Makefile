.PHONY: build

build:
	NODE_ENV=production node ./node_modules/.bin/webpack

docker-build:
	docker build --target deploy -t tank-batallion-1980:$(shell git rev-parse --short HEAD) \
	--progress plain .

docker-run:
	docker run -it --rm -p 8000:80 tank-batallion-1980:$(shell git rev-parse --short HEAD)

docker-bash:
	docker run -it --rm -p 8000:80 tank-batallion-1980:$(shell git rev-parse --short HEAD) bash

docker-serve: docker-build docker-run

publish:
	heroku container:login && \
	docker tag tank-batallion-1980:$(shell git rev-parse --short HEAD) \
	registry.heroku.com/tank-batallion-1980/web && \
	docker push registry.heroku.com/tank-batallion-1980/web && \
	heroku container:release web && \
	heroku open

release: build docker-build publish