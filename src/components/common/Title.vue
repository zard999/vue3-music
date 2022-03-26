<!--
 * @Author: zyh
 * @Date: 2022-03-24 16:05:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 16:50:36
 * @FilePath: \vue3-music\src\components\common\Title.vue
 * @Description: 标题
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="text-xl py-3 mt-2 flex items-center">
    <div>{{ title }}</div>
    <!-- <IconPark :icon="Right" size="25" :stroke-width="2" /> -->
  </div>
</template>

<script setup lang="ts">
import { Right } from "@icon-park/vue-next";
import IconPark from "@/components/common/IconPark.vue";

defineProps<{
  title: string;
}>();
</script>

<style lang="scss"></style>
