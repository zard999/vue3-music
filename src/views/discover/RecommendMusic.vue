<!--
 * @Author: zyh
 * @Date: 2022-03-24 11:18:37
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-02 22:30:47
 * @FilePath: \vue3-music\src\views\discover\RecommendMusic.vue
 * @Description: 推荐歌曲
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="mt-10">
    <Title :title="'推荐歌曲'" v-if="!loading" />
    <div
      class="grid grid-flow-row grid-cols-2 2xl:grid-cols-5 gap-y-2.5 gap-x-5 cursor-pointer"
    >
      <div
        v-for="(item, index) in personalizedNewSong"
        :key="index"
        class="cover hover-bg-view transition-all flex items-center"
        @click="play(item.id)"
      >
        <Image :picUrl="item.picUrl" />
        <div class="text-xs flex-auto flex justify-between items-center w-1/3">
          <div class="mx-4">
            <div class="flex-1 truncate font-bold text-sm">
              {{ item.name }}
            </div>
            <div class="mt-1.5 text-dc">
              {{ item.song.artists[0].name }}
            </div>
          </div>
          <div class="font-bold text-sm">
            {{ useFormatDuring(item.song.duration) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import Image from "@/components/common/Image.vue";
import { onMounted, toRefs } from "vue";
import { useMusicStore } from "@/stores/music";
import { useFormatDuring } from "@/utils/tools";
import { usePlayerStore } from "@/stores/player";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/global";
const { loading } = storeToRefs(useGlobalStore());

const { play } = usePlayerStore();
const { personalizedNewSong } = toRefs(useMusicStore());
const { getPersonalizedNewSong } = useMusicStore();

onMounted(async () => {
  await getPersonalizedNewSong();
});
</script>

<style lang="scss" scoped></style>
