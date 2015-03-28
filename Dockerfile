FROM iojs:latest

RUN useradd -ms /bin/bash developer
WORKDIR /home/developer
USER developer

CMD ["/usr/local/bin/node", "/home/developer/index.js"]
ENTRYPOINT ["node"]
EXPOSE 3000
