/* empty css             *//* empty css                        */import{_ as S,d as P,s as A,q as m,a as l,t as n,b as s,e as o,u as a,f as v,U as p,x as i,y as B,F as E,v as I,aD as L,c as V,w,aE as N,S as $,V as z,af as D,ag as T}from"./index.69f64e29.js";import{_ as c}from"./IconPark.f27efd9e.js";import{P as h}from"./Play.debfb153.js";import{L as j}from"./Like.da450144.js";import{P as q}from"./PauseOne.46a04f47.js";const r=e=>(D("data-v-7652ac22"),e=e(),T(),e),O={class:"artist-box"},R={class:"tool-head"},U={class:"artist-table"},Z=r(()=>s("thead",null,[s("tr",null,[s("th",{class:"th-index"},"\u5E8F\u53F7"),s("th",{class:"th-name"},"\u6B4C\u66F2"),s("th",{class:"th-artist"},"\u6B4C\u624B"),s("th",{class:"th-album"},"\u4E13\u8F91"),s("th",{class:"th-duration"},"\u65F6\u957F")])],-1)),G={class:"index-container flex justify-center"},H={class:"num"},J=$('<div class="play-icon" data-v-7652ac22><div class="line" style="animation-delay:-1.2s;" data-v-7652ac22></div><div class="line" data-v-7652ac22></div><div class="line" style="animation-delay:-1.5s;" data-v-7652ac22></div><div class="line" style="animation-delay:-0.9s;" data-v-7652ac22></div><div class="line" style="animation-delay:-0.6s;" data-v-7652ac22></div></div>',1),K={class:"name-container"},M={class:"avatar"},Q=r(()=>s("div",{slot:"placeholder",class:"image-slot flex-center flex-column"},[s("i",{class:"iconfont niceicon-3"})],-1)),W=r(()=>s("div",{slot:"error",class:"image-slot flex-center"},[s("i",{class:"el-icon-picture-outline"})],-1)),X=["title"],Y={class:"artist-container"},ss=["title"],ts={class:"album-container"},as=["title"],es={class:"duration-container"},is={class:"name"},ls=P({__name:"ArtistList",props:{songs:null,subscribed:null,isPerson:null},setup(e){const y=e,{thisIndex:ns,isPlaying:f,thisSong:g}=A(m()),{play:d}=m(),b=()=>{d(y.songs[0].id)};return(k,u)=>{const x=z;return l(),n("div",O,[s("div",R,[s("div",{class:"item play-item",onClick:b},[o(c,{icon:a(h),class:"mr-2"},null,8,["icon"]),v(" \u64AD\u653E\u5168\u90E8 ")]),e.isPerson?B("",!0):(l(),n("div",{key:0,class:p(["item",e.subscribed?"active":""]),onClick:u[0]||(u[0]=t=>k.$emit("collectArtist"))},[o(c,{icon:a(j),class:"mr-2"},null,8,["icon"]),v(" "+i(e.subscribed?"\u5DF2\u6536\u85CF":"\u6536\u85CF"),1)],2))]),s("table",U,[Z,s("tbody",null,[(l(!0),n(E,null,I(e.songs,(t,C)=>{var _;return l(),n("tr",{key:t.id,class:p([((_=a(g))==null?void 0:_.id)==t.id&&a(f)?"playing":"","text-sm"])},[s("td",null,[s("div",G,[s("span",H,i(a(L)(C+1,2)),1),J,o(c,{class:"play-btn",icon:a(h),size:"18","stroke-width":3,onClick:F=>a(d)(t.id)},null,8,["icon","onClick"]),o(c,{class:"pause-btn",icon:a(q),size:"18","stroke-width":3,onClick:F=>a(d)(t.id)},null,8,["icon","onClick"])])]),s("td",null,[s("div",K,[s("div",M,[(l(),V(x,{key:t.image+"?param=100y100",src:t.image+"?param=100y100",lazy:""},{default:w(()=>[Q,W]),_:2},1032,["src"]))]),s("p",{class:"name ellipsis",title:t.name},i(t.name),9,X)])]),s("td",null,[s("div",Y,[s("p",{class:"name ellipsis",title:t.singer},i(t.singer),9,ss)])]),s("td",null,[s("div",ts,[s("p",{title:t.album,class:"name ellipsis"},i(t.album),9,as)])]),s("td",null,[s("div",es,[s("p",is,i(a(N)(t.duration)),1)])])],2)}),128))])])])}}});var vs=S(ls,[["__scopeId","data-v-7652ac22"]]);export{vs as A};