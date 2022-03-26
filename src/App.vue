<!--
 * @Author: zyh
 * @Date: 2022-03-23 11:13:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 21:29:57
 * @FilePath: \vue3-music\src\App.vue
 * @Description: App
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->

<template>
  <RouterView />
  <div class="fly bg-fly-circle1"></div>
  <div class="fly bg-fly-circle2"></div>
  <div class="fly bg-fly-circle3"></div>
  <div class="fly bg-fly-circle4"></div>
</template>

<script setup lang="ts">
import { userPlayerInit } from "@/stores/player";
import { useRoute } from "vue-router";
import { watch } from "vue";
import PlayerBar from "@/components/layout/playerBar/index.vue";

const route = useRoute();

// 当参数更改时获取用户信息
watch(
  () => route.name,
  () => {
    console.log(route.meta);
  }
);
userPlayerInit();
</script>

<style lang="scss" scoped>
.fly {
  pointer-events: none;
  position: fixed;
  z-index: 9999;
}
.bg-fly-circle1 {
  left: 40px;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.07) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  animation: move 2.5s linear infinite;
}

.bg-fly-circle2 {
  left: 3%;
  top: 60%;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.08) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  animation: move 3s linear infinite;
}

.bg-fly-circle3 {
  right: 2%;
  top: 140px;
  width: 145px;
  height: 145px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.1) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  animation: move 2.5s linear infinite;
}

.bg-fly-circle4 {
  right: 5%;
  top: 60%;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: linear-gradient(
    to right,
    rgba(100, 84, 239, 0.02) 0%,
    rgba(48, 33, 236, 0.04) 100%
  );
  animation: move 3.5s linear infinite;
}

@keyframes move {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(25px);
  }

  100% {
    transform: translateY(0px);
  }
}
</style>
