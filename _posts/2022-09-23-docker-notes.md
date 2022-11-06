---
layout: post
title: Docker notes
---

Here are some notes and tips collected for `docker` during last years.

It is better to check most recent docs on `docker` installation on the official site as they changed several times
during the last years and now they are inclined to promote `Docker Desktop` for every platform.

## Ubuntu

#### Add current user to docker group (the group should be created during the install process)
```shell
sudo usermod -aG docker $USER
```

#### Check user groups
```shell
groups $USER
```

#### Restart Docker
```shell
sudo service docker restart
```

#### Login into Docker's group
```shell
newgrp docker
```

## Mac OS
The `--net=host` option doesn't work on MacOS

There are special host names inside containers:
```
docker.for.mac.host.internal
docker.for.mac.localhost
```
This can be used, for example, to communicate between DB and backend containers as `localhost` isn't available
on Mac OS inside containers. 

## Docker commands

#### Test Docker
```shell
docker run --rm hello-world
```

#### Start a service
```shell
docker run --name SOME_NAME --env-file=ENV_FILE --net=host -dp 127.0.0.1:OUTER_PORT:INNER_PORT CONTEINER
```
`--net=host` is required if one container should reach another via `localhost:port`.  
If `-p` is used without a local address like `127.0.0.0` it will be bind to `0.0.0.0` which could be a security issue.  
Any network service inside a docker container must be served on `0.0.0.0` to be available outside the container.  
#### Example: start Swagger
```shell
docker run --name swagger-editor -dp 0.0.0.0:8080:8080 swaggerapi/swagger-editor
```

#### Print container names only
```shell
docker ps -a --format {% raw %}"{{.Names}}{% endraw %}"
```

#### Print container IDs only
```shell
doocker ps -a -q
```

#### Clean none containers
```shell
docker rmi -f $(docker images -f "dangling=true" -q)
```
It is possible to set `LABEL` inside a `Dockerfile` and filter by it
```shell
docker image prune --filter label=SOME_LABEL
```
NOTE: Consider to use `docker build --rm` this should remove intermediate containers

#### Copy files from/into a docker container
```shell
docker cp SOME_CONTEINER:/path/to/file LOCAL_FILE_NAME
```
```shell
docker cp LOCAL_FILE_NAME SOME_CONTEINER:/path/to/file
```

#### List volumes and clean them
```shell
docker volume ls
```
```shell
docker volume prune
```

#### Clean Docker <none> images
```shell
docker rmi $(docker images | grep '^<none>' | awk '{print $3}')
```

#### Run something untrusted in Docker
```shell
docker run --rm -it -v $(PWD)/untrustedprogram:/untrustedprogram:ro ubuntu:latest
```

#### Set Docker limits for build
```shell
docker build --cpu-period=100000 --cpu-quota=50000 --memory=1024m -t $PROJECT:$VERSION -f Dockerfile .
```

#### Fix a terminal inside a container
Sometimes something could be mis-configured inside a container and things like `nano` can't work. 
This should be executed inside the container.
```shell
export TERM=xterm
```

## Databases oneliners
NOTE: No volumes so they all are ephemeral

#### PostgreSQL
```shell
docker run --name postgres -e POSTGRES_PASSWORD=password -dp 5432:5432 postgres:alpine
```
```shell
docker run --name postgres -e POSTGRES_PASSWORD=password -dp 127.0.0.1:5432:5432 postgres:alpine
```
```shell
docker exec -it postgres psql -U postgres
```
```shell
docker logs -f postgres
```

#### MySQL\MariaDB
```shell
docker run --name mariadb -e MYSQL_ROOT_PASSWORD=password -dp 127.0.0.1:3306:3306 mariadb
```
```shell
docker exec -it mariadb mysql -p
```
```shell
docker logs -f mariadb
```

#### Redis
```shell
docker run --name redis -dp 127.0.0.1:6379:6379 redis:alpine
```
```shell
docker exec -it redis redis-cli
```
```shell
docker logs -f redis
```

#### MongoDB
NOTE: Security isn't enabled by default
```shell
docker run --name mongodb -dp 127.0.0.1:27017:27017 mongo
```
```shell
docker exec -it mongodb mongo
```
```shell
docker exec -it mongodb mongo admin
```
```shell
docker logs -f mongodb
```

## Multi-Stage Build container example
```Dockerfile
FROM golang as compiler 
RUN CGO_ENABLED=0 go get -a -ldflags '-s' \ 
github.com/adriaandejonge/helloworld FROM scratch
 
COPY --from=compiler /go/bin/helloworld . 
EXPOSE 8080
CMD ["./helloworld"]
```

## Docker rootless and read-only container example
```Dockerfile
FROM alpine:3.15.0
# docker build -t alpine .
# docker run -it --name alpine -d alpine
# docker run -it --name alpine -d --read-only alpine
# docker exec -it alpine sh
# docker exec -it -u root alpine sh

RUN addgroup -S alpine
RUN adduser -G alpine -S alpine
USER alpine

CMD sleep infinity
```
