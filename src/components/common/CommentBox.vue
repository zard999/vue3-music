<!--
 * @Author: zyh
 * @Date: 2022-03-28 17:33:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-03 00:44:49
 * @FilePath: \vue3-music\src\components\common\CommentBox.vue
 * @Description: 
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <div class="comment-box">
    <p class="flex-row">
      <span>
        <i class="iconfont niceuser"></i>
        &nbsp;&nbsp;{{ userInfo.nickname }}，你好
      </span>
      <button
        class="cancel-comment"
        @click="$emit('cancelComment')"
        v-if="currentCommentId != ''"
      >
        取消回复
      </button>
    </p>
    <div class="comment-form">
      <div class="avatar">
        <img :src="userInfo.avatarUrl" :title="userInfo.nickname" />
      </div>
      <div class="comarea">
        <textarea
          name="comment"
          v-model="commentContent"
          placeholder="你看什么看！"
          tabindex="4"
          cols="50"
          rows="5"
        ></textarea>
      </div>
    </div>
    <div class="comment-foot flex-between">
      <div class="smile"></div>
      <button
        type="button"
        class="comment-btn transition"
        @click="$emit('commentSubmit', commentContent)"
      >
        评论
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useLoginStore } from "@/stores/login";
const { userInfo } = storeToRefs(useLoginStore());
const props = defineProps<{
  currentCommentId: String;
  clearContent: Boolean;
}>();
// 评论内容
const commentContent = ref("");

//监控data中的数据变化
watch(
  () => props.clearContent,
  (val) => {
    if (val) {
      commentContent.value = "";
    }
  }
);
//   computed: {
//     ...mapGetters(["userInfo", "loginStatu"]),
//   },

//方法集合
//   methods: {
//     // 提交评论
//     commentSubmit() {
//       this.$emit("commentSubmit", this.commentContent);
//     },
//     // 取消评论
//     cancelComment() {
//       this.$emit("cancelComment");
//     },
//   },
</script>
<style lang="scss" scoped>
.comment-box {
  margin-top: 20px;
  p {
    i {
      margin-right: 10px;
    }
    span {
      flex: 1;
    }
    .cancel-comment {
      color: #d9dfff;
      font-size: 12px;
      background: none;
      padding: 6px 10px;
      border-radius: 2px;
      border: 1px solid #dee3ff;
      cursor: pointer;
    }
  }
  .comment-form {
    display: flex;
    margin-top: 1.5em;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 3px;
      margin-right: 20px;
      position: relative;
      flex-shrink: 0;
      img {
        width: 100%;
        border-radius: 3px;
      }
    }
    .comarea {
      flex: 1;
      textarea {
        width: 100%;
        outline: none;
        background: #f8f9ff;
        resize: none;
        padding: 6px 12px;
        color: #666;
        border: 1px solid #eaebff;
        border-radius: 3px;
        font-size: 13px;
        height: 80px;
      }
    }
  }
}
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
</style>
