---
layout: post
title: More Docker notes
---

Here are some more Docker notes.

Consider we want to label each Docker image with a git commit and this way we can
know the exact git commit which the Docker image was built from. This can be done this way:
```dockerfile
FROM python:3.11.0-slim

RUN set -x && \
    apt-get update && \
    apt-get install -y --no-install-recommends procps

ARG GIT_COMMIT
ENV GIT_COMMIT=$GIT_COMMIT
LABEL GIT_COMMIT=$GIT_COMMIT

WORKDIR /usr/src/app
COPY entrypoint.sh .

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]
```

The actual git commit can be obtained like this
```shell
git log --pretty="%h" -1
```
NOTE: The big `H` can be used to get the full git hash value - `"%H""`.

The whole docker build command will be like this
```shell
docker build --build-arg GIT_COMMIT="$(git log --pretty="%h" -1)" -t my_python .
```

#### Inspect the label
The label is the part of the image so it can be inspect or used for various filters etc.
```shell
docker inspect my_python:latest
```
```
...
            "Labels": {
                "GIT_COMMIT": "968cf2a"
            }
...
```
The filtering can be done by many ways, for example, by `jq` (if it is installed) or by just a `grep` etc
```shell
docker inspect my_python:latest | jq '.[].Config.Labels'
```

#### Entrypoint
The `entrypoint.sh` script is optional here. It could be anything, for example, `python`
```dockerfile
ENTRYPOINT ["python"]
CMD ["--version"]
```
In this case any arguments provided to the `run` command will be populated to `python` and by default `--help` will be used.

Here is an example of the `entrypoint.sh` script
```bash
#!/usr/bin/env bash

set -euo pipefail

declare -r DEBUG="${DEBUG:-0}"

echo "Build $GIT_COMMIT"
echo "Debug $DEBUG"

if [ "$DEBUG" = "1" ]; then
  exec python "$@"
else
  exec python -m http.server 8000 --bind 0.0.0.0
fi
```
The `set -euo pipefail` is used to trap any errors like missed variables etc, more details on this in other posts.  
The `declare -r` creates a read-only variable, so it is a constant actually (check `help declare` for more details.  
The `{SOME_NAME:-0}` provides a default value (`0` is here, but can be anything).  
The `exec` is used to substitute the shell with the command so `python` (or anything else) becomes a process with `PID=1`.  
The `"$@` represents any input arguments sent to the `entrypoint.sh` script.

#### Possible usage
Just dive into the `python` shell.
```shell
docker run --rm --name my_container -it --env DEBUG=1 my_python
```

Show `python` version
```shell
docker run --rm --name my_container -it --env DEBUG=1 my_python --version
```

Run the "service"
```shell
docker run --rm --name my_container -it -p 8000:8000 my_python
```
