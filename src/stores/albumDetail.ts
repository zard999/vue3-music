/*
 * @Author: zyh
 * @Date: 2022-04-01 16:49:25
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-03 13:30:05
 * @FilePath: \vue3-music\src\stores\albumDetail.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { getAlbumData } from "@/api";
import { createSong } from "@/utils/tools";
import type { IAlbum, IArtist } from "@/models/albumDetail";
import { useArtistAlbum, getAlbumComment } from "@/api";
import type { hotAlbums } from "@/models/singerDetail";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";


export const useAlbumDetail = defineStore({
  id: "albumDetail",
  state: () => ({
    detail: {} as IAlbum,
    creator: {} as IArtist,
    songs: Array<any>(),
    subscribers: [],
    comments: Array<any>(),
    hotAlbums: Array<hotAlbums>(),
    router: useRouter(),
  }),
  actions: {
    // // 修改artistId
    // setAlbumId(artistId: number) {
    //   this.AlbumId = AlbumId;
    // },
    // 获取歌单详情
    async getAlbumData(id: number) {
      try {
        let res = await getAlbumData(id);
        if (res.code === 200) {
          this.detail = res.album;
          this.creator = res.album.artist;
          this.songs = this._normalizeSongs(res.songs);
          this.getArtistAlbum();
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取歌手专辑
    async getArtistAlbum() {
      let params = {
        id: this.creator.id,
        limit: 5,
        offset: 0,
      };
      try {
        let res = await useArtistAlbum(params);
        this.hotAlbums = res.hotAlbums;
      } catch (error) {
        console.log(error);
      }
    },
    // 获取评论
    async getAlbumComment(id: number) {
      let params = {
        id,
        limit: 28,
        offset: 0,
      };
      try {
        let res = await getAlbumComment(params);
        if (res.code === 200) {
          if (res.hotComments.length > 0) {
            this.comments = res.hotComments;
          } else {
            this.comments = res.comments;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 处理歌曲
    _normalizeSongs(list: any[]) {
      let ret: any[] = [];
      list.map((item: { id: any }) => {
        if (item.id) {
          ret.push(createSong(item));
        }
      });
      return ret;
    },
    // 打开歌单介绍详情
    openDesc(title: string, content: any) {
      ElMessageBox.alert(content, title, {
        closeOnClickModal: true,
        customClass: "descBox",
        showConfirmButton: false,
        dangerouslyUseHTMLString: true,
      });
    },
    // 相关推荐详情
    toDetail(id: number) {
      this.router.push({
        name: "albumDetail",
        query: {
          id,
        },
      });
    },
    // 初始化
    _initialize(id: number) {
      this.getAlbumData(id);
      this.getAlbumComment(id);
    },
  },
});
