(this["webpackJsonppat-trials"]=this["webpackJsonppat-trials"]||[]).push([[0],{48:function(e,t,n){},49:function(e,t,n){"use strict";n.r(t);var a=n(2),c=n.n(a),r=n(15),s=n.n(r),l=n(4),o=n(1),i=n(3),d="border border-3 shadow shadow-3 m-3 p-3",b=n(0);function j(e){var t=e.col;return Object(b.jsxs)("div",{className:"".concat(d," d-none"),children:[Object(b.jsxs)("h5",{children:[" QuantFilter for ",t," "]}),Object(b.jsx)("p",{className:"fst-italic",children:" Coming soon "})]})}var h=n(16),u=n.n(h),f=function(){var e=Object(a.useState)(),t=Object(i.a)(e,2),n=t[0],c=t[1],r=Object(a.useRef)(null);Object(a.useEffect)((function(){c(new u.a(r.current,{}))}),[r]);var s=function(){n&&n.toggle()};return Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{ref:r,class:"modal",tabindex:"-1",children:Object(b.jsx)("div",{class:"modal-dialog",children:Object(b.jsxs)("div",{class:"modal-content",children:[Object(b.jsxs)("div",{class:"modal-header",children:[Object(b.jsx)("h5",{class:"modal-title",children:"Country Specific Season Information"}),Object(b.jsx)("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:s})]}),Object(b.jsx)("div",{class:"modal-body",children:Object(b.jsxs)("table",{class:"table",children:[Object(b.jsxs)("thead",{children:[Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"col"}),Object(b.jsx)("th",{class:"table-active text-center",colspan:"2",scope:"col",children:"Season 1"}),Object(b.jsx)("th",{class:"table-active text-center",colspan:"2",scope:"col",children:"Season 2"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"col",children:"Country"}),Object(b.jsx)("th",{scope:"col",children:"Name"}),Object(b.jsx)("th",{scope:"col",children:"Planting"}),Object(b.jsx)("th",{scope:"col",children:"Name"}),Object(b.jsx)("th",{scope:"col",children:"Planting"})]})]}),Object(b.jsxs)("tbody",{children:[Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"row",children:"Kenya"}),Object(b.jsx)("td",{children:"Long Rain"}),Object(b.jsx)("td",{className:"",children:"March"}),Object(b.jsx)("td",{children:"Short Rain"}),Object(b.jsx)("td",{children:"September"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"row",children:"Malawi"}),Object(b.jsx)("td",{children:"Winter"}),Object(b.jsx)("td",{className:"",children:"June"}),Object(b.jsx)("td",{children:"Summer"}),Object(b.jsx)("td",{children:"November"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"row",children:"Zimbabwe"}),Object(b.jsx)("td",{children:"Winter"}),Object(b.jsx)("td",{className:"",children:"June"}),Object(b.jsx)("td",{children:"Summer"}),Object(b.jsx)("td",{children:"November"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"row",children:"Uganda"}),Object(b.jsx)("td",{children:"A"}),Object(b.jsx)("td",{className:"",children:"May"}),Object(b.jsx)("td",{children:"B"}),Object(b.jsx)("td",{children:"October"})]}),Object(b.jsxs)("tr",{children:[Object(b.jsx)("th",{scope:"row",children:"Rawanda"}),Object(b.jsx)("td",{children:"-"}),Object(b.jsx)("td",{className:"",children:"March"}),Object(b.jsx)("td",{children:"-"}),Object(b.jsx)("td",{children:"October"})]})]})]})}),Object(b.jsx)("div",{class:"modal-footer",children:Object(b.jsx)("button",{type:"button",class:"btn btn-secondary",onClick:s,children:"Close"})})]})})}),Object(b.jsxs)("button",{className:"btn btn-primary my-1",onClick:s,children:[" ","View Season Information"," "]})]})};function O(e){return[function(){return new Set},function(t,n,a,c){return(a||c)&&n.add(t[e]),n}]}function v(e){var t,n=e.col,c=e.struct,r=e.dispatch,s={countryDisplay:g,seasonDisplay:m,locationDisplay:w};t=s.countryDisplay?"COUNTRY_DISPLAY_UPDATE":s.seasonDisplay?"SEASON_DISPLAY_UPDATE":s.locationDisplay?"LOCATION_DISPLAY_UPDATE":"FILTER_UPDATE";var o=Object(l.a)(c.values()).sort(),j=Object(a.useState)([]),h=Object(i.a)(j,2),u=h[0],O=h[1];return Object(a.useEffect)((function(){if(0===u.length)r({type:"FILTER_UPDATE",col:n,filter:function(e){return!0}});else if(1===u.length)r({type:"FILTER_UPDATE",col:n,filter:function(e){for(var t=0;t<u.length;t++)if(e[n]===u[t])return!0}});else{var e=new Set(u);r({type:t,col:n,selected:e,filter:function(e){for(var t=0;t<u.length;t++)if(e[n]===u[t])return!0;return!1}})}}),[n,r,u]),Object(b.jsxs)("div",{className:d,children:[Object(b.jsxs)("h5",{children:[" Filter for ",n," "]}),Object(b.jsx)("select",{multiple:!0,className:"form-select",value:u,onChange:function(e){return O(Object(l.a)(e.target.options).filter((function(e){return e.selected})).map((function(e){return e.value})))},children:o.map((function(e){return Object(b.jsx)("option",{value:e,children:e},e)}))}),"Season"===n&&Object(b.jsx)(f,{}),Object(b.jsxs)("div",{className:"btn btn-danger",onClick:function(){return O([])},children:[" ","clear"," "]})]})}function p(e){var t=e.col;return Object(b.jsxs)("div",{className:"".concat(d," d-none"),children:[Object(b.jsxs)("h5",{children:[" TimeFilter for ",t," "]}),Object(b.jsx)("p",{className:"fst-italic",children:" Coming soon "})]})}var x=n(7);function y(e,t){var n=[];n.push(t.map((function(e){return e.accessor})));for(var a=0;a<e.length;a++){for(var c=[],r=0;r<t.length;r++)c.push('"'.concat(e[a][t[r].accessor],'"'));n.push(c.join(","))}return new Blob([n.join("\n")],{type:"text/csv"})}var g,m,w,S=function(e){var t=e.data,n=e.keys,c=Object(a.useMemo)((function(){return n.map((function(e){return{Header:e,accessor:e}}))}),[n]),r=Object(x.useTable)({columns:c,data:t},x.useSortBy,x.usePagination),s=r.getTableProps,l=r.getTableBodyProps,i=r.headerGroups,d=r.prepareRow,j=r.pageOptions,h=r.page,u=r.state,f=u.pageIndex,O=u.pageSize,v=r.gotoPage,p=r.previousPage,g=r.nextPage,m=r.setPageSize,w=r.canPreviousPage,S=r.canNextPage;return Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"d-flex align-items-end justify-content-between",children:[Object(b.jsxs)("div",{className:"d-flex flex-row align-items-end",children:[Object(b.jsxs)("div",{className:"d-flex flex-column",children:[Object(b.jsxs)("div",{children:["Page"," ",Object(b.jsxs)("em",{children:[f+1," of ",j.length]})]}),Object(b.jsx)("div",{children:"Go to page:"}),Object(b.jsx)("input",{type:"number",defaultValue:f+1||1,onChange:function(e){var t=e.target.value?Number(e.target.value)-1:0;v(t)}})]}),Object(b.jsx)("select",{className:"form-select",style:{width:"max-content"},value:O,onChange:function(e){m(Number(e.target.value))},children:[10,20,30,40,50].map((function(e){return Object(b.jsxs)("option",{value:e,children:["Show ",e]},e)}))})]}),Object(b.jsxs)("a",{className:"btn btn-primary",href:window.URL.createObjectURL(y(t,c)),download:"pat-filtered-export.csv",children:[" ","Download as CSV"," "]})]}),Object(b.jsx)("div",{style:{width:"100%","overflow-x":"scroll"},children:Object(b.jsxs)("table",Object(o.a)(Object(o.a)({className:"table",style:{width:"max-content"}},s()),{},{children:[Object(b.jsx)("thead",{children:i.map((function(e){return Object(b.jsx)("tr",Object(o.a)(Object(o.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(b.jsxs)("th",Object(o.a)(Object(o.a)({},e.getHeaderProps(e.getSortByToggleProps())),{},{children:[e.render("Header"),Object(b.jsx)("span",{children:e.isSorted?e.isSortedDesc?Object(b.jsx)("i",{class:"bi bi-arrow-down-square-fill"}):Object(b.jsx)("i",{class:"bi bi-arrow-up-square-fill"}):""})]}))}))}))}))}),Object(b.jsx)("tbody",Object(o.a)(Object(o.a)({},l()),{},{children:h.map((function(e){return d(e),Object(b.jsx)("tr",Object(o.a)(Object(o.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(b.jsx)("td",Object(o.a)(Object(o.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))}),Object(b.jsxs)("div",{className:"d-flex flex-row justify-content-between align-items-start",children:[Object(b.jsx)("button",{className:"btn btn-primary",onClick:function(){return p()},disabled:!w,children:"Previous Page"}),Object(b.jsx)("button",{className:"btn btn-primary order-5",onClick:function(){return g()},disabled:!S,children:"Next Page"})]})]})},k=n.p+"static/media/sil.05e9e8c0.png";function C(e,t){for(var n=e.columns,a=e.data,c=[],r=0,s=Object.keys(n);r<s.length;r++){var l=s[r];n[l].display&&c.push(l)}for(var i=[],d={},b=0,j=Object.keys(n);b<j.length;b++){var h=j[b];d[h]="function"===typeof n[h].initdata&&n[h].initdata()}for(var u=0;u<a.length;u++){for(var f=!0,O=null,v=0,p=Object.keys(n);v<p.length;v++){var x=p[v];n[x].filter(a[u])||(f=!1,O=null===O?x:void 0)}for(var y=0,g=Object.keys(n);y<g.length;y++){var m=g[y];n[m].builder&&(d[m]=n[m].builder(a[u],d[m],f,m===O))}f&&i.push(a[u])}return Object(o.a)(Object(o.a)({},e),{},{visibleData:i,visibleKeys:c,colLoopData:d})}function P(e,t){var n=e.columns;switch(t.type){case"DATA":e=function(e,t){for(var n=t.keys,a={},c=0,r=Object.keys(n);c<r.length;c++){var s=r[c],l=void 0,d=void 0,b=void 0,h=n[s];switch(h.filterType){case"Q":b=j;var u=[function(){return[]},function(e,t,n,a){return t}],f=Object(i.a)(u,2);l=f[0],d=f[1];break;case"C":b=v;var x=O(s),y=Object(i.a)(x,2);l=y[0],d=y[1];break;case"T":b=p;var g=[function(){return[]},function(e,t,n,a){return t}],m=Object(i.a)(g,2);l=m[0],d=m[1]}a[s]={filter:function(e){return!0},display:h.display,el:b,builder:d,initdata:l}}for(var w=[],S=0;S<t.data.length;S++){for(var k={},P=0,T=Object.keys(t.data[S]);P<T.length;P++){var L=T[P];switch(n[L].filterType){case"Q":k[L]=t.data[S][L];break;case"C":k[L]="".concat(t.data[S][L]);break;case"T":default:k[L]=t.data[S][L]}}w.push(k)}return C(e=Object(o.a)(Object(o.a)({},e),{},{data:w,keys:t.keys,columns:a}))}(e,t);break;case"ERROR":e=Object(o.a)(Object(o.a)({},e),{},{error:t.error});break;case"DATA_DISPLAY_UPDATE":e=C(e);break;case"FILTER_UPDATE":n[t.col].filter=t.filter,e=C(e=Object(o.a)(Object(o.a)({},e),{},{columns:n}));break;case"COUNTRY_DISPLAY_UPDATE":n[t.col].filter=t.filter,e=function(e,t){for(var n=e.columns,a=e.data,c=e.selected,r=[],s=0,i=Object.keys(n);s<i.length;s++){var d=i[s];n[d].display&&r.push(d)}for(var b=[],j={},h=0,u=Object.keys(n);h<u.length;h++){var f=u[h];j[f]="function"===typeof n[f].initdata&&n[f].initdata()}for(var O=0;O<a.length;O++){for(var v=!0,p=null,x=0,y=Object.keys(n);x<y.length;x++){var g=y[x];n[g].filter(a[O])||(v=!1,p=null===p?g:void 0)}for(var m=0,w=Object.keys(n);m<w.length;m++){var S=w[m];n[S].builder&&(j[S]=n[S].builder(a[O],j[S],v,S===p))}v&&b.push(a[O])}for(var k=Array.from(c),C=[],P=0;P<k.length;P++){for(var T=[],L=0;L<b.length;L++)b[L].Entry===k[P]&&T.push(b[L]);C.push(T)}for(var D=[],N=[],A=0;A<C.length;A++){for(var E=[],I=0;I<C[A].length;I++)E.push(C[A][I].Country);N.push(E)}for(var R=N.reduce((function(e,t){return e.filter((function(e){return t.includes(e)}))})),_=Object(l.a)(new Set(R)),U=0;U<C.length;U++)for(var F=0;F<C[U].length;F++)_.includes(C[U][F].Country)&&D.push(C[U][F]);for(var Y=new Set,M=0;M<D.length;M++)j.Country.has(D[M].Country)&&Y.add(D[M].Country);j.Country=Y;for(var B=new Set,K=0;K<D.length;K++)j.Location.has(D[K].Location)&&B.add(D[K].Location);j.Location=B;for(var V=new Set,q=0;q<D.length;q++)j.Season.has(D[q].Season)&&V.add(D[q].Season);return j.Season=V,b=D,Object(o.a)(Object(o.a)({},e),{},{visibleData:b,visibleKeys:r,colLoopData:j})}(e=Object(o.a)(Object(o.a)({},e),{},{columns:n,selected:t.selected}));break;case"SEASON_DISPLAY_UPDATE":n[t.col].filter=t.filter,e=function(e,t){for(var n=e.columns,a=e.data,c=e.selected,r=[],s=0,i=Object.keys(n);s<i.length;s++){var d=i[s];n[d].display&&r.push(d)}for(var b=[],j={},h=0,u=Object.keys(n);h<u.length;h++){var f=u[h];j[f]="function"===typeof n[f].initdata&&n[f].initdata()}for(var O=0;O<a.length;O++){for(var v=!0,p=null,x=0,y=Object.keys(n);x<y.length;x++){var g=y[x];n[g].filter(a[O])||(v=!1,p=null===p?g:void 0)}for(var m=0,w=Object.keys(n);m<w.length;m++){var S=w[m];n[S].builder&&(j[S]=n[S].builder(a[O],j[S],v,S===p))}v&&b.push(a[O])}for(var k=Array.from(c),C=[],P=0;P<k.length;P++){for(var T=[],L=0;L<b.length;L++)b[L].Entry===k[P]&&T.push(b[L]);C.push(T)}for(var D=[],N=[],A=0;A<C.length;A++){for(var E=[],I=0;I<C[A].length;I++)E.push(C[A][I].Season);N.push(E)}for(var R=N.reduce((function(e,t){return e.filter((function(e){return t.includes(e)}))})),_=Object(l.a)(new Set(R)),U=0;U<C.length;U++)for(var F=0;F<C[U].length;F++)_.includes(C[U][F].Season)&&D.push(C[U][F]);for(var Y=new Set,M=0;M<D.length;M++)j.Country.has(D[M].Country)&&Y.add(D[M].Country);j.Country=Y;for(var B=new Set,K=0;K<D.length;K++)j.Location.has(D[K].Location)&&B.add(D[K].Location);j.Location=B;for(var V=new Set,q=0;q<D.length;q++)j.Season.has(D[q].Season)&&V.add(D[q].Season);return j.Season=V,b=D,Object(o.a)(Object(o.a)({},e),{},{visibleData:b,visibleKeys:r,colLoopData:j})}(e=Object(o.a)(Object(o.a)({},e),{},{columns:n,selected:t.selected}));break;case"LOCATION_DISPLAY_UPDATE":n[t.col].filter=t.filter,e=function(e,t){for(var n=e.columns,a=e.data,c=e.selected,r=[],s=0,i=Object.keys(n);s<i.length;s++){var d=i[s];n[d].display&&r.push(d)}for(var b=[],j={},h=0,u=Object.keys(n);h<u.length;h++){var f=u[h];j[f]="function"===typeof n[f].initdata&&n[f].initdata()}for(var O=0;O<a.length;O++){for(var v=!0,p=null,x=0,y=Object.keys(n);x<y.length;x++){var g=y[x];n[g].filter(a[O])||(v=!1,p=null===p?g:void 0)}for(var m=0,w=Object.keys(n);m<w.length;m++){var S=w[m];n[S].builder&&(j[S]=n[S].builder(a[O],j[S],v,S===p))}v&&b.push(a[O])}for(var k=Array.from(c),C=[],P=0;P<k.length;P++){for(var T=[],L=0;L<b.length;L++)b[L].Entry===k[P]&&T.push(b[L]);C.push(T)}for(var D=[],N=[],A=0;A<C.length;A++){for(var E=[],I=0;I<C[A].length;I++)E.push(C[A][I].Location);N.push(E)}for(var R=N.reduce((function(e,t){return e.filter((function(e){return t.includes(e)}))})),_=Object(l.a)(new Set(R)),U=0;U<C.length;U++)for(var F=0;F<C[U].length;F++)_.includes(C[U][F].Location)&&D.push(C[U][F]);b=D;for(var Y=new Set,M=0;M<D.length;M++)j.Country.has(D[M].Country)&&Y.add(D[M].Country);j.Country=Y;for(var B=new Set,K=0;K<D.length;K++)j.Location.has(D[K].Location)&&B.add(D[K].Location);j.Location=B;for(var V=new Set,q=0;q<D.length;q++)j.Season.has(D[q].Season)&&V.add(D[q].Season);return j.Season=V,Object(o.a)(Object(o.a)({},e),{},{visibleData:b,visibleKeys:r,colLoopData:j})}(e=Object(o.a)(Object(o.a)({},e),{},{columns:n,selected:t.selected}))}return e}var T=function(){var e=c.a.useState(!1),t=Object(i.a)(e,2),n=t[0],r=t[1],s=c.a.useState(!1),l=Object(i.a)(s,2),o=l[0],d=l[1],j=c.a.useState(!1),h=Object(i.a)(j,2),u=h[0],f=h[1],O=function(e){var t=e.label,n=e.value,a=e.onChange;return Object(b.jsxs)("label",{children:[Object(b.jsx)("input",{type:"checkbox",checked:n,onChange:a}),t]})};g=n,m=o,w=u;var v=Object(a.useReducer)(P,{data:[],keys:{},error:null,columns:{},colLoopData:{},visibleKeys:[]}),p=Object(i.a)(v,2),x=p[0],y=x.data,C=x.error,T=x.columns,L=x.visibleData,D=x.colLoopData,N=x.visibleKeys,A=p[1];if(Object(a.useEffect)((function(){fetch("https://sil-interactive-soybean-map-data-1.s3.amazonaws.com/pat_db.json").then((function(e){return e.json()})).then((function(e){A({type:"DATA",data:e.data,keys:e.keys})})).catch((function(e){A({type:"ERROR",error:e})}))}),[]),C)return Object(b.jsxs)("h5",{children:[" Error Occurred ",C," "]});if(0===y.length)return Object(b.jsx)("h5",{children:" Loading "});for(var E=[],I=0,R=Object.keys(T);I<R.length;I++){var _=R[I],U=T[_];U.el&&E.push(c.a.createElement(U.el,{key:_,col:_,struct:D[_],dispatch:A}))}return Object(b.jsxs)("div",{className:"container",children:[Object(b.jsx)("img",{src:k,className:"mx-auto d-block",alt:"SIL logo",style:{"max-width":"300px"}}),Object(b.jsxs)("h1",{className:"display-1 text-center",children:["Pan-African Soybean Variety Trials (PAT) Database"," "]}),Object(b.jsx)("h1",{class:"display-6",children:"Introduction"}),Object(b.jsx)("p",{children:"The Soybean Innovation Lab\u2019s Pan-African Soybean Variety Trials (PAT) fast-track the introduction and testing of commercial soybean varieties sourced from across Africa, the U.S., Australia, and Latin America to provide the private sector, farmers, and processors with access to a broader selection of seed than what is currently available. The program consortium leverages its role as an independent third party and its unique access to international, regional, and national supplies of high-yielding germplasm to swiftly bring new varieties to market."}),Object(b.jsxs)("p",{children:["The PAT database covers results from trials in Benin, Cameroon, Ethiopia, Ghana, Kenya, Malawi, Mali, Mozambique, Nigeria, Rwanda, Sudan, Uganda, Zambia and Zimbabwe from 2015 to 2020."," ",Object(b.jsx)("b",{children:"The tool will be continuously updated to include other countries and seasons of testing."})]}),Object(b.jsx)("h1",{class:"display-6",children:"Instructions"}),Object(b.jsxs)("p",{children:["To explore the PAT database start with selecting one of the filters below. The filters are connected, and the first selection will determine the options available in the other filters. You can select multiple options by holding the Ctrl key while clicking. If you decide to change the filter, you can click on another option within the same filter or select the option ",Object(b.jsx)("b",{children:"clear"}),". The result of the selected filters will show up as a table at the bottom of the screen. Please click"," ",Object(b.jsx)("b",{children:"Download as CSV"})," to download the data."]}),Object(b.jsxs)("p",{children:[" ","Questions about this data?"," ",Object(b.jsxs)("a",{href:"mailto:soybeaninnovationlab@illinois.edu",children:[" ","Please Contact SIL"," "]})," "]}),Object(b.jsxs)("div",{class:"checkbox",children:[Object(b.jsx)("div",{class:"center-text",children:Object(b.jsx)("p",{children:" If you wish select multiple entries, check the category you wish to find overlaps with. If you want to display all of the data, leave the checkboxes blank."})}),Object(b.jsxs)("div",{class:"center",children:[Object(b.jsx)(O,{label:" Country",value:n,onChange:function(){r(!n)}}),"    ",Object(b.jsx)(O,{label:" Season",value:o,onChange:function(){d(!o)}}),"    ",Object(b.jsx)(O,{label:" Location",value:u,onChange:function(){f(!u)}})]})]}),Object(b.jsx)("div",{className:"d-flex flex-wrap justify-content-evenly",children:E}),Object(b.jsx)("div",{className:"mb-5",children:Object(b.jsx)(S,{keys:N,data:L})})]})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,50)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};n(48);s.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(T,{})}),document.getElementById("root")),L()}},[[49,1,2]]]);
//# sourceMappingURL=main.1594acda.chunk.js.map