(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-vendors~53f0764e"],{"001a":function(e,t,n){"use strict";function r(e){return e&&"object"===typeof e&&"default"in e?e["default"]:e}Object.defineProperty(t,"__esModule",{value:!0});var i=r(n("c23d")),o=n("9ab4"),a={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"},s=function(e){function t(n,r,i){var o=e.call(this,r)||this;return Object.setPrototypeOf(o,t.prototype),o.code=n,o.details=i,o}return o.__extends(t,e),t}(Error);function u(e){if(e>=200&&e<300)return"ok";switch(e){case 0:return"internal";case 400:return"invalid-argument";case 401:return"unauthenticated";case 403:return"permission-denied";case 404:return"not-found";case 409:return"aborted";case 429:return"resource-exhausted";case 499:return"cancelled";case 500:return"internal";case 501:return"unimplemented";case 503:return"unavailable";case 504:return"deadline-exceeded"}return"unknown"}function c(e,t,n){var r=u(e),i=r,o=void 0;try{var c=t.error;if(c){var l=c.status;if("string"===typeof l){if(!a[l])return new s("internal","internal");r=a[l]}i=l;var f=c.message;"string"===typeof f&&(i=f),o=c.details,void 0!==o&&(o=n.decode(o))}}catch(d){}return"ok"===r?null:new s(r,i,o)}var l=function(){function e(e){this.app=e}return e.prototype.getAuthToken=function(){return o.__awaiter(this,void 0,void 0,function(){var e;return o.__generator(this,function(t){switch(t.label){case 0:return t.trys.push([0,2,,3]),[4,this.app.INTERNAL.getToken()];case 1:return e=t.sent(),e?[2,e.accessToken]:[2,void 0];case 2:return t.sent(),[2,void 0];case 3:return[2]}})})},e.prototype.getInstanceIdToken=function(){return o.__awaiter(this,void 0,void 0,function(){var e,t;return o.__generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),this.app.messaging?(e=this.app.messaging(),[4,e.getToken()]):[2,void 0];case 1:return t=n.sent(),t?[2,t]:[2,void 0];case 2:return n.sent(),[2,void 0];case 3:return[2]}})})},e.prototype.getContext=function(){return o.__awaiter(this,void 0,void 0,function(){var e,t;return o.__generator(this,function(n){switch(n.label){case 0:return[4,this.getAuthToken()];case 1:return e=n.sent(),[4,this.getInstanceIdToken()];case 2:return t=n.sent(),[2,{authToken:e,instanceIdToken:t}]}})})},e}(),f="type.googleapis.com/google.protobuf.Int64Value",d="type.googleapis.com/google.protobuf.UInt64Value";
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function h(e,t){var n={};for(var r in e)e.hasOwnProperty(r)&&(n[r]=t(e[r]));return n}var p=function(){function e(){}return e.prototype.encode=function(e){var t=this;if(null===e||void 0===e)return null;if(e instanceof Number&&(e=e.valueOf()),"number"===typeof e&&isFinite(e))return e;if(!0===e||!1===e)return e;if("[object String]"===Object.prototype.toString.call(e))return e;if(Array.isArray(e))return e.map(function(e){return t.encode(e)});if("function"===typeof e||"object"===typeof e)return h(e,function(e){return t.encode(e)});throw new Error("Data cannot be encoded in JSON: "+e)},e.prototype.decode=function(e){var t=this;if(null===e)return e;if(e["@type"])switch(e["@type"]){case f:case d:var n=parseFloat(e.value);if(isNaN(n))throw new Error("Data cannot be decoded from JSON: "+e);return n;default:throw new Error("Data cannot be decoded from JSON: "+e)}return Array.isArray(e)?e.map(function(e){return t.decode(e)}):"function"===typeof e||"object"===typeof e?h(e,function(e){return t.decode(e)}):e},e}();
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function v(e){return new Promise(function(t,n){setTimeout(function(){n(new s("deadline-exceeded","deadline-exceeded"))},e)})}var g=function(){function e(e,t){var n=this;void 0===t&&(t="us-central1"),this.app_=e,this.region_=t,this.serializer=new p,this.emulatorOrigin=null,this.INTERNAL={delete:function(){return n.deleteService()}},this.contextProvider=new l(e),this.cancelAllRequests=new Promise(function(e){n.deleteService=function(){return e()}})}return Object.defineProperty(e.prototype,"app",{get:function(){return this.app_},enumerable:!0,configurable:!0}),e.prototype._url=function(e){var t=this.app_.options.projectId,n=this.region_;if(null!==this.emulatorOrigin){var r=this.emulatorOrigin;return r+"/"+t+"/"+n+"/"+e}return"https://"+n+"-"+t+".cloudfunctions.net/"+e},e.prototype.useFunctionsEmulator=function(e){this.emulatorOrigin=e},e.prototype.httpsCallable=function(e,t){var n=this,r=function(r){return n.call(e,r,t||{})};return r},e.prototype.postJSON=function(e,t,n){return o.__awaiter(this,void 0,void 0,function(){var r,i;return o.__generator(this,function(o){switch(o.label){case 0:n.append("Content-Type","application/json"),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,fetch(e,{method:"POST",body:JSON.stringify(t),headers:n})];case 2:return r=o.sent(),[3,4];case 3:return o.sent(),[2,{status:0,json:null}];case 4:i=null,o.label=5;case 5:return o.trys.push([5,7,,8]),[4,r.json()];case 6:return i=o.sent(),[3,8];case 7:return o.sent(),[3,8];case 8:return[2,{status:r.status,json:i}]}})})},e.prototype.call=function(e,t,n){return o.__awaiter(this,void 0,void 0,function(){var r,i,a,u,l,f,d,h,p;return o.__generator(this,function(o){switch(o.label){case 0:return r=this._url(e),t=this.serializer.encode(t),i={data:t},a=new Headers,[4,this.contextProvider.getContext()];case 1:return u=o.sent(),u.authToken&&a.append("Authorization","Bearer "+u.authToken),u.instanceIdToken&&a.append("Firebase-Instance-ID-Token",u.instanceIdToken),l=n.timeout||7e4,[4,Promise.race([this.postJSON(r,i,a),v(l),this.cancelAllRequests])];case 2:if(f=o.sent(),!f)throw new s("cancelled","Firebase Functions instance was deleted.");if(d=c(f.status,f.json,this.serializer),d)throw d;if(!f.json)throw new s("internal","Response is not valid JSON object.");if(h=f.json.data,"undefined"===typeof h&&(h=f.json.result),"undefined"===typeof h)throw new s("internal","Response is missing data field.");return p=this.serializer.decode(h),[2,{data:p}]}})})},e}(),w="functions";
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function y(e,t,n){return new g(e,n)}function b(e){var t={Functions:g};e.INTERNAL.registerService(w,y,t,void 0,!0)}b(i),t.registerFunctions=b},"7d28":function(e,t,n){"use strict";n.r(t),n.d(t,"registerInstallations",function(){return pe});var r=n("c23d"),i=n.n(r),o=n("cd51"),a=n("9dbb");var s=function(){return s=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var i in t=arguments[n],t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e},s.apply(this,arguments)};function u(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{u(r.next(e))}catch(t){o(t)}}function s(e){try{u(r["throw"](e))}catch(t){o(t)}}function u(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(a,s)}u((r=r.apply(e,t||[])).next())})}function c(e,t){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:s(0),throw:s(1),return:s(2)},"function"===typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function s(e){return function(t){return u([e,t])}}function u(o){if(n)throw new TypeError("Generator is already executing.");while(a)try{if(n=1,r&&(i=2&o[0]?r["return"]:o[0]?r["throw"]||((i=r["return"])&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(i=a.trys,!(i=i.length>0&&i[i.length-1])&&(6===o[0]||2===o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=t.call(e,a)}catch(s){o=[6,s],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}}function l(e,t){var n="function"===typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,i,o=n.call(e),a=[];try{while((void 0===t||t-- >0)&&!(r=o.next()).done)a.push(r.value)}catch(s){i={error:s}}finally{try{r&&!r.done&&(n=o["return"])&&n.call(o)}finally{if(i)throw i.error}}return a}function f(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(l(arguments[t]));return e}var d,h=1e4,p="w:0.1.0",v="FIS_v2",g="https://firebaseinstallations.googleapis.com/v1",w=36e5,y="installations",b="Installations",m=(d={},d["missing-app-config-values"]="Missing App configuration values.",d["create-installation-failed"]="Could not register Firebase Installation.",d["generate-token-failed"]="Could not generate Auth Token.",d["not-registered"]="Firebase Installation is not registered.",d["installation-not-found"]="Firebase Installation not found.",d["request-failed"]='{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',d["app-offline"]="Could not process request. Application offline.",d["delete-pending-registration"]="Can't delete installation while there is a pending registration request.",d),E=new o["ErrorFactory"](y,b,m);
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function S(e){return e instanceof o["FirebaseError"]&&e.code.includes("request-failed")}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(e){if(!e||!e.options)throw E.create("missing-app-config-values");var t=e.name,n=e.options,r=n.projectId,i=n.apiKey,o=n.appId;if(!t||!r||!i||!o)throw E.create("missing-app-config-values");return{appName:t,projectId:r,apiKey:i,appId:o}}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function k(e){var t=e.projectId;return g+"/projects/"+t+"/installations"}function I(e){return{token:e.token,requestStatus:2,expiresIn:A(e.expiresIn),creationTime:Date.now()}}function N(e,t){return u(this,void 0,void 0,function(){var n,r;return c(this,function(i){switch(i.label){case 0:return[4,t.json()];case 1:return n=i.sent(),r=n.error,[2,E.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})]}})})}function O(e){var t=e.apiKey;return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":t})}function _(e,t){var n=t.refreshToken,r=O(e);return r.append("Authorization",R(n)),r}function A(e){return Number(e.replace("s","000"))}function R(e){return v+" "+e}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(e,t){var n=t.fid;return u(this,void 0,void 0,function(){var t,r,i,o,a,s,u;return c(this,function(c){switch(c.label){case 0:return t=k(e),r=O(e),i={fid:n,authVersion:v,appId:e.appId,sdkVersion:p},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,fetch(t,o)];case 1:return a=c.sent(),a.ok?[4,a.json()]:[3,3];case 2:return s=c.sent(),u={fid:n,registrationStatus:2,refreshToken:s.refreshToken,authToken:I(s.authToken)},[2,u];case 3:throw N("Create Installation",a)}})})}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(e){return new Promise(function(t){setTimeout(t,e)})}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e){var t=e instanceof Uint8Array?e:new Uint8Array(e),n=btoa(String.fromCharCode.apply(String,f(t)));return n.replace(/\+/g,"-").replace(/\//g,"_")}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function P(){var e=new Uint8Array(17);return crypto.getRandomValues(e),e[0]=112+e[0]%16,C(e)}function C(e){var t=L(e);return t.substr(0,22)}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x="firebase-installations-database",F=1,q="firebase-installations-store",U=Object(a["openDb"])(x,F,function(e){switch(e.oldVersion){case 0:e.createObjectStore(q)}});function H(e,t){return u(this,void 0,void 0,function(){var n,r,i;return c(this,function(o){switch(o.label){case 0:return n=J(e),[4,U];case 1:return r=o.sent(),i=r.transaction(q,"readwrite"),i.objectStore(q).put(t,n),[4,i.complete];case 2:return o.sent(),[2,t]}})})}function V(e){return u(this,void 0,void 0,function(){var t,n,r;return c(this,function(i){switch(i.label){case 0:return t=J(e),[4,U];case 1:return n=i.sent(),r=n.transaction(q,"readwrite"),r.objectStore(q).delete(t),[2,r.complete]}})})}function B(e,t){return u(this,void 0,void 0,function(){var n,r,i,o,a,s;return c(this,function(u){switch(u.label){case 0:return n=J(e),[4,U];case 1:return r=u.sent(),i=r.transaction(q,"readwrite"),o=i.objectStore(q),[4,o.get(n)];case 2:return a=u.sent(),s=t(a),s===a?[2,s]:(void 0===s?o.delete(n):o.put(s,n),[4,i.complete]);case 3:return u.sent(),[2,s]}})})}function J(e){return e.appName+"!"+e.appId}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function G(e){return u(this,void 0,void 0,function(){var t,n;return c(this,function(r){switch(r.label){case 0:return n={},[4,B(e,function(n){var r=M(n),i=z(e,r);return t=i.registrationPromise,i.installationEntry})];case 1:return[2,(n.installationEntry=r.sent(),n.registrationPromise=t,n)]}})})}function M(e){var t=e||{fid:P(),registrationStatus:0};return X(t)?{fid:t.fid,registrationStatus:0}:t}function z(e,t){if(0===t.registrationStatus){if(!navigator.onLine){var n=Promise.reject(E.create("app-offline"));return{installationEntry:t,registrationPromise:n}}var r={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},i=K(e,r);return{installationEntry:r,registrationPromise:i}}return 1===t.registrationStatus?{installationEntry:t,registrationPromise:W(e)}:{installationEntry:t}}function K(e,t){return u(this,void 0,void 0,function(){var n,r;return c(this,function(i){switch(i.label){case 0:return i.trys.push([0,3,,8]),[4,j(e,t)];case 1:return n=i.sent(),[4,H(e,n)];case 2:return i.sent(),[3,8];case 3:return r=i.sent(),S(r)&&409===r.serverCode?[4,V(e)]:[3,5];case 4:return i.sent(),[3,7];case 5:return[4,H(e,{fid:t.fid,registrationStatus:0})];case 6:i.sent(),i.label=7;case 7:throw r;case 8:return[2]}})})}function W(e){return u(this,void 0,void 0,function(){var t;return c(this,function(n){switch(n.label){case 0:return[4,$(e)];case 1:t=n.sent(),n.label=2;case 2:return 1!==t.registrationStatus?[3,5]:[4,D(100)];case 3:return n.sent(),[4,$(e)];case 4:return t=n.sent(),[3,2];case 5:if(0===t.registrationStatus)throw E.create("create-installation-failed");return[2]}})})}function $(e){return B(e,function(e){if(!e)throw E.create("installation-not-found");return X(e)?{fid:e.fid,registrationStatus:0}:e})}function X(e){return 1===e.registrationStatus&&e.registrationTime+h<Date.now()}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Y(e){return u(this,void 0,void 0,function(){var t,n,r,i;return c(this,function(o){switch(o.label){case 0:return t=T(e),[4,G(t)];case 1:return n=o.sent(),r=n.installationEntry,i=n.registrationPromise,i&&i.catch(function(){}),[2,r.fid]}})})}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Q(e,t){return u(this,void 0,void 0,function(){var n,r,i,o,a,s,u;return c(this,function(c){switch(c.label){case 0:return n=Z(e,t),r=_(e,t),i={installation:{sdkVersion:p}},o={method:"POST",headers:r,body:JSON.stringify(i)},[4,fetch(n,o)];case 1:return a=c.sent(),a.ok?[4,a.json()]:[3,3];case 2:return s=c.sent(),u=I(s),[2,u];case 3:throw N("Generate Auth Token",a)}})})}function Z(e,t){var n=t.fid;return k(e)+"/"+n+"/authTokens:generate"}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ee(e){return u(this,void 0,void 0,function(){var t;return c(this,function(n){switch(n.label){case 0:return t=T(e),[4,te(t)];case 1:return n.sent(),[2,ne(t)]}})})}function te(e){return u(this,void 0,void 0,function(){var t,n,r;return c(this,function(i){switch(i.label){case 0:return[4,G(e)];case 1:return t=i.sent(),n=t.installationEntry,r=t.registrationPromise,r?[4,r]:[3,3];case 2:return i.sent(),[3,4];case 3:if(2!==n.registrationStatus)throw E.create("create-installation-failed");i.label=4;case 4:return[2]}})})}function ne(e){return u(this,void 0,void 0,function(){var t,n,r,i;return c(this,function(o){switch(o.label){case 0:return[4,B(e,function(n){if(!ae(n))throw E.create("not-registered");var r=n.authToken;if(se(r))return n;if(1===r.requestStatus)return t=re(e),n;if(!navigator.onLine)throw E.create("app-offline");var i=ce(n);return t=oe(e,i),i})];case 1:return n=o.sent(),t?[4,t]:[3,3];case 2:return i=o.sent(),[3,4];case 3:i=n.authToken,o.label=4;case 4:return r=i,[2,r.token]}})})}function re(e){return u(this,void 0,void 0,function(){var t,n;return c(this,function(r){switch(r.label){case 0:return[4,ie(e)];case 1:t=r.sent(),r.label=2;case 2:return 1!==t.authToken.requestStatus?[3,5]:[4,D(100)];case 3:return r.sent(),[4,ie(e)];case 4:return t=r.sent(),[3,2];case 5:if(n=t.authToken,0===n.requestStatus)throw E.create("generate-token-failed");return[2,n]}})})}function ie(e){return B(e,function(e){if(!ae(e))throw E.create("not-registered");var t=e.authToken;return le(t)?s({},e,{authToken:{requestStatus:0}}):e})}function oe(e,t){return u(this,void 0,void 0,function(){var n,r,i;return c(this,function(o){switch(o.label){case 0:return o.trys.push([0,3,,8]),[4,Q(e,t)];case 1:return n=o.sent(),i=s({},t,{authToken:n}),[4,H(e,i)];case 2:return o.sent(),[2,n];case 3:return r=o.sent(),!S(r)||401!==r.serverCode&&404!==r.serverCode?[3,5]:[4,V(e)];case 4:return o.sent(),[3,7];case 5:return i=s({},t,{authToken:{requestStatus:0}}),[4,H(e,i)];case 6:o.sent(),o.label=7;case 7:throw r;case 8:return[2]}})})}function ae(e){return void 0!==e&&2===e.registrationStatus}function se(e){return 2===e.requestStatus&&!ue(e)}function ue(e){var t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+w}function ce(e){var t={requestStatus:1,requestTime:Date.now()};return s({},e,{authToken:t})}function le(e){return 1===e.requestStatus&&e.requestTime+h<Date.now()}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fe(e,t){return u(this,void 0,void 0,function(){var n,r,i,o;return c(this,function(a){switch(a.label){case 0:return n=de(e,t),r=_(e,t),i={method:"DELETE",headers:r},[4,fetch(n,i)];case 1:if(o=a.sent(),!o.ok)throw N("Delete Installation",o);return[2]}})})}function de(e,t){var n=t.fid;return k(e)+"/"+n}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function he(e){return u(this,void 0,void 0,function(){var t,n;return c(this,function(r){switch(r.label){case 0:return t=T(e),[4,B(t,function(e){if(!e||0!==e.registrationStatus)return e})];case 1:if(n=r.sent(),!n)return[3,6];if(1!==n.registrationStatus)return[3,2];throw E.create("delete-pending-registration");case 2:if(2!==n.registrationStatus)return[3,6];if(navigator.onLine)return[3,3];throw E.create("app-offline");case 3:return[4,fe(t,n)];case 4:return r.sent(),[4,V(t)];case 5:r.sent(),r.label=6;case 6:return[2]}})})}
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2019 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(e){var t="installations",n=function(e){return T(e),{app:e,getId:function(){return Y(e)},getToken:function(){return ee(e)},delete:function(){return he(e)}}};e.INTERNAL.registerService(t,n)}pe(i.a)},abfd:function(e,t,n){"use strict";n.r(t),n.d(t,"LogLevel",function(){return r}),n.d(t,"Logger",function(){return s}),n.d(t,"setLogLevel",function(){return u});
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var r,i=[];(function(e){e[e["DEBUG"]=0]="DEBUG",e[e["VERBOSE"]=1]="VERBOSE",e[e["INFO"]=2]="INFO",e[e["WARN"]=3]="WARN",e[e["ERROR"]=4]="ERROR",e[e["SILENT"]=5]="SILENT"})(r||(r={}));var o=r.INFO,a=function(e,t){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];if(!(t<e.logLevel)){var o=(new Date).toISOString();switch(t){case r.DEBUG:console.log.apply(console,["["+o+"]  "+e.name+":"].concat(n));break;case r.VERBOSE:console.log.apply(console,["["+o+"]  "+e.name+":"].concat(n));break;case r.INFO:console.info.apply(console,["["+o+"]  "+e.name+":"].concat(n));break;case r.WARN:console.warn.apply(console,["["+o+"]  "+e.name+":"].concat(n));break;case r.ERROR:console.error.apply(console,["["+o+"]  "+e.name+":"].concat(n));break;default:throw new Error("Attempted to log a message with an invalid logType (value: "+t+")")}}},s=function(){function e(e){this.name=e,this._logLevel=o,this._logHandler=a,i.push(this)}return Object.defineProperty(e.prototype,"logLevel",{get:function(){return this._logLevel},set:function(e){if(!(e in r))throw new TypeError("Invalid value assigned to `logLevel`");this._logLevel=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"logHandler",{get:function(){return this._logHandler},set:function(e){if("function"!==typeof e)throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e},enumerable:!0,configurable:!0}),e.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,r.DEBUG].concat(e))},e.prototype.log=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,r.VERBOSE].concat(e))},e.prototype.info=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,r.INFO].concat(e))},e.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,r.WARN].concat(e))},e.prototype.error=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this._logHandler.apply(this,[this,r.ERROR].concat(e))},e}();
/**
 * @license
 * Copyright 2017 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function u(e){i.forEach(function(t){t.logLevel=e})}}}]);
//# sourceMappingURL=chunk-vendors~53f0764e.53d19d44.js.map