/*
 * @Author: zyh
 * @Date: 2022-03-24 18:22:39
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 18:26:59
 * @FilePath: \music-item\src\stores\singer.ts
 * @Description: 热门歌手
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Singer } from "@/models/singer";
import { useHotSinger } from "@/api";

export const useSingerStore = defineStore("singer", () => {
  const hotSinger = ref<Singer[]>([]);
  const getHotSinger = async () => {
    if (hotSinger.value.length) return;
    hotSinger.value = await useHotSinger();
  };
  return {
    hotSinger,
    getHotSinger,
  };
});
