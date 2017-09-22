#!/bin/bash


today=`date +%Y%m%d`

sudo docker build -t="wangjia184/nas_proxy:server" .
sudo docker push wangjia184/nas_proxy:server
echo "wangjia184/nas_proxy:server"