<!--
 * @Author: zyh
 * @Date: 2022-03-23 20:44:45
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 15:43:16
 * @FilePath: \music-item\src\components\layout\discover\Banner.vue
 * @Description: banner轮播图
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

const { banners } = toRefs(useCommonStore());
const { getBanners } = useCommonStore();
onMounted(async () => {
  await getBanners();
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
