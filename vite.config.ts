/*
 * @Author: zyh
 * @Date: 2022-03-23 11:13:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-23 11:33:20
 * @FilePath: \music-item\vite.config.ts
 * @Description: vite配置文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx"; // 通过 HMR 提供 Vue 3 JSX 和 TSX 支持。
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // base: './', // 打包路径
  build: {
    outDir: "docs",
  },
  server: {
    port: 4000, // 服务端口号
    open: true, // 服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
  },
});
