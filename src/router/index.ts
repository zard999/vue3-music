/*
 * @Author: zyh
 * @Date: 2022-03-23 12:08:27
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-23 16:50:15
 * @FilePath: \music-item\src\router\index.ts
 * @Description: 路由表
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import { createRouter, createWebHashHistory } from "vue-router";
import { Pages } from "@/router/pages";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: Pages.home,
      component: () => import("@/views/Rank.vue"),
      redirect: { name: Pages.discover },
      children: [
        {
          path: "discover",
          name: Pages.discover,
          component: () => import("@/views/discover/Discover.vue"),
          meta: {
            menu: "discover",
            keepAlive: true,
          },
        },
        {
          path: "rank",
          name: Pages.rank,
          component: () => import("@/views/rank/Rank.vue"),
          meta: {
            menu: "rank",
            keepAlive: true,
          },
        },
        {
          path: "playlist",
          name: Pages.playlist,
          component: () => import("@/views/playlist/Playlist.vue"),
          meta: {
            menu: "playlist",
            keepAlive: true,
          },
        },
        {
          path: "singer",
          name: Pages.singer,
          component: () => import("@/views/singer/Singer.vue"),
          meta: {
            menu: "singer",
            keepAlive: true,
          },
        },
        {
          path: "video",
          name: Pages.video,
          component: () => import("@/views/videoview/Video.vue"),
          meta: {
            menu: "video",
            keepAlive: true,
          },
        },
        {
          path: "mvideo",
          name: "mvideo",
          component: () => import("@/views/mvideo/MVideo.vue"),
          meta: {
            menu: "mvideo",
            keepAlive: true,
          },
        },
      ],
    },
  ],
});

export default router;
