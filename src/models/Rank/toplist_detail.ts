/*
 * @Author: zyh
 * @Date: 2022-03-26 10:44:20
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 10:44:20
 * @FilePath: \vue3-music\src\models\Rank\toplist_detail.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export interface TopListDetail {
  subscribers: any[];
  subscribed?: any;
  creator?: any;
  artists?: any;
  tracks: TopListDetailTracks[];
  updateFrequency: string;
  backgroundCoverId: number;
  backgroundCoverUrl?: any;
  titleImage: number;
  titleImageUrl?: any;
  englishTitle?: any;
  opRecommend: boolean;
  recommendInfo?: any;
  subscribedCount: number;
  cloudTrackCount: number;
  userId: number;
  highQuality: boolean;
  createTime: number;
  specialType: number;
  coverImgId: number;
  newImported: boolean;
  anonimous: boolean;
  updateTime: number;
  trackCount: number;
  coverImgUrl: string;
  commentThreadId: string;
  trackUpdateTime: number;
  totalDuration: number;
  privacy: number;
  playCount: number;
  trackNumberUpdateTime: number;
  adType: number;
  description: string;
  ordered: boolean;
  tags: any[];
  status: number;
  name: string;
  id: number;
  coverImgId_str: string;
  ToplistType: string;
}
export interface TopListDetailTracks {
  first: string;
  second: string;
}
