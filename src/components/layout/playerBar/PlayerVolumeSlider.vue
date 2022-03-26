<!--
 * @Author: zyh
 * @Date: 2022-03-25 11:05:43
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 11:05:43
 * @FilePath: \vue3-music\src\components\layout\playerBar\PlayerVolumeSlider.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="player-volume flex flex-col items-center pt-2">
    <div>
      <el-slider
        vertical
        height="100px"
        :show-tooltip="false"
        v-model="volume"
        :max="100"
        :min="0"
        size="small"
        :disabled="muted"
        @input="setVolume"
      />
    </div>
    <div class="text-sm mt-3">{{ volume }}</div>
    <div class="mt-2">
      <IconPark
        :icon="muted ? VolumeMute : VolumeSmall"
        size="16"
        theme="filled"
        class="hover-text"
        @click="toggleMuted"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { VolumeMute, VolumeSmall } from "@icon-park/vue-next";
import { toRefs } from "vue";
import { usePlayerStore } from "@/stores/player";
import IconPark from "@/components/common/IconPark.vue";

const { volume, muted, toggleMuted, setVolume } = toRefs(usePlayerStore());
</script>
<style lang="scss">
.el-popover.el-popper {
  min-width: auto;
}
</style>
