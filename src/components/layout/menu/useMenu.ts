/*
 * @Author: zyh
 * @Date: 2022-03-23 12:34:04
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-23 13:13:39
 * @FilePath: \music-item\src\components\layout\menu\useMenu.ts
 * @Description: 菜单列表接口和数据
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import {
  Planet,
  Music,
  VideoOne,
  Fm,
  Like,
  Computer,
  DownloadThree,
  PlayTwo,
} from "@icon-park/vue-next";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

interface IMenu {
  name: string;
  key: string;
  icon: any;
  theme: "outline" | "filled" | "two-tone" | "multi-color";
}

interface IMenus {
  name: string;
  key: string;
  menus: IMenu[];
}

export function userMenu() {
  const menus: IMenus[] = [
    {
      name: "在线音乐",
      key: "music",
      menus: [
        {
          name: "推荐",
          key: "discover",
          icon: Planet,
          theme: "outline",
        },
        {
          name: "音乐馆",
          key: "music",
          icon: Music,
          theme: "outline",
        },
        {
          name: "视频",
          key: "video",
          icon: VideoOne,
          theme: "outline",
        },
        {
          name: "电台",
          key: "dj",
          icon: Fm,
          theme: "outline",
        },
      ],
    },
    {
      name: "我的音乐",
      key: "myMusic",
      menus: [
        {
          name: "我喜欢",
          key: "love",
          icon: Like,
          theme: "outline",
        },
        {
          name: "本地歌曲",
          key: "local",
          icon: Computer,
          theme: "outline",
        },
        {
          name: "下载歌曲",
          key: "download",
          icon: DownloadThree,
          theme: "outline",
        },
        {
          name: "最近播放",
          key: "recently",
          icon: PlayTwo,
          theme: "outline",
        },
      ],
    },
  ];

  const route = useRoute();
  const currentKey = ref(route.meta.menu);
  const router = useRouter();

  watch(
    () => route.meta.menu,
    (newVal) => {
      currentKey.value = newVal;
    }
  );

  const click = async (menu: IMenu) => {
    await router.push({ name: menu.key, replace: true });
  };

  return {
    menus,
    currentKey,
    click,
  };
}
