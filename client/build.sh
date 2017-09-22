#!/bin/bash


today=`date +%Y%m%d`

sudo docker build -t="wangjia184/nas_proxy:client" .
sudo docker push wangjia184/nas_proxy:client
echo "wangjia184/nas_proxy:client"