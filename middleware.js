/**
 * EdgeOne Makers 中间件：境外访客 302 跳转到 .com 站。
 *
 * 主站架构：
 *   blog.almochi.cn  → 本站（EdgeOne Makers，已备案，走国内节点）
 *   blog.almochi.com → 镜像站（GitHub Pages）
 *
 * 中国大陆访客留在 .cn，境外访客跳到 .com。
 *
 * 只在 .cn 站生效：.com 站部署在 GitHub Pages，不经过 Makers。
 */

const OVERSEAS_SITE = "https://blog.almochi.com/";

/**
 * 不需要跳转的路径。
 *
 * 关键：只跳转 HTML 页面，资源文件必须放过。
 * 如果把 /_astro/*.js、/pagefind/* 也跳走，国内站的样式和搜索会全部失效
 * （因为 HTML 来自 .cn，静态资源却被 302 到 .com，跨域且多一跳）。
 */
const BYPASS_PREFIXES = [
	"/_astro/", // 构建产物的 JS/CSS/图片/字体
	"/pagefind/", // 搜索索引
	"/images/", // 相册、瞬间等图片
	"/assets/", // 主题资源（音效、音乐封面等）
	"/logo/", // 站点图标
	"/favicon/", // favicon
];

function isBypassPath(pathname) {
	if (BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
		return true;
	}
	// 带扩展名的静态文件一律放过
	return /\.[a-z0-9]+$/i.test(pathname);
}

/**
 * @param {object} context Makers 注入的上下文
 * @param {Request} context.request 当前请求
 * @param {Function} context.next 继续处理请求
 * @param {Function} context.redirect 重定向（默认 307，这里显式用 302）
 * @param {object} context.geo 客户端地理位置
 */
export function middleware(context) {
	const { request, next, redirect, geo } = context;

	// 非 GET/HEAD 请求不跳转（POST 等跳转会丢请求体）
	if (request.method !== "GET" && request.method !== "HEAD") {
		return next();
	}

	const url = new URL(request.url);

	// 静态资源直接放过
	if (isBypassPath(url.pathname)) {
		return next();
	}

	// 中国大陆访客留在主站
	if (geo?.countryCodeAlpha2 === "CN") {
		return next();
	}

	// 境外访客跳到 .com，保留原路径和查询参数
	const target = new URL(url.pathname + url.search, OVERSEAS_SITE);
	return redirect(target.toString(), 302);
}

export const config = {
	matcher: ["/:path*"],
};
