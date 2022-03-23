/*
 * @Author: zyh
 * @Date: 2022-03-23 11:39:22
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-23 11:42:52
 * @FilePath: \music-item\tailwind.config.js
 * @Description: Tailwind CSS 是一个功能类优先的 CSS 框架，
 * 它集成了诸如 flex, pt-4, text-center 和 rotate-90 这样的的类，
 * 它们能直接在脚本标记语言中组合起来，构建出任何设计。
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      important: true,
    },
  },
  plugins: [],
};
