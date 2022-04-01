<!--
 * @Author: zyh
 * @Date: 2022-03-27 20:48:22
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 18:18:46
 * @FilePath: \vue3-music\src\components\common\ArtistList.vue
 * @Description: 全部播放和收藏没做
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="artist-box">
    <div class="tool-head">
      <!-- @click="playAllSong" 播放全部 -->
      <div class="item play-item">
        <IconPark :icon="Play" class="mr-2" /> 播放全部
      </div>

      <div
        class="item"
        @click="$emit('collectArtist')"
        :class="subscribed ? 'active' : ''"
        v-if="!isPerson"
      >
        <IconPark :icon="Like" class="mr-2" />
        {{ subscribed ? "已收藏" : "收藏" }}
      </div>
      <!-- <div class="item" v-if="!isPerson">
        <i class="iconfont nicefenxiang1"></i> 分享
      </div> -->
    </div>
    <table class="artist-table">
      <thead>
        <tr>
          <th class="th-index">序号</th>
          <th class="th-name">歌曲</th>
          <th class="th-artist">歌手</th>
          <th class="th-album">专辑</th>
          <th class="th-duration">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) of songs"
          :key="item.id"
          :class="thisSong?.id == item.id && isPlaying ? 'playing' : ''"
          class="text-sm"
        >
          <td>
            <div class="index-container flex justify-center">
              <span class="num">{{ formatZero(index + 1, 2) }}</span>
              <div class="play-icon">
                <div class="line" style="animation-delay: -1.2s"></div>
                <div class="line"></div>
                <div class="line" style="animation-delay: -1.5s"></div>
                <div class="line" style="animation-delay: -0.9s"></div>
                <div class="line" style="animation-delay: -0.6s"></div>
              </div>
              <IconPark
                class="play-btn"
                :icon="Play"
                size="18"
                :stroke-width="3"
                @click="play(item.id)"
              />
              <!-- <i
                class="iconfont nicebofang2 play-btn"
                @click="play(item.id)"
              ></i> -->
              <IconPark
                class="pause-btn"
                :icon="PauseOne"
                size="18"
                :stroke-width="3"
                @click="play(item.id)"
              />
              <!-- <i
                class="iconfont nicezanting1 pause-btn"
                @click="play(item.id)"
              ></i> -->
            </div>
          </td>
          <td>
            <div class="name-container">
              <div class="avatar">
                <el-image
                  :key="item.image + '?param=100y100'"
                  :src="item.image + '?param=100y100'"
                  lazy
                >
                  <div
                    slot="placeholder"
                    class="image-slot flex-center flex-column"
                  >
                    <i class="iconfont niceicon-3"></i>
                  </div>
                  <div slot="error" class="image-slot flex-center">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <p class="name ellipsis" :title="item.name">{{ item.name }}</p>
            </div>
          </td>
          <td>
            <div class="artist-container">
              <p class="name ellipsis" :title="item.singer">
                {{ item.singer }}
              </p>
            </div>
          </td>
          <td>
            <div class="album-container">
              <p :title="item.album" class="name ellipsis">{{ item.album }}</p>
            </div>
          </td>
          <td>
            <div class="duration-container">
              <p class="name">{{ formatSecondTime(item.duration) }}</p>
              <!-- <div class="song-tools">
                <IconPark class="icon" :icon="Like" />
                <IconPark class="icon" :icon="Like" />
                <IconPark class="icon" :icon="Like" />
                <i class="iconfont niceicon-heart" title="喜欢"></i>
                <i class="iconfont nicexiazai" title="下载"></i>
                <i class="iconfont nicedot" title="更多"></i>
              </div> -->
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { formatZero, formatSecondTime } from "@/utils/tools";
import { Play, PauseOne, Like } from "@icon-park/vue-next";
import IconPark from "@/components/common/IconPark.vue";
const props = defineProps<{
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
  }>;
  subscribed: Boolean;
  isPerson: Boolean;
}>();

// 当前播放索引, 播放状态, 播放歌曲
const { thisIndex, isPlaying, thisSong } = storeToRefs(usePlayerStore());
const { play } = usePlayerStore();
</script>
<style lang="scss" scoped>
.artist-box >>> tbody img {
  border-radius: 5px;
}

.name {
  width: 150px;
}
.artist-box {
  width: 100%;
  .tool-head {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 15px 0;
    .item {
      background: #f2f2f2;
      color: #333333;
      padding: 7px 15px;
      border-radius: 50px;
      cursor: pointer;
      margin-left: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s;
      i {
        margin-right: 5px;
      }
      .nicefenxiang1 {
        font-size: 18px;
      }
      &.active {
        background: #34d399;
        color: #fff;
      }
    }
    .play-item {
      background: #34d399;
      color: #fff;
    }
  }
  .artist-table {
    width: 100%;
    thead {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #fafafa;
      color: #999;
      th {
        padding: 0 9px;
        text-align: left;
        font-weight: 300;
        white-space: nowrap;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        &.th-index {
          width: 10%;
          text-align: center;
        }
        &.th-name {
          width: 40%;
        }
        &.th-artist {
          width: 25%;
        }
        &.th-album {
          width: 15%;
        }
        &.th-duration {
          width: 15%;
          text-align: right;
          padding-right: 40px;
        }
      }
    }
    tbody {
      width: 100%;
      tr {
        height: 50px;
        line-height: 50px;
        transition: background-color 0.2s linear;
        td {
          padding: 0 9px;
          white-space: nowrap;
          overflow: hidden;
          -o-text-overflow: ellipsis;
          text-overflow: ellipsis;
        }
        .index-container {
          .num {
            color: #4a4a4a;
            font-weight: 500;
          }
          .play-icon {
            display: none;
            height: 16px;
            min-width: 18px;
            overflow: hidden;
            .line {
              width: 2px;
              height: 100%;
              margin-left: 2px;
              background-color: #ff410f;
              animation: play 0.9s linear infinite alternate;
            }
          }
          .play-btn {
            color: #34d399;
            font-size: 28px;
            display: none;
            text-align: left;
            cursor: pointer;
          }
          .pause-btn {
            color: #34d399;
            font-size: 30px;
            display: none;
            text-align: left;
            cursor: pointer;
          }
        }
        .name-container {
          display: flex;
          align-items: center;
          .avatar {
            width: 35px;
            height: 35px;
            border-radius: 5px;
            flex-shrink: 0;
            margin-right: 10px;
            img {
              width: 100%;
              border-radius: 5px;
            }
          }
        }
        .artist-container {
          .author {
          }
        }
        .duration-container {
          text-align: right;
          padding-right: 15px;
          position: relative;
          p {
            padding-right: 10px;
          }
          .song-tools {
            display: flex;
            justify-content: flex-end;
            top: 50%;
            margin-top: -25px;
            right: 10px;
            position: absolute;
            display: none;
            i {
              flex-shrink: 0;
              cursor: pointer;
              margin-right: 15px;
              font-size: 20px;
            }
          }
        }
        &:nth-child(2n) {
          background: #f7f7f7;
        }
        &.playing {
          p {
            color: #34d399;
          }
          i {
            color: #34d399;
          }
          .index-container {
            .num {
              display: none;
            }
            .play-icon {
              display: flex;
            }
            .play-btn {
              display: none;
            }
          }
        }
        &:hover {
          background: #e8e9ed;
          .index-container {
            .num {
              display: none;
            }
            .play-btn {
              display: block;
            }
          }
          // .duration-container {
          //   p {
          //     display: none;
          //   }
          //   .song-tools {
          //     display: flex;
          //   }
          // }
          &.playing {
            .index-container {
              .play-btn {
                display: none;
              }
              .play-icon {
                display: none;
              }
              .pause-btn {
                display: block;
              }
            }
          }
        }
      }
      p {
        cursor: pointer;
      }
    }
  }
}
</style>
