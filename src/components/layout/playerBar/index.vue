<!--
 * @Author: zyh
 * @Date: 2022-03-24 22:21:45
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 21:32:00
 * @FilePath: \vue3-music\src\components\layout\playerBar\index.vue
 * @Description: 底部播放器
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <transition name="slide-fade">
    <div class="player-bar h-14" v-show="playList.length">
      <div class="player-bar-item flex flex-col items-stretch h-20">
        <PlayerSlider />
        <div class="flex grow px-5 items-center">
          <div class="flex-1">
            <PlayerSong />
          </div>
          <div class="flex-1">
            <PlayerController />
          </div>
          <div class="flex-1">
            <PlayerAction />
          </div>
        </div>
      </div>

      <!-- 歌曲详情页面 -->
      <transition name="slide-fade">
        <div class="player-page px-5" v-show="showLyric">
          <div class="container">
            <div class="page-left">
              <div class="cover-image" :class="isPlaying ? 'playing' : ''">
                <img :src="song.al?.picUrl || OpticalDisk" />
              </div>
            </div>
            <div class="page-right pl-20">
              <div class="flex justify-between">
                <h3 class="name flex-between items-center">
                  {{ song.ar?.first().name || `谁明浪子心` }}
                </h3>
                <IconPark
                  @click="openLyric"
                  :icon="Down"
                  size="32"
                  :stroke-width="3"
                  class="hover-text"
                ></IconPark>
              </div>
              <p>
                {{ song.name || "王杰" }} -
                {{ song.ar?.first().name || `谁明浪子心` }}
              </p>
              <div class="lyric-wrap pl-8">
                <!-- 歌词 -->
                <SongLyric
                  :lyric="lyric.lrc?.lyric"
                  :transLyric="lyric.tlyric?.lyric"
                  :lyricUser="lyric.lyricUser"
                  :transLyricUser="lyric.transUser"
                />
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup lang="ts">
import PlayerSlider from "./PlayerSlider.vue";
import PlayerSong from "./PlayerSong.vue";
import PlayerController from "./PlayerController.vue";
import SongLyric from "@/components/common/SongLyric.vue";
import IconPark from "@/components/common/IconPark.vue";
import PlayerAction from "./PlayerAction.vue";
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { OpticalDisk } from "@/assets/img/index";
import { Down } from "@icon-park/vue-next";

const { showLyric, isPlaying, song, lyric, playList } = storeToRefs(
  usePlayerStore()
);

const { openLyric } = usePlayerStore();
</script>

<style lang="scss">
.slide-fade-enter-active {
  transition: all 0.5s ease;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.5, 0.3, 0.2, 0.5);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.player-bar {
  width: 100%;
  height: 72px;
  background: rgba(255, 255, 255, 0.95);
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10;
  padding: 0 0 0 20px;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-left: calc(100vw - 100%);

  .player-bar-item {
    position: relative;
    z-index: 40;
  }

  .player-page {
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    top: 0px;
    left: 0;
    padding-top: 100px;

    .container {
      display: flex;

      .page-left,
      .page-right {
        width: 50%;
      }

      .cover-image {
        width: 400px;
        height: 400px;
        position: relative;

        img {
          width: 100%;
          height: 100%;
          border-radius: 5px;
          position: relative;
          z-index: 2;
          opacity: 1;
          overflow: hidden;
          border-radius: 5px;
          box-shadow: 5px 0 10px -5px #141414;
        }

        &::after {
          content: "";
          position: absolute;
          left: 20%;
          top: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          transition: all cubic-bezier(0.4, 0, 0.2, 1) 0.8s 0.5s;
          background: transparent url("../../../assets/images/cd-wrap.png")
            center no-repeat;
          background-size: contain;
        }

        &.playing {
          &::after {
            -webkit-animation: rotate 2s linear infinite;
            -moz-animation: rotate 2s linear infinite;
            -ms-animation: rotate 2s linear infinite;
            -o-animation: rotate 2s linear infinite;
            animation: rotate 2s linear infinite;
          }
        }
      }

      .page-right {
        .name {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 10px;

          .hover-text {
            color: #888;
            cursor: pointer;
          }
        }

        .lyric-wrap {
          width: 100%;
          height: 480px;
          border-radius: 4px;
          overflow: hidden;
          background: #f8f9ff;
          margin-top: 30px;
        }
      }
    }
  }
}
</style>
