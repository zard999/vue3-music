/*
 * @Author: zyh
 * @Date: 2022-03-25 10:13:35
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-25 10:36:31
 * @FilePath: \vue3-music\src\utils\extend.ts
 * @Description: 在原型上扩展方法
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { first, last, sample, sampleSize, chunk, trimEnd } from "lodash";
import dayjs from "dayjs";
import { useNumberFormat } from "./tools";
declare global {
  interface Array<T> {
    /**
     * 获取数组第一个元素
     */
    first<T>(this: T[]): T;

    last<T>(this: T[]): T;
    sample<T>(this: T[]): T;

    /**
     * 获得 n 个随机元素
     * @param size 随机数量
     */
    sampleSize<T>(this: T[], size: number): T[];

    /**
     * 将数组拆分成多个 size 长度的数组
     * @param size 拆分数组的长度
     */
    chunk<T>(this: T[], size: number): T[][];
  }

  interface String {
    /**
     * 转换成int类型
     */
    toInt(this: string): number;

    /**
     * 从string字符串中移除后面的 空格 或 指定的字符
     */
    trimEnd(this: string, chars?: string): string;
  }

  interface Number {
    toDate(this: number, format?: string): string;

    numberFormat(this: number): string | number;
  }
}

// 如果上面不定义全局，这里就不能使用first
Array.prototype.first = function <T>(this: T[]): T {
  return first<T>(this) as T;
};

Array.prototype.last = function <T>(this: T[]): T {
  return last<T>(this) as T;
};

Array.prototype.sample = function <T>(this: T[]): T {
  return sample<T>(this) as T;
};

Array.prototype.sampleSize = function <T>(this: T[], size: number): T[] {
  return sampleSize<T>(this, size) as T[];
};

Array.prototype.chunk = function <T>(this: T[], size: number): T[][] {
  return chunk<T>(this, size) as T[][];
};

String.prototype.toInt = function (this: string): number {
  return parseInt(this);
};

String.prototype.trimEnd = function (this: string, chars: string = ""): string {
  return trimEnd(this, chars);
};

Number.prototype.toDate = function (
  this: number,
  format: string = "YYYY-MM-DD HH:mm:ss"
): string {
  return dayjs(this).format(format);
};

Number.prototype.numberFormat = function (this: number): string | number {
  return useNumberFormat(this);
};
