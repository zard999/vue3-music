/*
 * @Author: zyh
 * @Date: 2022-03-23 20:50:05
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 14:42:47
 * @FilePath: \vue3-music\src\stores\common.ts
 * @Description: 轮播图store
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import { useBanner } from "@/api/index";
import type { IBanner } from "@/models/banner";

export const useCommonStore = defineStore("common", () => {
  const banners = ref<IBanner[]>([]);
  const getBanners = async () => {
    if (banners.value.length > 0) return;
    banners.value = await useBanner();
  };
  return {
    banners,
    getBanners,
  };
});
