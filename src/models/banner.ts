/*
 * @Author: zyh
 * @Date: 2022-03-23 20:53:55
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-24 10:23:09
 * @FilePath: \music-item\src\models\banner.ts
 * @Description: banner model
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
export interface IBanner {
  pic: string;
  targetId: number;
  targetType: number;
  typeTitle: string;
  bannerId: number;
}
