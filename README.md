# Almochi Blog

基于 [Shirone](https://github.com/LyraVoid/Shirone) 主题，npm 包模式（主题是依赖，升级只改版本号）。

## 架构

```
blog.almochi.cn   → EdgeOne Makers（国内节点，境外访客 302 跳 .com）
blog.almochi.com  → GitHub Pages（境外）
```

同一份代码，两次构建，差异只有 `SITE_URL` 和 `SITE_ICP`。

## 本地开发

```bash
pnpm install
pnpm dev
```

Node 22+ 即可（主题声明 26.13，但 `engines` 未强制）。

## 环境变量

| 变量 | 作用 | 默认 |
| --- | --- | --- |
| `SITE_URL` | 站点绝对 URL，影响 sitemap/RSS/canonical | `https://blog.almochi.cn/` |
| `SITE_ICP` | 备案号，设置后页脚显示；不设则不显示 | 空 |

## 结构

```
astro.config.mjs           注册主题集成
middleware.js              .cn 站境外访客跳转（仅 Makers 读取）
scripts/prepare-build.mjs  构建前按 SITE_ICP 生成页脚备案号
shirones/config/           站点配置
shirones/content/          文章
public/                    静态资源、CNAME
```
