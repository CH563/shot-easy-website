import{d as F,b as K,a as b,c as H,_ as me,e as fe}from"./toArray.nS7GZgeY.js";import{R as E,r as i}from"./index.OjgoNOWw.js";import{t as pe,_ as x,R as ve,T as ee,U as ne,V as Ce,c as M,u as ge,g as ye,m as he,C as Se,z as R,p as L,W,s as xe,q as be}from"./reactNode.B2HQCb_2.js";import{a as we,t as Te}from"./useSize.RVMIuZji.js";import{r as Ie}from"./index.p7hr_Xrf.js";function te(e){var n;return e==null||(n=e.getRootNode)===null||n===void 0?void 0:n.call(e)}function _e(e){return te(e)instanceof ShadowRoot}function Ee(e){return _e(e)?te(e):null}function Re(e){return e.replace(/-(.)/g,function(n,t){return t.toUpperCase()})}function Ne(e,n){pe(e,"[@ant-design/icons] ".concat(n))}function U(e){return F(e)==="object"&&typeof e.name=="string"&&typeof e.theme=="string"&&(F(e.icon)==="object"||typeof e.icon=="function")}function q(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return Object.keys(e).reduce(function(n,t){var o=e[t];switch(t){case"class":n.className=o,delete n.class;break;default:delete n[t],n[Re(t)]=o}return n},{})}function G(e,n,t){return t?E.createElement(e.tag,x(x({key:n},q(e.attrs)),t),(e.children||[]).map(function(o,r){return G(o,"".concat(n,"-").concat(e.tag,"-").concat(r))})):E.createElement(e.tag,x({key:n},q(e.attrs)),(e.children||[]).map(function(o,r){return G(o,"".concat(n,"-").concat(e.tag,"-").concat(r))}))}function oe(e){return ve(e)[0]}function re(e){return e?Array.isArray(e)?e:[e]:[]}var $e=`
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`,ze=function(n){var t=i.useContext(ee),o=t.csp,r=t.prefixCls,a=$e;r&&(a=a.replace(/anticon/g,r)),i.useEffect(function(){var c=n.current,l=Ee(c);ne(a,"@ant-design-icons",{prepend:!0,csp:o,attachTo:l})},[])},ke=["icon","className","onClick","style","primaryColor","secondaryColor"],_={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function Pe(e){var n=e.primaryColor,t=e.secondaryColor;_.primaryColor=n,_.secondaryColor=t||oe(n),_.calculated=!!t}function Oe(){return x({},_)}var N=function(n){var t=n.icon,o=n.className,r=n.onClick,a=n.style,c=n.primaryColor,l=n.secondaryColor,v=K(n,ke),f=i.useRef(),p=_;if(c&&(p={primaryColor:c,secondaryColor:l||oe(c)}),ze(f),Ne(U(t),"icon should be icon definiton, but got ".concat(t)),!U(t))return null;var s=t;return s&&typeof s.icon=="function"&&(s=x(x({},s),{},{icon:s.icon(p.primaryColor,p.secondaryColor)})),G(s.icon,"svg-".concat(s.name),x(x({className:o,onClick:r,style:a,"data-icon":s.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},v),{},{ref:f}))};N.displayName="IconReact";N.getTwoToneColors=Oe;N.setTwoToneColors=Pe;const j=N;function ae(e){var n=re(e),t=b(n,2),o=t[0],r=t[1];return j.setTwoToneColors({primaryColor:o,secondaryColor:r})}function De(){var e=j.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor}var Ae=["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"];ae(Ce.primary);var $=i.forwardRef(function(e,n){var t,o=e.className,r=e.icon,a=e.spin,c=e.rotate,l=e.tabIndex,v=e.onClick,f=e.twoToneColor,p=K(e,Ae),s=i.useContext(ee),m=s.prefixCls,y=m===void 0?"anticon":m,d=s.rootClassName,C=M(d,y,(t={},H(t,"".concat(y,"-").concat(r.name),!!r.name),H(t,"".concat(y,"-spin"),!!a||r.name==="loading"),t),o),u=l;u===void 0&&v&&(u=-1);var h=c?{msTransform:"rotate(".concat(c,"deg)"),transform:"rotate(".concat(c,"deg)")}:void 0,I=re(f),g=b(I,2),w=g[0],S=g[1];return i.createElement("span",me({role:"img","aria-label":r.name},p,{ref:n,tabIndex:u,onClick:v,className:C}),i.createElement(j,{icon:r,primaryColor:w,secondaryColor:S,style:h}))});$.displayName="AntdIcon";$.getTwoToneColor=De;$.setTwoToneColor=ae;const sn=$,Le=E.createContext(void 0),Ge=Le,T=100,Me=10,je=T*Me,ie={Modal:T,Drawer:T,Popover:T,Popconfirm:T,Tooltip:T,Tour:T},Be={SelectLike:50,Dropdown:50,DatePicker:50,Menu:50,ImagePreview:1};function Fe(e){return e in ie}function un(e,n){const[,t]=ge(),o=E.useContext(Ge),r=Fe(e);if(n!==void 0)return[n,n];let a=o??0;return r?(a+=(o?0:t.zIndexPopupBase)+ie[e],a=Math.min(a,t.zIndexPopupBase+je)):a+=Be[e],[o===void 0?n:a,a]}const O=()=>({height:0,opacity:0}),Q=e=>{const{scrollHeight:n}=e;return{height:n,opacity:1}},He=e=>({height:e?e.offsetHeight:0}),D=(e,n)=>n?.deadline===!0||n.propertyName==="height",dn=function(){return{motionName:`${arguments.length>0&&arguments[0]!==void 0?arguments[0]:"ant"}-motion-collapse`,onAppearStart:O,onEnterStart:O,onAppearActive:Q,onEnterActive:Q,onLeaveStart:He,onLeaveActive:O,onAppearEnd:D,onEnterEnd:D,onLeaveEnd:D,motionDeadline:500}},mn=(e,n,t)=>t!==void 0?t:`${e}-${n}`,We=e=>{const{componentCls:n}=e;return{[n]:{"&-block":{display:"flex",width:"100%"},"&-vertical":{flexDirection:"column"}}}},Ue=We,qe=e=>{const{componentCls:n}=e;return{[n]:{display:"inline-flex","&-rtl":{direction:"rtl"},"&-vertical":{flexDirection:"column"},"&-align":{flexDirection:"column","&-center":{alignItems:"center"},"&-start":{alignItems:"flex-start"},"&-end":{alignItems:"flex-end"},"&-baseline":{alignItems:"baseline"}},[`${n}-item:empty`]:{display:"none"}}}},Qe=e=>{const{componentCls:n}=e;return{[n]:{"&-gap-row-small":{rowGap:e.spaceGapSmallSize},"&-gap-row-middle":{rowGap:e.spaceGapMiddleSize},"&-gap-row-large":{rowGap:e.spaceGapLargeSize},"&-gap-col-small":{columnGap:e.spaceGapSmallSize},"&-gap-col-middle":{columnGap:e.spaceGapMiddleSize},"&-gap-col-large":{columnGap:e.spaceGapLargeSize}}}},Xe=ye("Space",e=>{const n=he(e,{spaceGapSmallSize:e.paddingXS,spaceGapMiddleSize:e.padding,spaceGapLargeSize:e.paddingLG});return[qe(n),Qe(n),Ue(n)]},()=>({}),{resetStyle:!1});var ce=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,o=Object.getOwnPropertySymbols(e);r<o.length;r++)n.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(t[o[r]]=e[o[r]]);return t};const z=i.createContext(null),fn=(e,n)=>{const t=i.useContext(z),o=i.useMemo(()=>{if(!t)return"";const{compactDirection:r,isFirstItem:a,isLastItem:c}=t,l=r==="vertical"?"-vertical-":"-";return M(`${e}-compact${l}item`,{[`${e}-compact${l}first-item`]:a,[`${e}-compact${l}last-item`]:c,[`${e}-compact${l}item-rtl`]:n==="rtl"})},[e,n,t]);return{compactSize:t?.compactSize,compactDirection:t?.compactDirection,compactItemClassnames:o}},pn=e=>{let{children:n}=e;return i.createElement(z.Provider,{value:null},n)},Ve=e=>{var{children:n}=e,t=ce(e,["children"]);return i.createElement(z.Provider,{value:t},n)},vn=e=>{const{getPrefixCls:n,direction:t}=i.useContext(Se),{size:o,direction:r,block:a,prefixCls:c,className:l,rootClassName:v,children:f}=e,p=ce(e,["size","direction","block","prefixCls","className","rootClassName","children"]),s=we(g=>o??g),m=n("space-compact",c),[y,d]=Xe(m),C=M(m,d,{[`${m}-rtl`]:t==="rtl",[`${m}-block`]:a,[`${m}-vertical`]:r==="vertical"},l,v),u=i.useContext(z),h=Te(f),I=i.useMemo(()=>h.map((g,w)=>{const S=g&&g.key||`${m}-item-${w}`;return i.createElement(Ve,{key:S,compactSize:s,compactDirection:r,isFirstItem:w===0&&(!u||u?.isFirstItem),isLastItem:w===h.length-1&&(!u||u?.isLastItem)},g)}),[o,h,u]);return h.length===0?null:y(i.createElement("div",Object.assign({className:C},p),I))};var le=i.createContext(null),X=[];function Ye(e,n){var t=i.useState(function(){if(!R())return null;var d=document.createElement("div");return d}),o=b(t,1),r=o[0],a=i.useRef(!1),c=i.useContext(le),l=i.useState(X),v=b(l,2),f=v[0],p=v[1],s=c||(a.current?void 0:function(d){p(function(C){var u=[d].concat(fe(C));return u})});function m(){r.parentElement||document.body.appendChild(r),a.current=!0}function y(){var d;(d=r.parentElement)===null||d===void 0||d.removeChild(r),a.current=!1}return L(function(){return e?c?c(m):m():y(),y},[e]),L(function(){f.length&&(f.forEach(function(d){return d()}),p(X))},[f]),[r,s]}var A;function Ze(e){if(typeof document>"u")return 0;if(e||A===void 0){var n=document.createElement("div");n.style.width="100%",n.style.height="200px";var t=document.createElement("div"),o=t.style;o.position="absolute",o.top="0",o.left="0",o.pointerEvents="none",o.visibility="hidden",o.width="200px",o.height="150px",o.overflow="hidden",t.appendChild(n),document.body.appendChild(t);var r=n.offsetWidth;t.style.overflow="scroll";var a=n.offsetWidth;r===a&&(a=t.clientWidth),document.body.removeChild(t),A=r-a}return A}function V(e){var n=e.match(/^(.*)px$/),t=Number(n?.[1]);return Number.isNaN(t)?Ze():t}function Je(e){if(typeof document>"u"||!e||!(e instanceof Element))return{width:0,height:0};var n=getComputedStyle(e,"::-webkit-scrollbar"),t=n.width,o=n.height;return{width:V(t),height:V(o)}}function Ke(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth}var en="rc-util-locker-".concat(Date.now()),Y=0;function nn(e){var n=!!e,t=i.useState(function(){return Y+=1,"".concat(en,"_").concat(Y)}),o=b(t,1),r=o[0];L(function(){if(n){var a=Je(document.body).width,c=Ke();ne(`
html body {
  overflow-y: hidden;
  `.concat(c?"width: calc(100% - ".concat(a,"px);"):"",`
}`),r)}else W(r);return function(){W(r)}},[n,r])}var Z=!1;function tn(e){return typeof e=="boolean"&&(Z=e),Z}var J=function(n){return n===!1?!1:!R()||!n?null:typeof n=="string"?document.querySelector(n):typeof n=="function"?n():n},Cn=i.forwardRef(function(e,n){var t=e.open,o=e.autoLock,r=e.getContainer;e.debug;var a=e.autoDestroy,c=a===void 0?!0:a,l=e.children,v=i.useState(t),f=b(v,2),p=f[0],s=f[1],m=p||t;i.useEffect(function(){(c||t)&&s(t)},[t,c]);var y=i.useState(function(){return J(r)}),d=b(y,2),C=d[0],u=d[1];i.useEffect(function(){var P=J(r);u(P??null)});var h=Ye(m&&!C),I=b(h,2),g=I[0],w=I[1],S=C??g;nn(o&&t&&R()&&(S===g||S===document.body));var B=null;if(l&&xe(l)&&n){var se=l;B=se.ref}var ue=be(B,n);if(!m||!R()||C===void 0)return null;var de=S===!1||tn(),k=l;return n&&(k=i.cloneElement(l,{ref:ue})),i.createElement(le.Provider,{value:w},de?k:Ie.createPortal(k,S))});export{sn as A,je as C,pn as N,Cn as P,fn as a,Ee as b,vn as c,Xe as d,mn as g,dn as i,un as u,Ge as z};
