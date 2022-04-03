<!--
 * @Author: zyh
 * @Date: 2022-03-23 12:58:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 23:17:48
 * @FilePath: \vue3-music\src\views\singer\Singer.vue
 * @Description: 歌手
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="pb-5">
    <div v-for="option in options" :key="option.key" class="flex text-sm mb-5">
      <div class="flex-shrink-0 text-slate-400 flex items-center">
        {{ option.name }}：
      </div>
      <div class="ml-3">
        <el-space wrap :size="10" :spacer="spacer">
          <div
            type="text"
            class="hover-text px-1 py-0.5"
            :class="{
              active:
                (item.key === pageData.type && option.key === 'type') ||
                (item.key === pageData.area && option.key === 'area') ||
                (item.key === pageData.initial && option.key === 'initial'),
            }"
            v-for="(item, index) in option.list"
            :key="index"
            @click="optionChange(option.key, item.key)"
          >
            {{ item.name }}
          </div>
        </el-space>
      </div>
    </div>
  </div>
  <div class="content" v-loading="loading">
    <div
      class="grid grid-flow-row grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10 singer-list"
    >
      <SingerItem :hotSinger="artists" />
    </div>
    <div class="py-10" v-if="!loading">
      <el-button
        type="text"
        class="text-center w-full"
        @click="loadMore"
        :loading="pageData.loading"
        >加载更多</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, h } from "vue";
import type { Artist } from "@/models/artist";
import { ElDivider } from "element-plus";
import { useRouter } from "vue-router";
import { useSingerList } from "@/api/index";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/global";
const { loading } = storeToRefs(useGlobalStore());
const { isLoading } = useGlobalStore();

const spacer = h(ElDivider, { direction: "vertical" });
const router = useRouter();
const artists = ref<Artist[]>([]);
const pageData = reactive({
  init: false,
  loading: false,
  page: 1,
  limit: 60,
  initial: "-1",
  type: -1,
  area: -1,
});

const getData = async () => {
  pageData.loading = true;
  try {
    const data = await useSingerList(pageData);
    if (pageData.page === 1) {
      artists.value = data;
    } else {
      artists.value.push(...data);
    }
    pageData.init = true;
    pageData.loading = false;
  } catch (e) {
    pageData.page--;
  }
};

const load = () => {
  console.log("load");
};

const loadMore = () => {
  pageData.page++;
  getData();
};
onMounted(async () => {
  isLoading(true);
  await getData();
  isLoading(false);
});

const optionChange = (keyName: string, keyValue: number | string) => {
  console.log(keyName, keyValue);
  pageData.page = 1;
  if (keyName === "type") pageData.type = keyValue as number;
  if (keyName === "area") pageData.area = keyValue as number;
  if (keyName === "initial") pageData.initial = keyValue as string;

  getData();
};

const options: {
  name: string;
  key: string;
  list: {
    key: string | number;
    name: string;
  }[];
}[] = [
  {
    name: "语种",
    key: "area",
    list: [
      { key: -1, name: "全部" },
      { key: 7, name: "华语" },
      { key: 96, name: "欧美" },
      { key: 8, name: "日本" },
      { key: 16, name: "韩国" },
      { key: 0, name: "其他" },
    ],
  },
  {
    name: "分类",
    key: "type",
    list: [
      { key: -1, name: "全部" },
      { key: 1, name: "男歌手" },
      { key: 2, name: "女歌手" },
      { key: 3, name: "乐队组合" },
    ],
  },
  {
    name: "筛选",
    key: "initial",
    list: [
      { key: "-1", name: "热门" },
      { key: "a", name: "A" },
      { key: "b", name: "B" },
      { key: "c", name: "C" },
      { key: "d", name: "D" },
      { key: "e", name: "E" },
      { key: "f", name: "F" },
      { key: "g", name: "G" },
      { key: "h", name: "H" },
      { key: "i", name: "I" },
      { key: "j", name: "J" },
      { key: "k", name: "K" },
      { key: "l", name: "L" },
      { key: "m", name: "M" },
      { key: "n", name: "N" },
      { key: "o", name: "O" },
      { key: "p", name: "P" },
      { key: "q", name: "Q" },
      { key: "r", name: "R" },
      { key: "s", name: "S" },
      { key: "t", name: "T" },
      { key: "u", name: "U" },
      { key: "v", name: "V" },
      { key: "w", name: "W" },
      { key: "x", name: "X" },
      { key: "y", name: "Y" },
      { key: "z", name: "Z" },
      { key: "0", name: "#" },
    ],
  },
];
</script>

<style lang="scss" scoped>
.active {
  @apply bg-emerald-400 text-white rounded;
}

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
