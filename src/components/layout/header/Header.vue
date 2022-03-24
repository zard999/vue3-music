<!--
 * @Author: zyh
 * @Date: 2022-03-23 14:09:36
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 10:54:03
 * @FilePath: \music-item\src\components\layout\header\Header.vue
 * @Description: 头部导航栏
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="flex items-center drag h-14">
    <div class="flex items-center">
      <div class="logo w-36 flex items-center mr-7 h-14">
        <div class="img" @click="toHome()"></div>
      </div>
      <IconPark
        :icon="Left"
        :size="iconSize"
        :stroke-width="2"
        class="icon-button"
        @click="router.back(1)"
      />
      <IconPark
        :icon="Right"
        :size="iconSize"
        :stroke-width="2"
        class="icon-button"
        @click="router.go(1)"
      />
    </div>

    <!-- <div class="nav flex-row">
      <div
        class="nav-Item"
        :class="{ active: currentIndex == index }"
        v-for="(item, index) in navList.arrList"
        :key="item.name"
        @click="handlerRouter(item.name, index)"
      >
        {{ item.value }}
      </div>
    </div> -->

    <el-tabs
      v-model="currentMenu"
      @tab-click="onTabClick"
      class="demo-tabs flex flex-1 justify-center"
    >
      <el-tab-pane
        v-for="menu in menus"
        :key="menu.name"
        :label="menu.label"
        :name="menu.name"
        class="text-main"
      />
    </el-tabs>
    <div class="flex items-center mr-5">
      <div class="search no-drag ml-2 mr-4">
        <SearchPop />
      </div>
      <UserInfo class="ml-4" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HamburgerButton,
  Left,
  Mail,
  Platte,
  Right,
  Search,
} from "@icon-park/vue-next";
import IconPark from "@/components/common/IconPark.vue";
import UserInfo from "@/components/layout/header/UserInfo.vue";
import { useMusicMenu } from "@/components/layout/header/MusicController";

import { ref, reactive } from "vue";
import { useRouter } from "vue-router";

const iconSize = 22;
const router = useRouter();

// tabBar
const { menus, currentMenu, onTabClick } = useMusicMenu();

// 点击logo回到home
function toHome() {
  router.push({ name: "discover" });
}
</script>

<style lang="scss" scoped>
.search {
  @apply text-xs;
  :deep(.el-input__inner) {
    @apply rounded-full text-xs bg-slate-100 dark:bg-stone-900;
  }
}

.icon-button {
  @apply p-2 cursor-pointer;
  @apply hover:text-emerald-400;
}

.logo {
  width: 146px;
  display: flex;
  align-items: center;
  margin-right: 30px;

  .img {
    width: 100%;
    display: block;
    height: 64px;
    background-position: 0px center;
    background-repeat: no-repeat;
    background-size: 146px 26px;
    background-image: url("../../../assets/images/logo.png");
    cursor: pointer;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.demo-tabs ::v-deep .el-tabs__header {
  margin: 0;
}

.nav {
  flex: 1;
  display: flex;

  .nav-Item {
    font-size: 14px;
    height: 38px;
    line-height: 38px;
    margin: 0 15px;
    cursor: pointer;
    position: relative;
    transition: all 0.4s;
    &:hover {
      color: #34d399;
    }
  }

  .active {
    color: #34d399;
    &::after {
      content: "";
      position: absolute;
      background: #34d399;
      left: 0;
      right: 0;
      bottom: 0px;
      height: 2px;
      opacity: 1;
    }
  }
}
</style>
