/*
 * @Author: zyh
 * @Date: 2022-03-24 12:21:21
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 14:18:12
 * @FilePath: \music-item\src\models\sheet.ts
 * @Description: 推荐歌单
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export interface ISheet {
  id: number;
  name: string;
  playCount: number;
  picUrl: string;
  coverImgUrl: string;
}
