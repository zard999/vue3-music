<!--
 * @Author: zyh
 * @Date: 2022-03-24 11:18:37
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 16:24:48
 * @FilePath: \music-item\src\views\discover\RecommendPlayList.vue
 * @Description: 推荐歌单
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="mt-10">
    <Title :title="'推荐歌单'" />
    <song-sheet :sheetList="personalized"></song-sheet>
  </div>
</template>

<script setup lang="ts">
import songSheet from "@/components/layout/discover/songSheet.vue";
import Title from "@/components/common/Title.vue";
import { onMounted, toRefs } from "vue";
import { useMusicStore } from "@/stores/music";

const { personalized } = toRefs(useMusicStore());
const { getPersonalized } = useMusicStore();
onMounted(async () => {
  await getPersonalized();
});
</script>

<style lang="scss" scoped></style>
