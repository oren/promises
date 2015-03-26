FROM iojs:onbuild

RUN useradd -ms /bin/bash developer
WORKDIR /home/developer
USER developer

EXPOSE 3000

