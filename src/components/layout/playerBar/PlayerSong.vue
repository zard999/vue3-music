<!--
 * @Author: zyh
 * @Date: 2022-03-25 11:03:40
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 21:46:13
 * @FilePath: \vue3-music\src\components\layout\playerBar\PlayerSong.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="flex player-song">
    <img
      alt=""
      class="w-11 h-11 rounded cursor-pointer"
      :src="song.al?.picUrl || OpticalDisk"
      @click="showLyric = !showLyric"
    />
    <div class="ml-2 text-xs flex flex-col justify-between">
      <div class="w-52 2xl:w-96 cursor-pointer truncate">
        <div class="flex">
          <div
            v-if="songUrl.freeTrialInfo?.end > 0"
            class="bg-red-500 text-xs text-white rounded px-0.5 scale-75"
          >
            试听
          </div>
          <span>{{ song.name || "王杰" }}</span>
          <span class="ml-2 text-dc"
            >- {{ song.ar?.first().name || `谁明浪子心` }}</span
          >
        </div>
      </div>
      <div class="flex gap-x-3 text-main">
        <IconPark
          :icon="Like"
          size="18"
          :stroke-width="3"
          class="text-slate-400 hover-text"
        />
        <IconPark
          :icon="DownTwo"
          size="18"
          :stroke-width="3"
          class="text-slate-400 hover-text"
        />
        <IconPark
          :icon="MoreTwo"
          size="18"
          :stroke-width="3"
          class="text-slate-400 hover-text"
        />
        <el-badge :value="1000" :max="999" class="badge">
          <IconPark
            :icon="Comment"
            size="18"
            :stroke-width="3"
            class="text-slate-400 hover-text"
          />
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Like, DownTwo, MoreTwo, Comment } from "@icon-park/vue-next";
import { usePlayerStore } from "@/stores/player";
import { OpticalDisk } from "@/assets/img";
import IconPark from "@/components/common/IconPark.vue";
import { toRefs } from "vue";

const { song, songUrl, showLyric } = toRefs(usePlayerStore());
</script>

<style lang="scss">
.player-song {
  .badge {
    .el-badge__content {
      @apply scale-75 left-1 bg-stone-100 text-slate-500 bg-opacity-80 right-auto;
      @apply dark:bg-stone-900;
    }
  }
}
</style>
