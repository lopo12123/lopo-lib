import{u as F,b as R}from"./vue-router.5bf9c237.js";import{a as z}from"./axios.e3200588.js";import{E as J,a as L,b as P,c as U,d as O,e as H,f as K,g as Q,h as A}from"./element-plus.1d6cc8d7.js";import{m as G,d as B,r as D,a3 as W,q as X,a5 as Y,o as a,c as u,a as s,H as d,a6 as Z,M as n,J as o,P as l,Q as p,C as N,I,K as k,l as S,$ as ee,F as M,_ as E,a7 as se,a8 as te,B as C}from"./@vue.80d2c1fe.js";import{E as oe,a as T,b as le,j as ae,o as ne}from"./@codemirror.c1c4a4b6.js";import{_ as q}from"./index.6ba8daa0.js";import"./@element-plus.8062508b.js";import"./@vueuse.67d6af23.js";import"./@popperjs.7a88ba6a.js";import"./@ctrl.2e36ce53.js";import"./lodash-es.4e87efa8.js";import"./@lezer.8ff638da.js";import"./crelt.67277586.js";import"./style-mod.a2e40363.js";import"./w3c-keyname.74927781.js";import"./highlight.js.61d95b14.js";const ce=()=>{var e,t;return(t=(e=G())==null?void 0:e.appContext.config.globalProperties.$message)!=null?t:J},ie=e=>{var t;(t=document.getElementById(e))==null||t.scrollIntoView({block:"start",inline:"nearest",behavior:"smooth"})};const re=B({name:"CodeBlock",props:{docContent:{required:!0,type:String}},setup(e){const t=D(null),m=W(null);return X(()=>{!t.value||(m.value=new oe({parent:t.value,state:T.create({doc:e.docContent,extensions:[le,T.readOnly.of(!0),ae({typescript:!0}),ne]})}))}),Y(()=>{var _;(_=m.value)==null||_.destroy()}),{elRef:t}}}),ue={class:"code-block"},pe={class:"code-container",ref:"elRef"};function de(e,t,m,_,g,f){return a(),u("div",ue,[s("div",pe,null,512)])}var me=q(re,[["render",de],["__scopeId","data-v-5fd462d2"]]);const _e=B({name:"DocBlockTemplate",components:{ElDescriptions:L,ElDescriptionsItem:P,CodeBlock:me},props:{blockName:{required:!0,type:String},blockValue:{required:!0,type:Object}},setup(){return{}}}),be={class:"doc-block-template"},he={class:"language-typescript"},ve={key:1,class:"code-line-dark"};function fe(e,t,m,_,g,f){const c=d("el-descriptions-item"),b=d("code-block"),$=d("el-descriptions"),h=Z("highlight");return a(),u("div",be,[n($,{column:2,border:""},{default:o(()=>[n(c,{width:"25%",label:"Name"},{default:o(()=>[l(p(e.blockName),1)]),_:1}),n(c,{width:"25%",label:"Type"},{default:o(()=>[l(p(e.blockValue.type),1)]),_:1}),n(c,{width:"25%",label:"Permission"},{default:o(()=>[l(p(e.blockValue.permission),1)]),_:1}),n(c,{width:"25%",label:"Static"},{default:o(()=>[l(p(e.blockValue.static),1)]),_:1}),n(c,{width:"25%",label:"Description",span:2},{default:o(()=>[l(p(e.blockValue.description),1)]),_:1}),n(c,{width:"25%",label:"Declaration",span:2},{default:o(()=>[N((a(),u("code",he,[l(p(e.blockValue.declaration),1)])),[[h]])]),_:1}),n(c,{width:"25%",label:"Example"},{default:o(()=>[e.blockValue.example&&e.blockValue.example!==""?(a(),I(b,{key:0,"doc-content":e.blockValue.example},null,8,["doc-content"])):k("",!0),!e.blockValue.example||e.blockValue.example===""?(a(),u("div",ve,"no example")):k("",!0)]),_:1})]),_:1})])}var ke=q(_e,[["render",fe],["__scopeId","data-v-4662346b"]]);const ye=B({name:"Docs",components:{ElMenu:U,ElSubMenu:O,ElMenuItem:H,ElCollapse:K,ElCollapseItem:Q,ElDialog:A,DocBlockTemplate:ke},setup(){const e=F(),t=ce(),m=D({}),_=S(()=>R().query),g=S(()=>m.value[_.value.class]);z.get("./DocsConfig.json").then(({data:h})=>{m.value=h}).catch(()=>{t({type:"error",message:"Failed to get the configuration file of the menu, please refresh and try again."})});const f=D(!1),c=()=>{f.value=!0},b=D([]);return{DocsJson:m,query:_,activeItemDoc:g,iconMapVisible:f,showIconMap:c,jumpTo:(h,v)=>{e.push({query:{class:h,field:v}}),b.value.includes(v)||b.value.push(v),ee(()=>{ie(`${v}`)})},activeItemField:b}}}),y=e=>(se("data-v-e0912674"),e=e(),te(),e),ge={class:"docs"},$e={class:"docs-side-menu"},Ve=y(()=>s("i",{class:"label-map"},null,-1)),Ce=y(()=>s("b",{style:{"font-size":"16px"}},"Icon comparison table",-1)),De=y(()=>s("i",{class:"label-class"},null,-1)),Ie={style:{"font-size":"16px"}},we={key:0,class:"label-static"},Me={class:"docs-item-docs"},Ee={key:0,style:{color:"#777777","font-size":"14px","font-family":"Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif"}},Be=["id"],qe={class:"label-item"},Se={class:"label-item"},Te={key:0,class:"label-item"},je=y(()=>s("i",{class:"label-static"},null,-1)),xe=l(" static"),Fe=[je,xe],Re=y(()=>s("div",{class:"map-container"},[s("div",{class:"map-item"},[s("i",{class:"label-class"}),l(),s("span",null,"class")]),s("div",{class:"map-item"},[s("i",{class:"label-constructor"}),l(),s("span",null,"constructor")]),s("div",{class:"map-item"},[s("i",{class:"label-parameter"}),l(),s("span",null,"parameter")]),s("div",{class:"map-item"},[s("i",{class:"label-method"}),l(),s("span",null,"method")]),s("div",{class:"map-item"},[s("i",{class:"label-public"}),l(),s("span",null,"public")]),s("div",{class:"map-item"},[s("i",{class:"label-private"}),l(),s("span",null,"private")]),s("div",{class:"map-item"},[s("i",{class:"label-static"}),l(),s("span",null,"static")])],-1));function ze(e,t,m,_,g,f){const c=d("el-menu-item"),b=d("el-sub-menu"),$=d("el-menu"),h=d("doc-block-template"),v=d("el-collapse-item"),j=d("el-collapse"),x=d("el-dialog");return a(),u("div",ge,[s("div",$e,[n($,{style:{height:"100%"},"default-active":`${e.query.class}-${e.query.field}`},{default:o(()=>[n(c,{index:"icon-sheet",onClick:e.showIconMap},{default:o(()=>[Ve,Ce]),_:1},8,["onClick"]),(a(!0),u(M,null,E(e.DocsJson,(i,r)=>(a(),I(b,{index:r+"",key:r+""},{title:o(()=>[De,s("b",Ie,p(r),1)]),default:o(()=>[(a(!0),u(M,null,E(i,(w,V)=>(a(),I(c,{index:`${r}-${V}`,key:`${r}-${V}`,onClick:Je=>e.jumpTo(r+"",V+"")},{default:o(()=>[s("i",{class:C("label-"+w.type)},null,2),s("i",{class:C("label-"+w.permission)},null,2),w.static?(a(),u("i",we)):k("",!0),s("i",null,p(V),1)]),_:2},1032,["index","onClick"]))),128))]),_:2},1032,["index"]))),128))]),_:1},8,["default-active"])]),s("div",Me,[!e.query.class&&!e.query.field?(a(),u("span",Ee,"Click on the left menu to select the Documents item")):k("",!0),n(j,{class:"class-collapse",modelValue:e.activeItemField,"onUpdate:modelValue":t[0]||(t[0]=i=>e.activeItemField=i)},{default:o(()=>[(a(!0),u(M,null,E(e.activeItemDoc,(i,r)=>(a(),I(v,{name:r,key:r},{title:o(()=>[s("span",{id:r+"",class:"field-name"},p(r),9,Be),s("div",qe,[s("i",{class:C("label-"+i.type)},null,2),l(" "+p(i.type),1)]),s("div",Se,[s("i",{class:C("label-"+i.permission)},null,2),l(" "+p(i.permission),1)]),i.static?(a(),u("div",Te,Fe)):k("",!0)]),default:o(()=>[n(h,{"block-name":r+"","block-value":i},null,8,["block-name","block-value"])]),_:2},1032,["name"]))),128))]),_:1},8,["modelValue"]),n(x,{modelValue:e.iconMapVisible,"onUpdate:modelValue":t[1]||(t[1]=i=>e.iconMapVisible=i),width:"260px"},{default:o(()=>[Re]),_:1},8,["modelValue"])])])}var ts=q(ye,[["render",ze],["__scopeId","data-v-e0912674"]]);export{ts as default};