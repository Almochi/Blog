# Almochi Blog

基于 [Shirone](https://github.com/LyraVent/Shirone) 主题的博客，**npm 包模式**：
主题是依赖，升级只需改版本号，不用合并主题源码。

## 架构

```
GitHub 仓库（本仓）
    ↓
EdgeOne Makers（.cn，已备案，国内 + 海外边缘节点）
    ↓
blog.almochi.cn
```

主站是 `.cn`：已备案，可以走 EdgeOne 的「全球可用区」，国内访客命中国内节点（秒开），
海外访客就近命中海外节点。

## 目录结构

```
.
├── astro.config.mjs           注册主题集成（唯一配置）
├── scripts/prepare-build.mjs  构建前注入备案号等随站点变化的内容
├── shirones/
│   ├── config/                站点配置（覆盖主题默认值）
│   │   ├── siteConfig.ts      站点 URL、标题、主题色
│   │   ├── musicConfig.ts     侧栏音乐（当前走网易云歌单）
│   │   └── data/music.ts      本地曲目（当前为空）
│   └── content/               文章、瞬间、系列
├── public/                    静态资源（图片、favicon、_headers）
└── src/                       覆盖主题的组件/布局（目前为空）
```

## 本地开发

```bash
pnpm install
pnpm dev          # http://localhost:4321
```

> 需要 Node **22+**（主题声明 26.13，但实测 22/24 都能构建，只是有 warning）。

## 构建

```bash
pnpm build                    # 不带备案号（镜像站）
SITE_ICP="粤ICP备xxxxxxxx号-1" pnpm build   # 国内站，页脚显示备案号
SITE_URL="https://blog.almochi.com/" pnpm build   # 指定站点 URL
```

三个环境变量：

| 变量 | 作用 | 默认 |
| --- | --- | --- |
| `SITE_URL` | 站点绝对 URL，影响 sitemap/RSS/canonical/og:image | `https://blog.almochi.cn/` |
| `SITE_ICP` | 备案号，设置后页脚显示并链到工信部 | 空（不显示） |
| `SITE_ICP_LINK` | 备案号链接 | `https://beian.miit.gov.cn/` |

## 部署到 EdgeOne Makers

### 1. 导入仓库

Makers 控制台 → 创建项目 → 导入 Git 仓库 → 选中本仓。

| 配置项 | 值 |
| --- | --- |
| 构建命令 | `pnpm build` |
| 输出目录 | `dist` |
| Node 版本 | 22 或更高 |

### 2. 设置环境变量

| 变量名 | 值 | 说明 |
| --- | --- | --- |
| `SITE_URL` | `https://blog.almochi.cn/` | 必须，影响 sitemap 等 |
| `SITE_ICP` | 你的备案号 | 页脚显示备案信息 |
| `NODE_VERSION` | `22` | 构建机 Node 版本 |

### 3. 绑定域名

项目设置 → 域名管理 → 添加自定义域名 `blog.almochi.cn`，
按提示在 DNS 添加 CNAME 记录，等待证书自动签发。

**加速区域必须选「全球可用区」**，否则国内不走国内节点，就失去了备案的意义。

### 4. 缓存

`public/_headers` 已经写好分层缓存策略，构建时会复制进 `dist`。
但**EdgeOne Makers 是否读取 `_headers` 尚未验证**，需要在控制台确认缓存规则：
- `/_astro/*` → 长缓存
- `/pagefind/*` → 10 分钟
- HTML → 遵循源站

## 双站策略（可选）

如果要同时提供 `.com` 镜像站：

```bash
SITE_URL="https://blog.almochi.com/" pnpm build   # 不带 SITE_ICP
```

同一个仓库、两次构建、两套产物，唯一差异是站点 URL 和备案号。

**SEO 注意**：内容相同的两站必须处理重复内容问题。推荐在 `.com` 站
设置 canonical 指向 `.cn`，让搜索引擎只收录主站。

## 关于音乐

侧栏音乐走网易云歌单（Meting API），不打包任何音频文件。

- 配置：`shirones/config/musicConfig.ts` 的 `meting.id` 改成自己的歌单 ID
- 音频流来自网易云 CDN，不占 `dist` 体积
- 默认 API 是社区维护的 `api.injahow.cn`，如需稳定可自建 Meting 服务后填 `meting.api`

## 升级主题

```bash
pnpm add shirones@latest
pnpm build
```

只有在 `src/` 或 `shirones/config/` 里覆盖过的东西需要注意冲突，主题源码本身不动。

## 已知事项

- `pnpm-workspace.yaml` 的 `allowBuilds` 是 pnpm 12 的写法（旧版是 `onlyBuiltDependencies`），
  缺了它安装会报 `ERR_PNPM_IGNORED_BUILDS`
- `shirones@0.1.6` 声明 Node >= 26.13，实际 22/24 也能构建（`engines` 未强制）
