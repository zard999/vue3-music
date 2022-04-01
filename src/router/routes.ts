/*
 * @Author: zyh
 * @Date: 2022-03-25 20:50:56
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 17:49:02
 * @FilePath: \vue3-music\src\router\routes.ts
 * @Description: 路由表
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import { Pages } from "./pages";

/**
 * 404
 */
// export const pageError = {
//   path: "/:pathMatch(.*)*",
//   name: "404",
//   meta: {
//     title: "404-您访问的页面不存在",
//   },
//   component: () => import("@/views/error/404.vue"),
// };

// 登录路由
export const loginRouter = [
  {
    path: "/login",
    name: Pages.login,
    meta: {
      title: "登录",
      isLogin: false,
    },
    component: () => import("@/views/login/Login.vue"),
  },
];

// 主路由
export const appRouter = [
  {
    path: "/",
    name: Pages.home,
    component: () => import("@/views/index.vue"),
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
        path: "songlist",
        name: "songlist",
        component: () => import("@/views/songlist/Songlist.vue"),
        meta: {
          menu: "songlist",
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
      // {
      //   path: "video",
      //   name: Pages.video,
      //   component: () => import("@/views/videoview/Video.vue"),
      //   meta: {
      //     menu: "video",
      //     keepAlive: true,
      //   },
      // },
      {
        path: "mvideo",
        name: "mvideo",
        component: () => import("@/views/mvideo/MVideo.vue"),
        meta: {
          menu: "mvideo",
          keepAlive: true,
        },
      },
      // 歌手详情
      {
        path: "/singerDetail",
        name: "singerDetail",
        component: () => import("@/views/singer/SingerDetail.vue"),
      },
      {
        path: "/mvDetail",
        name: "mvDetail",
        component: () => import("@/views/mvideo/MVDetail.vue"),
      },
      // 歌曲详情
      {
        path: "/songlistDetail",
        name: "songlistDetail",
        component: () => import("@/views/songlist/detail/index.vue"),
      },
      // 专辑详情
      {
        path: "/albumDetail",
        name: "albumDetail",
        component: () => import("@/views/album/albumDetail.vue"),
      },
    ],
  },
];

export const routes = [...appRouter, ...loginRouter];
