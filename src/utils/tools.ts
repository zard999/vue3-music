/*
 * @Author: zyh
 * @Date: 2022-03-24 12:08:34
 * @LastEditors: zyh
 * @LastEditTime: 2022-03-26 15:02:19
 * @FilePath: \vue3-music\src\utils\tools.ts
 * @Description: utils
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */

import type { ILyric } from "@/models/Lyric/song-lyric";
/**
 * 数字转整数 如 100000 转为10万
 * @param {需要转化的数} num
 * @param {需要保留的小数位数} point
 */
export const tranNumber = (num: number, point: number) => {
  let numStr = num.toString();
  // 十万以内直接返回
  if (numStr.length < 6) {
    return numStr;
  }
  //大于8位数是亿
  else if (numStr.length > 8) {
    let decimal = numStr.substring(
      numStr.length - 8,
      numStr.length - 8 + point
    );
    return (
      parseFloat(parseInt((num / 100000000).toString()) + "." + decimal) + "亿"
    );
  }
  //大于6位数是十万 (以10W分割 10W以下全部显示)
  else if (numStr.length > 5) {
    let decimal = numStr.substring(
      numStr.length - 4,
      numStr.length - 4 + point
    );
    return (
      parseFloat(parseInt((num / 10000).toString()) + "." + decimal) + "万"
    );
  }
};

// 补0方法
export function formatZero(num: string | number, len: number) {
  if (String(num).length > len) return num;
  return (Array(len).join("0") + num).slice(-len);
}

// 秒转00:00
export function formatSecondTime(interval: number) {
  interval = interval | 0;
  const m = (interval / 60) | 0;
  const s = interval % 60;
  return `${formatZero(m, 2)}:${formatZero(s, 2)}`;
}

// 格式化时间毫秒转分秒
export function formatTime(time: string | number) {
  // 取整
  time = ~~time;
  var formatTime;
  if (time < 10) {
    formatTime = "00:0" + time;
  } else if (time < 60) {
    formatTime = "00:" + time;
  } else {
    var m = ~~(time % (1000 * 60 * 60)) / (1000 * 60);
    if (m < 10) {
      m = parseInt("0" + m);
    }
    var s = ~~(time % (1000 * 60)) / 1000;
    if (s < 10) {
      s = parseInt("0" + s);
    }
    formatTime = m + ":" + s;
  }
  return formatTime;
}

// 毫秒转分:秒
export function useFormatDuring(during: number) {
  const M = Math.floor(during) / 1000;
  const s = Math.floor(M % 60);
  during = Math.floor(M / 60);
  const i = Math.floor(during % 60);

  const ii = i < 10 ? `0${i}` : i;
  const ss = s < 10 ? `0${s}` : s;

  return ii + ":" + ss;
}

export function useFormatDuring2(during: number) {
  const s = Math.floor(during) % 60;
  during = Math.floor(during / 60);
  const i = during % 60;

  const ii = i < 10 ? `0${i}` : i;
  const ss = s < 10 ? `0${s}` : s;

  return ii + ":" + ss;
}

export function useNumberFormat(number: number): string | number {
  if (number > 100000000) {
    return Number((number / 100000000).toFixed(1)) + " 亿";
  }

  if (number > 10000000) {
    return Number((number / 10000000).toFixed(1)) + " 千万";
  }

  if (number > 10000) {
    return Number((number / 10000).toFixed(1)) + " 万";
  }

  return number;
}

/**
 * 格式化时间字符串为时间，时间单位为秒
 * @param timeString 时间字符串，格式为： mm:ss:ss, 如： 00:01:404
 * @returns
 */
export const formatTimeToNumber = (timeString: string) => {
  let time = 0;
  if (timeString) {
    const splitArr = timeString.split(":").map((item) => Number(item));
    return splitArr[0] * 60 + splitArr[1];
  }
  return time;
};

/**
 * 格式化歌词字符串为"时间-歌词"格式的数组
 * @param lyric 歌词字符串
 * @returns
 */
export const formatLyric = (lyric: string) => {
  if (!lyric || lyric == undefined || lyric == null) return;
  const lyricParts = lyric.split("\n").filter((item) => item);
  return lyricParts.map((item) => {
    const splitItems = item.split("]");
    const lyricItem: ILyric = {
      time: formatTimeToNumber(splitItems[0].slice(1)),
      text: splitItems[1],
    };
    return lyricItem;
  });
};

/** 返回指定类型的对象的键名数组 */
export function keysOf<T>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
}

// export default {
//   // localStorage存储
//   setStore(name: string, content: any) {
//     let contentClone = content;
//     if (!name) return;
//     if (typeof content !== "string") {
//       contentClone = JSON.stringify(contentClone);
//     }
//     window.localStorage.setItem(name, contentClone);
//   },
//   // localStorage获取
//   getStore(name: string) {
//     if (!name) return null;
//     return window.localStorage.getItem(name);
//   },
//   // localStorage删除
//   removeStore(name: string) {
//     if (!name) return;
//     window.localStorage.removeItem(name);
//   },
//   // 日期格式化
//   dateFormat(str: string, type: string) {
//     let date = new Date(str);
//     let year = date.getFullYear();
//     let month = this.formatZero(date.getMonth() + 1, 2);
//     let day = this.formatZero(date.getDate(), 2);
//     let hour = this.formatZero(date.getHours(), 2);
//     let minute = this.formatZero(date.getMinutes(), 2);
//     let seconds = this.formatZero(date.getSeconds(), 2);
//     if (type == "YYYY-MM-DD") {
//       return `${year}-${month}-${day}`;
//     } else if (type == "YYYY-MM-DD HH:MM:SS") {
//       return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
//     } else if (type == "MM/DD  HH:MM:SS") {
//       return `${month}/${day} ${hour}:${minute}:${seconds}`;
//     }
//   },
//   // 获取当前时间前后N天前后日期
//   getDateBefore(dayCount: number) {
//     var date = new Date();
//     date.setDate(date.getDate() + dayCount);
//     let year = date.getFullYear();
//     let month = this.formatZero(date.getMonth() + 1, 2);
//     let day = this.formatZero(date.getDate(), 2);
//     return `${year}-${month}-${day}`;
//   },
//   /**

//   // 转换成秒
//   formatSecond(time: string | number) {
//     // 取整
//     time = ~~time;
//     var secondTime;
//     if (time < 10) {
//       secondTime = "00:0" + time;
//     } else if (time < 60) {
//       secondTime = "00:" + time;
//     } else {
//       var m = ~~(time % (1000 * 60 * 60)) / (1000 * 60);
//       var s = ~~(time % (1000 * 60)) / 1000;
//       secondTime = Number(m * 60 + s);
//     }
//     return secondTime;
//   },
//   // 时间戳转换成几分钟前，几小时前，几天前
//   formatMsgTime(dateTimeStamp: number) {
//     var result = "";
//     var minute = 1000 * 60;
//     var hour = minute * 60;
//     var day = hour * 24;
//     var month = day * 30;
//     var now = new Date().getTime();
//     var diffValue = now - dateTimeStamp;
//     if (diffValue < 0) return;
//     var monthC = diffValue / month;
//     var weekC = diffValue / (7 * day);
//     var dayC = diffValue / day;
//     var hourC = diffValue / hour;
//     var minC = diffValue / minute;
//     if (monthC >= 1) {
//       result = "" + monthC + "月前";
//     } else if (weekC >= 1) {
//       result = "" + weekC + "周前";
//     } else if (dayC >= 1) {
//       result = "" + dayC + "天前";
//     } else if (hourC >= 1) {
//       result = "" + hourC + "小时前";
//     } else if (minC >= 1) {
//       result = "" + minC + "分钟前";
//     } else {
//       result = "刚刚";
//     }
//     return result;
//   },
//   // 获取是几几后
//   //   getAstro(timestamp: number) {
//   //     let newDate = new Date();
//   //     newDate.setTime(timestamp);
//   //     let birthday = newDate.toLocaleDateString(timestamp.toString());
//   //     let birthdayArr = birthday.split("/");
//   //     let year = birthdayArr[0].substring(birthdayArr[0].length - 2) + "后";
//   //     let month = birthdayArr[1];
//   //     let day = birthdayArr[2];
//   //     return (
//   //       year +
//   //       " - " +
//   //       "魔羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手魔羯".substr(
//   //         month * 2 - (day < "102223444433".charAt(month - 1) - -19) * 2,
//   //         2
//   //       ) +
//   //       "座"
//   //     );
//   //   },
//   // 数组随机
//   shuffle(arr: any[]) {
//     let _arr = arr.slice();
//     for (let i = 0; i < _arr.length; i++) {
//       let j = this.getRandomInt(0, i);
//       let t = _arr[i];
//       _arr[i] = _arr[j];
//       _arr[j] = t;
//     }
//     return _arr;
//   },
//   getRandomInt(min: number, max: number) {
//     return Math.floor(Math.random() * (max - min + 1) + min);
//   },
// };
