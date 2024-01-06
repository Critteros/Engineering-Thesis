FROM ghcr.io/xu-cheng/texlive-full:latest

RUN apk add py3-pip
RUN pip install Pygments==2.17.2 --break-system-packages
RUN apk add inkscape