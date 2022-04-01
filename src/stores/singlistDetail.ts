/*
 * @Author: zyh
 * @Date: 2022-03-31 21:07:40
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 17:27:01
 * @FilePath: \vue3-music\src\stores\singlistDetail.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import {
  getPlayListDetail,
  useSongDetail,
  getRelatedPlaylist,
  getSubscribersPlaylist,
  getCommentPlaylist,
  collectPlaylist,
} from "@/api/index";
import { createSong } from "@/utils/tools";
import { ElMessage, ElMessageBox } from "element-plus";
import type { SonglistDetail, Creator } from "@/models/songlistDetail";

const router = useRouter();
export const useSinglistDetailStore = defineStore({
  id: "singlistDetail",
  state: () => ({
    // 歌单详情
    detail: {} as SonglistDetail,
    // 歌单创建者信息
    creator: {} as Creator,
    // 收藏这个歌单的人
    subscribers: Array<any>(),
    // 相关歌单
    relatedList: Array<any>(),
    // 相似歌单
    simiList: [],
    // 评论
    comments: Array<any>(),
    // 歌曲列表
    songs: Array<any>(),
    // 收藏这个歌单的人数量
    s: 32,
    artistId: 0,
    loading: false,
    // 是否是我喜欢的歌单
    ordered: false,
  }),
  actions: {
    // 修改artistId
    setArtistId(artistId: number) {
      this.artistId = artistId;
    },
    // 标签跳转
    tag(cat: any) {
      router.push({
        name: "playlist",
        query: {
          cat,
        },
      });
    },
    // 获取歌单详情
    async getPlayListDetail(id: number, s: number) {
      let timestamp = new Date().valueOf();
      try {
        let res = await getPlayListDetail(id, s, timestamp);
        if (res.code === 200) {
          if (res.playlist.description !== null) {
            res.playlist.description = res.playlist.description.replace(
              /(\r\n|\n|\r)/gm,
              "<br />"
            );
          }
          console.log("res.playlist", res.playlist);
          this.detail = res.playlist;
          this.creator = res.playlist.creator;
          let trackIds = res.playlist.trackIds;
          // 数量超过一千，进行分割
          let arrLength = 1000;
          let sliceArr = [];
          for (let i = 0; i < trackIds.length; i += arrLength) {
            sliceArr.push(trackIds.slice(i, i + arrLength));
          }
          this.getSongDetail(sliceArr);
        }
      } catch (error) {
        // this.$message.error(error)
      }
    },
    // 获取歌曲列表
    async getSongDetail(sliceArr: any) {
      this.loading = true;
      let before = sliceArr[0];
      let after = sliceArr[1];
      let timestamp = new Date().valueOf();
      let beforeArr: string[] = [];
      let beforeIds: string = "";
      let afterArr: string[] = [];
      let afterIds: string = "";
      before.map((item: any) => {
        beforeArr.push(item.id);
      });
      beforeIds = beforeArr.join(",");
      if (after) {
        after.map((item: { id: string }) => {
          afterArr.push(item.id);
        });
        afterIds = afterArr.join(",");
      }
      try {
        if (after) {
          let beforeRes = await useSongDetail(beforeIds, timestamp);
          let afterRes = await useSongDetail(afterIds, timestamp + 1);
          let res = beforeRes.concat(afterRes);
          this.songs = this._normalizeSongs(res);
        } else {
          let beforeRes = await useSongDetail(beforeIds, timestamp);
          let res = beforeRes;
          this.songs = this._normalizeSongs(res);
        }
        this.loading = false;
      } catch (error) {
        // this.$message.error(error)
      }
    },
    // 获取相关歌单推荐
    async getRelatedPlaylist(id: number) {
      try {
        let res = await getRelatedPlaylist(id);
        if (res.code === 200) {
          this.relatedList = res.playlists;
        }
      } catch (error) {
        // this.$message.error(error)
      }
    },
    // 获取歌单收藏者
    async getSubscribersPlaylist(id: number) {
      let params = {
        id,
        limit: 28,
        offset: 0,
      };
      try {
        let res = await getSubscribersPlaylist(params);
        if (res.code === 200) {
          this.subscribers = res.subscribers;
        }
      } catch (error) {
        // this.$message.error(error)
      }
    },
    // 获取评论
    async getCommentPlaylist(id: number) {
      let params = {
        id,
        limit: 28,
        offset: 0,
      };
      try {
        let res = await getCommentPlaylist(params);
        if (res.code === 200) {
          if (res.hotComments.length > 0) {
            this.comments = res.hotComments;
          } else {
            this.comments = res.comments;
          }
        }
      } catch (error) {
        // this.$message.error(error)
      }
    },
    // 处理歌曲
    _normalizeSongs(list: any[]) {
      let ret: any[] = [];
      list.map((item) => {
        if (item.id) {
          ret.push(createSong(item));
        }
      });
      return ret;
    },

    // 打开歌单介绍详情
    openDesc(title: string, content: string) {
      ElMessageBox.alert(content, title, {
        dangerouslyUseHTMLString: true,
        closeOnClickModal: true,
        customClass: "descBox",
        showConfirmButton: false,
      });
    },
    // 收藏歌单
    async collectArtist() {
      let t = this.detail.subscribed ? 2 : 1;
      let message = this.detail.subscribed ? "已取消收藏" : "收藏成功";
      try {
        let res = await collectPlaylist(t, this.artistId);
        if (res.code === 200) {
          ElMessage({
            message,
            type: "success",
          });

          setTimeout(() => {
            this.getPlayListDetail(this.artistId, 100);
          }, 300);
        }
      } catch (error) {
        // this.$message.error(error)
      }
    },
    // 相关推荐详情
    toDetail(id: number) {
      router.push({
        name: "playlistDetail",
        query: {
          id,
        },
      });
    },
    toUser(id: number) {
      router.push({
        name: "personal",
        query: {
          id,
        },
      });
    },
    // 初始化
    _initialize(id: number) {
      this.getPlayListDetail(id, 100);
      this.getRelatedPlaylist(id);
      this.getSubscribersPlaylist(id);
      this.getCommentPlaylist(id);
    },
  },
  getters: {},
});
