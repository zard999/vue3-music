/*
 * @Author: zyh
 * @Date: 2022-03-24 10:16:07
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 18:21:49
 * @FilePath: \music-item\src\api\index.ts
 * @Description: api index
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import request from "@/utils/request";
import type { IBanner } from "@/models/banner";
import type { Personalized, PersonalizedNewSong } from "@/models/personalized";
import type { Singer } from "@/models/singer";

// useBanner
export async function useBanner() {
  const { banners } = await request.get<{ banners: IBanner[] }>("/banner", {
    type: 1,
  });
  return banners;
}

// usePersonalized
export async function usePersonalized(limit: number) {
  const { result } = await request.get<{ result: Personalized[] }>(
    `/personalized?limit=${limit}`
  );
  return result;
}

// usePersonalizedNewSong
export async function usePersonalizedNewSong() {
  const { result } = await request.get<{ result: PersonalizedNewSong[] }>(
    "/personalized/newsong"
  );
  return result;
}

// useHotSinger
export async function useHotSinger() {
  const { artists } = await request.get<{ artists: Singer[] }>("/top/artists", {
    offset: 0,
    limit: 30,
  });
  return artists;
}
