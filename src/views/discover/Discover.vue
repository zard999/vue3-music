<!--
 * @Author: zyh
 * @Date: 2022-03-23 12:58:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-02 22:34:52
 * @FilePath: \vue3-music\src\views\discover\Discover.vue
 * @Description: 发现
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div v-loading="loading">
    <banner />
    <recommend-play-list :loading="loading" />
    <recommend-music :loading="loading" />
    <recommend-songs :loading="loading" />
  </div>
</template>

<script setup lang="ts">
import Banner from "@/components/layout/discover/Banner.vue";
import RecommendPlayList from "@/views/discover/RecommendPlayList.vue";
import RecommendMusic from "@/views/discover/RecommendMusic.vue";
import RecommendSongs from "@/views/discover/RecommendSongs.vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/global";
const { loading } = storeToRefs(useGlobalStore());
</script>

<style></style>
