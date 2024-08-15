import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/note/",

  lang: "zh-CN",
  title: "Java技术深耕录",
  description: "lint 的博客",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
