<!--
 * @Author: zyh
 * @Date: 2022-03-23 12:58:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-28 15:58:35
 * @FilePath: \vue3-music\src\views\mvideo\MVideo.vue
 * @Description: 发现
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="mv-wrap container">
    <div class="filter">
      <ul class="tag-lang">
        <li
          v-for="item of areaList"
          :key="item.value"
          :class="area == item.value ? 'active' : ''"
          @click="chooseType('area', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-lang tag-type">
        <li
          v-for="item of classifys"
          :key="item.value"
          :class="classify == item.value ? 'active' : ''"
          @click="chooseType('classify', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
      <ul class="tag-lang">
        <li
          v-for="item of sortList"
          :key="item.value"
          :class="sort == item.value ? 'active' : ''"
          @click="chooseType('sort', item.value)"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
    <!-- <load-more @scroll-state="load"> -->
    <mv-list :mvs="mvs" type="mv"></mv-list>
    <!-- </load-more> -->
    <div v-if="loading" class="load-bottom">
      <nice-loading />
    </div>
  </div>
</template>

<script setup lang="ts">
import { createVideo } from "@/utils/tools";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useMvideoStore } from "@/stores/mvideo";
import MvList from "@/components/common/MvList.vue";
// import loadMore from "components/common/loadMore/Index";

const {
  areaList,
  area,
  classifys,
  classify,
  sortList,
  sort,

  mvs,
  loading,
} = storeToRefs(useMvideoStore());
const { getMvAll, chooseType, load } = useMvideoStore();

onMounted(() => {
  getMvAll();
});
</script>
<style lang="scss" scoped>
.mv-wrap {
  // height: 100vh;
  margin-top: -20px;
  li {
    &:hover {
      color: #3ad49c;
      transition: all 0.4s;
    }
  }
  .tag-en {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    li {
      width: 56px;
      height: 28px;
      margin-right: 14px;
      text-align: center;
      line-height: 29px;
      border-radius: 50%;
      font-size: 13px;
      color: #333333;
      cursor: pointer;
      &:first-child,
      &.last-child {
        width: 56px;
        border-radius: 14px;
      }
      &.active {
        background: #3ad49c;
        font-weight: 700;
        color: #ffffff;
      }
      &:hover {
        color: #3ad49c;
        transition: all 0.4s;
      }
    }
  }
  .tag-lang {
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    li {
      width: 56px;
      height: 28px;
      line-height: 29px;
      font-size: 13px;
      text-align: center;
      border-radius: 14px;
      cursor: pointer;
      margin-right: 6px;
      &.active {
        background: #3ad49c;
        font-weight: 700;
        color: #ffffff;
      }
    }
  }
  .tag-type {
    li {
      width: auto;
      padding: 0 15px;
    }
  }
  .singer-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 30px;
    margin: 30px -15px 0;
  }
}
</style>
