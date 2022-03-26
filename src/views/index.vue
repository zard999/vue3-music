<!--
 * @Author: zyh
 * @Date: 2022-03-23 11:59:40
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 21:30:26
 * @FilePath: \vue3-music\src\views\Rank.vue
 * @Description: 主页
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->

<template>
  <div class="w-screen h-screen flex items-stretch overflow-hidden">
    <!-- <div class="w-56 h-screen flex-shrink-0 bg-blue-700"></div> -->
    <div class="flex-1 flex flex-col">
      <div class="h-14 pl-5 pr-5 relative z-50">
        <Header />
      </div>
      <div class="flex-1 overflow-hidden">
        <ElScrollbar>
          <div class="container mx-auto pl-5 pr-5 pt-3">
            <RouterView />
            <Footer />
          </div>
        </ElScrollbar>
      </div>
      <!-- <div class="h-20"></div> -->
    </div>
    <player-bar></player-bar>
    <PlayList />
  </div>
</template>

<script setup lang="ts">
import Header from "@/components/layout/header/Header.vue";
import Footer from "@/views/footer/Footer.vue";
import PlayList from "@/components/layout/playList/PlayList.vue";
import PlayerBar from "@/components/layout/playerBar/index.vue";
</script>

<style></style>
