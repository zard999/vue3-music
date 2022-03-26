/*
 * @Author: zyh
 * @Date: 2022-03-25 10:01:02
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 10:01:03
 * @FilePath: \vue3-music\src\models\song_url.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export interface SongUrl {
  id: number;
  url: string;
  br: number;
  size: number;
  md5: string;
  code: number;
  expi: number;
  type: string;
  gain: number;
  fee: number;
  payed: number;
  flag: number;
  canExtend: boolean;
  freeTrialPrivilege: RootObjectFreeTrialPrivilege;
  freeTimeTrialPrivilege: RootObjectFreeTimeTrialPrivilege;
  urlSource: number;
  freeTrialInfo: {
    start: number;
    end: number;
  };
}

export interface RootObjectFreeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
}

export interface RootObjectFreeTimeTrialPrivilege {
  resConsumable: boolean;
  userConsumable: boolean;
  type: number;
  remainTime: number;
}
