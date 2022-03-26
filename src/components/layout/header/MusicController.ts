/*
 * @Author: zyh
 * @Date: 2022-03-23 18:12:57
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 15:29:53
 * @FilePath: \vue3-music\src\components\layout\header\MusicController.ts
 * @Description: 音乐导航控制器
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

interface IMusicMenu {
  label: string;
  name: string;
}

export function useMusicMenu() {
  const menus: IMusicMenu[] = [
    {
      label: "发现音乐",
      name: "discover",
    },
    {
      label: "排行榜",
      name: "rank",
    },
    {
      label: "歌单",
      name: "songlist",
    },
    {
      label: "歌手",
      name: "singer",
    },
    {
      label: "视频",
      name: "video",
    },
    {
      label: "MV",
      name: "mvideo",
    },
  ];

  const router = useRouter();
  const route = useRoute();

  const currentMenu = ref(route.name);

  watch(
    () => route.name,
    (m) => {
      currentMenu.value = m;
    }
  );
  const onTabClick = ({ props }: { props: IMusicMenu }) => {
    router.push({ name: props.name, replace: true });
  };

  return {
    menus,
    currentMenu,
    onTabClick,
  };
}
