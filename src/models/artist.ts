/*
 * @Author: zyh
 * @Date: 2022-03-26 16:56:29
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 16:56:29
 * @FilePath: \vue3-music\src\models\atist.ts
 * @Description: 歌手
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export interface Artist {
  albumSize: number;
  alias: string[];
  briefDesc: string;
  fansCount: number;
  followed: boolean;
  id: number;
  img1v1Id: number;
  img1v1Id_str: string;
  img1v1Url: string;
  musicSize: number;
  name: string;
  picId: number;
  picId_str: string;
  picUrl: string;
  topicPerson: number;
  trans: string;
}

export interface Mv {
  id: number;
  name: string;
  status: number;
  artistName: string;
  artist: Artist;
  imgurl16v9: string;
  imgurl: string;
  duration: number;
  playCount: number;
  publishTime: string;
  subed: boolean;
}
