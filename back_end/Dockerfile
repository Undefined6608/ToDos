# 运行环境
FROM node:14.17.4 as base
# 维护者信息
MAINTAINER The CentOS Project <15506531157@163.com>
# 在一台机器中，用这个镜像创建一个容器时，相对于这台机器的根目录下面的src文件夹
WORKDIR /src
# node 比较不稳定，容易内存溢出
RUN npm install -g forever
# 需要package.json 告诉程序运行需要安装的依赖。所以拷贝了package.json和package-lock.json到工作目录
COPY package*.json /src/
# 抛出 6000 端口
EXPOSE 6000
# 这一步和第一步很像，从base镜像创建一个开发环境的镜像
FROM base as dev
# 设置development 环境
ENV NODE_ENV=development
# RUN指令在构建时将会生成一个新的镜像层，并且执行RUN指令后面的内容
RUN npm install
# COPY 命令 指从外部往容器内添加文件。但是COPY指令只支持基本的文件和文件夹拷贝功能
COPY . .
# 和RUN不同的是，这些命令不是在镜像构建的过程中执行的，而是在用镜像构建容器后被调用
CMD ["npm", "run", "start"]
