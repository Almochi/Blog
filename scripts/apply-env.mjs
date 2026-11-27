#!/usr/bin/env node
/**
 * 构建前把「SITE_ 前缀」的平台环境变量写进配置：替换已有值、新增内容。
 * 其它地方不再直接读 process.env，也不碰其它前缀和平台自带的变量。
 *
 * 仓库默认 = .com 主站；.cn 镜像的差异全部来自 EdgeOne 构建环境变量：
 *   SITE_URL  替换 siteConfig.site        默认 https://blog.almochi.com/
 *   SITE_ICP  在 FooterConfig.html 注入备案号  默认不注入
 *
 * 加新的环境变量：在 REPLACEMENTS / ADDITIONS 里加一行（键名 = SITE_ 后的部分）。
 * 脚本幂等：同样的变量得到同样的结果；变量为空时文件回到仓库默认内容。
 */
import fs from "node:fs";
import path from "node:path";

const ENV_PREFIX = "SITE_";
const ROOT = process.cwd();
const read = (file) => fs.readFileSync(path.join(ROOT, file), "utf8");
const write = (file, content) => fs.writeFileSync(path.join(ROOT, file), content);

// 替换：变量有值时用它的值替换匹配到的位置；没有值时写回 fallback。
const REPLACEMENTS = {
	URL: {
		file: "shirones/config/siteConfig.ts",
		pattern: /(^[ \t]*site:\s*)"(?:[^"\\]|\\.)*"/m,
		fallback: "https://blog.almochi.com/",
		normalize: (value) => {
			let url;
			try {
				url = new URL(value).href;
			} catch {
				throw new Error(`[env] ${ENV_PREFIX}URL 不是合法 URL：${value}`);
			}
			return url.endsWith("/") ? url : `${url}/`;
		},
	},
};

// 新增：变量有值时把它渲染成一段内容放到标记之间；没有值时标记之间保持为空。
const ADDITIONS = {
	ICP: {
		file: "shirones/config/FooterConfig.html",
		start: "<!-- SITE_ICP:start -->",
		end: "<!-- SITE_ICP:end -->",
		render: (icp) =>
			`<div class="footer-icp">\n\t<a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">${icp}</a>\n</div>`,
	},
};

const known = new Set(
	[...Object.keys(REPLACEMENTS), ...Object.keys(ADDITIONS)].map((suffix) => ENV_PREFIX + suffix),
);
const changes = [];

for (const [suffix, rule] of Object.entries(REPLACEMENTS)) {
	const raw = (process.env[ENV_PREFIX + suffix] ?? "").trim();
	const value = raw ? (rule.normalize ? rule.normalize(raw) : raw) : rule.fallback;
	const source = read(rule.file);
	if (!rule.pattern.test(source)) {
		throw new Error(`[env] ${rule.file} 里找不到 ${ENV_PREFIX}${suffix} 的替换位置`);
	}
	const next = source.replace(rule.pattern, (_match, prefix) => `${prefix}${JSON.stringify(value)}`);
	if (next !== source) {
		write(rule.file, next);
		changes.push(`${ENV_PREFIX}${suffix}=${value}`);
	}
}

for (const [suffix, rule] of Object.entries(ADDITIONS)) {
	const value = (process.env[ENV_PREFIX + suffix] ?? "").trim();
	const source = read(rule.file);
	const start = source.indexOf(rule.start);
	const end = source.indexOf(rule.end);
	if (start === -1 || end < start) {
		throw new Error(`[env] ${rule.file} 里找不到 ${ENV_PREFIX}${suffix} 的内容标记`);
	}
	const body = value ? `\n${rule.render(value)}\n` : "\n";
	const next = source.slice(0, start + rule.start.length) + body + source.slice(end);
	if (next !== source) {
		write(rule.file, next);
		changes.push(`${ENV_PREFIX}${suffix}=${value || "(空)"}`);
	}
}

for (const name of Object.keys(process.env)) {
	if (name.startsWith(ENV_PREFIX) && !known.has(name)) {
		console.warn(`[env] 忽略未识别变量 ${name}（需要的话在 apply-env.mjs 的表里加一行）`);
	}
}

if (changes.length > 0) {
	console.log(`[env] ${changes.join("  ")}`);
}
