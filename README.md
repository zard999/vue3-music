[在线演示](http://42.192.151.130:3003/)

## 依赖

- Tailwind：Tailwind CSS 是一个功能类优先的 CSS 框架，它集成了诸如 flex, pt-4, text-center 和 rotate-90 这样的的类，它们能直接在脚本标记语言中组合起来，构建出任何设计。
  - https://blog.csdn.net/wuovo233/article/details/117425047

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
