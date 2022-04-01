/*
 * @Author: zyh
 * @Date: 2022-03-31 21:29:08
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-31 21:30:57
 * @FilePath: \vue3-music\src\models\songlistDetail.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export interface SonglistDetail {
  adType: 0;
  backgroundCoverId: 0;
  backgroundCoverUrl: null;
  cloudTrackCount: 0;
  commentCount: 428;
  commentThreadId: "A_PL_0_6766661664";
  coverImgId: 109951165994990540;
  coverImgId_str: "109951165994990551";
  coverImgUrl: "https://p1.music.126.net/NVhz1mFzAlGHm76OEp60Xg==/109951165994990551.jpg";
  createTime: 1621570039397;
  creator: Creator;
  description: string;
  englishTitle: null;
  highQuality: false;
  historySharedUsers: null;
  id: 6766661664;
  name: "网易云最好听宝藏歌曲推荐（更新快）";
  newImported: false;
  officialPlaylistType: null;
  opRecommend: false;
  ordered: true;
  playCount: 29830784;
  privacy: 0;
  remixVideo: null;
  shareCount: 1976;
  sharedUsers: null;
  specialType: 0;
  status: 0;
  subscribed: false;
  subscribedCount: 160807;
  subscribers: [
    { defaultAvatar: false; province: 430000; authStatus: 0; followed: false }
  ];
  tags: ["华语", "流行", "榜单"];
  titleImage: 0;
  titleImageUrl: null;
  trackCount: 324;
  trackIds: [];
  trackNumberUpdateTime: 1648701744699;
  trackUpdateTime: 1648701763470;
  tracks: [];
  updateFrequency: null;
  updateTime: 1648701744699;
  userId: 366640984;
  videoIds: null;
  videos: null;
}

export interface Creator {
  accountStatus: 0;
  anchor: false;
  authStatus: 1;
  authenticationTypes: 532552;
  authority: 0;
  avatarDetail: { userType: 4; identityLevel: 1 };
  avatarImgId: 109951165805912290;
  avatarImgIdStr: "109951165805912285";
  avatarImgId_str: "109951165805912285";
  avatarUrl: "http://p1.music.126.net/4ff2R5Mfbi-pyJRSdUMXLg==/109951165805912285.jpg";
  backgroundImgId: 109951163947439940;
  backgroundImgIdStr: "109951163947439930";
  backgroundUrl: "http://p1.music.126.net/Jtu2sbvYDDwNzvGinIt3ug==/109951163947439930.jpg";
  birthday: 0;
  city: 420100;
  defaultAvatar: false;
  description: "";
  detailDescription: "";
  djStatus: 10;
  expertTags: ["华语"];
  experts: { 1: "音乐原创视频达人" };
  followed: false;
  gender: 1;
  mutual: false;
  nickname: "勒溪";
  province: 420000;
  remarkName: null;
  signature: "交流群：653168135";
  userId: 366640984;
  userType: 4;
  vipType: 11;
}
