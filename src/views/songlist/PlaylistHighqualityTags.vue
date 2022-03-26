<!--
 * @Author: zyh
 * @Date: 2022-03-26 15:32:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 15:51:21
 * @FilePath: \vue3-music\src\views\songlist\PlaylistHighqualityTags.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template></template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { PlaylistHighqualityTag } from "@/models/SongList/index";
import { usePlaylistHighqualityTags } from "@/api/index";

const tags = ref<PlaylistHighqualityTag[]>();

onMounted(async () => {
  tags.value = await usePlaylistHighqualityTags();
});
</script>
<style lang="scss"></style>
