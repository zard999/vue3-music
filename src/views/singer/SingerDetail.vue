<!--
 * @Author: zyh
 * @Date: 2022-03-27 13:35:51
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-28 15:09:19
 * @FilePath: \vue3-music\src\views\singer\SingerDetail.vue
 * @Description: 歌曲详情
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="singer-detail">
    <div class="singer-info">
      <div class="top">
        <div class="top-mask">
          <div class="singer-box flex flex-col justify-center items-center">
            <div class="avatar transition">
              <img :src="detail.img1v1Url + '?param=200y200'" />
              <!-- 级别 -->
              <!-- <div class="level flex-center transition" v-show="detail.level">
                {{detail.level > 0 ? detail.level : 0}}
                <IconPark :icon="Female" size="18" :stroke-width="3" />
                <i class="iconfont icon-level" :class="level"></i>
              </div> -->
            </div>
            <p class="nickname flex items-center">
              <div class="xh px-2">{{ detail.name }}</div>
              <IconPark :icon="gender" size="18" :stroke-width="3" />
            </p>
            <div class="follow flex-center transition">
              <i class="iconfont niceIcon_add"></i>
              关注TA
            </div>
            <div class="desc ellipsis-two" v-html="detail.briefDesc"></div>
            <ul class="info flex justify-center">
              <li>
                <p class="num">{{ detail.musicSize }}</p>
                <p class="text">单曲数</p>
              </li>
              <li>
                <p class="num">{{ detail.albumSize }}</p>
                <p class="text">专辑数</p>
              </li>
              <li>
                <p class="num">{{ detail.mvSize }}</p>
                <p class="text">MV数</p>
              </li>
              <li v-show="detail.followeds">
                <p class="num">{{ detail.followeds }}</p>
                <p class="text">粉丝</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="bottom-trangle"></div>
      </div>
      <div class="bottom container">
        <ul class="nav flex justify-center">
          <li
            v-for="item of navList"
            :key="item.id"
            :class="active == item.id ? 'active' : ''"
            @click="tabItem(item.id)"
          >
            {{ item.name }}
          </li>
        </ul>
        <div class="content">
          <artist-list :songs="songs" :isPerson="isPerson" v-if="active == 1" />
          <AlbumList :albums="albums" v-if="active == 2" />
          <mv-list :mvs="mvs" type="mv" v-if="active == 3" />
          <div class="info-box" v-if="active == 4">
            <h2 class="title">{{ detail.name }}简介</h2>
            <div class="profile" v-html="singerDesc.briefDesc"></div>
            <div class="introduction">
              <div
                class="item"
                v-for="item of singerDesc.introduction"
                :key="item.ti"
              >
                <h3 class="sub-title">{{ item.ti }}</h3>
                <p v-html="item.txt"></p>
              </div>
            </div>
          </div>
          <div class="simi-box" v-if="active == 5">
            <div class="singer-list" v-if="singers.length > 0">
              <singer-item :hotSinger="singers" />
            </div>
            <nice-empty v-else></nice-empty>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArtistList from "@/components/common/ArtistList.vue";
import AlbumList from "@/components/common/AlbumList.vue";
import MvList from "@/components/common/MvList.vue";
import SingerItem from "@/components/common/SingerItem.vue";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useSingerDetail } from "@/stores/singerDetail";
import { useSingerStore } from "@/stores/singer";
import IconPark from "../../components/common/IconPark.vue";
import { Male, Female,Level } from "@icon-park/vue-next";

const route = useRoute();
// const router = useRouter();
const {
  singerDetail,
  userDetail,
  navList,
  active,
  songs,
  isPerson,
  albums,
  mvs,
  singerDesc,
  singers,
  detail,
} = storeToRefs(useSingerDetail());
const { _initialize, tabItem } = useSingerDetail();
const { singer } = useSingerStore();

// 初始化
const init = () => {
  let id = Number(route.query.id) || singer.id;
  if (id) {
    _initialize(id);
  }
};
init();

// // 合并歌手详情
// const detail = computed(() => {
//   return Object.assign(singerDetail, userDetail);
// });

// 设置歌手性别
const gender = computed(() => {
  if (detail.value.gender > 0) {
    return detail.value.gender === 1 ? Male : Female;
  } else {
    return Male;
  }
});

// 监听路由变化
watch(
  () => route.query.id,
  (val) => {
    init();
  }
);
</script>
<style lang="scss" scoped>
.avatar >>> img {
  border-radius: 5px;
}
.singer-detail {
  margin-top: -20px;
  .singer-info {
    .top {
      position: relative;
      width: 100%;
      height: 580px;
      background: url("../../assets/images/top-bg.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      .top-mask {
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        .singer-box {
          height: 100%;
          position: relative;
          margin: 0 auto;
          padding-top: 10px;
          text-align: center;
          z-index: 2;
          .avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            position: relative;
            overflow: hidden;
            .level {
              width: 100%;
              height: 25px;
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              background: rgba(255, 255, 255, 0.8);
              .icon-level {
                font-size: 25px;
                color: #34d399;
                margin-left: 8px;
              }
            }
            img {
              width: 120px;
              height: 120px;
              border-radius: 50%;
              background: #fff;
              border: 3px solid rgba(255, 255, 255, 0.6);
            }
            &:hover {
              box-shadow: 0px 5px 20px 0px rgba(255, 255, 255, 0.8);
            }
          }
          .nickname {
            margin-top: 20px;
            font-size: 24px;
            font-weight: 700;
            color: #fff;
            line-height: 24px;
            i {
              font-size: 20px;
              &.man {
                color: #1f91f2;
              }
              &.woman {
                color: #fc7265;
              }
            }
          }
          .follow {
            margin: 24px 0 30px;
            padding: 0;
            height: 36px;
            width: 96px;
            font-size: 12px;
            line-height: 36px;
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.6);
            cursor: pointer;
            border-radius: 18px;
            &:hover {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid #fff;
            }
            i {
              margin-right: 5px;
            }
          }
          .desc {
            margin: 0 auto 24px;
            width: 740px;
            height: 48px;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.6);
            line-height: 24px;
          }
          .info {
            margin: 0 auto;
            width: 100%;
            li {
              margin: 0 50px;
              text-align: center;
              .num {
                margin-bottom: 8px;
                font-size: 24px;
                line-height: 24px;
                color: #fff;
              }
              .text {
                font-size: 14px;
                line-height: 14px;
                color: rgba(255, 255, 255, 0.6);
              }
            }
          }
        }
      }
      .bottom-trangle {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 137px;
        background: url(../../assets/images/arrow-lr.png);
        background-position: center;
        z-index: 1;
      }
    }
    .bottom {
      .nav {
        margin: 30px 0;
        li {
          margin: 0 20px;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
          &.active {
            color: #34d399;
          }
        }
      }
      .content {
        background: #fff;
        .info-box {
          padding: 15px;
          .title {
            text-align: center;
            position: relative;
            margin-bottom: 30px;
            &::after {
              content: "";
              width: 40px;
              height: 2px;
              background: #34d399;
              position: absolute;
              left: 50%;
              bottom: -10px;
              margin-left: -20px;
            }
          }
          .profile {
            line-height: 1.7;
            margin-bottom: 20px;
            text-align: center;
          }
          .introduction {
            .item {
              margin-bottom: 15px;
              .sub-title {
                margin-bottom: 10px;
              }
              p {
                line-height: 1.7;
              }
            }
          }
        }
        .simi-box {
          padding: 15px 15px;
          .singer-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            margin: 0px -15px 0;
          }
        }
      }
    }
  }
}
</style>
