/*
 * @Author: zyh
 * @Date: 2023-02-18 10:18:16
 * @LastEditors: zyh
 * @LastEditTime: 2023-02-18 10:25:14
 * @FilePath: /vue3-music/electron/preload.ts
 * @Description: preload.ts
 *
 * Copyright (c) 2023 by 穿越, All Rights Reserved.
 */
import { contextBridge, ipcRenderer } from 'electron';
import pkg from '../package.json';

window.addEventListener('DOMContentLoaded', () => {
  console.log('HTML DOMContentLoaded');
});

contextBridge.exposeInMainWorld('myIpc', {
  send: (channel: string, args: any) => {
    return ipcRenderer.send(channel, args);
  },
  on: (channel: string, listener: any) => {
    ipcRenderer.on(channel, (event, args) => listener(args));
  },
  // invoke: (channel: string, args) => {
  //   // 不推荐，推荐使用 send/sendSync => event.reply == event.sender.send == win.webContents.send/event.returnValue
  //   return ipcRenderer.invoke(channel, args);
  // },
  exit: () => {
    console.log('destroy');
    ipcRenderer.send('destroy');
  },
  getVersion: () => pkg['version']
});
