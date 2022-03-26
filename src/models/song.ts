/*
 * @Author: zyh
 * @Date: 2022-03-25 09:55:48
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 09:55:49
 * @FilePath: \vue3-music\src\models\song.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export interface Song {
  name: string;
  id: number;
  pst: number;
  t: number;
  ar: SongAr[];
  alia: string[];
  pop: number;
  st: number;
  rt?: any;
  fee: number;
  v: number;
  crbt?: any;
  cf: string;
  al: SongAl;
  dt: number;
  h: SongH;
  m: SongM;
  l: SongL;
  a?: any;
  cd: string;
  no: number;
  rtUrl?: any;
  ftype: number;
  rtUrls: any[];
  djId: number;
  copyright: number;
  s_id: number;
  mark: number;
  originCoverType: number;
  originSongSimpleData?: any;
  tagPicList?: any;
  resourceState: boolean;
  version: number;
  songJumpInfo?: any;
  entertainmentTags?: any;
  single: number;
  noCopyrightRcmd?: any;
  rtype: number;
  rurl?: any;
  mst: number;
  cp: number;
  mv: number;
  publishTime: number;
}

export interface SongAr {
  id: number;
  name: string;
  tns: any[];
  alias: any[];
}

export interface SongAl {
  id: number;
  name: string;
  picUrl: string;
  tns: any[];
  pic_str: string;
  pic: number;
}

export interface SongH {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

export interface SongM {
  br: number;
  fid: number;
  size: number;
  vd: number;
}

export interface SongL {
  br: number;
  fid: number;
  size: number;
  vd: number;
}
