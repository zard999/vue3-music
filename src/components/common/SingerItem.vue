<!--
 * @Author: zyh
 * @Date: 2022-03-27 21:33:26
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-27 21:36:52
 * @FilePath: \vue3-music\src\components\common\SingerItem.vue
 * @Description: 歌手列表
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="singer-list">
    <div class="singer-item" v-for="item in hotSinger" :key="item.id">
      <div class="cover">
        <div class="image cursor-pointer" @click="toSingerDetail(item)">
          <el-image
            :key="item.img1v1Url + '?param=200y200'"
            :src="item.img1v1Url + '?param=200y200'"
            lazy
          >
            <template #placeholder>
              <div class="image-slot">
                <IconPark
                  :icon="LoadingOne"
                  class="mr-1 ml-10 mt-10"
                  :size="18"
                />
              </div>
            </template>
          </el-image>
        </div>
      </div>
      <div class="info">
        <p class="name ellipsis">{{ item.name }}</p>
        <p class="count" v-if="item.musicSize">单曲数{{ item.musicSize }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoadingOne } from "@icon-park/vue-next";
import IconPark from "@/components/common/IconPark.vue";
import { useSingerStore } from "@/stores/singer";

defineProps<{
  hotSinger: any[];
}>();

const { toSingerDetail } = useSingerStore();
</script>

<style lang="scss" scoped>
.singer-list {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  margin: 0px -15px 0;
  .singer-item {
    padding: 0 15px 30px;
    flex: 0 0 10%;
    max-width: 10%;

    .cover {
      position: relative;
      z-index: 2;
      padding-top: 100%;
      border-radius: 50%;
      background-color: #d9d9d9;
      .image {
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        width: 100%;
        height: 100%;
        border-radius: 50%;

        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
        }

        &:after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          -webkit-box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.05) inset,
            -1px -1px 0 rgba(0, 0, 0, 0.05) inset;
          box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.05),
            inset -1px -1px 0 rgba(0, 0, 0, 0.05);
        }
      }
    }

    .info {
      margin-top: 15px;
      text-align: center;

      .name {
        font-weight: 700;
        font-size: 14px;
        line-height: 18px;
        word-break: break-word;
      }

      .count {
        font-size: 12px;
        margin-top: 10px;
        color: #33d39f;
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
