<!--
 * @Author: zyh
 * @Date: 2022-03-23 14:16:55
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 18:22:57
 * @FilePath: \vue3-music\src\components\layout\header\SearchSuggest.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div v-if="suggestData" v-for="order in suggestData.order">
    <div class="pt-2 pb-1.5 px-2.5">{{ getTitle(order) }}</div>
    <div
      v-for="item in suggestData.songs"
      :key="item.id"
      v-if="order === 'songs'"
      class="py-1.5 px-2.5 hover-bg-main text-xs cursor-pointer"
      @click="play(item.id)"
    >
      <span class="text-emerald-500">{{ item.name }}</span>
      <span class="pl-1"> - {{ item.artists.first()?.name }}</span>
    </div>
    <div
      v-for="item in suggestData.albums"
      :key="item.id"
      v-if="order === 'albums'"
      class="py-1.5 px-2.5 hover-bg-main text-xs cursor-pointer"
      @click="routerPush('albumDetail', item.id)"
    >
      <span class="text-emerald-500">{{ item.name }}</span>
      <span class="pl-1"> - {{ item.artist.name }}</span>
    </div>
    <div
      v-for="item in suggestData.artists"
      :key="item.id"
      v-if="order === 'artists'"
      class="py-1.5 px-2.5 hover-bg-main text-xs cursor-pointer flex items-center"
      @click="routerPush('singerDetail', item.id)"
    >
      <el-avatar size="small" :src="item.img1v1Url" />
      <span class="text-emerald-500 ml-2">{{ item.name }}</span>
    </div>
    <div
      v-for="item in suggestData.playlists"
      :key="item.id"
      v-if="order === 'playlists'"
      class="py-1.5 px-2.5 hover-bg-main text-xs cursor-pointer flex items-center"
      @click="routerPush('songlistDetail', item.id)"
    >
      <el-avatar size="small" :src="item.coverImgUrl" />
      <div class="text-emerald-500 ml-2 truncate flex-1 w-1">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/search";
import { usePlayerStore } from "@/stores/player";
import { useRouter } from "vue-router";

const { suggestData, showSearchView } = storeToRefs(useSearchStore());

const { play } = usePlayerStore();
const router = useRouter();

const routerPush = (name: string, id: number) => {
  router.push({ name: name, query: { id: id } }).then(() => {
    showSearchView.value = false;
  });
};

const getTitle = (name: string) => {
  switch (name) {
    case "songs":
      return "单曲";
    case "albums":
      return "专辑";
    case "artists":
      return "歌手";
    case "playlists":
      return "歌单";
    default:
      return name;
  }
};
</script>
<style lang="scss"></style>
