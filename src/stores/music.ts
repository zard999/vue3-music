/*
 * @Author: zyh
 * @Date: 2022-03-24 16:12:21
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 16:53:09
 * @FilePath: \music-item\src\stores\music.ts
 * @Description: music store
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import type { Personalized, PersonalizedNewSong } from "@/models/personalized";
import { usePersonalized, usePersonalizedNewSong } from "@/api/index";

export const useMusicStore = defineStore("music", () => {
  const personalized = ref<Personalized[]>([]);
  const getPersonalized = async () => {
    if (personalized.value.length) return;
    personalized.value = await usePersonalized(24);
  };

  const personalizedNewSong = ref<PersonalizedNewSong[]>([]);
  const getPersonalizedNewSong = async () => {
    if (personalizedNewSong.value.length) return;
    personalizedNewSong.value = await usePersonalizedNewSong();
  };
  return {
    personalized,
    getPersonalized,

    personalizedNewSong,
    getPersonalizedNewSong,
  };
});
