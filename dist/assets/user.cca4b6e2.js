import{n as e}from"./index.69f64e29.js";async function a(t){return await e.get(`/user/detail?uid=${t}`)}async function u(t,n){return await e.get(`/login/cellphone?phone=${t}&password=${n}`,{withCredentials:!0})}async function r(){return await e.get("/logout")}export{r as a,a as b,u};
