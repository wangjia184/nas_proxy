#!/bin/bash

IMAGE_PATH=wangjia184/nas_proxy:server

sudo docker rm -f nas_proxy;
sudo docker run -ti --name nas_proxy \
    -p 5000:5000 \
    -p 18080:18080 \
	$IMAGE_PATH  #/bin/bash
