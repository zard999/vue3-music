<!--
 * @Author: zyh
 * @Date: 2022-03-28 19:14:14
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-28 19:19:49
 * @FilePath: \vue3-music\src\components\common\zhCn.vue
 * @Description: 中文组件
 * 
 * Copyright (c) 2022 by 穿越, All Rights Reserved. 
-->
<template>
  <el-config-provider :locale="locale">
    <slot name="zhCn" />
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue";
import { ElConfigProvider } from "element-plus";

import zhCn from "element-plus/lib/locale/lang/zh-cn";

export default defineComponent({
  components: {
    ElConfigProvider,
  },
  setup() {
    return {
      locale: zhCn,
    };
  },
});
</script>
