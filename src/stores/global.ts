/*
 * @Author: zyh
 * @Date: 2022-04-01 23:00:14
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 23:04:00
 * @FilePath: \vue3-music\src\stores\global.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";

export const useGlobalStore = defineStore({
  id: "global",
  state: () => ({
    loading: false,
  }),
  actions: {
    isLoading(loading: boolean) {
      this.loading = loading;
    },
  },
});
