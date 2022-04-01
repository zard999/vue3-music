/*
 * @Author: zyh
 * @Date: 2022-03-31 12:42:44
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-31 17:52:29
 * @FilePath: \vue3-music\src\stores\search.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { useSearchSuggest } from "@/api/index";
import type { SearchSuggest } from "@/models/search";

export const useSearchStore = defineStore("search", {
  state: () => {
    return {
      showSearchView: false,
      searchKeyword: "",
      suggestData: {} as SearchSuggest,
    };
  },
  getters: {
    showHot: (state) => {
      return state.searchKeyword == "";
    },
  },
  actions: {
    async suggest() {
      this.suggestData = await useSearchSuggest(this.searchKeyword);
    },
  },
});
