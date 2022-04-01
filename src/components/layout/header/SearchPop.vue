<!--
 * @Author: zyh
 * @Date: 2022-03-23 14:15:51
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-31 17:52:58
 * @FilePath: \vue3-music\src\components\layout\header\SearchPop.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <el-popover popper-style="max-width:auto;padding:0;" width="250px">
    <template #reference>
      <ElInput
        placeholder="搜索音乐、MV、歌单"
        :prefix-icon="Search"
        clearable
        @input="searchInput"
        v-model="searchKeyword"
        @focus="showSearchView = true"
        @focusout="showSearchView = false"
      />
    </template>
    <div class="h-96">
      <el-scrollbar>
        <div class="pb-2.5">
          <div v-if="showHot">
            <div class="pt-2 pb-1.5 px-2.5">热门搜索</div>
            <div>
              <div
                v-for="(item, index) in searchHot"
                :key="item.searchWord"
                class="py-2.5 px-2.5 hover-text cursor-pointer flex justify-between items-center text-xs"
                @click="hotClick(item.searchWord)"
              >
                <div>
                  <span class="mr-1">{{ index + 1 }}.</span>
                  <span>{{ item.searchWord }}</span>
                </div>
                <div class="text-red-300 text-xs">
                  {{ item.score.numberFormat() }}
                </div>
              </div>
            </div>
          </div>
          <SearchSuggest v-else />
        </div>
      </el-scrollbar>
    </div>
  </el-popover>
</template>

<script setup lang="ts">
import { Search } from "@icon-park/vue-next";
import { storeToRefs } from "pinia";
import { useSearchStore } from "@/stores/search";
import { onMounted, ref } from "vue";
import type { SearchHotDetail } from "@/models/search";
import { useSearchHotDetail } from "@/api/index";

import { debounce } from "lodash";
import SearchSuggest from "./SearchSuggest.vue";

const { showSearchView, searchKeyword, showHot } = storeToRefs(
  useSearchStore()
);
const { suggest } = useSearchStore();

const hotClick = (text: string) => {
  searchKeyword.value = text;
  suggest();
  showSearchView.value = true;
};

const searchInput = debounce((value: string | number) => suggest(), 500, {
  maxWait: 1000,
});

const searchHot = ref<SearchHotDetail[]>([]);
onMounted(async () => {
  searchHot.value = await useSearchHotDetail();
});
</script>
<style lang="scss"></style>
