/*
 * @Author: zyh
 * @Date: 2022-03-24 18:22:39
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-02 22:52:29
 * @FilePath: \vue3-music\src\stores\singer.ts
 * @Description: 热门歌手
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Singer } from "@/models/singer";
import { useHotSinger } from "@/api";
import { useRouter } from "vue-router";

export const useSingerStore = defineStore("singer", () => {
  const router = useRouter();
  const hotSinger = ref<Singer[]>([]);
  const getHotSinger = async () => {
    if (hotSinger.value.length) return;
    hotSinger.value = await useHotSinger();
  };

  // 跳到歌手页当前的歌手信息
  const singer = ref({ id: 0 });
  const toSingerDetail = (item: any) => {
    singer.value = item;
    console.log("跳转到歌手详情页", item.id);

    router.replace({ name: "singerDetail", query: { id: item.id } });
  };
  return {
    hotSinger,
    getHotSinger,
    toSingerDetail,
    singer,
  };
});
