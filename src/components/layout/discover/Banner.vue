<!--
 * @Author: zyh
 * @Date: 2022-03-23 20:44:45
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-02 22:37:26
 * @FilePath: \vue3-music\src\components\layout\discover\Banner.vue
 * @Description: 发现页顶部banner轮播图
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <Swiper
    slides-per-group-auto
    slides-per-view="auto"
    :navigation="true"
    :grab-cursor="true"
  >
    <SwiperSlide v-for="item in banners" :key="item.bannerId">
      <img :src="item.pic" class="banner-image" />
      <!-- @click="onClick(item)" -->
    </SwiperSlide>
  </Swiper>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { onMounted, toRefs } from "vue";
import { useCommonStore } from "@/stores/common";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/global";
const { loading } = storeToRefs(useGlobalStore());
const { isLoading } = useGlobalStore();

const { banners } = toRefs(useCommonStore());
const { getBanners } = useCommonStore();
onMounted(() => {
  isLoading(true);
  getBanners();
});
</script>

<style lang="scss" scoped>
.swiper {
  @apply -mx-2.5;
  .swiper-slide {
    @apply w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 px-2.5;
  }
}

.banner-image {
  @apply rounded-lg cursor-pointer transition-all object-cover;
  @apply hover:shadow hover:opacity-80;
}
</style>
