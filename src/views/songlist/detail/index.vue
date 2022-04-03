<!--
 * @Author: zyh
 * @Date: 2022-03-31 18:23:04
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-02 23:23:14
 * @FilePath: \vue3-music\src\views\songlist\detail\index.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="playlist-detail container">
    <div class="left shadow">
      <div class="top">
        <div class="avatar">
          <img :src="detail.coverImgUrl + '?param=200y200'" alt="" />
        </div>
        <div class="info">
          <div class="title flex-between">
            <span>{{ detail.name }}</span>
            <div></div>
          </div>
          <div class="user flex items-center flex-row">
            <div class="avatar" @click="toUser(creator.userId)">
              <img :src="creator.avatarUrl + '?param=100y100'" alt="" />
            </div>
            <p class="nickname" @click="toUser(creator.userId)">
              {{ creator.nickname }}
            </p>
            <p class="createTime" v-if="detail.createTime">
              {{ dateFormat(detail.createTime, "YYYY-MM-DD") }}创建
            </p>
          </div>
          <div
            class="tag flex-row"
            v-if="detail.tags && detail.tags.length > 0"
          >
            标签：<a
              v-for="item of detail.tags"
              :key="item"
              @click="tag(item)"
              >{{ item }}</a
            >
          </div>
          <div class="desc">
            <p class="ellipsis-two" v-html="detail.description"></p>
            <span
              @click="openDesc(detail.name, detail.description)"
              class="flex-row"
              v-if="detail.description && detail.description.length > 50"
              >全部<i
                class="iconfont niceiconfontyoujiantou-copy-copy-copy-copy"
              ></i
            ></span>
          </div>
        </div>
      </div>
      <div class="content" v-loading="loading">
        <artist-list
          :songs="songs"
          :isPerson="ordered ? true : false"
          @collectArtist="collectArtist"
          :subscribed="detail.subscribed"
        />
      </div>
    </div>
    <div class="right">
      <div class="like module shadow">
        <div class="card-header flex-row">
          <span>喜欢这个歌单的人</span>
        </div>
        <ul v-if="subscribers.length > 0">
          <li v-for="item of subscribers" :key="item.userId">
            <div class="avatar" @click="toUser(item.userId)">
              <img
                :src="item.avatarUrl + '?param=150y150'"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom: 10px">
          还没有人喜欢
        </p>
      </div>
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul>
          <li
            v-for="item of relatedList"
            :key="item.id"
            @click="toDetail(item.id)"
          >
            <div class="avatar">
              <img
                :src="item.coverImgUrl + '?param=150y150'"
                :alt="item.nickname"
                :title="item.nickname"
              />
            </div>
            <div class="info">
              <h2 class="ellipsis" :title="item.name">{{ item.name }}</h2>
              <span
                >By. <small> {{ item.creator.nickname }}</small></span
              >
            </div>
          </li>
        </ul>
      </div>
      <div class="comment module shadow">
        <div class="card-header flex-row">
          <span>精彩评论</span>
        </div>
        <ul v-if="comments.length > 0">
          <li class="item" v-for="item of comments" :key="item.time">
            <div class="avatar" @click="toUser(item.user.userId)">
              <img
                :src="item.user.avatarUrl + '?param=150y150'"
                :alt="item.user.nickname"
                :title="item.user.nickname"
              />
            </div>
            <div class="info">
              <h2 @click="toUser(item.user.userId)">
                {{ item.user.nickname
                }}<small> · {{ formatMsgTime(item.time) }}</small>
              </h2>
              <p>{{ item.content }}</p>
            </div>
          </li>
        </ul>
        <p class="no-data-text" v-else style="padding-bottom: 10px">
          还没有人评论
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArtistList from "@/components/common/ArtistList.vue";
import { useRoute } from "vue-router";
import { watch, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useSinglistDetailStore } from "@/stores/singlistDetail";
import { dateFormat, formatMsgTime } from "@/utils/tools";
const route = useRoute();
const {
  _initialize,
  toUser,
  toDetail,
  tag,
  openDesc,
  collectArtist,
  setArtistId,
} = useSinglistDetailStore();
const {
  detail,
  creator,
  loading,
  relatedList,
  songs,
  subscribers,
  comments,
  ordered,
} = storeToRefs(useSinglistDetailStore());
watch(
  () => route.query.id,
  (newId, oldId) => {
    console.log("detail.description", detail);
    let id = Number(route.query.id);
    if (id) {
      _initialize(id);
    }
  }
);

onMounted(() => {
  const id = Number(route.query.id);
  setArtistId(id);
  if (id) {
    _initialize(id);
  }
});
</script>
<style lang="scss" scoped>
.playlist-detail {
  display: flex;
  align-items: flex-start;
  .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    .top {
      display: flex;
      > .avatar {
        width: 200px;
        height: 200px;
        border-radius: 8px;
        position: relative;
        margin-right: 30px;
        flex-shrink: 0;
        img {
          width: 100%;
          height: 100%;
          border-radius: 8px;
          position: relative;
        }
        &::before {
          content: "";
          width: 95%;
          height: 95%;
          background: rgba(0, 0, 0, 0.2);
          display: block;
          position: absolute;
          top: 15px;
          right: -5px;
          z-index: 0;
          border-radius: 8px;
        }
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          width: 100%;
          font-size: 24px;
          font-weight: 700;
          line-height: 24px;
          margin-bottom: 20px;
          margin-top: 10px;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .tag {
          // margin-top: 15px;
          // margin-bottom: 15px;
          a {
            color: #fff;
            background: #32d4a5;
            margin-right: 15px;
            font-size: 12px;
            cursor: pointer;
            padding: 4px 12px;
            border-radius: 15px;
            &::after {
              // content: '，'
            }
            &:last-child {
              &::after {
                content: "";
              }
            }
          }
        }
        .user {
          margin-bottom: 15px;
          .avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            position: relative;
            margin-right: 15px;
            cursor: pointer;
            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              position: relative;
            }
          }
          .nickname {
            font-size: 14px;
            margin-right: 30px;
            cursor: pointer;
            &:hover {
              color: #32d4a5;
            }
          }
          .createTime {
            font-size: 14px;
            color: #808080;
          }
        }
        .desc {
          display: flex;
          flex-direction: column;
          line-height: 1.6;
          margin-top: 15px;
          span {
            flex-shrink: 0;
            color: #32d4a5;
            cursor: pointer;
          }
          p {
            line-height: 1.6;
            font-weight: 400;
            flex: 1;
            font-size: 14px;
          }
        }
      }
    }
    .content {
      width: 100%;
      margin-top: 20px;
    }
  }
  .right {
    width: 350px;
    flex-shrink: 0;
    .module {
      padding: 15px;
      width: 100%;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .like {
      padding-bottom: 5px;
      ul {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -5px;
        li {
          flex: 0 0 14.285714285714%;
          max-width: 14.285714285714%;
          padding: 0 5px 10px;
          .avatar {
            width: 100%;
            border-radius: 3px;
            img {
              width: 100%;
              border-radius: 3px;
            }
          }
        }
      }
    }
    .related {
      padding-bottom: 5px;
      ul {
        li {
          display: flex;
          margin-bottom: 15px;
          cursor: pointer;
          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 3px;
            margin-right: 15px;
            flex-shrink: 0;
            img {
              width: 100%;
              border-radius: 3px;
            }
          }
          .info {
            height: 50px;
            width: calc(100% - 60px);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            h2 {
              font-size: 14px;
              margin-bottom: 10px;
              width: 100%;
            }
            span {
              font-size: 12px;
              color: #a5a5c1;
            }
            &:hover {
              h2 {
                color: #32d4a5;
              }
            }
          }
        }
      }
    }
    .comment {
      ul {
        li {
          padding: 10px 0;
          width: 100%;
          display: flex;
          .avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            margin-right: 12px;
            flex-shrink: 0;
            cursor: pointer;
            img {
              width: 100%;
              border-radius: 50%;
            }
          }
          .info {
            flex: 1;
            h2 {
              font-size: 15px;
              margin-right: 5px;
              margin-bottom: 10px;
              cursor: pointer;
              small {
                font-size: 12px;
                color: #a5a5c1;
                font-weight: 200;
              }
            }
            p {
              width: 100%;
              font-size: 12px;
              color: #666666;
              line-height: 1.6;
              padding: 5px 10px;
              background: #f5f5f5;
              margin-top: 5px;
              border-radius: 3px;
            }
          }
        }
      }
    }
    .card-header {
      border-left: 3px solid #32d4a5;
      height: 20px;
      padding-left: 1rem;
      margin-bottom: 15px;
      font-weight: bold;
      .icon-like {
        font-size: 20px;
      }
    }
  }
}
</style>
