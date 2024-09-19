# Satisfy

Satisfy your Stomach &amp; Wallet

## Build, Tag, Push New Docker Image

```sh
export VRS=0.0.1

docker build -t foodiemates-frontend:$VRS . && \
docker image tag foodiemates-frontend:$VRS docker.artifactory.prod.adnxs.net/hackathon-foodiemates-frontend:$VRS && \
docker image push docker.artifactory.prod.adnxs.net/hackathon-foodiemates-frontend:$VRS
```

## Run frontend docker

```sh
docker run -p 8081:8081 docker.artifactory.prod.adnxs.net/hackathon-foodiemates-frontend:0.0.1
```
