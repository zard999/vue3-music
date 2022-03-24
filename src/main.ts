/*
 * @Author: zyh
 * @Date: 2022-03-23 11:13:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 10:38:36
 * @FilePath: \music-item\src\main.ts
 * @Description: main
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/base.scss";
import "@/assets/theme.scss";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");
