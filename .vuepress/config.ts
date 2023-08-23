import { defineUserConfig } from "vuepress";
import type { DefaultThemeOptions } from "vuepress";
import recoTheme from "vuepress-theme-reco";

export default defineUserConfig({
  title: "A trusted blog",
  description: "Just playing around",
  base: '/blog/',
  theme: recoTheme({
    style: "@vuepress-reco/style-default",
    logo: "/logo.png",
    author: "chen",
    authorAvatar: "/head.png",
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
          collapsible: true,
        },
        {
          text: "JavaScript",
          children: ["js_base", "jsWebAPI", 'js_interview'],
          collapsible: true,
        },
        {
          text: "Vue",
          children: ["Vue2", "Vue3"],
          collapsible: true,
        },
        {
          text: "Webpack",
          children: ["webpack"],
          collapsible: true,
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
          children: ['algorithm','seniorQuesions'],
          // collapsible: true,
        },
        {
          text: "项目考察",
          children: ["projectInspection"],
          // collapsible: true,
        },
        {
          text: "高阶原理",
          children: ["eventLoop"],
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
          { text: "Vue", link: '/docs/base/Vue2' },
          { text: "Webpack", link: '/docs/base/webpack' },
          { text: "Http", link: '/docs/base/http' },
        ]
      },
      {
        text: "高级进阶", 
        children: [
          { text: "事件循环", link: '/docs/senior/eventLoop' },
        ]
      },
      { text: "tag", link: "/tags/tag1/1/" },
      { text: "categories", link: "/categories/categories1" },
    ],
    bulletin: {
      body: [
        {
          type: "text",
          content: `🎉🎉🎉 reco 主题 2.x 已经接近 Beta 版本，在发布 Latest 版本之前不会再有大的更新，大家可以尽情尝鲜了，并且希望大家在 QQ 群和 GitHub 踊跃反馈使用体验，我会在第一时间响应。`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "QQ 群",
        },
        {
          type: "text",
          content: `
          <ul>
            <li>QQ群1：1037296104</li>
            <li>QQ群2：1061561395</li>
            <li>QQ群3：962687802</li>
          </ul>`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "title",
          content: "GitHub",
        },
        {
          type: "text",
          content: `
          <ul>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/issues">Issues<a/></li>
            <li><a href="https://github.com/vuepress-reco/vuepress-theme-reco-next/discussions/1">Discussions<a/></li>
          </ul>`,
          style: "font-size: 12px;",
        },
        {
          type: "hr",
        },
        {
          type: "buttongroup",
          children: [
            {
              text: "打赏",
              link: "/docs/others/donate.html",
            },
          ],
        },
      ],
    },
    // commentConfig: {
    //   type: 'valie',
    //   // options 与 1.x 的 valineConfig 配置一致
    //   options: {
    //     // appId: 'xxx',
    //     // appKey: 'xxx',
    //     // placeholder: '填写邮箱可以收到回复提醒哦！',
    //     // verify: true, // 验证码服务
    //     // notify: true,
    //     // recordIP: true,
    //     // hideComments: true // 隐藏评论
    //   },
    // },
  }),
  // debug: true,
});
