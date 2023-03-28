/*
 * @Author: zyh
 * @Date: 2022-03-23 11:13:09
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-18 14:13:40
 * @FilePath: /vue3-music/vite.config.ts
 * @Description: vite配置文件
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { fileURLToPath, URL } from 'url';
import {resolve } from 'path';
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'; // 通过 HMR 提供 Vue 3 JSX 和 TSX 支持。
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import electronPlugin from 'vite-plugin-electron';

// https://vitejs.dev/config/
const fn = (mode: ConfigEnv): UserConfig => {
  const plugins = [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ];

  if (mode.mode === 'electron') {
    plugins.push(
      electronPlugin({
        entry: ['electron/main.ts', 'electron/preload.ts'] // 主进程文件、预加载文件
      })
    );
  }
  console.log('URL', new URL('./src', import.meta.url))
  console.log('fileURLToPath', fileURLToPath(new URL('./src', import.meta.url)));
  console.log('resolve',  resolve(__dirname, './src'))
  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // base: './', // 打包路径
    build: {
      outDir: 'dist',
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
      minify: 'esbuild',
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    server: {
      port: 4000, // 服务端口号
      open: true, // 服务启动时是否自动打开浏览器
      // cors: true, // 允许跨域
      proxy: {
        // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
        // 正则表达式写法
        '^/api': {
          target: 'http://42.192.151.130:3002', // 后端服务实际地址
          changeOrigin: true, //开启代理
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  };
};

export default defineConfig(fn);
