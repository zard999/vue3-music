<!--
 * @Author: zyh
 * @Date: 2022-03-23 11:59:40
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-23 16:10:57
 * @FilePath: \music-item\src\views\index.vue
 * @Description: 主页
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->

<template>
  <div class="w-screen h-screen flex items-stretch overflow-hidden">
    <!-- <div class="w-56 h-screen flex-shrink-0 bg-blue-700"></div> -->
    <div class="flex-1 flex flex-col">
      <div class="h-14">
        <Header />
      </div>
      <div class="flex-1 overflow-hidden">
        <ElScrollbar>
          <div class="container mx-auto">
            <RouterView />
          </div>
        </ElScrollbar>
      </div>
      <div class="h-20">
        <Footer />
      </div>
    </div>

    <PlayList />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/layout/header/Header.vue";
</script>

<style></style>
