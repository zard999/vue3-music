/*
 * @Author: zyh
 * @Date: 2022-03-28 15:34:00
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-28 15:51:14
 * @FilePath: \vue3-music\src\models\mvideo.ts
 * @Description: mvideo model
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

export interface IMVideo {
  hasMore: boolean;
  data: IMVideoData[];
}

export interface IMVideoData {
  id: number;
  cover: string;
  name: string;
  playCount: number;
  briefDesc: number;
  desc: string;
  artistName: string;
  artistId: number;
  duration: number;
  mark: number;
  subed: false;
  artists: IArtist[];
}
export interface IArtist {
  id: number;
  name: string;
  alias: Array<any>;
  transNames: string[];
}

export interface Ret {
  id: number;
  nickName: number;
  name: string;
  playCount: number;
  duration: number;
  image: string;
}
