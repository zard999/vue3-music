/*
 * @Author: zyh
 * @Date: 2022-03-27 13:44:35
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-02 22:43:13
 * @FilePath: \vue3-music\src\stores\singerDetail.ts
 * @Description: 歌手详情
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { createSong, createVideo } from "@/utils/tools";
import {
  useArtistSong,
  useArtistAlbum,
  useArtistMv,
  useArtistDesc,
  useSimilarSinger,
} from "@/api";
import { useUserDetail } from "@/api/user";
import type {
  hotSong,
  Artists,
  singerDesc,
  SimilarSinger,
  hotAlbums,
} from "@/models/singerDetail";
export const useSingerDetail = defineStore({
  id: "singerDetail",
  state: () => ({
    // 歌手基本信息
    singerDetail: {} as Artists,
    // 歌手用户信息
    userDetail: { level: 0, followeds: 0, gender: 0 },
    // 歌手简介
    singerDesc: {} as singerDesc,
    // 热门单曲
    songs: Array<{
      id: number;
      singer: string;
      name: string;
      album: any;
      duration: string | number;
      image: string;
      url: string;
      playCount: number;
      score: any;
    }>(),
    // 专辑
    albums: Array<hotAlbums>(),
    // 相似歌手
    singers: Array<SimilarSinger>(),
    // 歌手MV
    mvs: Array<object>(),
    // 歌手id
    singerId: 0,
    // 模块
    navList: [
      {
        name: "作品",
        id: 1,
      },
      {
        name: "专辑",
        id: 2,
      },
      {
        name: "MV",
        id: 3,
      },
      {
        name: "歌手详情",
        id: 4,
      },
      {
        name: "相似歌手",
        id: 5,
      },
    ],
    // 当前显示模块
    active: 1,
    // 分页显示条数
    limit: 20,
    // 分页偏移
    offset: 0,
    isPerson: true,
  }),
  actions: {
    // 初始化重置数据
    reset() {
      // 歌手基本信息
      (this.singerDetail = {} as Artists),
        // 歌手用户信息
        (this.userDetail = { level: 0, followeds: 0, gender: 0 }),
        // 歌手简介
        (this.singerDesc = {} as singerDesc),
        // 热门单曲
        (this.songs = Array<{
          id: number;
          singer: string;
          name: string;
          album: any;
          duration: string | number;
          image: string;
          url: string;
          playCount: number;
          score: any;
        }>());
      // 专辑
      this.albums = Array<hotAlbums>();
      // 相似歌手
      this.singers = Array<SimilarSinger>();
      // 歌手MV
      this.mvs = Array<object>();
    },
    // 切换歌手信息
    tabItem(id: number) {
      this.active = id;
    },
    // 获取歌手基本信息和热门50首单曲
    async getArtists(id: number | string) {
      try {
        let res = await useArtistSong(id);
        this.singerDetail = res.artist;
        this.getUserDetail(res.artist.accountId);
        this.songs = this._normalizeSongs(res.hotSongs);
        this.getArtistAlbum(id);
        this.getArtistMv(id);
      } catch (error) {
        console.log(error);
      }
    },
    // 获取(歌手)用户信息
    async getUserDetail(uid: number | string) {
      let detail = {
        level: 0,
        followeds: 0,
        gender: 0,
      };
      try {
        let res = await useUserDetail(uid);
        let profile = res.profile;
        detail.level = res.level;
        detail.followeds = profile.followeds;
        detail.gender = profile.gender;
        this.userDetail = detail;
      } catch (error) {
        detail.level = 0;
        detail.followeds = 0;
        detail.gender = 0;
        this.userDetail = detail;
      }
    },

    // 获取歌手专辑
    async getArtistAlbum(id: number | string) {
      let params = {
        id: this.singerId || id,
        limit: this.detail.albumSize,
        offset: this.offset,
      };
      try {
        let res = await useArtistAlbum(params);
        this.albums = res.hotAlbums;
      } catch (error) {
        console.log(error);
      }
    },
    // 获取歌手MV
    async getArtistMv(id: number | string) {
      let params = {
        id: this.singerId || id,
        limit: this.detail.mvSize,
        offset: this.offset,
      };
      try {
        let res = await useArtistMv(params);
        this.mvs = this._normalizeVideos(res.mvs);
      } catch (error) {
        console.log(error);
      }
    },
    // 获取歌手简介
    async getArtistDesc(id: number | string) {
      try {
        let res = await useArtistDesc(id);
        if (res.introduction.length > 0) {
          res.introduction.map((item) => {
            item.txt = item.txt.replace(/(\r\n|\n|\r)/gm, "<br />");
          });
        }
        this.singerDesc = res;
      } catch (error) {
        console.log(error);
      }
    },
    // 获取相似歌手
    async getArtistSimi(id: number | string) {
      try {
        let res = await useSimilarSinger(id);
        this.singers = res;
      } catch (error) {
        console.log(error);
      }
    },

    // 处理歌曲
    _normalizeSongs(list: hotSong[]) {
      let ret: any[] = [];
      list.map((item) => {
        if (item.id) {
          ret.push(createSong(item));
        }
      });
      return ret;
    },

    // 处理视频
    _normalizeVideos(list: any[]) {
      let ret: any[] = [];
      list.map((item) => {
        if (item.id) {
          ret.push(
            createVideo({
              id: item.id,
              nickName: item.artistName,
              name: item.name,
              playCount: item.playCount,
              duration: item.duration,
              image: item.imgurl16v9,
            })
          );
        }
      });
      return ret;
    },

    // 初始化数据
    initData() {
      // 歌手基本信息
      (this.singerDetail = {} as Artists),
        // 歌手用户信息
        (this.userDetail = { level: 0, followeds: 0, gender: 0 }),
        // 歌手简介
        (this.singerDesc = {} as singerDesc);
    },

    //初始化
    async _initialize(id: number | string) {
      // 没起作用
      // this.initData();
      this.active = 1;
      this.albums = Array<hotAlbums>();
      this.mvs = [];
      this.singerId = Number(id);
      await this.getArtists(id);
      this.getUserDetail(id);
      this.getArtistDesc(id);
      this.getArtistSimi(id);
    },
  },
  getters: {
    // 合并歌手详情
    detail: (state) => {
      return Object.assign(state.singerDetail, state.userDetail);
    },
  },
});
