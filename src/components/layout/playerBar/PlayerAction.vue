<!--
 * @Author: zyh
 * @Date: 2022-03-25 11:06:43
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 15:20:20
 * @FilePath: \vue3-music\src\components\layout\playerBar\PlayerAction.vue
 * @Description: 歌词和播放列表
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="flex justify-end items-center gap-x-2.5">
    <span class="text-xs">
      {{ useFormatDuring2(currentTime) }} / {{ useFormatDuring2(duration) }}
    </span>
    <IconPark
      :icon="TextMessage"
      size="18"
      :stroke-width="3"
      class="hover-text"
      title="歌词"
      @click="showLyric = !showLyric"
    />
    <div class="flex items-center hover-text" @click="showPlayList = true">
      <IconPark
        :icon="MusicList"
        size="18"
        :stroke-width="3"
        class="hover-text"
        title="播放列表"
      />
      <span class="text-xs">{{ playListCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MusicList, TextMessage } from "@icon-park/vue-next";
import { useFormatDuring2 } from "@/utils/tools";
import { usePlayerStore } from "@/stores/player";
import IconPark from "@/components/common/IconPark.vue";
import { storeToRefs } from "pinia";

const { currentTime, duration, playListCount, showPlayList, showLyric } =
  storeToRefs(usePlayerStore());
  
</script>

<style lang="scss"></style>
