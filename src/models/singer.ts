/*
 * @Author: zyh
 * @Date: 2022-03-24 18:17:08
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 18:19:56
 * @FilePath: \music-item\src\stores\singer.ts
 * @Description: 歌手
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export interface Singer {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  musicSize: number;
  topicPerson: number;
}
