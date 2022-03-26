/*
 * @Author: zyh
 * @Date: 2022-03-24 16:12:21
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 10:51:37
 * @FilePath: \vue3-music\src\stores\music.ts
 * @Description: music store
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Personalized, PersonalizedNewSong } from "@/models/personalized";
import type { TopListDetail } from "@/models/Rank/toplist_detail";
import {
  usePersonalized,
  usePersonalizedNewSong,
  useTopListDetail,
} from "@/api/index";

export const useMusicStore = defineStore("music", () => {
  // 推荐歌单
  const personalized = ref<Personalized[]>([]);
  const getPersonalized = async () => {
    if (personalized.value.length) return;
    personalized.value = await usePersonalized(24);
  };

  // 推荐新歌
  const personalizedNewSong = ref<PersonalizedNewSong[]>([]);
  const getPersonalizedNewSong = async () => {
    if (personalizedNewSong.value.length) return;
    personalizedNewSong.value = await usePersonalizedNewSong();
  };

  // 排行榜
  const topListDetailData = ref<TopListDetail[]>([]);
  const getTopListDetailData = async () => {
    if (topListDetailData.value.length) return;
    topListDetailData.value = await useTopListDetail();
  };
  return {
    personalized,
    getPersonalized,

    personalizedNewSong,
    getPersonalizedNewSong,

    topListDetailData,
    getTopListDetailData,
  };
});
