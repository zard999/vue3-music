<!--
 * @Author: zyh
 * @Date: 2022-03-24 17:29:37
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 17:44:08
 * @FilePath: \music-item\src\components\common\image.vue
 * @Description: Image懒加载
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->

<template>
  <el-image
    :key="picUrl"
    :src="picUrl"
    lazy
    class="w-20 h-20 object-cover rounded flex-shrink-0"
  >
    <template #placeholder>
      <div class="image-slot mt-8">
        <IconPark :icon="LoadingOne" class="mr-1" :size="18" />
      </div>
    </template>
  </el-image>
</template>

<script setup lang="ts">
import { LoadingOne } from "@icon-park/vue-next";
defineProps({
  picUrl: {
    type: String,
    required: true,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.image-slot {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
</style>
