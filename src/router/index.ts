/*
 * @Author: zyh
 * @Date: 2022-03-23 12:08:27
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-03 14:07:37
 * @FilePath: \vue3-music\src\router\index.ts
 * @Description: 路由表
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import { createRouter, createWebHashHistory } from "vue-router";
import { routes } from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
