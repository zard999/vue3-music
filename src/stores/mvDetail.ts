/*
 * @Author: zyh
 * @Date: 2022-03-28 16:14:35
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-28 19:09:28
 * @FilePath: \vue3-music\src\stores\mvDetail.ts
 * @Description: mv详情
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import { defineStore } from "pinia";
import { ElMessage, ElNotification } from "element-plus";
import { useSendComment } from "@/api/index";
import {
  useLikeComment,
  useLikeResource,
  useMvUrl,
  useMvDetail,
  useMvDetailInfo,
  useSimiMv,
  useMvComments,
} from "@/api/index";
import { useRouter } from "vue-router";

// const router = useRouter();

export const useMvDetailStore = defineStore({
  id: "mvDetail",
  state: () => ({
    // 歌单详情
    detail: {
      name: "",
      videoGroup: [
        {
          name: "",
          id: 0,
        },
      ],
      publishTime: "",
      playCount: 0,
      subCount: 0,
      desc: "",
    },
    router: useRouter(),
    creator: {},
    // 相关视频
    relatedList: [
      {
        vid: 0,
        id: 0,
        cover: "",
        name: "",
        isLive: false,
        artists: [
          {
            id: 0,
            name: "",
          },
        ],
      },
    ],
    // 评论
    hotComments: [],
    comments: [],
    currentCommentId: "",
    videoUrl: "",
    currentPage: 1,
    limit: 20,
    offset: 0,
    videoId: 0,
    commentTotal: 0,
    // 是否清空评论框内容
    clearContent: false,
    // 资源点赞数据
    videoDetailInfo: {
      isLike: false,
      likeCount: 0,
      shareCount: 0,
      commentCount: 0,
    },
  }),
  actions: {
    // 修改videoId
    handleVideoId(id: number) {
      this.videoId = id;
    },
    // 改变页码
    handleSizeChange(val: number) {
      this.limit = val;
      this.offset = this.limit * this.currentPage;
      this.getMvComments(this.videoId);
    },
    // 改变页码
    handleCurrentChange(val: number) {
      this.currentPage = val;
      this.offset = (val - 1) * this.limit;
      this.getMvComments(this.videoId);
    },
    // 点击评论
    commentHandle(id: string) {
      this.currentCommentId = id;
    },
    // 提交评论
    commentSubmit(content: any) {
      if (!content) {
        ElMessage({
          message: "什么都没写，你点毛",
          type: "warning",
        });
        return;
      } else {
        let timestamp = new Date().getTime();
        let params = {
          type: 1,
          id: this.videoId,
          content: content,
          timestamp,
          t: -1,
          commentId: "",
        };
        if (this.currentCommentId == "") {
          // 发布评论
          params.t = 1;
        } else {
          // 回复评论
          params.t = 2;
          params.commentId = this.currentCommentId;
        }
        useSendComment(params)
          .then((res) => {
            ElMessage({
              message: "提交成功",
              type: "success",
            });
            this.cancelComment();
            this.clearContent = true;
            this.getMvComments(this.videoId);
          })
          .catch((err) => {
            ElNotification({
              title: err.data.dialog.title,
              message: err.data.dialog.subtitle,
              type: "error",
            });
          });
      }
    },
    // 取消评论
    cancelComment() {
      this.currentCommentId = "";
    },
    // 评论点赞
    async commentLike(id: any, liked: any) {
      let timestamp = new Date().getTime();
      let params = {
        id: this.videoId,
        cid: id,
        type: 1,
        timestamp,
        t: -1,
      };
      if (liked) {
        params.t = 0;
      } else {
        params.t = 1;
      }
      try {
        let res = await useLikeComment(params);
        if (res.code === 200) {
          this.getMvComments(this.videoId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 资源点赞
    async likeResource() {
      let type = 1;
      let t = 1;
      if (this.videoDetailInfo.isLike) {
        t = 2;
      } else {
        t = 1;
      }
      let id = this.videoId;
      try {
        let res = await useLikeResource(type, t, id);
        if (res.code === 200) {
          this.getMvDetailInfo(this.videoId);
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取mv播放地址
    async getMvUrl(id: number | string) {
      try {
        let res = await useMvUrl(id);
        if (res.code === 200) {
          this.videoUrl = res.data.url;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取mv详情
    async getMvDetail(id: number | string) {
      try {
        let res = await useMvDetail(id);
        if (res.code === 200) {
          res.data.videoGroup.map((item) => {
            if (item.name.indexOf("#") != -1) {
              item.name = item.name.replace(/#/g, "");
            }
          });
          this.detail = res.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取mv点赞转发评论数数据
    async getMvDetailInfo(id: number | string) {
      try {
        let res = await useMvDetailInfo(id, new Date().getTime());
        if (res.code === 200) {
          let detail = {
            isLike: res.liked,
            likeCount: res.likedCount,
            shareCount: res.shareCount,
            commentCount: res.commentCount,
          };
          this.videoDetailInfo = detail;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 获取相关mv
    async getMvRelated(id: number | string) {
      try {
        let res = await useSimiMv(id);
        if (res.code === 200) {
          this.relatedList = res.mvs;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // mv评论
    async getMvComments(id: number | string) {
      let timestamp = new Date().getTime();
      let params = {
        id,
        limit: this.limit,
        offset: this.offset,
        timestamp,
      };
      try {
        let res = await useMvComments(params);
        if (res.code === 200) {
          this.commentTotal = res.total;
          if (res.hotComments) {
            this.hotComments = res.hotComments;
          } else {
            this.hotComments = [];
          }
          this.comments = res.comments;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // mv详情（相关mv）
    toDetail(id: number | string) {
      this._initialize(id);
      this.router.push({
        name: "mvDetail",
        query: {
          id,
        },
      });
    },
    // 初始化
    _initialize(id: number | string) {
      this.getMvUrl(id);
      this.getMvDetail(id);
      this.getMvRelated(id);
      this.getMvDetailInfo(id);
      this.getMvComments(id);
    },
  },
  getters: {},
});
