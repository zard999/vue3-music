/* empty css             *//* empty css                        */import{I as h,_}from"./IconPark.f27efd9e.js";import{e as t,j as L,k,am as g,l as m,_ as j,d as v,a as o,t as r,F as S,v as w,b as s,u as d,c as f,w as W,x as u,y,V as M}from"./index.69f64e29.js";var B=h("loading-one",!1,function(e){return t("svg",{width:e.size,height:e.size,viewBox:"0 0 48 48",fill:"none"},[t("path",{d:"M24 4V8",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M34 6.6795L32 10.1436",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M41.3203 14L37.8562 16",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M44 24H40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M41.3203 34L37.8562 32",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M34 41.3205L32 37.8564",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M24 44V40",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M14 41.3205L16 37.8564",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M6.67969 34L10.1438 32",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M4 24H8",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M6.67969 14L10.1438 16",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null),t("path",{d:"M14 6.6795L16 10.1436",stroke:e.colors[0],"stroke-width":e.strokeWidth,"stroke-linecap":e.strokeLinecap,"stroke-linejoin":e.strokeLinejoin},null)])});const C=L("singer",()=>{const e=m(),n=k([]),l=async()=>{n.value.length||(n.value=await g())},a=k({id:0});return{hotSinger:n,getHotSinger:l,toSingerDetail:i=>{a.value=i,console.log("\u8DF3\u8F6C\u5230\u6B4C\u624B\u8BE6\u60C5\u9875",i.id),e.replace({name:"singerDetail",query:{id:i.id}})},singer:a}});const x={class:"singer-list"},I={class:"cover"},z=["onClick"],D={class:"image-slot"},V={class:"info"},F={class:"name ellipsis"},H={key:0,class:"count"},b=v({__name:"SingerItem",props:{hotSinger:null},setup(e){const{toSingerDetail:n}=C();return(l,a)=>{const c=M;return o(),r("div",x,[(o(!0),r(S,null,w(e.hotSinger,i=>(o(),r("div",{class:"singer-item",key:i.id},[s("div",I,[s("div",{class:"image cursor-pointer",onClick:E=>d(n)(i)},[(o(),f(c,{key:i.img1v1Url+"?param=200y200",src:i.img1v1Url+"?param=200y200",lazy:""},{placeholder:W(()=>[s("div",D,[t(_,{icon:d(B),class:"mr-1 ml-10 mt-10",size:18},null,8,["icon"])])]),_:2},1032,["src"]))],8,z)]),s("div",V,[s("p",F,u(i.name),1),i.musicSize?(o(),r("p",H,"\u5355\u66F2\u6570"+u(i.musicSize),1)):y("",!0)])]))),128))])}}});var O=j(b,[["__scopeId","data-v-4548ab1b"]]);export{B as L,O as S,C as u};
