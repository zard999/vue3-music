<!--
 * @Author: zyh
 * @Date: 2022-03-23 14:15:51
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 10:12:22
 * @FilePath: \music-item\src\components\layout\header\SearchPop.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <el-popover
    popper-style="max-width:auto;padding:0;"
    width="250px"
  >
    <template #reference>
      <ElInput
        placeholder="搜索音乐、MV、歌单"
        :prefix-icon="Search"
        clearable
      />
    </template>
    <div class="h-96">
      <el-scrollbar>
        <div class="pb-2.5">
          <div v-if="showHot">
            <div class="pt-2 pb-1.5 px-2.5">热门搜索</div>
            <div>
              <div
                class="py-2.5 px-2.5 hover-text cursor-pointer flex justify-between items-center text-xs"
              >
                <div>
                  <span class="mr-1">{{ 1 }}.</span>
                  <span>{{ 2 }}</span>
                </div>
                <div class="text-red-300 text-xs">
                  {{ 3 }}
                </div>
              </div>
            </div>
          </div>
          <!-- <SearchSuggest v-else/> -->
        </div>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { Search } from "@icon-park/vue-next";
</script>

<style></style>
