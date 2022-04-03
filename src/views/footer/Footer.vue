<!--
 * @Author: zyh
 * @Date: 2022-03-24 22:12:11
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 23:05:26
 * @FilePath: \vue3-music\src\views\footer\Footer.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="footer flex justify-center" v-if="!loading">
    <div class="copyright">
      <div class="container flex-column">
        <p>
          <span class="mr5">Copyright © 2021-2022</span>
          <a href="https://github.com/zard999">Zard 演示站</a>
          <span>. Designed by</span>
          <a href="https://www.zhangyonghui.top" target="_blank">ZYH</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/global";
const { loading } = storeToRefs(useGlobalStore());
</script>
<style lang="scss" scoped>
.footer {
  width: 100%;
  .copyright {
    padding: 1.3rem 0;
    .container {
      padding: 0;
      color: #6d7685;
      font-size: 0.8125rem;
      a {
        color: #6d7685;
        margin-left: 5px;
        transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        &:hover {
          color: #333;
        }
      }
    }
  }
}
</style>
