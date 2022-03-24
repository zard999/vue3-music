/*
 * @Author: zyh
 * @Date: 2022-03-23 20:50:05
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 14:16:00
 * @FilePath: \music-item\src\stores\common.ts
 * @Description: banner store
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
