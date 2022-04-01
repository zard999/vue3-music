/*
 * @Author: zyh
 * @Date: 2022-03-27 15:16:53
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 17:37:07
 * @FilePath: \vue3-music\src\api\user.ts
 * @Description:
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import request from "@/utils/request";
import type { UserInfo } from "@/models/singerDetail";

/**
 * @method 获取用户详情
 * @params uid 用户id
 */
export async function useUserDetail(id: number | string) {
  const result = await request.get<UserInfo>(`/user/detail?uid=${id}`);
  return result;
}

/**
 * @method 手机登录
 * @params phone 用户id
 */
export async function useLogin(user: number | string, pass: number | string) {
  return await request.get<{
    code: number;
    msg: string;
    profile: { userId: number };
    cookie: string;
    token: string;
  }>(`/login/cellphone?phone=${user}&password=${pass}`, {
    withCredentials: true,
  });
}

// 退出登录
export async function logout() {
  return await request.get<{ code: number | string }>(`/logout`);
}
