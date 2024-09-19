FROM docker.artifactory.prod.adnxs.net/xandr/nodejs:20-ubuntu-focal-2024090615-amd64

# Set the working directory
WORKDIR /app/frontend

# Copy over everything except the node_modules
COPY ./frontend /app/frontend/
COPY ./scripts/bootstrap-docker.sh /app/frontend/

RUN ls -la /app/frontend/

RUN npm install -g npm@10.8.3

# Install expo locally within the project
RUN npm install expo

ENTRYPOINT [ "/app/frontend/bootstrap-docker.sh" ]