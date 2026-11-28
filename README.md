# 杏仁团子

初次见面，请多关照呢。这里是「杏仁团子」，小泽的博客。以杂谈为主，也会写一点技术、项目、生活与 ACG。把喜欢的故事和普通的日子慢慢收进来，若是恰好路过的你能喜欢上其中一两句，就再好不过了。

## 维护说明

- **依赖策略**：`shirones` 使用 `latest` 标签，升级时执行 `pnpm update shirones` 后重新构建；`pnpm-lock.yaml` 会锁定实际版本，CI 用 `--frozen-lockfile` 保证部署可复现，因此升级需要提交锁文件。

- **社交图标**：主题在 npm 包模式下会用 `@/` 别名先把 `@/generated/local-icon-collections` 解析到包内快照，项目侧生成的集合因此不生效，配置里新引用的图标会渲染成空白。`astro.config.mjs` 里的 `preferUserIconCollections` 把这个模块指回项目生成的文件；`src/icons/*.svg` 中的自定义图标（如 `bilibili.svg`、`mail.svg`）随之可用，配置里直接写文件名即可（如 `icon: "bilibili"`）。升级主题后若上游修复了该解析顺序，可去掉这个插件。
- **站点图标**：`shirones/config/siteConfig.ts` 的 `favicon` 指向 `public/favicon/almochi-*.png`，使用独立文件名而非主题默认的 `favicon-*`，以免浏览器继续沿用旧缓存图标。

## 致谢

- [Shirone](https://github.com/LyraVoid/Shirone)：本站使用的主题
- [Astro](https://astro.build/)：静态站点框架

## 开源协议

代码部分基于 [MIT License](https://opensource.org/license/mit) 开源。除特别注明外，原创文章采用 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 许可；第三方图片与其他素材的权利归原作者或原权利人所有，不随文章许可再次授权。
