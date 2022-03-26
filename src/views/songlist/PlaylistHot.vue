<!--
 * @Author: zyh
 * @Date: 2022-03-26 15:32:18
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 16:34:39
 * @FilePath: \vue3-music\src\views\songlist\PlaylistHot.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="grid grid-flow-row grid-cols-8 2xl:grid-cols-12 gap-2.5">
    <div
      class="button-dc"
      @click="catClick('全部', -1)"
      :class="{ active: currentIndex === -1 }"
    >
      全部
    </div>
    <div
      v-for="(tag, index) in tags"
      :key="tag.id"
      class="button-dc"
      @click="catClick(tag.name, index)"
      :class="{ active: currentIndex === index }"
    >
      {{ tag.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePlaylistHighqualityTags } from "@/api/index";
import { useRouter } from "vue-router";
import type { PlaylistHighqualityTag } from "@/models/SongList/index";

const emit = defineEmits<{
  (e: "catChange", cat: string): void;
}>();

const catClick = (cat: string, index: number) => {
  currentIndex.value = index;
  emit("catChange", cat);
};

let currentIndex = ref(-1);

const router = useRouter();
const tags = ref<PlaylistHighqualityTag[]>();

onMounted(async () => {
  tags.value = await usePlaylistHighqualityTags();
});
</script>

<style lang="scss" scoped>
.active {
  background-color: #32d4a5;
  color: #fff;
}
.button-dc:hover {
  background-color: #32d4a5;
  color: #fff;
}
</style>
