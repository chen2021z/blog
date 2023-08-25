import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "如约而至",
  description: "个人前端博客，欢迎来玩！",
  base: '/blog/',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "chen",
    authorAvatar: "/githubLOGO.jpg",
    docsRepo: "https://github.com/chen2021z/blog",
    docsBranch: "main",
    docsDir: "docs",
    lastUpdatedText: "",
    // 自动设置分类
    // autoSetSeries: true,
    // series 为原 sidebar
    series: {
      "/docs/base/": [
        {
          text: "HTML + CSS",
          children: ["html", "css"],
        },
        {
          text: "JavaScript",
          children: ["js_base", "jsWebAPI", 'js_interview'],
        },
        {
          text: "Vue",
          children: ["vue_cli", "vue3_start", "Vue2", "Vue3"],
        },
        {
          text: "Webpack",
          children: ["webpack_loader", "webpack_plugin", "webpack"],
        },
        {
          text: "HTTP",
          children: ["http"],
          collapsible: true,
        }
      ],
      "/docs/senior/": [
        {
          text: "高阶面试题",
          children: ['algorithm', 'seniorQuesions'],
          // collapsible: true,
        },
        {
          text: "项目考察",
          children: ["projectInspection"],
          // collapsible: true,
        },
        {
          text: "高阶原理",
          children: ["browser_process_model", "eventLoop"],
          // collapsible: true,
        },

      ]
    },
    navbar: [
      { text: "首页", link: "/" },
      {
        text: "知识记录", link: "/categories/",
        children: [
          { text: "html", link: '/docs/base/html' },
          { text: "css", link: '/docs/base/css' },
          { text: "JavaScript", link: '/docs/base/js_base' },
          { text: "Vue", link: '/docs/base/vue_cli' },
          { text: "Webpack", link: '/docs/base/webpack_loader' },
          { text: "Http", link: '/docs/base/http' },
        ]
      },
      {
        text: "高级进阶",
        children: [
          { text: "算法简述", link: '/docs/senior/algorithm' },
          { text: "深广度面试题", link: '/docs/senior/seniorQuesions' },
          { text: "项目考察", link: '/docs/senior/projectInspection' },
          { text: "浏览器进程模型", link: '/docs/senior/browser_process_model' },
          { text: "事件循环", link: '/docs/senior/eventLoop' },
        ]
      },
      {
        text: "Category", link: "/categories/js/1/"
      },
      { text: "tag", link: "/tags/event_loop/1/" },
      {
        text: "关于我", children: [
          { icon: 'LogoGithub', text: "github", link: "https://github.com/chen2021z/" }
        ]
      },
    ],
    bulletin: {
      body: [
        {
          type: "title",
          content: "欢迎来到我的博客",
        },
        {
          type: "text",
          content: `个人偏向文档方式记录所学前端知识，后续将添加更多博客文章与生活杂谈`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "告诉你个秘密",
        },
        {
          type: "text",
          content: `作者不仅超帅，说话还好听( •̀ᄇ• ́)ﻭ✧<br/>想认识作者的话请用力点击下方按钮`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "buttongroup",
          children: [
            {
              text: "点我",
              link: "/blog/blogs/other/social.html",
            }
          ]
        }
      ]
    },
  }),
  plugins: [

  ]
});
