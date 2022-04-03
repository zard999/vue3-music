/*
 * @Author: zyh
 * @Date: 2022-03-28 15:26:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 23:33:18
 * @FilePath: \vue3-music\src\stores\mvideo.ts
 * @Description: mvideo store
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { useMv } from "@/api/index";
import type { IMVideoData, Ret } from "@/models/mvideo";
import { createVideo } from "@/utils/tools";
import { ElMessage } from "element-plus";

export const useMvideoStore = defineStore({
  id: "mvideo",
  state: () => ({
    // 语种
    area: "全部",
    areaList: [
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "内地",
        label: "内地",
      },
      {
        value: "港台",
        label: "港台",
      },
      {
        value: "欧美",
        label: "欧美",
      },
      {
        value: "日本",
        label: "日本",
      },
      {
        value: "韩国",
        label: "韩国",
      },
    ],
    // 分类
    classify: "全部",
    classifys: [
      {
        value: "全部",
        label: "全部",
      },
      {
        value: "官方版",
        label: "官方版",
      },
      {
        value: "原生",
        label: "原生",
      },
      {
        value: "现场版",
        label: "现场版",
      },
      {
        value: "网易出品",
        label: "网易出品",
      },
    ],
    // 排序
    sort: "上升最快",
    sortList: [
      {
        value: "上升最快",
        label: "上升",
      },
      {
        value: "最热",
        label: "最热",
      },
      {
        value: "最新",
        label: "最新",
      },
    ],
    // 请求参数
    params: {
      // 返回数量
      limit: 12,
      // 偏移数量
      offset: 0,
      // 分类
      type: "全部",
      // 语种
      area: "全部",
      order: "上升最快",
    },
    mvs: Array<IMVideoData | Ret>(),
    // 是否显示加载动画
    videoLoading: false,
    // 是否还有数据
    loadStatus: true,
    en: "",
  }),
  actions: {
    // 选择歌手分类
    chooseType(type: string, val: string) {
      if (type == "area") {
        this.area = val;
        this.params.area = val;
      } else if (type == "classify") {
        this.classify = val;
        this.params.type = val;
      } else if (type == "sort") {
        this.sort = val;
        this.en = val;
        this.params.order = val;
      }
      this.params.offset = 0;
      this.loadStatus = true;
      this.mvs = [];
      this.getMvAll();
    },
    // 获取mv列表
    async getMvAll() {
      //   this.fullscreenLoading = true;
      try {
        this.videoLoading = true;
        let res = await useMv(this.params);
        console.log(res);

        this.mvs = [...this.mvs, ...this._normalizeVideos(res.data)];
        if (res.hasMore) {
          this.params.offset += 12;
        } else {
          this.loadStatus = false;
        }
        this.videoLoading = false;
      } catch (error) {
        // this.$message.error(error);
      }
    },
    // 处理视频
    _normalizeVideos(list: IMVideoData[]) {
      let ret = Array<Ret>();
      list.map((item) => {
        if (item.id) {
          ret.push(
            createVideo({
              id: item.id,
              nickName: item.artistName,
              name: item.name,
              playCount: item.playCount,
              duration: item.duration,
              image: item.cover,
            })
          );
        }
      });
      return ret;
    },
    // 加载更多
    load() {
      if (this.loadStatus) {
        this.getMvAll();
      } else {
        ElMessage.error("没有更多了！！");
      }
    },
  },
  getters: {},
});
