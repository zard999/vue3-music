/*
 * @Author: zyh
 * @Date: 2022-03-27 13:55:09
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-29 00:03:44
 * @FilePath: \vue3-music\src\models\singerDetail.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
// 歌手单曲
// export interface Artists {
//   artists: Artist[];
//   hotSongs: hotSong[];
// }
// 歌手基本信息

export interface Artists {
  accountId: number;
  img1v1Id: number;
  topicPerson: number;
  followed: boolean;
  alias: string[];
  picId: number;
  briefDesc: string;
  musicSize: number;
  albumSize: number;
  picUrl: string;
  img1v1Url: string;
  name: string;
  id: number;
  mvSize: number;
  trans: string;
  publishTime: number;
  picId_str: string;
  img1v1Id_str: string;
}

// 歌手专辑
export interface hotAlbums {
  picUrl: string;
  id: number;
  subType: "录音室版";
  type: "EP/Single";
  name: string;
  artist: hotArtist;
  publishTime: number;

  // songs: [];
  // paid: false;
  // onSale: false;
  // mark: 0;
  // copyrightId: -1;
  // alias: [];
  // picId: 109951165055895700;
  // artist: {
  //   img1v1Id: 18686200114669624;
  //   topicPerson: 0;
  //   alias: ["Jay Chou", "周董"];
  //   picId: 109951165793869650;
  //   briefDesc: "";
  //   musicSize: 533;
  //   albumSize: 38;
  //   picUrl: "https://p1.music.126.net/BbR3TuhPULMLDV0MjczI4g==/109951165793869641.jpg";
  //   followed: false;
  //   img1v1Url: "https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg";
  //   trans: "";
  //   name: "周杰伦";
  //   id: 6452;
  //   picId_str: "109951165793869641";
  //   img1v1Id_str: "18686200114669622";
  // };
  // briefDesc: "";
  // company: "杰威尔";

  // commentThreadId: "R_AL_3_90743831";
  // blurPicUrl: "https://p1.music.126.net/1DvWuV2hXOtg3gsP9gYZvg==/109951165055895702.jpg";
  // companyId: 0;
  // pic: 109951165055895700;
  // description: "";
  // tags: "";
  // status: -1;
  // size: 1;
  // picId_str: "109951165055895702";
}

export interface hotArtist {
  name: string;
  // img1v1Id: number;
  // topicPerson: 0;
  // alias: [];
  // picId: 0;
  // briefDesc: "";
  // musicSize: 0;
  // albumSize: 0;
  // picUrl: "https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg";
  // followed: false;
  // img1v1Url: "https://p1.music.126.net/VnZiScyynLG7atLIZ2YPkw==/18686200114669622.jpg";
  // trans: "";
  // id: 6452;
  // img1v1Id_str: "18686200114669622";
}

export interface hotSong {
  name: string;
  id: number;
  ar: Ar[];
  al: Al[];
  dt: number;
  playCount: string;
  score: string;
}

export interface Ar {
  id: number;
  name: string;
  alia: string[];
}

export interface Al {
  id: number;
  name: string;
  picUrl: string;
  pic_str: string;
  pic: number;
}

// 歌手介绍
export interface singerDesc {
  introduction: introduction[];
  briefDesc: string;
  count: number;
  topicData: object[];
}

export interface introduction {
  ti: string;
  txt: string;
}

// 用户信息
export interface UserInfo {
  profile: Profile;
  level: number;
  code: number;
  listenSongs: number;
  createTime: number;
  createDays: number;
}

export interface Profile {
  followeds: number;
  gender: number;

  privacyItemUnlimit: {
    area: true;
    college: true;
    age: true;
    villageAge: true;
  };
  avatarDetail: null;
  birthday: 768931200000;
  experts: {};
  expertTags: null;
  djStatus: 0;
  accountStatus: 0;
  province: 440000;
  city: 440300;
  defaultAvatar: false;
  avatarImgId: 109951165601796690;
  backgroundImgId: 109951163792144620;
  backgroundUrl: "http://p1.music.126.net/WLTBvNL_l9ZKlslFwaCM9Q==/109951163792144631.jpg";
  avatarUrl: "http://p1.music.126.net/axewGX7u9P9Iuqjep-3mmQ==/109951165601796681.jpg";
  nickname: "binaryify";
  mutual: false;
  followed: false;
  remarkName: null;
  authStatus: 0;
  detailDescription: "";
  avatarImgIdStr: "109951165601796681";
  backgroundImgIdStr: "109951163792144631";
  description: "";
  userId: 32953014;
  vipType: 11;
  userType: 0;
  createTime: 1407747900967;
  signature: "深圳市爱猫人士";
  authority: 0;
  follows: 17;
  blacklist: false;
  eventCount: 17;
  allSubscribedCount: 0;
  playlistBeSubscribedCount: 4;
  avatarImgId_str: "109951165601796681";
  followTime: null;
  followMe: false;
  artistIdentity: [];
  cCount: 0;
  inBlacklist: false;
  sDJPCount: 0;
  playlistCount: 20;
  sCount: 0;
  newFollows: 17;
}

// 相似歌手
export interface SimilarSinger {
  name: string;
  id: number;
  picId: number;
  img1v1Id: number;
  briefDesc: string;
  picUrl: string;
  img1v1Url: string;
  albumSize: number;
  alias: Array<string>;
  trans: string;
  musicSize: number;
  topicPerson: number;
  showPrivateMsg: string;
  isSubed: string;
  accountId: number;
  picId_str: string;
  img1v1Id_str: string;
  transNames: string;
  followed: false;
  mvSize: number;
  publishTime: string;
  identifyTag: string;
  alg: string;
  fansCount: number;
}
