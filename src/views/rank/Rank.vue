<!--
 * @Author: zyh
 * @Date: 2022-03-23 12:58:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 16:06:16
 * @FilePath: \vue3-music\src\views\rank\Rank.vue
 * @Description: 发现
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <Title :title="'官方榜'" />
  <!-- <div class="text-xl pb-5 font-bold">官方榜</div> -->
  <div class="grid grid-flow-row grid-cols-2 2xl:grid-cols-4 gap-5">
    <!-- @click="toPlaylist(item)" -->
    <div
      v-for="item in topListDetailData.slice(0, 4)"
      :key="item.id"
      class="cover flex bg-dc rounded-lg items-center cursor-pointer"
      @click="toDetail(item)"
    >
      <CoverPlay
        :name="item.name"
        :pic-url="item.coverImgUrl"
        :play-count="item.playCount"
        class="w-36 flex-shrink-0"
        show-play-count
      />
      <div class="px-5 flex-1 flex-shrink-0 flex flex-col">
        <div class="text-xl font-bold">{{ item.name }}</div>
        <div class="text-xs text-main mt-2">
          <div v-for="(track, index) in item.tracks" class="mt-2">
            <div class="flex">
              <span class="mr-1">{{ index + 1 }}</span>
              <div class="flex-auto w-20 truncate">
                {{ track.first }} - {{ track.second }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Title :title="'特色榜'" />
  <!-- <div class="text-xl py-5 font-bold">特色榜</div> -->
  <div class="grid grid-flow-row grid-cols-8 2xl:grid-cols-10 gap-5 pb-4">
    <!-- @click="toPlaylist(item)" -->
    <div v-for="item in topListDetailData.slice(4)" :key="item.id">
      <CoverPlay
        :name="item.name"
        :pic-url="item.coverImgUrl"
        :play-count="item.playCount"
        class="cover"
        @click="toDetail(item)"
      />
      <div class="text-sm mt-2 font-bold flex justify-center">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, toRefs } from "vue";
import { useRouter } from "vue-router";
import CoverPlay from "@/components/common/CoverPlay.vue";
import Title from "@/components/common/Title.vue";
import { useMusicStore } from "@/stores/music";
import type { TopListDetail } from "@/models/Rank/toplist_detail";

const { topListDetailData } = toRefs(useMusicStore());
const { getTopListDetailData } = useMusicStore();
const router = useRouter();
// 跟歌单是同一个
const toDetail = (item: any) => {
  let query = {
    id: item.id,
  };
  router.push({
    name: "songlistDetail",
    query,
  });
};
onMounted(async () => {
  await getTopListDetailData();
});
const toPlaylist = (topListDetail: TopListDetail) => {
  router.push({ name: "playlist", query: { id: topListDetail.id } });
};
</script>

<style lang="scss"></style>
