/*
 * @Author: zyh
 * @Date: 2022-03-24 10:16:07
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 17:20:16
 * @FilePath: \vue3-music\src\api\index.ts
 * @Description: api index
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import request from "@/utils/request";
import type { IBanner } from "@/models/banner";
import type { Personalized, PersonalizedNewSong } from "@/models/personalized";
import type { Singer } from "@/models/singer";
import type { Song } from "@/models/song";
import type { SongUrl } from "@/models/song_url";
import type { ILyricResponse } from "@/models/Lyric/index";

// 轮播图
export async function useBanner() {
  const { banners } = await request.get<{ banners: IBanner[] }>("/banner", {
    type: 1,
  });
  return banners;
}

// 推荐歌单
export async function usePersonalized(limit: number) {
  const { result } = await request.get<{ result: Personalized[] }>(
    `/personalized?limit=${limit}`
  );
  return result;
}

// 推荐新音乐
export async function usePersonalizedNewSong() {
  const { result } = await request.get<{ result: PersonalizedNewSong[] }>(
    "/personalized/newsong"
  );
  return result;
}

// 热门歌手
export async function useHotSinger() {
  const { artists } = await request.get<{ artists: Singer[] }>("/top/artists", {
    offset: 0,
    limit: 30,
  });
  return artists;
}

// 获取歌曲详情
export async function useSongDetail(id: number) {
  const { songs } = await request.get<{ songs: Song[] }>("/song/detail", {
    ids: id,
  });
  return songs.first();
}

// 获取音乐 url
export async function useSongUrl(id: number) {
  const { data } = await request.get<{ data: SongUrl[] }>("/song/url", {
    id,
  });
  return data.first();
}

// 获取歌词
export async function useLyric(id: number) {
  const result = await request.get<ILyricResponse>("/lyric", {
    id,
  });
  return result;
}
