(this["webpackJsonppat-trials"]=this["webpackJsonppat-trials"]||[]).push([[0],{18:function(e,t,r){},19:function(e,t,r){"use strict";r.r(t);var n=r(2),c=r.n(n),a=r(8),s=r.n(a),i=r(1),o=r(3),l="border border-3 shadow shadow-3 m-3 p-3",u=r(0);function j(e){var t=e.col;return Object(u.jsxs)("div",{className:l,children:[Object(u.jsxs)("h5",{children:[" QuantFilter for ",t," "]}),Object(u.jsx)("p",{className:"fst-italic",children:" Coming soon "})]})}var b=r(9);function d(e){return[function(){return new Set},function(t,r){return r.add(t[e]),r}]}function f(e){var t=e.col,r=e.struct,c=e.dispatch,a=Object(b.a)(r.values()).sort();a.push("None");var s=Object(n.useState)("None"),i=Object(o.a)(s,2),j=i[0],d=i[1];return Object(n.useEffect)((function(){c("None"===j?{type:"FILTER_UPDATE",col:t,filter:function(e){return!0}}:{type:"FILTER_UPDATE",col:t,filter:function(e){return e[t]===j}})}),[t,c,j]),Object(u.jsxs)("div",{className:l,children:[Object(u.jsxs)("h5",{children:[" CatFilter for ",t," "]}),Object(u.jsx)("select",{className:"form-select",value:j,onChange:function(e){return d(e.target.value)},children:a.map((function(e){return Object(u.jsx)("option",{value:e,children:e},e)}))})]})}function O(e){var t=e.col;return Object(u.jsxs)("div",{className:l,children:[Object(u.jsxs)("h5",{children:[" TimeFilter for ",t," "]}),Object(u.jsx)("p",{className:"fst-italic",children:" Coming soon "})]})}var h=r(6);var p=function(e){var t=e.data,r=e.keys,c=Object(n.useMemo)((function(){return r.map((function(e){return{Header:e,accessor:e}}))}),[r]),a=Object(h.useTable)({columns:c,data:t},h.useSortBy,h.usePagination),s=a.getTableProps,o=a.getTableBodyProps,l=a.headerGroups,j=a.prepareRow,b=a.pageOptions,d=a.page,f=a.state,O=f.pageIndex,p=f.pageSize,v=a.gotoPage,g=a.previousPage,x=a.nextPage,m=a.setPageSize,y=a.canPreviousPage,P=a.canNextPage;return Object(u.jsxs)("div",{children:[Object(u.jsxs)("table",Object(i.a)(Object(i.a)({className:"table"},s()),{},{children:[Object(u.jsx)("thead",{children:l.map((function(e){return Object(u.jsx)("tr",Object(i.a)(Object(i.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(u.jsxs)("th",Object(i.a)(Object(i.a)({},e.getHeaderProps(e.getSortByToggleProps())),{},{children:[e.render("Header"),Object(u.jsx)("span",{children:e.isSorted?e.isSortedDesc?Object(u.jsx)("i",{class:"bi bi-arrow-down-square-fill"}):Object(u.jsx)("i",{class:"bi bi-arrow-up-square-fill"}):""})]}))}))}))}))}),Object(u.jsx)("tbody",Object(i.a)(Object(i.a)({},o()),{},{children:d.map((function(e){return j(e),Object(u.jsx)("tr",Object(i.a)(Object(i.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(u.jsx)("td",Object(i.a)(Object(i.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]})),Object(u.jsxs)("div",{children:[Object(u.jsx)("button",{className:"btn btn-primary",onClick:function(){return g()},disabled:!y,children:"Previous Page"}),Object(u.jsx)("button",{className:"btn btn-primary",onClick:function(){return x()},disabled:!P,children:"Next Page"}),Object(u.jsxs)("div",{children:["Page"," ",Object(u.jsxs)("em",{children:[O+1," of ",b.length]})]}),Object(u.jsx)("div",{children:"Go to page:"}),Object(u.jsx)("input",{type:"number",defaultValue:O+1||1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;v(t)}}),Object(u.jsx)("select",{className:"form-select",value:p,onChange:function(e){m(Number(e.target.value))},children:[10,20,30,40,50].map((function(e){return Object(u.jsxs)("option",{value:e,children:["Show ",e]},e)}))})]})]})};function v(e,t){for(var r=e.columns,n=e.data,c=[],a=0,s=Object.keys(r);a<s.length;a++){var o=s[a];r[o].display&&c.push(o)}for(var l=[],u={},j=0,b=Object.keys(r);j<b.length;j++){var d=b[j];u[d]="function"===typeof r[d].initdata&&r[d].initdata()}for(var f=0;f<n.length;f++){for(var O=!0,h=0,p=Object.keys(r);h<p.length;h++){if(!r[p[h]].filter(n[f])){O=!1;break}}if(O){l.push(n[f]);for(var v=0,g=Object.keys(r);v<g.length;v++){var x=g[v];r[x].builder&&(u[x]=r[x].builder(n[f],u[x]))}}}return Object(i.a)(Object(i.a)({},e),{},{visibleData:l,visibleKeys:c,colLoopData:u})}function g(e,t){switch(t.type){case"DATA":e=function(e,t){for(var r=t.keys,n={},c=0,a=Object.keys(r);c<a.length;c++){var s=a[c],l=void 0,u=void 0,b=void 0,h=r[s];switch(h.filterType){case"Q":b=j;var p=[function(){return[]},function(e,t){return t}],g=Object(o.a)(p,2);l=g[0],u=g[1];break;case"C":b=f;var x=d(s),m=Object(o.a)(x,2);l=m[0],u=m[1];break;case"T":b=O;var y=[function(){return[]},function(e,t){return t}],P=Object(o.a)(y,2);l=P[0],u=P[1]}n[s]={filter:function(e){return!0},display:h.display,el:b,builder:u,initdata:l}}return v(e=Object(i.a)(Object(i.a)({},e),{},{data:t.data,keys:t.keys,columns:n}))}(e,t);break;case"ERROR":e=Object(i.a)(Object(i.a)({},e),{},{error:t.error});break;case"DATA_DISPLAY_UPDATE":e=v(e);break;case"FILTER_UPDATE":var r=e.columns;r[t.col].filter=t.filter,e=v(e=Object(i.a)(Object(i.a)({},e),{},{columns:r}))}return e}var x=function(){var e=Object(n.useReducer)(g,{data:[],keys:{},error:null,columns:{},colLoopData:{},visibleKeys:[]}),t=Object(o.a)(e,2),r=t[0],a=r.data,s=r.error,i=r.columns,l=r.visibleData,j=r.colLoopData,b=r.visibleKeys,d=t[1];if(console.log(j),Object(n.useEffect)((function(){fetch("data.json").then((function(e){return e.json()})).then((function(e){d({type:"DATA",data:e.data,keys:e.keys})})).catch((function(e){d({type:"ERROR",error:e})}))}),[]),s)return Object(u.jsxs)("h5",{children:[" Error Occurred ",s," "]});if(0===a.length)return Object(u.jsx)("h5",{children:" Loading "});for(var f=[],O=0,h=Object.keys(i);O<h.length;O++){var v=h[O],x=i[v];x.el&&f.push(c.a.createElement(x.el,{key:v,col:v,struct:j[v],dispatch:d}))}return Object(u.jsxs)("div",{className:"container",children:[Object(u.jsx)("div",{className:"d-flex flex-wrap justify-content-center",children:f}),Object(u.jsx)("div",{children:Object(u.jsx)(p,{keys:b,data:l})})]})},m=function(e){e&&e instanceof Function&&r.e(3).then(r.bind(null,20)).then((function(t){var r=t.getCLS,n=t.getFID,c=t.getFCP,a=t.getLCP,s=t.getTTFB;r(e),n(e),c(e),a(e),s(e)}))};r(18);s.a.render(Object(u.jsx)(c.a.StrictMode,{children:Object(u.jsx)(x,{})}),document.getElementById("root")),m()}},[[19,1,2]]]);
//# sourceMappingURL=main.cc6143b1.chunk.js.map