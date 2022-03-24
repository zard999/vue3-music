<!--
 * @Author: zyh
 * @Date: 2022-03-23 12:58:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 15:43:34
 * @FilePath: \music-item\src\views\Discover\discover.vue
 * @Description: 发现
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div>
    <banner />
    <recommend-play-list />
    <recommend-music />
    <recommend-songs />
  </div>
</template>

<script setup lang="ts">
import Banner from "@/components/layout/discover/Banner.vue";
import RecommendPlayList from "@/views/discover/RecommendPlayList.vue";
import RecommendMusic from "@/views/discover/RecommendMusic.vue";
import RecommendSongs from "@/views/discover/RecommendSongs.vue";
</script>

<style></style>
