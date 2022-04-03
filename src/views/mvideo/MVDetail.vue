<!--
 * @Author: zyh
 * @Date: 2022-03-28 15:24:44
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-03 09:58:16
 * @FilePath: \vue3-music\src\views\mvideo\MVDetail.vue
 * @Description: MV详情
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="mv-detail container">
    <div class="left shadow">
      <div class="video-container">
        <!-- controls="controls" -->
        <video
          :src="videoUrl"
          controls="true"
          autoplay
          controlslist="nodownload"
        ></video>
      </div>
      <div class="video-foot">
        <h2 class="title flex flex-row items-center">
          <IconPark :icon="VideoTwo" :size="14" class="mr mr-2" />
          {{ detail.name }}
        </h2>
        <div class="tag">
          <a v-for="item of detail.videoGroup" :key="item.id"
            >#{{ item.name }}</a
          >
        </div>
        <p class="flex-row">
          <span>发布：{{ dateFormat(detail.publishTime, "YYYY-MM-DD") }}</span>
          <span v-if="detail.playCount"
            >播放次数：{{ tranNumber(detail.playCount, 1) }}</span
          >
        </p>
        <div class="follow">
          <div
            class="box"
            @click="likeResource"
            :class="videoDetailInfo.isLike ? 'active' : ''"
          >
            <IconPark :icon="Like" :size="14" class="mr mr-2" />
            <!-- <i class="iconfont nicexihuan3 icon-like"></i> -->
            {{ videoDetailInfo.likeCount }}
          </div>
          <div class="box">
            <IconPark :icon="Star" :size="14" class="mr mr-2" />
            <!-- <i class="iconfont niceshoucang2 icon-collection"></i> -->
            {{ detail.subCount }}
          </div>
          <div class="box">
            <IconPark :icon="Share" :size="14" class="mr mr-2" />
            <!-- <i class="iconfont nicefenxiang2 icon-share"></i> -->
            {{ videoDetailInfo.shareCount }}
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="title flex flex-row items-center">
          <IconPark :icon="Comment" :size="14" class="mr mr-2" />
          Comments |
          <span class="noticom"
            ><a>{{ videoDetailInfo.commentCount }} 条评论</a>
          </span>
        </div>
        <!-- <comment-box
          :currentCommentId="currentCommentId"
          @commentSubmit="commentSubmit"
          :clearContent="clearContent"
          v-if="currentCommentId == ''"
        /> -->
        <CommentList
          title="精彩评论"
          :commentList="hotComments"
          :currentCommentId="currentCommentId"
          @commentHandle="commentHandle"
          @cancelComment="cancelComment"
          @commentSubmit="commentSubmit"
          @commentLike="commentLike"
          v-if="hotComments.length > 0"
        />
        <CommentList
          title="最新评论"
          :commentList="comments"
          :currentCommentId="currentCommentId"
          @commentHandle="commentHandle"
          @cancelComment="cancelComment"
          @commentSubmit="commentSubmit"
          @commentLike="commentLike"
        />
        <div class="page-wrap">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="limit"
            background
            hide-on-single-page
            layout="total, prev, pager, next"
            :total="commentTotal"
            class="justify-center"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="profile module shadow">
        <div class="card-header flex-row">
          <span>视频简介</span>
        </div>
        <div class="content">
          <p v-if="detail.desc">{{ detail.desc }}</p>
          <p v-else>视频暂无简介</p>
        </div>
      </div>
      <div class="related module shadow">
        <div class="card-header flex-row">
          <span>相关推荐</span>
        </div>
        <ul>
          <li v-for="item of relatedList" :key="item.vid">
            <div class="avatar">
              <img
                :src="item.cover + '?param=320y180'"
                :alt="item.name"
                :title="item.name"
              />
              <div class="action">
                <button
                  class="play flex justify-center items-center"
                  title="播放"
                  v-if="!item.isLive"
                  @click="toDetail(item.id)"
                >
                  <IconPark :icon="PlayOne" :size="20" />
                </button>
              </div>
            </div>
            <div class="info">
              <h2 class="flex flex-row items-center ellipsis">
                <IconPark :icon="VideoTwo" :size="14" class="mr mr-2" />{{
                  item.name
                }}
              </h2>
              <div class="author">
                By.<span v-for="author of item.artists" :key="author.id"
                  ><small> {{ author.name }}</small></span
                >
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import CommentList from "@/comments/comment/CommentList.vue";
// import CommentBox from "components/common/commentBox/Index.vue";
// import { mapGetters } from "vuex";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useMvDetailStore } from "@/stores/mvDetail";
import { storeToRefs } from "pinia";
import { dateFormat, tranNumber } from "@/utils/tools";
import {
  Like,
  Star,
  Share,
  Comment,
  VideoTwo,
  PlayOne,
} from "@icon-park/vue-next";
import IconPark from "@/components/common/IconPark.vue";

const route = useRoute();
const {
  videoId,
  videoUrl,
  detail,
  videoDetailInfo,
  currentCommentId,
  clearContent,
  hotComments,
  comments,
  currentPage,
  limit,
  commentTotal,
  relatedList,
} = storeToRefs(useMvDetailStore());
const {
  _initialize,
  likeResource,
  commentHandle,
  cancelComment,
  commentSubmit,
  commentLike,
  handleSizeChange,
  handleCurrentChange,
  toDetail,
  handleVideoId,
} = useMvDetailStore();

onMounted(() => {
  let id = Number(route.query.id);
  if (id) {
    handleVideoId(id);
    _initialize(id);
  }
});

watch(
  () => route.query.name,
  (newValue) => {
    let id = Number(route.query.id) || videoId.value;
    if (id) {
      _initialize(id);
    }
  }
);

//   computed: {
//     ...mapGetters(["userInfo", "loginStatu"]),
//   }
</script>
<style lang="scss" scoped>
.mv-detail {
  display: flex;
  .left {
    flex: 1;
    width: 950px;
    padding: 15px;
    border-radius: 8px;
    margin-right: 20px;
    .title {
      margin-bottom: 10px;
      position: relative;
      i {
        font-size: 24px;
        margin-top: 1px;
        margin-left: -3px;
        color: #3ad49c;
      }
    }
    .video-container {
      position: relative;
      padding-top: 56.25%;
      video {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #000;
      }
    }
    .video-foot {
      margin-top: 8px;
      .tag {
        margin-bottom: 8px;
        a {
          font-size: 12px;
          color: #3ad49c;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      p {
        span {
          margin-right: 30px;
          font-size: 12px;
          color: #999;
        }
      }
      .follow {
        display: flex;
        margin-top: 10px;
        .box {
          width: auto;
          border-radius: 15px;
          padding: 10px 15px;
          background: #f2f2f2;
          margin-right: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #161e27;
          cursor: pointer;
          i {
            font-size: 26px;
            color: #161e27;
          }
          &.active {
            color: #fff;
            background: #3ad49c;
            .icon-like {
              color: #fff;
            }
          }
        }
      }
    }
    .comments {
      margin-top: 25px;
      .title {
        width: 100%;
        height: 50px;
        // background: #f8f8f8;
        border-radius: 3px;
        padding: 0 3px;
        border-bottom: 1px solid #f1f1f1;
        i {
          color: #666;
          font-size: 18px;
          margin-right: 10px;
        }
        span {
          margin-left: 5px;
        }
      }
      //   .comment-box {
      //     margin-top: 20px;
      //     p {
      //       i {
      //         margin-right: 10px;
      //       }
      //       span {
      //         flex: 1;
      //       }
      //       .cancel-comment {
      //         color: #d9dfff;
      //         font-size: 12px;
      //         background: none;
      //         padding: 6px 10px;
      //         border-radius: 2px;
      //         border: 1px solid #dee3ff;
      //         cursor: pointer;
      //       }
      //     }
      //     .comment-form {
      //       display: flex;
      //       margin-top: 1.5em;
      //       .avatar {
      //         width: 50px;
      //         height: 50px;
      //         border-radius: 3px;
      //         margin-right: 20px;
      //         position: relative;
      //         flex-shrink: 0;
      //         img {
      //           width: 100%;
      //           border-radius: 3px;
      //         }
      //       }
      //       .comarea {
      //         flex: 1;
      //         textarea {
      //           width: 100%;
      //           outline: none;
      //           background: #f8f9ff;
      //           resize: none;
      //           padding: 6px 12px;
      //           color: #666;
      //           border: 1px solid #eaebff;
      //           border-radius: 3px;
      //           font-size: 13px;
      //           height: 80px;
      //         }
      //       }
      //     }
      //   }
      .comment-foot {
        margin-top: 15px;
        .comment-btn {
          color: #fff;
          padding: 10px 30px;
          font-size: 0.75rem;
          border-radius: 3px;
          border: none;
          cursor: pointer;
          outline: none;
          background: #ff416c; /* fallback for old browsers */
          background: -webkit-linear-gradient(
            to right,
            #ff4b2b,
            #ff416c
          ); /* Chrome 10-25, Safari 5.1-6 */
          background: linear-gradient(
            to right,
            #ff4b2b,
            #ff416c
          ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
        }
      }
      .page-wrap {
        margin-top: 20px;
      }
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
    .profile {
      .author {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        margin-top: 5px;
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin-right: 15px;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
          }
        }
        p {
          flex: 1;
        }
        .follow {
          padding: 3px 10px;
          font-size: 12px;
          background: #3ad49c;
          color: #ffffff;
          border: 1px solid #3ad49c;
          cursor: pointer;
          border-radius: 18px;
          &:hover {
            background: none;
            color: #3ad49c;
          }
        }
      }
    }
    .related {
      padding-bottom: 5px;
      ul {
        li {
          display: flex;
          flex-direction: column;
          margin-bottom: 15px;
          .avatar {
            width: 100%;
            margin-right: 15px;
            flex-shrink: 0;
            position: relative;
            img {
              width: 100%;
            }
            .action {
              display: none;
              position: absolute;
              top: 50%;
              left: 50%;
              -webkit-transform: translate(-50%, -50%);
              -ms-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
              .play {
                width: 32px;
                height: 32px;
                padding: 0;
                border: none;
                border-radius: 50%;
                color: #fff;
                cursor: pointer;
                background-color: #3ad49c;
                i {
                  font-size: 12px;
                }
              }
            }
          }
          .info {
            height: 50px;
            width: calc(100% - 50px);
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: column;
            h2 {
              font-size: 14px;
              margin-bottom: 3px;
              margin-top: 5px;
              width: 100%;
              min-height: 20px;
              i {
                color: #3ad49c;
                font-size: 24px;
                margin-right: 5px;
              }
            }
            .author {
              font-size: 12px;
              color: #a5a5c1;
              span {
                font-size: 12px;
                color: #a5a5c1;
                &::after {
                  content: "/";
                  margin-left: 5px;
                }
                &:last-child {
                  &::after {
                    content: "";
                  }
                }
              }
            }
          }
          &:hover {
            .action {
              display: flex;
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
      border-left: 3px solid #3ad49c;
      height: 20px;
      padding-left: 1rem;
      margin-bottom: 15px;
      font-weight: bold;
      .icon-like {
        font-size: 20px;
        &.active {
          color: #3ad49c;
        }
      }
    }
  }
}
</style>
