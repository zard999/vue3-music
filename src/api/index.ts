/*
 * @Author: zyh
 * @Date: 2022-03-24 10:16:07
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 17:56:58
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
import type { TopListDetail } from "@/models/Rank/toplist_detail";
import type { PlayListDetail, PlaylistHighqualityTag } from "@/models/SongList";
import type { Artist } from "@/models/artist";
import type {
  Artists,
  hotSong,
  singerDesc,
  SimilarSinger,
  hotAlbums,
} from "@/models/singerDetail";
import type { SearchHotDetail, SearchSuggest } from "@/models/search";
import type { IMVideo } from "@/models/mvideo";
import type { SonglistDetail } from "@/models/songlistDetail";
import type { IAlbum, ISongs } from "@/models/albumDetail";

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

// 歌手分类列表
export async function useSingerList(pageData: {
  type: number;
  area: number;
  initial: string;
  page: number;
  limit: number;
}) {
  const { artists } = await request.get<{ artists: Artist[] }>("artist/list", {
    type: pageData.type,
    area: pageData.area,
    initial: pageData.initial,
    limit: pageData.limit,
    offset: (pageData.page - 1) * pageData.limit,
  });
  return artists;
}

// 获取歌曲详情
export async function useSongDetail(
  ids: number | string,
  time: number = new Date().valueOf()
) {
  const { songs } = await request.get<{ songs: Song[] }>(
    `/song/detail?timestamp=${time}`,
    {
      ids,
    }
  );
  return songs;
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

// 获取排行榜
export async function useTopListDetail() {
  const { list } = await request.get<{ list: TopListDetail[] }>(
    "/toplist/detail"
  );
  return list;
}

// 获取精品歌单
export async function usePlaylistHighqualityTags() {
  const { tags } = await request.get<{ tags: PlaylistHighqualityTag[] }>(
    "playlist/highquality/tags"
  );

  return tags;
}

// 获取精品歌单
export async function useTopPlaylistHighquality(params?: {
  limit?: number;
  before?: number;
  cat: string;
}) {
  return await request.get<{
    playlists: PlayListDetail[];
    total: number;
    more: boolean;
    lasttime: number;
  }>("top/playlist/highquality", params);
}

// 获取歌手单曲
export async function useArtistSong(id: number | string) {
  return await request.get<{ artist: Artists; hotSongs: hotSong[] }>(
    "/artists",
    {
      id,
    }
  );
}

// 获取歌手专辑
export async function useArtistAlbum(params: {
  id: number | string;
  limit: number;
  offset: number;
}) {
  return await request.get<{ artist: Artists; hotAlbums: hotAlbums[] }>(
    "/artist/album",
    params
  );
}

/**
 * @method 获取专辑评论
 */
export const getAlbumComment = async (params: any) =>
  request.get<{ code: number; hotComments: any[]; comments: any[] }>(
    `/comment/album`,
    params
  );

// 获取歌手MV
export async function useArtistMv(params: {
  id: number | string;
  limit: number;
  offset: number;
}) {
  return await request.get<{ mvs: any[] }>("/artist/mv", params);
}

// 获取歌手描述
export async function useArtistDesc(id: number | string) {
  return await request.get<singerDesc>("/artist/desc", {
    id,
  });
}

// 获取相似歌手
export async function useSimilarSinger(id: number | string) {
  const { artists } = await request.get<{ artists: SimilarSinger[] }>(
    "/simi/artist",
    {
      id,
    }
  );
  return artists;
}

// 全部mv
export async function useMv(params: object) {
  return await request.get<IMVideo>("/mv/all", params);
}

/**
 * @method 发送评论
 * @params t:1 发送, 2 回复
 * @params tpye: 0: 歌曲，1: mv，2: 歌单，3: 专辑，4: 电台，5: 视频，6: 动态
 * @params id:对应资源 id
 * @params content :要发送的内容
 * @params commentId :回复的评论id (回复评论时必填)
 * @调用例子 : /comment?t=1&type=1&id=5436712&content=test (往广岛之恋 mv 发送评论: test)
 * @注意：如给动态发送评论，则不需要传 id，需要传动态的 threadId,如：/comment?t=1&type=6&threadId=A_EV_2_6559519868_32953014&content=test
 */
export async function useSendComment(params: object) {
  return await request.get("comment", params);
}

/**
 * @method 给评论点赞
 * @params t:1 点赞, 2 取消点赞
 * @params tpye: 0: 歌曲，1: mv，2: 歌单，3: 专辑，4: 电台，5: 视频，6: 动态
 * @params cid: 评论id
 * @调用例子 : /comment/like?id=29178366&cid=12840183&t=1&type=0 对应给 https://music.163.com/#/song?id=29178366 最热门的评论点赞
 */
export async function useLikeComment(params: object) {
  return await request.get<{ code: number | string }>("/comment/like", params);
}

/**
 * @method 资源点赞( MV,电台,视频)
 * @params tpye: 1: mv，4: 电台，5: 视频，6: 动态
 * @params t:1 点赞, 2 取消点赞
 * @params id：资源id
 */
export async function useLikeResource(
  type: string | number,
  t: string | number,
  id: string | number
) {
  return request.get<{ code: number | string }>(
    `/resource/like?type=${type}&t=${t}&id=${id}`
  );
}

/**
 * @method 获取mv播放地址
 */

export async function useMvUrl(id: string | number) {
  return request.get<{ code: string | number; data: { url: string } }>(
    `/mv/url?id=${id}`
  );
}

/**
 * @method 获取mv详情
 */

export async function useMvDetail(id: string | number) {
  return request.get<{
    code: string | number;
    data: {
      name: string;
      videoGroup: [
        {
          name: string;
          id: number;
        }
      ];
      publishTime: string;
      playCount: number;
      subCount: number;
      desc: string;
    };
  }>(`/mv/detail?mvid=${id}`);
}

/**
 * @method 获取mv点赞转发评论数数据
 */
export async function useMvDetailInfo(id: number | string, time: number) {
  return request.get<{
    code: string | number;
    liked: boolean;
    likedCount: number;
    shareCount: number;
    commentCount: number;
  }>(`/mv/detail/info?mvid=${id}&timestamp=${time}`);
}

/**
 * @method 相似mv
 */

export async function useSimiMv(id: number | string) {
  return request.get<{
    code: string | number;
    mvs: any;
  }>(`/simi/mv?mvid=${id}`);
}

/**
 * @method mv评论
 */
export async function useMvComments(params: any) {
  return request.get<{
    code: string | number;
    total: number;
    hotComments: any;
    comments: any;
  }>("/comment/mv", params);
}

// 搜索
// 热搜列表(详细)
export async function useSearchHotDetail() {
  const { data } = await request.get<{ data: SearchHotDetail[] }>(
    "search/hot/detail"
  );
  return data;
}

// 搜索建议
export async function useSearchSuggest(keywords: string) {
  const { result } = await request.get<{ result: SearchSuggest }>(
    "search/suggest",
    { keywords: keywords }
  );
  return result;
}

/**
 * @method 获取歌单详情
 * 必须登录
 */

export const getPlayListDetail = async (id: number, s: number, time: number) =>
  await request.get<{ code: number; playlist: SonglistDetail }>(
    `/playlist/detail?id=${id}&s=${s}&timestamp=${time}`,
    {}
  );

/**
 * @method 相关歌单推荐
 */
export const getRelatedPlaylist = async (id: number) =>
  await request.get<{ code: number; playlists: any[] }>(
    `/related/playlist?id=${id}`,
    {}
  );

/**
 * @method 歌单收藏者
 * @params id 歌单 id
 * @params limit 取出评论数量 默认为 20
 * @params offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 */
export const getSubscribersPlaylist = async (params: any) =>
  await request.get<{ code: number; subscribers: any[] }>(
    `/playlist/subscribers`,
    params
  );

/**
 * @method 歌单评论
 * @params id 歌单 id
 * @params limit 取出评论数量 默认为 20
 * @params offset 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
 * @params before 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export const getCommentPlaylist = async (params: any) =>
  await request.get<{ code: number; hotComments: any[]; comments: any }>(
    `/comment/playlist`,
    params
  );

/**
 * @method 收藏/取消收藏歌单
 */
export const collectPlaylist = async (t: number, id: number) =>
  await request.get<{ code: number }>(
    `/playlist/subscribe?t=${t}&id=${id}`,
    {}
  );

/**
 * @method 获取专辑内容
 */
export const getAlbumData = async (id: number) =>
  await request.get<{ code: number; album: IAlbum; songs: ISongs[] }>(
    `/album?id=${id}`,
    {}
  );
