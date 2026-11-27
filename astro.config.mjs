import { defineConfig } from "astro/config";
import shirones from "shirones";

// 站点配置（URL、标题、语言、主题色、字体……）都在 `shirones/config/`，仓库默认 = .com 主站。
// .cn 镜像的差异全部来自 EdgeOne 构建环境里 SITE_ 前缀的变量，构建前 scripts/apply-env.mjs 写进配置：
//   SITE_URL  替换 siteConfig.site（自动补尾部斜杠）
//   SITE_ICP  在 FooterConfig.html 注入备案号
// 本地不设这些变量时就是主站配置。
export default defineConfig({
	integrations: [shirones()],
});
