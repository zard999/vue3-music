<!--
 * @Author: zyh
 * @Date: 2022-03-23 12:46:46
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-23 12:46:47
 * @FilePath: \music-item\src\components\common\IconPark.vue
 * @Description: 图标
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <Component
    :is="icon"
    :theme="theme"
    :size="size"
    :spin="spin"
    :fill="fill"
    :strokeLinecap="strokeLinecap"
    :strokeLinejoin="strokeLinejoin"
    :strokeWidth="strokeWidth"
  />
</template>

<script setup lang="ts">
import type { Icon } from "@icon-park/vue-next/lib/runtime";

defineProps<{
  icon: Icon;
  theme?: "outline" | "filled" | "two-tone" | "multi-color";
  size?: number | string;
  spin?: boolean;
  fill?: string | string[];
  strokeLinecap?: "butt" | "round" | "square";
  strokeLinejoin?: "miter" | "round" | "bevel";
  strokeWidth?: number;
}>();
</script>
