import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import shirones from "shirones";

// 站点配置（URL、标题、语言、主题色、字体……）都在 `shirones/config/`，仓库默认 = .com 主站。
// .cn 镜像的差异全部来自 EdgeOne 构建环境里 SITE_ 前缀的变量，构建前 scripts/apply-env.mjs 写进配置：
//   SITE_URL  替换 siteConfig.site（自动补尾部斜杠）
//   SITE_ICP  在 FooterConfig.html 注入备案号
// 本地不设这些变量时就是主站配置。

/** 主题在项目侧生成的图标集合（构建时写入，见 .gitignore）。 */
const userIconCollections = fileURLToPath(
	new URL("./src/generated/local-icon-collections.ts", import.meta.url),
);

/**
 * 主题 0.1.6 在 npm 包模式下会用 `@/` 别名先把
 * `@/generated/local-icon-collections` 解析成包内快照，项目侧生成的文件因此被忽略：
 * 配置里新引用的图标、以及 `src/icons/*.svg` 自定义图标都会渲染为空。
 *
 * 这里在解析阶段把这个模块指回项目生成的文件，让图标走回正常流程；
 * 文件还不存在时返回 null，交回主题默认解析（首次构建前不会命中）。
 */
function preferUserIconCollections() {
	return {
		name: "prefer-user-icon-collections",
		enforce: "pre",
		resolveId(id) {
			if (!id.includes("/generated/local-icon-collections")) return null;
			return existsSync(userIconCollections) ? userIconCollections : null;
		},
	};
}

export default defineConfig({
	integrations: [shirones()],
	vite: {
		plugins: [preferUserIconCollections()],
	},
});
