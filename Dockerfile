FROM iojs:latest

RUN useradd -ms /bin/bash developer
WORKDIR /home/developer
USER developer

ENTRYPOINT ["node"]
EXPOSE 3000
