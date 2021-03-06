/*
 * @Author: zyh
 * @Date: 2022-03-25 09:57:16
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-27 23:50:42
 * @FilePath: \vue3-music\src\stores\player.ts
 * @Description: 播放store
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore, storeToRefs } from "pinia";
import type { Song } from "@/models/song";
import type { SongUrl } from "@/models/song_url";
import type { ILyricResponse } from "@/models/Lyric/index";
import { watch, onMounted, onUnmounted } from "vue";
import { useSongDetail, useSongUrl, useLyric } from "@/api";

const KEYS = {
  volume: "PLAYER-VOLUME",
};

export const usePlayerStore = defineStore({
  id: "player",
  state: () => ({
    audio: new Audio(),
    loopType: 0, //循环模式 0 单曲循环 1 列表循环 2随机播放
    volume: localStorage.getItem(KEYS.volume)?.toInt() || 60, //音量
    playList: [] as Song[], //播放列表,
    showPlayList: false,
    id: 0,
    url: "",
    songUrl: {} as SongUrl,
    song: {} as Song,
    isPlaying: false, //是否播放中
    isPause: false, //是否暂停
    sliderInput: false, //是否正在拖动进度条
    ended: false, //是否播放结束
    muted: false, //是否静音
    currentTime: 0, //当前播放时间
    duration: 0, //总播放时长
    showLyric: false, // 是否显示歌词
    lyric: {} as ILyricResponse, // 歌词
  }),

  actions: {
    // 初始化音量
    init() {
      this.audio.volume = this.volume / 100;
    },

    // 展开歌词
    openLyric() {
      if (this.showLyric) {
        this.showLyric = false;
      } else {
        this.showLyric = true;
      }
    },

    // 获取歌词
    async getLyric(id: number) {
      this.lyric = await useLyric(id);
    },

    //播放列表里面添加音乐
    pushPlayList(replace: boolean, ...list: Song[]) {
      if (replace) {
        this.playList = list;
        return;
      }
      list.forEach((song) => {
        if (this.playList.filter((s) => s.id == song.id).length <= 0) {
          this.playList.push(song);
        }
      });
    },

    // 播放列表里面删除音乐
    clearPlayList() {
      this.songUrl = {} as SongUrl;
      this.url = "";
      this.id = 0;
      this.song = {} as Song;
      this.isPlaying = false;
      this.isPause = false;
      this.sliderInput = false;
      this.ended = false;
      this.muted = false;
      this.currentTime = 0;
      this.playList = [] as Song[];
      this.showPlayList = false;
      this.audio.load();
      setTimeout(() => {
        this.duration = 0;
      }, 500);
    },

    // 播放
    async play(id: number) {
      if (id == this.id) {
        this.togglePlay();
        return;
      }
      this.isPlaying = false;
      const data = await useSongUrl(id);
      // 获取歌词
      this.getLyric(id);
      this.audio.src = data.url;
      this.audio
        .play()
        .then((res) => {
          this.isPlaying = true;
          this.songUrl = data;
          this.url = data.url;
          this.id = id;
          this.songDetail();
        })
        .catch((res) => {
          console.log(res);
        });
    },

    // 播放结束
    playEnd() {
      console.log("播放结束");
      switch (this.loopType) {
        case 0:
          this.rePlay();
          break;
        case 1:
          this.next();
          break;
        case 2:
          this.randomPlay();
          break;
      }
    },

    // 详情
    async songDetail() {
      this.song = (await useSongDetail(this.id)).first();

      this.pushPlayList(false, this.song);
    },

    //重新播放
    rePlay() {
      setTimeout(() => {
        this.currentTime = 0;
        this.audio.play();
      }, 1500);
    },

    //下一曲
    next() {
      if (this.loopType === 2) {
        this.randomPlay();
      } else {
        this.play(this.nextSong.id);
      }
    },

    //上一曲
    prev() {
      this.play(this.prevSong.id);
    },

    //随机播放
    randomPlay() {
      this.play(this.playList.sample().id);
    },

    //播放、暂停
    togglePlay() {
      if (!this.song.id) return;
      this.isPlaying = !this.isPlaying;
      if (!this.isPlaying) {
        this.isPause = false;
        this.audio.pause();
      } else {
        this.isPause = true;
        this.audio.play();
      }
    },

    // 设置播放
    setPlay() {
      if (!this.song.id) return;
      this.isPlaying = true;
      this.audio.play();
      this.isPause = false;
    },

    // 设置暂停
    setPause() {
      if (!this.song.id) return;
      this.isPlaying = false;
      this.audio.pause();
      this.isPause = true;
    },

    //切换循环类型
    toggleLoop() {
      if (this.loopType == 2) {
        this.loopType = 0;
      } else {
        this.loopType++;
      }
    },

    //静音切换
    toggleMuted() {
      this.muted = !this.muted;
      this.audio.muted = this.muted;
    },

    //音量设置
    setVolume(n: number) {
      n = n > 100 ? 100 : n;
      n = n < 0 ? 0 : n;
      this.volume = n;
      this.audio.volume = n / 100;
      localStorage.setItem("PLAYER-VOLUME", n.toString());
    },

    //修改播放时间
    onSliderChange(val: number) {
      this.currentTime = val;
      this.sliderInput = false;
      this.audio.currentTime = val;
    },

    //播放时间拖动中
    onSliderInput(val: number) {
      this.sliderInput = true;
    },

    //定时器
    interval() {
      if (this.isPlaying && !this.sliderInput) {
        this.currentTime = parseInt(this.audio.currentTime.toString());
        // console.log("interval", this.currentTime);

        this.duration = parseInt(this.audio.duration.toString());
        this.ended = this.audio.ended;
      }
    },
  },

  getters: {
    // 当前播放数量
    playListCount: (state) => {
      return state.playList.length;
    },

    // 当前播放歌曲的索引
    thisIndex: (state) => {
      return state.playList.findIndex((song) => song.id === state.id);
    },

    // 当前播放歌曲
    thisSong: (state) => {
      return state.playList.find((song) => song.id === state.id);
    },

    // 下一首歌曲
    nextSong(state): Song {
      const { thisIndex, playListCount } = this;
      if (thisIndex === playListCount - 1) {
        return state.playList.first();
      } else {
        const nextIndex: number = thisIndex + 1;
        return state.playList[nextIndex];
      }
    },

    // 上一首歌曲
    prevSong(state): Song {
      const { thisIndex } = this;
      if (thisIndex === 0) {
        return state.playList.last();
      } else {
        const prevIndex: number = thisIndex - 1;
        return state.playList[prevIndex];
      }
    },
  },
});

export const userPlayerInit = () => {
  let timer: NodeJS.Timer;
  const { init, interval, playEnd } = usePlayerStore();

  const { ended } = storeToRefs(usePlayerStore());

  //监听播放结束
  watch(ended, (ended) => {
    if (!ended) return;
    playEnd();
  });

  //启动定时器
  onMounted(() => {
    init();
    console.log("启动定时器");
    timer = setInterval(interval, 1000);
  });
  //清除定时器
  onUnmounted(() => {
    console.log("清除定时器");
    clearInterval(timer);
  });
};
