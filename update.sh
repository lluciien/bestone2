#!/bin/bash
set -e

APP_DIR="$HOME/bestone2"
CONTAINER_NAME="bestone2-container"
IMAGE_NAME="bestone2-app"

cd $APP_DIR

echo "🔄 正在停止容器..."
docker stop $CONTAINER_NAME || true

echo "🔁 更新代码..."
git fetch --all
git reset --hard origin/main

echo "🏗️ 重建镜像..."
docker build -t $IMAGE_NAME . --no-cache

echo "🚀 启动新容器..."
docker rm $CONTAINER_NAME 2>/dev/null || true
docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME

echo "🧹 清理旧镜像..."
docker image prune -f

echo "✅ 更新完成！访问 http://你的IP:3000 验证"
