/*
 * @Author: zyh
 * @Date: 2022-03-28 19:48:35
 * @LastEditors: zyh
 * @LastEditTime: 2022-04-01 21:45:04
 * @FilePath: \vue3-music\src\stores\login.ts
 * @Description: 登录 store
 *
 * Copyright (c) 2022 by 穿越, All Rights Reserved.
 */
import { defineStore } from "pinia";
import { ElMessageBox } from "element-plus";
import { ref } from "vue";
import type { FormInstance } from "element-plus";
import { useLogin, useUserDetail, useLogout } from "@/api/user";
import { useRouter } from "vue-router";
export const useLoginStore = defineStore({
  id: "login",
  state: () => ({
    ruleFormRef: ref<FormInstance>(),
    ruleForm: {
      pass: "",
      user: "",
    },
    rules: {
      pass: [
        {
          validator: (rule: any, value: any, callback: any) => {
            if (value === "") {
              callback(new Error("密码不能为空！！"));
            } else if (value.length < 6) {
              callback(new Error("密码必须大于或等于6！！"));
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
      user: [
        {
          validator: (rule: any, value: any, callback: any) => {
            if (value === "") {
              callback(new Error("用户名不能为空！！"));
            } else if (
              !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
                value
              )
            ) {
              callback(new Error("用户名必须是手机号！！"));
            } else {
              callback();
            }
          },
          trigger: "blur",
        },
      ],
    },
    loginLoading: false,
    router: useRouter(),
    loginStatus: localStorage.getItem("loginStatus"),
    userInfo: JSON.parse(localStorage.getItem("userInfo") || "{}"),
  }),
  actions: {
    // 初始化参数
    init() {
      this.ruleForm = {
        pass: "",
        user: "",
      };
    },
    // 登录操作
    login(formEl: FormInstance | undefined) {
      if (!formEl) return;
      this.loginLoading = false;
      formEl.validate((valid) => {
        if (valid) {
          this.loginLoading = true;
          let { user, pass } = this.ruleForm;
          this.loginAsync(user, pass);
          console.log("已提交");
        } else {
          this.loginLoading = false;
          console.log("校验错误");
          return false;
        }
      });
    },
    // 登录接口调用
    loginAsync(user: number | string, pass: number | string) {
      this.loginLoading = false;
      useLogin(user, pass)
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.getUserDetail(res.profile.userId);
            localStorage.setItem("cookie", res.cookie);
            localStorage.setItem("token", res.token);
            localStorage.setItem("loginStatus", "1");
            // 登录上了
            this.loginStatus = "1";
          } else {
            ElMessageBox({
              type: "error",
              message: res.msg,
            });
          }
        })
        .catch(() => {
          ElMessageBox({
            type: "error",
            message: "似乎出了什么问题啊，啧啧啧!!!",
          });
        });
    },
    // 注销
    async handleCommand(command: any) {
      switch (command) {
        case "personal":
          this.router.push({
            name: "personal",
          });
          break;
        case "logout":
          var res = await useLogout();
          if (res.code === 200) {
            this.router.push({
              name: "login",
            });
            this.loginStatus = "";
            localStorage.setItem("loginStatus", "");
            localStorage.setItem("token", "");
            localStorage.setItem("userInfo", "{}");
            this.userInfo = {};
          }
          break;
        default:
          break;
      }
    },
    // 获取个人信息
    async getUserDetail(uid: number) {
      try {
        let res = await useUserDetail(uid);
        if (res.code === 200) {
          let userInfo = {
            ...res.profile,
            level: res.level,
            listenSongs: res.listenSongs,
            createTime: res.createTime,
            createDays: res.createDays,
          };
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.userInfo = userInfo;
          // this.setUserInfo(res.profile);
          ElMessageBox({
            type: "success",
            message: "登录成功",
          });
          setTimeout(() => {
            this.loginLoading = false;
            this.router.go(-1);
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
    },

    // 判断是否为空
    isEmpty(val: { trim?: any } | null | undefined) {
      return (
        val === undefined ||
        val === null ||
        (typeof val === "object" && Object.keys(val).length === 0) ||
        (typeof val === "string" && val.trim().length === 0)
      );
    },
  },
});
