#!/bin/bash
set -e

# 配置区
REPO_URL="https://github.com/lluciien/bestone2.git"
APP_NAME="bestone2-app"
CONTAINER_NAME="bestone2-container"
PORT=3000
DOMAIN=""  # 填写你的域名（可选）

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 错误处理
trap 'echo -e "${RED}脚本被中断！执行清理...${NC}"; docker rm -f ${CONTAINER_NAME} || true; exit 1' SIGINT

# 检查依赖
check_deps() {
    if ! command -v docker &> /dev/null; then
        echo -e "${YELLOW}安装Docker...${NC}"
        curl -fsSL https://get.docker.com | sh
        systemctl enable --now docker
    fi

    if ! command -v docker-compose &> /dev/null; then
        echo -e "${YELLOW}安装Docker Compose...${NC}"
        curl -L "https://github.com/docker/compose/releases/download/v2.27.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
        chmod +x /usr/local/bin/docker-compose
    fi
}

# 清理旧容器
cleanup() {
    echo -e "${YELLOW}清理旧部署...${NC}"
    docker rm -f ${CONTAINER_NAME} || true
    docker rmi ${APP_NAME} || true
}

# 生成配置文件
generate_config() {
    cat > Dockerfile <<EOF
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm config set registry https://registry.npmmirror.com && \\
    npm install --force
COPY . .
ENV NODE_ENV=production
RUN npm run build
EXPOSE 3000
CMD ["npm", "start", "--", "-H", "0.0.0.0"]
EOF

    cat > docker-compose.yml <<EOF
version: '3.8'
services:
  app:
    build: .
    ports:
      - "${PORT}:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
EOF
}

# 主流程
main() {
    echo -e "${GREEN}>>> 开始部署 bestone2 项目 <<<${NC}"
    
    check_deps
    cleanup
    
    # 克隆仓库
    if [ ! -d "bestone2" ]; then
        git clone ${REPO_URL}
    fi
    cd bestone2
    
    # 生成配置
    generate_config
    
    # 构建镜像
    echo -e "${YELLOW}开始构建Docker镜像...${NC}"
    docker build -t ${APP_NAME} . --no-cache
    
    # 运行容器
    echo -e "${YELLOW}启动容器...${NC}"
    docker-compose up -d
    
    # 健康检查
    echo -e "${YELLOW}验证部署...${NC}"
    if curl -s http://localhost:${PORT} >/dev/null; then
        echo -e "${GREEN}✅ 应用已成功运行在端口 ${PORT}${NC}"
    else
        echo -e "${RED}❌ 应用启动失败，请检查日志：docker logs ${CONTAINER_NAME}${NC}"
        exit 1
    fi
    
    # HTTPS配置（可选）
    if [ -n "$DOMAIN" ]; then
        echo -e "${YELLOW}配置HTTPS...${NC}"
        apt install nginx certbot python3-certbot-nginx -y
        certbot --nginx -d ${DOMAIN} --non-interactive
        systemctl restart nginx
        echo -e "${GREEN}✅ HTTPS已配置：https://${DOMAIN}${NC}"
    fi
    
    echo -e "${GREEN}🎉 部署完成！访问地址：http://你的服务器IP:${PORT}${NC}"
    [ -n "$DOMAIN" ] && echo -e "${GREEN}或 HTTPS 地址：https://${DOMAIN}${NC}"
}

main "$@"
