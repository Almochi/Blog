import type { TrackDescriptor } from "@/types/musicConfig";

/**
 * 侧栏音乐本地曲目数据源。
 *
 * 当前站点使用网易云歌单（`musicConfig.provider: "meting"`），
 * 所以这里保持为空数组 —— 本地曲目不会被加载，也不会在 dist 里占体积。
 *
 * 如果将来想切回本地音乐（provider: "local" 或 "mixed"），
 * 把音频文件放进 public/assets/music/url/，然后在下面按格式追加：
 * - id: 唯一标识
 * - title: 曲目标题
 * - artist: 艺术家（可选）
 * - cover: 封面图地址（可选；推荐相对 /src，亦支持 /public 或绝对 URL）
 * - source: 音频文件地址（相对 /public 或绝对 URL）
 * - duration: 曲目时长（秒，可选）
 */
export const musicTracks: readonly TrackDescriptor[] = [];
