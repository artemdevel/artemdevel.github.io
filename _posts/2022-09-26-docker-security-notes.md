---
layout: post
title: Docker security notes
---

I had a small collection of links related to Docker security best practices and other security tips but unfortunately
some of them disappeared forever. These notes are based on the 
[Docker Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Docker_Security_Cheat_Sheet.html)
manual which rules were included in many other articles and I decided to archive some of them here as well.

## Do not expose the Docker daemon socket (even to the containers)
Docker socket `/var/run/docker.sock` is the UNIX socket that Docker is listening to. This is the primary entry point 
for the Docker API. The owner of this socket is root. Giving someone access to it is equivalent to giving unrestricted
root access to your host.

#### Do not enable tcp Docker daemon socket
If you are running docker daemon with `-H tcp://0.0.0.0:XXX` you are exposing un-encrypted and unauthenticated direct 
access to the Docker daemon.

#### Do not expose `/var/run/docker.sock` to other containers
By using volumes `-v /var/run/docker.sock://var/run/docker.sock` the socket can be exposed to other containers.

## Set a user
Configuring the container to use an unprivileged user is the best way to prevent privilege escalation attacks.
This can be accomplished in different ways as follows:

#### During runtime using `-u` option of `docker run` command
```shell
docker run -u 4000 alpine
```

#### During build time. Simple add user in Dockerfile and use it.
```Dockerfile
FROM alpine
RUN groupadd -r myuser && useradd -r -g myuser myuser

<ROOT USER ACTIONS>

USER myuser
```

## Limit capabilities
Grant only specific capabilities needed by a container. Docker, by default, runs with only a subset of capabilities.
You can change it and drop some capabilities (using `--cap-drop`) to harden your docker containers, or add some
capabilities (using `--cap-add`) if needed. Remember not to run containers with the `--privileged` flag - this will
add ALL Linux kernel capabilities to the container.  
The most secure setup is to drop all capabilities
```shell
docker run --cap-drop all --cap-add CHOWN alpine
```

## Add `–no-new-privileges` flag
Always run your docker images with `--security-opt=no-new-privileges` in order to prevent escalate privileges using 
`setuid` or `setgid` binaries.

## Disable inter-container communication
By default inter-container communication (ICC) is enabled - it means that all containers can talk with each other
(using docker0 bridged network). This can be disabled by running docker daemon with `--icc=false` flag.
If `ICC` is disabled it is required to tell which containers can communicate using `--link=CONTAINER_NAME_or_ID:ALIAS` option.

## Limit resources
The best way to avoid DoS attacks is by limiting resources. You can limit memory, CPU, maximum number of restarts 
`--restart=on-failure:<number_of_restarts>`, maximum number of file descriptors `--ulimit nofile=<number>` and maximum 
number of processes `--ulimit nproc=<number>`.

## Set filesystem and volumes to read-only
Run containers with a read-only filesystem using `--read-only` flag.
```shell
docker run --read-only alpine sh
```
If an application inside a container has to save something temporarily, combine `--read-only` flag with `--tmpfs`
```shell
docker run --read-only --tmpfs /tmp alpine sh -c 'echo "whatever" > /tmp/file'
```
In addition volumes also can be mounted as read-only
```shell
docker run -v volume-name:/path/in/container:ro alpine
```
