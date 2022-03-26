<!--
 * @Author: zyh
 * @Date: 2022-03-26 11:19:14
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 16:41:58
 * @FilePath: \vue3-music\src\views\songlist\SongList.vue
 * @Description: 歌单
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <PlaylistHot v-show="!loading" @cat-change="catChange" />

  <div class="py-5 text-xl">{{ pageData.cat }}歌单</div>

  <!-- <div
    v-show="loading"
    v-loading="loading"
    class="text-center w-full"
    element-loading-text="载入中..."
  ></div> -->
  <div
    class="gap-5 grid grid-flow-row grid-cols-3 lg:grid-cols-7 2xl:grid-cols-7"
  >
    <div
      v-for="(item, index) in list"
      :key="index"
      :class="{ 'item-1': index === 0, cover: true }"
      @click="router.push({ name: Pages.songlist, query: { id: item.id } })"
    >
      <CoverPlay
        :name="item.name"
        :pic-url="item.coverImgUrl"
        :play-count="item.playCount"
        show-play-count
      />
      <div class="mt-2 text-xs text-main leading-5">{{ item.name }}</div>
      <div class="mt-2 text-xs text-main truncate text-dc">
        {{ item.creator.nickname }}
      </div>
    </div>
  </div>

  <div class="py-10" v-if="pageData.more">
    <el-button
      type="text"
      class="text-center w-full"
      @click="loadMore"
      :loading="pageData.loading"
      >加载更多</el-button
    >
  </div>
  <el-backtop>
    <div
      style="
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      UP
    </div>
  </el-backtop>
</template>

<script setup lang="ts">
import PlaylistHot from "./PlaylistHot.vue";
import { onMounted, reactive, ref, computed } from "vue";
import type { PlayListDetail } from "@/models/SongList/index";
import { useTopPlaylistHighquality } from "@/api/index";
import CoverPlay from "@/components/common/CoverPlay.vue";
import { useRouter } from "vue-router";
import { Pages } from "@/router/pages";

const list = ref<PlayListDetail[]>();
// const loading = ref(false);

const router = useRouter();

const pageData = reactive({
  init: false,
  loading: false,
  limit: 35,
  before: 0,
  more: false,
  cat: "全部",
});

const catChange = (cat: string) => {
  pageData.cat = cat;
  pageData.before = 0;
  pageData.more = false;

  getData();
};

const getData = async () => {
  pageData.loading = true;
  // loading.value = true;
  try {
    const { playlists, lasttime, more } = await useTopPlaylistHighquality({
      limit: pageData.limit,
      before: pageData.before,
      cat: pageData.cat,
    });
    if (pageData.before <= 0) {
      list.value = playlists;
    } else {
      list.value?.push(...playlists);
    }
    pageData.init = true;
    // pageData.loading = false;
    loading.value = false;
    pageData.before = lasttime;
    pageData.more = more;
  } catch (e) {}
};

const loadMore = () => {
  getData();
};

onMounted(getData);
</script>
<style lang="scss"></style>
