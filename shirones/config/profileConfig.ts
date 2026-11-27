import type { ProfileConfig } from "@/types/config";
import { withUserConfig } from "@/utils/config-overlay.ts";

/**
 * 博主资料：头像 / 名称 / 简介 / 社交链接（侧栏 Profile 卡片、页脚、RSS 作者等消费）。
 * 类型见 src/types/config.ts。
 */
export const profileConfig: ProfileConfig = withUserConfig("profile", {
	avatar: "/images/avatar.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "小泽",
	bio: "本科在读。写一点代码，拍一点照片，Galgame 也玩一点。",
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/Dreamwxz",
		},
		{
			name: "Bilibili",
			icon: "fa7-brands:bilibili",
			url: "https://space.bilibili.com/673685324",
		},
		{
			name: "邮箱",
			icon: "material-symbols:mail-outline-rounded",
			url: "mailto:dream.wxz@outlook.com",
		},
		{
			name: "Steam",
			icon: "fa7-brands:steam",
			url: "https://steamcommunity.com/id/dreamwxz/",
		},
		{
			name: "X",
			icon: "fa7-brands:x-twitter",
			url: "https://x.com/DreamXiaoze",
		},
	],
});
