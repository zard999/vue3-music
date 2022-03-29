/*
 * @Author: zyh
 * @Date: 2022-03-23 11:13:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-28 19:52:50
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
// 动画
import VueKinesis from "vue-kinesis";
// 国际化
import ElementPlus from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

const app = createApp(App);
// 国际化
app.use(ElementPlus, {
  locale: zhCn,
});

app.use(VueKinesis);
app.use(router);
app.use(createPinia());
app.mount("#app");
