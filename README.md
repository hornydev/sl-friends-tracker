## Template App

Example `docker-compose.yaml` file:

### Requirements
1. [Docker](https://docs.docker.com/get-docker/)
2. [Docker Compose](https://docs.docker.com/compose/install/)
3. [Github Token](https://github.com/settings/tokens) with `read:packages` access.

### Deployment steps

1. Login to GitHub containers repository:

```shell
echo "GITHUB_TOKEN" | docker login ghcr.io -u GITHUB_USERNAME --password-stdin
```
2. Pull the docker image and prepare files (replace `tempalte` with a real values)
```shell
docker pull ghcr.io/template/template:master
docker run --rm --entrypoint cat ghcr.io/template/template:master /app/config.json.dist > config.json
docker run --rm --entrypoint cat ghcr.io/template/template:master /app/docker-compose.prod.yaml > docker-compose.yaml
```
3. Open `config.json` witn an file editor and set up all required data
4. Run the bot
```shell
DB_PASSWORD=YOUR_PASSWORD docker-compose up -d  
```

Or feel free to configure `docker-compose.yaml` yourself, according to your desires :)
