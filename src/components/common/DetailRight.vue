<!--
 * @Author: zyh
 * @Date: 2022-03-31 18:25:43
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-31 18:32:32
 * @FilePath: \vue3-music\src\components\common\DetailRight.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="right">
    <!-- 喜欢这个歌单的人 -->
    <div class="like module shadow" v-if="subscribers">
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
    <!-- 相关推荐 -->
    <div class="related module shadow" v-if="relatedList">
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
    <!-- 精彩评论 -->
    <div class="comment module shadow" v-if="comments">
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
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { formatMsgTime } from "@/utils/tools";
/**
 * subscribers:
 * relatedList：
 * comments：评论
 */
const props = defineProps<{
  subscribers: any;
  relatedList: any;
  comments: any;
}>();
const router = useRouter();

const toUser = (id: number) => {
  router.push({
    name: "personal",
    query: {
      id,
    },
  });
};

// 相关推荐详情
const toDetail = (id: number) => {
  router.push({
    name: "playlistDetail",
    query: {
      id,
    },
  });
};
</script>

<style lang="scss">
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
              color: $color-theme;
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
    border-left: 3px solid $color-theme;
    height: 20px;
    padding-left: 1rem;
    margin-bottom: 15px;
    font-weight: bold;
    .icon-like {
      font-size: 20px;
    }
  }
}
</style>
