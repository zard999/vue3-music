/*
 * @Author: zyh
 * @Date: 2022-03-23 11:13:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 10:37:30
 * @FilePath: \vue3-music\src\main.ts
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
import "@/utils/extend";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount("#app");
