[在线演示](http://42.192.151.130:3003/)

## 页面结构

- 首页（默认为发现音乐页）
- 排行榜
- 歌单
- 歌手
- MV

## 未完成

- 单个排行榜页面 (表格 Bug 未解决)
- 单个歌单页面 （一样）
- 单个专辑页面

## electron 打包

- win：yarn build:win
- mac: yarn build:mac

## docker 部署

- 先运行：yarn build

- 打包镜像：docker build -t vue3-music .

  > mac m1 芯片因为是 arm64 结构，想打出 x86 的镜像必须：docker buildx build --platform linux/amd64 -t vue3-music:v1 .

- 运行：docker run -d -p 3003:80 --name vue3-music vue3-music:v1

## docker 打包好的镜像

- 前端：zard999/vue3-music
- 后端：zard999/music_server

### 如何使用

- docker login
- docker pull zard999/vue3-music
- docker pull zard999/music_server
- docker run -d -p 3003:80 --name vue3-music zard999/vue3-music
- docker run -d -p 3002:3000 --name music_server zard999/music_server

> 由于是本地打包的镜像，所以可能会有一些问题，如果有问题可以提 issue
> 如果是在服务器上运行，记得打开 3003 和 3003 端口
