#!/usr/bin/env node
/**
 * 构建前准备：根据环境变量生成随站点变化的内容。
 *
 * 为什么放在构建前而不是改主题组件：
 * 主题文件在 node_modules 里，改它会在 `pnpm add shirones@latest` 时被覆盖，
 * 也违背了 npm 模式「升级不冲突」的初衷。这里只写用户自己的配置文件，
 * 主题升级完全不受影响。
 *
 * 支持的环境变量：
 *   SITE_ICP      备案号（如 "粤ICP备2023xxxxxx号-1"）。设置后页脚显示备案号
 *                 及工信部链接；不设置（镜像站/海外站）则页脚不出现备案信息。
 *   SITE_ICP_LINK 备案号链接，默认 https://beian.miit.gov.cn/
 */

import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const ICP = (process.env.SITE_ICP ?? "").trim();
const ICP_LINK =
	(process.env.SITE_ICP_LINK ?? "").trim() || "https://beian.miit.gov.cn/";

/**
 * 生成 FooterConfig.html 的内容。
 *
 * 没有备案号时必须输出「空内容」而不是留一个空 div：
 * Footer.astro 会先剥掉 HTML 注释再判断是否为空，空则完全不渲染，
 * 这样海外镜像站不会多出任何 DOM 节点。
 */
function footerHtml() {
	if (!ICP) {
		return `<!--
  未设置 SITE_ICP，页脚不显示备案信息。
  构建国内站时请设置：SITE_ICP="粤ICP备xxxxxxxx号-1" pnpm build
-->
`;
	}
	return `<div class="footer-icp">
	<a href="${ICP_LINK}" target="_blank" rel="noopener noreferrer">${ICP}</a>
</div>
`;
}

const target = join(process.cwd(), "shirones", "config", "FooterConfig.html");
await writeFile(target, footerHtml(), "utf8");

console.log(
	ICP
		? `[prepare] 页脚备案号：${ICP}`
		: "[prepare] 未设置 SITE_ICP，页脚不显示备案信息",
);
