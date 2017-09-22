#!/bin/bash

today=`date +%Y%m%d`
IMAGE_PATH=wangjia184/nas_proxy:client

sudo docker run -it --rm \
    -e SERVER_URL=http://192.168.2.103:5000 \
	$IMAGE_PATH  #/bin/bash
