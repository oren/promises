FROM iojs:latest

RUN useradd -ms /bin/bash developer
WORKDIR /home/developer
USER developer

ENTRYPOINT ["node", "/home/developer/index.js"]
EXPOSE 3000
