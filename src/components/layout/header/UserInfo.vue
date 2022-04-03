<!--
 * @Author: zyh
 * @Date: 2022-03-23 15:19:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 21:40:25
 * @FilePath: \vue3-music\src\components\layout\header\UserInfo.vue
 * @Description: 用户登录
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="userbox">
    <div
      class="is-login flex flex-row justify-center items-center"
      v-if="loginStatus"
    >
      <el-avatar class="avatar mr-4" :src="userInfo.avatarUrl"></el-avatar>

      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="User" command="personal"
              >个人主页</el-dropdown-item
            >
            <el-dropdown-item :icon="CircleClose" command="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div
      class="flex items-center cursor-pointer hover-text"
      @click="$router.push('login')"
      v-else
    >
      <ElAvatar size="small" round class="bg-gray-200"></ElAvatar>
      <span class="text-xs ml-1.5">点击登录</span>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useLoginStore } from "@/stores/login";
// import { storeToRefs } from "pinia";
import IconPark from "../../common/IconPark.vue";
import { ArrowDown, CircleClose, User } from "@element-plus/icons-vue";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const { handleCommand } = useLoginStore();
const { loginStatus, userInfo } = storeToRefs(useLoginStore());

console.log("loginStatus", loginStatus.value);
console.log("userInfo", userInfo.value);
</script>
<style></style>
