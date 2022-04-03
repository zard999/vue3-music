<!--
 * @Author: zyh
 * @Date: 2022-03-24 11:18:37
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-02 22:28:33
 * @FilePath: \vue3-music\src\views\discover\RecommendSongs.vue
 * @Description: 推荐歌手
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="mt-10 recommend-singer">
    <Title :title="'推荐歌手'" v-if="!loading" />
    <SingerItem :hotSinger="hotSinger" />
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/common/Title.vue";
import { useSingerStore } from "@/stores/singer";
import { onMounted, toRefs } from "vue";
import SingerItem from "@/components/common/SingerItem.vue";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/global";
const { loading } = storeToRefs(useGlobalStore());
const { isLoading } = useGlobalStore();
const { hotSinger } = toRefs(useSingerStore());
const { getHotSinger } = useSingerStore();

onMounted(async () => {
  await getHotSinger();
  isLoading(false);
});
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
