/**
 * 友情链接数据配置（结构与 Mizuki 同款，便于互相迁移）。
 * 用于管理友情链接页面的数据：src/pages/friends.astro → organisms/FriendSection。
 *
 * 添加友链：在 friendsData 中追加一项即可，页面 / 筛选标签自动生成。
 * tags 会聚合为页面顶部的筛选 chip（OR 命中：选中多个标签时命中任一即显示）。
 */
export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
export const friendsData: FriendItem[] = [
	{
		id: 1,
		title: "Mizuki",
		imgurl: "/images/friends/mizuki.webp",
		desc: "Another Fuwari-based blog theme with docs",
		siteurl: "https://mizuki.mysqil.com",
		tags: ["Blog", "Theme"],
	},
	{
		id: 2,
		title: "Astro",
		imgurl: "/images/friends/astro.webp",
		desc: "The web framework for content-driven websites",
		siteurl: "https://astro.build",
		tags: ["Framework"],
	},
	{
		id: 3,
		title: "Material 3",
		imgurl: "/images/friends/material3.webp",
		desc: "Material Design 3 — the next generation of Material Design",
		siteurl: "https://m3.material.io",
		tags: ["Design"],
	},
	{
		id: 4,
		title: "麦麦 MaiBot",
		imgurl: "/images/friends/maibot.webp",
		desc: "我在试着学习像人类一样陪伴你",
		siteurl: "https://maibot.chat/",
		tags: ["Bot", "社群"],
	},
	{
		id: 5,
		title: "黎明の小站",
		imgurl: "/images/friends/yoake.webp",
		desc: "疲れたなら、ここで少し休んでいいよ",
		siteurl: "https://blog.yoake.dev/",
		tags: ["Blog", "ACG"],
	},
	{
		id: 6,
		title: "Eric-Terminal 的博客",
		imgurl: "/images/friends/eric-terminal.webp",
		desc: "留白处，见晖光",
		siteurl: "https://blog.ericterminal.com/",
		tags: ["Blog", "技术"],
	},
	{
		id: 7,
		title: "树梢上有只鸟",
		imgurl: "/images/friends/xzt.webp",
		desc: "客官，里面请~",
		siteurl: "https://www.xzt.plus/",
		tags: ["Blog"],
	},
];

// 获取所有友情链接数据（稳定顺序，测试可复现）
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据（避免固定排序，按需使用）
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
