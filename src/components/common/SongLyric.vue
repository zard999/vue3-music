<!--
 * @Author: zyh
 * @Date: 2022-03-25 14:42:43
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 19:55:54
 * @FilePath: \vue3-music\src\components\common\SongLyric.vue
 * @Description: 歌词
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <!-- 歌词滚动 -->
  <el-scrollbar ref="scrollBarRef" class="h-80 mt-6">
    <div
      class="cursor-pointer"
      v-if="formatedLyrics && formatedLyrics.length > 0"
    >
      <div
        v-for="(lyric, index) in formatedLyrics"
        :key="index"
        class="lyric-item pb-5 text-sm text-gray-60 bg-opacity-5"
        :class="lyricClass(lyric.text, index)"
      >
        <div>{{ lyric.text }}</div>
        <div>{{ lyric.transText }}</div>
      </div>
      <!-- 歌词贡献者 -->
      <div
        class="lyric-item pb-5 text-sm text-gray-600 bg-opacity-5"
        v-if="lyricUser"
      >
        歌词贡献者：<span>{{ lyricUser.nickname }}</span>
      </div>
      <!-- 歌词翻译贡献者 -->
      <div
        class="lyric-item pb-5 text-sm text-gray-600 bg-opacity-5"
        v-if="transLyricUser"
      >
        歌词贡献者：<span>{{ transLyricUser.nickname }}</span>
      </div>
    </div>
    <div
      v-else
      class="flex items-center justify-center h-full text-sm text-gray-800"
    >
      纯音乐，请您欣赏
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, toRefs, watch, computed, reactive } from "vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { formatLyric } from "@/utils/tools";
import type { IlyricUser } from "@/models/Lyric/index";

const props = defineProps<{
  lyric: string /** 歌曲歌词，为空字符串代表歌曲没有歌词 */;
  transLyric?: string /** 翻译歌曲歌词，为空字符串代表歌曲没有歌词 */;
  lyricUser?: IlyricUser /** 歌词贡献者 */;
  transLyricUser?: IlyricUser /** 翻译歌词贡献者 */;
}>();
let src = reactive({
  list: new Array<object>(),
});

src.list.push({
  text: "",
});

console.log("lyric", props.lyric);
/** 滚动条ref */
const scrollBarRef = ref();
/** 当前播放的歌词的索引 */
const currentLyricIndex = ref(0);

/** 格式化后的歌词数组 */
const formatedLyrics = computed(() => {
  if (!props.transLyric) {
    return formatLyric(props.lyric);
  } else {
    const lyricList = formatLyric(props.lyric);
    const transLyricList = formatLyric(props.transLyric);
    return lyricList.map((item) => {
      const findResult = transLyricList.find(
        (transItem) => item.time === transItem.time
      );
      if (findResult) {
        return {
          ...item,
          transText: findResult.text,
        };
      }
      return item;
    });
  }
});
/** 歌曲当前播放时间 */

const lyricClass = (text: string, index: number) => {
  return {
    "text-[16px] text-green-500 font-medium":
      currentLyricIndex.value === index - 1 &&
      !text.includes("作词") &&
      !text.includes("作曲"),
  };
};

const { currentTime } = storeToRefs(usePlayerStore());

watch(
  () => currentTime.value,
  (newTime, oldTime) => {
    if (newTime !== oldTime) {
      /** 获取比当前播放时间大的第一个元素 */
      for (let i = 0; i < formatedLyrics.value.length; i++) {
        if (
          Math.floor(formatedLyrics.value[i].time) ===
          Math.floor(currentTime.value)
        ) {
          currentLyricIndex.value = i - 1;
          break;
        } else if (
          Math.floor(formatedLyrics.value[i].time) >
          Math.floor(currentTime.value)
        ) {
          currentLyricIndex.value = i - 2;
          break;
        }
      }
      let height = 0;
      if (currentLyricIndex.value !== 0) {
        const lyricEles = document.querySelectorAll(".lyric-item");
        lyricEles.forEach((ele, index) => {
          if (currentLyricIndex.value >= index) {
            height += ele.clientHeight;
          }
        });
        if (height >= 160) {
          scrollBarRef.value?.setScrollTop(height - 160 + 20);
        }
      }
    }
  }
);
</script>

<style lang="scss" scoped>
:deep(.el-scrollbar__view) {
  height: 100%;
}
</style>
