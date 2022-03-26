/*
 * @Author: zyh
 * @Date: 2022-03-25 15:38:35
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 17:03:31
 * @FilePath: \vue3-music\src\models\Lyric\song-lyric.ts
 * @Description: 歌词
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

export interface ILyric {
  time: number /** 歌词播放时间，格式：00:00.123, 分:秒:毫秒 */;
  text: string /** 歌词内容（可能为空字符串） */;
  transText?: string /** 翻译歌词内容（可能为空字符串） */;
}
