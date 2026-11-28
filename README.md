# 杏仁团子

初次见面，请多关照呢。这里是「杏仁团子」，小泽的博客。以杂谈为主，也会写一点技术、项目、生活与 ACG。把喜欢的故事和普通的日子慢慢收进来，若是恰好路过的你能喜欢上其中一两句，就再好不过了。

## 维护说明

- **社交图标**：主题在 npm 包模式下，运行时图标集合来自包内快照，项目新引用的图标不会进入该集合，`profileConfig.links[].icon` 会渲染成空白。因此 `src/components/organisms/Profile.astro` 是一份覆盖组件，只对 `fa7-brands:bilibili` 与 `material-symbols:mail-outline-rounded` 改为内联 SVG 兜底，其余图标仍交给主题 `<Icon>`。升级主题后可对比包内同名文件是否变化。
- **站点图标**：`shirones/config/siteConfig.ts` 的 `favicon` 指向 `public/favicon/almochi-*.png`，使用独立文件名而非主题默认的 `favicon-*`，以免浏览器继续沿用旧缓存图标。

## 致谢

- [Shirone](https://github.com/LyraVoid/Shirone)：本站使用的主题
- [Astro](https://astro.build/)：静态站点框架

## 开源协议

代码部分基于 [MIT License](https://opensource.org/license/mit) 开源。除特别注明外，原创文章采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 许可；第三方图片与其他素材的权利归原作者或原权利人所有，不随文章许可再次授权。
