/*
 * @Author: zyh
 * @Date: 2022-03-23 12:08:27
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-23 12:59:13
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
      component: () => import("@/views/index.vue"),
      redirect: { name: Pages.discover },
      children: [
        {
          path: "discover",
          name: Pages.discover,
          component: () => import("@/views/Discover/index.vue"),
          meta: {
            menu: "discover",
            keepAlive: true,
          },
        },
      ],
    },
  ],
});

export default router;
