(function(t){function e(e){for(var a,i,s=e[0],c=e[1],l=e[2],f=0,d=[];f<s.length;f++)i=s[f],r[i]&&d.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);u&&u(e);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var t,e=0;e<o.length;e++){for(var n=o[e],a=!0,s=1;s<n.length;s++){var c=n[s];0!==r[c]&&(a=!1)}a&&(o.splice(e--,1),t=i(i.s=n[0]))}return t}var a={},r={app:0},o=[];function i(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=a,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;o.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"088a":function(t,e,n){"use strict";var a=n("e27e"),r=n.n(a);r.a},"1aa8":function(t,e){},"3f25":function(t,e,n){"use strict";var a=n("de38"),r=n.n(a);r.a},"56d7":function(t,e,n){"use strict";n.r(e);n("744f"),n("6c7b"),n("7514"),n("20d6"),n("1c4c"),n("6762"),n("cadf"),n("e804"),n("55dd"),n("d04f"),n("c8ce"),n("217b"),n("7f7f"),n("f400"),n("7f25"),n("536b"),n("d9ab"),n("f9ab"),n("32d7"),n("25c9"),n("9f3c"),n("042e"),n("c7c6"),n("f4ff"),n("049f"),n("7872"),n("a69f"),n("0b21"),n("6c1a"),n("c7c62"),n("84b4"),n("c5f6"),n("2e37"),n("fca0"),n("7cdf"),n("ee1d"),n("b1b1"),n("87f3"),n("9278"),n("5df2"),n("04ff"),n("f751"),n("4504"),n("fee7"),n("ffc1"),n("0d6d"),n("9986"),n("8e6e"),n("25db"),n("e4f7"),n("b9a1"),n("64d5"),n("9aea"),n("db97"),n("66c8"),n("57f0"),n("165b"),n("456d"),n("cf6a"),n("fd24"),n("8615"),n("551c"),n("097d"),n("df1b"),n("2397"),n("88ca"),n("ba16"),n("d185"),n("ebde"),n("2d34"),n("f6b3"),n("2251"),n("c698"),n("a19f"),n("9253"),n("9275"),n("3b2b"),n("3846"),n("4917"),n("a481"),n("28a5"),n("386d"),n("6b54"),n("4f7f"),n("8a81"),n("ac4d"),n("8449"),n("9c86"),n("fa83"),n("48c0"),n("a032"),n("aef6"),n("d263"),n("6c37"),n("9ec8"),n("5695"),n("2fdb"),n("d0b0"),n("5df3"),n("b54a"),n("f576"),n("ed50"),n("788d"),n("14b9"),n("f386"),n("f559"),n("1448"),n("673e"),n("242a"),n("c66f"),n("b05c"),n("34ef"),n("6aa2"),n("15ac"),n("af56"),n("b6e4"),n("9c29"),n("63d9"),n("4dda"),n("10ad"),n("c02b"),n("4795"),n("130f"),n("ac6a"),n("96cf");var a=n("2b0e"),r=n("ce5b"),o=n.n(r);n("bf40");a["default"].use(o.a,{theme:{primary:"#e2e2e2",primaryDark:"#cccccc",secondary:"#424242",accent:"#d42017",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"},options:{customProperties:!0},iconfont:"fa"});var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("v-app",{attrs:{id:"inspire"}},[n("v-navigation-drawer",{attrs:{clipped:"",fixed:"",app:"","disable-resize-watcher":""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list",{attrs:{dense:""}},[n("v-list-tile",{on:{click:function(){}}},[n("v-list-tile-action",[n("v-icon",[t._v("fas fa-tachometer-alt")])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Drawer stuff")])],1)],1),n("v-list-tile",{on:{click:function(){}}},[n("v-list-tile-action",[n("v-icon",[t._v("fas fa-cog")])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Settings")])],1)],1)],1)],1),n("v-toolbar",{attrs:{app:"",fixed:"","clipped-left":""}},[n("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-toolbar-title",{staticClass:"accent--text",on:{click:function(e){return t.$router.push("/")}}},[t._v("Wiley")]),n("v-spacer"),n("v-toolbar-items",{staticClass:"hidden-xs-and-down"},[t.$auth.status.loggedIn?n("v-btn",{attrs:{flat:""},on:{click:function(e){return t.logout()}}},[t._v("Logout")]):t._e()],1)],1),n("v-content",{attrs:{app:""}},[n("v-container",{attrs:{fluid:"","fill-height":"",primary:"","pa-0":""}},[n("router-view")],1)],1),n("v-footer",{attrs:{app:"",fixed:""}},[n("span",[t._v("© 2019 Footer?")])])],1)],1)},s=[],c=n("a34a"),l=n.n(c);function u(t,e,n,a,r,o,i){try{var s=t[o](i),c=s.value}catch(l){return void n(l)}s.done?e(c):Promise.resolve(c).then(a,r)}function f(t){return function(){var e=this,n=arguments;return new Promise(function(a,r){var o=t.apply(e,n);function i(t){u(o,a,r,i,s,"next",t)}function s(t){u(o,a,r,i,s,"throw",t)}i(void 0)})}}var d={name:"App",props:{},data:function(){return{drawer:!1}},methods:{logout:function(){var t=f(l.a.mark(function t(){return l.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$auth.logout();case 2:this.$router.replace("/sign_in");case 3:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()}},v=d,p=n("2877"),m=Object(p["a"])(v,i,s,!1,null,null,null),h=m.exports,g=n("8c4f"),b=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"test-ref"},[n("V-flex",{attrs:{xs3:""}},[n("video--controls")],1),n("v-flex",{attrs:{xs9:""}},[n("v-layout",{attrs:{column:"","align-center":""}},[n("p",{staticStyle:{"margin-left":"auto"}},[t._v(t._s(t.parseTime))]),n("video--live-feed",{attrs:{camNumber:t.camNumber},on:{capture:function(e){return t.onCaptureTaken(e)}}}),n("v-layout",{attrs:{"justify-center":""}},[n("v-btn",{staticClass:"error btn",attrs:{large:""}},[t._v("\n                    False Alarm \n                ")]),n("v-btn",{staticClass:"success btn",attrs:{large:""}},[t._v("\n                    Confirm\n                ")])],1)],1)],1)],1)},w=[],y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-list",{staticStyle:{height:"100%"},attrs:{dense:""}},[n("v-subheader",{on:{click:function(e){return t.$router.go(-1)}}},[n("v-icon",[t._v("fas fa-arrow-left")]),t._v(" Back")],1),n("v-subheader",[t._v("Object Detected")]),n("v-list-tile",{on:{click:function(){}}},[n("v-list-tile-action",[n("v-icon",[t._v("far fa-eye")])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Coyote")])],1)],1),n("v-list-tile",{on:{click:function(){}}},[n("v-list-tile-action",[n("v-icon",[t._v("far fa-eye-slash")])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Traincar")])],1)],1),n("v-list-tile",{on:{click:function(){}}},[n("v-list-tile-action",[n("v-icon",[t._v("far fa-eye-slash")])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Worker")])],1)],1),n("v-list-tile",{on:{click:function(){}}},[n("v-list-tile-action",[n("v-icon",[t._v("far fa-eye-slash")])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Obstruction")])],1)],1)],1)},_=[],x={props:{captures:{type:Array,required:!1,default:function(){return[]}}}},k=x,I=Object(p["a"])(k,y,_,!1,null,null,null),S=I.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-hover",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.hover;return n("v-flex",{staticClass:"video-feed-wrapper",staticStyle:{"max-width":"750px"},attrs:{"pa-1":""}},[n("div",[n("video",{ref:"video",staticClass:"video",attrs:{width:"100%",height:"100%",autoplay:""}}),n("canvas",{ref:"canvas",staticClass:"canvas",attrs:{width:"100%",height:"100%"}})]),n("v-layout",{staticClass:"controls"},[n("p",{staticClass:"mb-0 top test-ref"},[t._v("Cam "+t._s(t.camNumber))]),n("v-btn",{directives:[{name:"show",rawName:"v-show",value:a,expression:"hover"}],staticClass:"bottom",attrs:{icon:"",to:{name:"cam_details",params:{id:+t.camNumber}},small:"",flat:""}},[n("v-icon",{attrs:{color:"accent"}},[t._v("fas fa-eye")])],1)],1)],1)}}])})},j=[],C={data:function(){return{cameras:{},cameraData:{},video:null,canvas:null}},props:{camNumber:{type:Number,required:!1,default:null}},mounted:function(){var t=this;this.video=this.$refs.video,navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:!0}).then(function(e){t.video.srcObject=e})},methods:{capture:function(){this.canvas=this.$refs.canvas,console.log("url",this.canvas.toDataURL("image/webp")),this.$emit("capture",this.canvas.toDataURL("image/webp"))}}},$=C,D=(n("3f25"),Object(p["a"])($,O,j,!1,null,"083b6c34",null)),F=D.exports,N=n("70f2"),P=n.n(N),T={components:{"video--live-feed":F,"video--controls":S},data:function(){return{camNumber:null}},mounted:function(){this.camNumber=+this.$route.params.id},methods:{onCaptureTaken:function(t){console.log(t)}},computed:{parseTime:function(){return P()(new Date,"MM/DD/YYYY hh:mm:ss")}}},E=T,M=(n("088a"),Object(p["a"])(E,b,w,!1,null,"7fae7896",null)),L=M.exports,q=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:"","fill-height":"","pa-0":""}},[a("v-layout",{attrs:{"align-center":"","justify-center":""}},[a("v-flex",{staticStyle:{"background-color":"#FFFFFF",height:"100%"},attrs:{xs4:""}},[a("v-layout",{attrs:{"align-center":"","justify-center":"","fill-height":""}},[a("v-img",{attrs:{src:n("892b")}})],1)],1),a("v-flex",{attrs:{xs8:"","px-5":""}},[a("v-card",{attrs:{flat:"",color:"primaryDark"}},[a("v-toolbar",{attrs:{flat:"",color:"primaryDark"}},[a("v-toolbar-title",[t._v("Login")])],1),a("v-card-text",[a("v-form",[a("v-text-field",{attrs:{"prepend-icon":"fas fa-user",name:"employeeId",label:"Employee ID",type:"text"},model:{value:t.employeeId,callback:function(e){t.employeeId=e},expression:"employeeId"}}),a("v-text-field",{attrs:{"prepend-icon":"fas fa-lock",name:"password",label:"Password",id:"password",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"accent"},on:{click:function(e){return t.login()}}},[t._v("Login")])],1)],1)],1)],1)],1)},A=[],U={data:function(){return{employeeId:"",password:""}},methods:{login:function(){var t=this;this.$auth.login(this.employeeId,this.password).then(function(e){console.log("Login response",e),t.$router.replace("/")})}}},R=U,J=Object(p["a"])(R,q,A,!1,null,null,null),Y=J.exports,z=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",[n("V-flex",{attrs:{xs3:""}},[n("video--controls",{attrs:{captures:t.captures}})],1),n("v-flex",{attrs:{xs9:""}},[n("v-layout",{attrs:{row:"",wrap:"","align-start":""}},t._l(2,function(e){return n("v-flex",{key:e,attrs:{xs6:""}},[n("video--live-feed",{attrs:{camNumber:e},on:{capture:function(e){return t.onCaptureTaken(e)}}})],1)}),1)],1)],1)},B=[],V={components:{"video--live-feed":F,"video--controls":S},data:function(){return{captures:[]}},methods:{onCaptureTaken:function(t){this.captures.push(t)}}},W=V,H=n("1aa8"),G=n.n(H),K=Object(p["a"])(W,z,B,!1,null,null,null);"function"===typeof G.a&&G()(K);var Q=K.exports;a["default"].use(g["a"]);var X=new g["a"]({mode:"history",base:"/",routes:[{path:"",name:"overview",component:Q,alias:"/overview"},{path:"/sign_in",name:"signIn",component:Y},{path:"/cam_details/:id",name:"cam_details",component:L},{path:"*",redirect:"/"}]});X.beforeEach(function(t,e,n){var a=["/sign_in"],r=!a.includes(t.path),o=localStorage.getItem("user");if(r&&!o)return n("/sign_in");n()});var Z=n("2f62"),tt=n("bc3a"),et=n.n(tt),nt=et.a.create();nt.token=window.localStorage.getItem("token")||null,nt.new=function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"/";this.defaults.baseURL=e,this.token&&(this.tokenInterceptor=this.interceptors.request.use(function(e){return e.headers["Authorization"]="Bearer "+t.token,e}))},nt.login=function(t,e){var n=this;return this.post("/login",{eid:t,password:e}).then(function(t){var e=t.data;return e.data.token&&(window.localStorage.setItem("user",JSON.stringify(e.data)),window.localStorage.setItem("token",e.data.token),n.tokenInterceptor=n.interceptors.request.use(function(t){return t.headers["Authorization"]="Bearer "+e.data.token,t})),t.data}).catch(function(t){return t})},nt.logout=function(){this.token=null,this.interceptors.request.eject(this.tokenInterceptor),window.localStorage.removeItem("token"),window.localStorage.removeItem("user")};var at=nt;at.new("/api");var rt=JSON.parse(localStorage.getItem("user")),ot=rt?{status:{loggedIn:!0},user:rt}:{status:{},user:null},it={namespaced:!0,state:ot,getters:{user:function(t){return t}},mutations:{loginRequest:function(t,e){t.status={loggingIn:!0},t.user=e},loginSuccess:function(t,e){t.status={loggedIn:!0},t.user=e},loginFailure:function(t){t.status={},t.user=null},logout:function(t){t.status={},t.user=null}},actions:{login:function(t,e){var n=t.dispatch,a=t.commit,r=e.employeeId,o=e.password;return a("loginRequest",{employeeId:r,password:o}),at.login(r,o).then(function(t){return console.log("AUTH_MODULE",t.data),a("loginSuccess",t.data),t.data},function(t){a("loginFailure",t),n("alert/error",t,{root:!0})})},logout:function(t){var e=t.commit;at.logout(),e("logout")}}};a["default"].use(Z["a"]);var st=new Z["a"].Store({modules:{authentication:it}}),ct={install:function(t){t.mixin({computed:{$auth:function(){var t=st.getters["authentication/user"];return t.login=function(t,e){return st.dispatch("authentication/login",{employeeId:t,password:e})},t.logout=function(){return st.dispatch("authentication/logout")},t}}})}};a["default"].config.productionTip=!1,a["default"].use(ct),new a["default"]({router:X,store:st,render:function(t){return t(h)}}).$mount("#app")},"892b":function(t,e,n){t.exports=n.p+"img/wiley_demo_logo.8a2b9f5b.png"},de38:function(t,e,n){},e27e:function(t,e,n){}});
//# sourceMappingURL=app.b4596776.js.map