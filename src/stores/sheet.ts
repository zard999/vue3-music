/*
 * @Author: zyh
 * @Date: 2022-03-23 20:50:05
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 14:41:37
 * @FilePath: \music-item\src\stores\sheet.ts
 * @Description: sheet store
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import { defineStore } from "pinia";
import { ref } from "vue";
import { usePersonalized } from "@/api/index";
import type { ISheet } from "@/models/sheet";

export const useSheetStore = defineStore("sheet", () => {
  const sheetList = ref<ISheet[]>([]);
  const getSheetList = async () => {
    if (sheetList.value.length > 0) return;
    sheetList.value = await usePersonalized(24);
  };
  return {
    sheetList,
    getSheetList,
  };
});
