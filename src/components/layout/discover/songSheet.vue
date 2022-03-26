<!--
 * @Author: zyh
 * @Date: 2022-03-24 11:35:03
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 14:41:45
 * @FilePath: \vue3-music\src\components\layout\discover\songSheet.vue
 * @Description: 发现页推荐歌单
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="list">
    <!-- @click="toDetail(item)" -->
    <div
      class="item"
      :class="numClass"
      v-for="item in sheetList"
      :key="item.id"
    >
      <div class="wrapper">
        <a>
          <div class="cover">
            <div class="image flex items-center justify-center">
              <el-image
                :key="item.picUrl || item.coverImgUrl + '?param=300y300'"
                :src="item.picUrl || item.coverImgUrl + '?param=300y300'"
                lazy
              >
                <template #placeholder>
                  <div class="image-slot">
                    <IconPark :icon="LoadingOne" class="mr-1" :size="18" />
                    <p>加载中<span class="dot">...</span></p>
                  </div>
                </template>
              </el-image>
            </div>
            <div class="count">
              <IconPark :icon="Headset" class="mr-1" :size="14" />
              <span>{{ tranNumber(item.playCount, 0) }}</span>
            </div>
          </div>
        </a>
      </div>
      <div class="info">
        <h2 class="name ellipsis-two">
          {{ item.name }}
        </h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { tranNumber } from "@/utils/tools";
import { LoadingOne, Headset } from "@icon-park/vue-next";
import IconPark from "@/components/common/IconPark.vue";
const props = defineProps({
  sheetList: {
    type: Array,
    default: () => [],
  },
  num: {
    type: Number,
    default: 8,
  },
});

const numClass = computed(() => {
  return props.num == 2 ? "two" : "eight";
});
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
  .item {
    flex: 0 0 12.5%;
    max-width: 12.5%;
    padding: 0 10px 25px;
    cursor: pointer;
    &.two {
      flex: 0 0 50%;
      max-width: 50%;
    }
    .wrapper {
      position: relative;
      padding-right: 10px;
      &:before,
      &:after {
        content: "";
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        position: absolute;
        top: 0;
        transition: all 0.4s;
      }
      &:before {
        right: 6px;
        transform: scale(0.85);
        transform-origin: 100% 50%;
        z-index: 2;
        border-radius: 2px;
        opacity: 0.9;
      }
      &:after {
        right: 1px;
        transform: scale(0.73);
        transform-origin: 100% 50%;
        z-index: 1;
        border-radius: 2px;
        opacity: 0.5;
      }
      .cover {
        position: relative;
        z-index: 2;
        padding-top: 100%;
        border-radius: 2px;
        background-color: #d9d9d9;
        .image {
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            -webkit-box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
              -1px -1px 0 rgba(0, 0, 0, 0.05) inset;
            box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.05),
              inset -1px -1px 0 rgba(0, 0, 0, 0.05);
          }
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
          }
        }
        .count {
          position: absolute;
          right: 16px;
          top: 1px;
          height: 24px;
          padding-left: 9px;
          background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
            no-repeat 0;
          background-size: cover;
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          line-height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          &:after {
            content: "";
            position: absolute;
            right: -14px;
            top: 0;
            width: 14px;
            height: 24px;
            background: url(https://img.alicdn.com/tfs/TB1xEGRub9YBuNjy0FgXXcxcXXa-268-48.png)
              no-repeat 100%;
            background-size: cover;
          }
        }
      }
    }
    .info {
      margin-top: 15px;
      .name {
        font-size: 15px;
      }
    }
  }
}

.image-slot {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
}
</style>
