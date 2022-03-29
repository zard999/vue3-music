<!--
 * @Author: zyh
 * @Date: 2022-03-23 15:19:23
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-29 23:38:00
 * @FilePath: \vue3-music\src\components\layout\header\UserInfo.vue
 * @Description: 用户登录
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="userbox">
    <div class="line"></div>
    <div
      class="is-login flex flex-row justify-center items-center"
      v-if="loginStatu"
    >
      <el-avatar class="avatar mr-4" :src="userInfo.avatarUrl"></el-avatar>
      <!-- @command="handleCommand" -->
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{ userInfo.nickname }}
          <IconPark class="inline-block" :icon="Down" :size="16" />
          <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
        </span>
        <!-- <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-user" command="personal">
            个人主页
          </el-dropdown-item>
          <el-dropdown-item icon="el-icon-medal">我的等级</el-dropdown-item>
          <el-dropdown-item icon="el-icon-setting">个人设置</el-dropdown-item>
          <el-dropdown-item
            divided
            icon="el-icon-switch-button"
            command="logout"
          >
            退出登录
          </el-dropdown-item>
        </el-dropdown-menu> -->
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
import { Down } from "@icon-park/vue-next";
import { useRouter } from "vue-router";
import { logout } from "@/api/user";
const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
const loginStatu = localStorage.getItem("loginStatu");
const router = useRouter();

const handleCommand = async (command: any) => {
  switch (command) {
    case "personal":
      router.push({
        name: "personal",
      });
      break;
    case "logout":
      var res = await logout();
      console.log(res);
      if (res.code === 200) {
        router.push({
          name: "login",
        });
        localStorage.setItem("loginStatu", "false");
        localStorage.setItem("token", "");
        localStorage.setItem("userInfo", "");
      }
      break;
    default:
      break;
  }
};
</script>
<style></style>
