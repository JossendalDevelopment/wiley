(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-vendors~a6cd21c3"],{"2e66":function(t,e,r){"use strict";r.r(e),r.d(e,"registerStorage",function(){return Ce});var n=r("c23d"),o=r.n(n),i="firebasestorage.googleapis.com",a="storageBucket",s=12e4,u=6e4,c=-9007199254740991,h=function(){function t(t,e){this.code_=f(t),this.message_="Firebase Storage: "+e,this.serverResponse_=null,this.name_="FirebaseError"}return t.prototype.codeProp=function(){return this.code},t.prototype.codeEquals=function(t){return f(t)===this.codeProp()},t.prototype.serverResponseProp=function(){return this.serverResponse_},t.prototype.setServerResponseProp=function(t){this.serverResponse_=t},Object.defineProperty(t.prototype,"name",{get:function(){return this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"code",{get:function(){return this.code_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"message",{get:function(){return this.message_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"serverResponse",{get:function(){return this.serverResponse_},enumerable:!0,configurable:!0}),t}(),l={UNKNOWN:"unknown",OBJECT_NOT_FOUND:"object-not-found",BUCKET_NOT_FOUND:"bucket-not-found",PROJECT_NOT_FOUND:"project-not-found",QUOTA_EXCEEDED:"quota-exceeded",UNAUTHENTICATED:"unauthenticated",UNAUTHORIZED:"unauthorized",RETRY_LIMIT_EXCEEDED:"retry-limit-exceeded",INVALID_CHECKSUM:"invalid-checksum",CANCELED:"canceled",INVALID_EVENT_NAME:"invalid-event-name",INVALID_URL:"invalid-url",INVALID_DEFAULT_BUCKET:"invalid-default-bucket",NO_DEFAULT_BUCKET:"no-default-bucket",CANNOT_SLICE_BLOB:"cannot-slice-blob",SERVER_FILE_WRONG_SIZE:"server-file-wrong-size",NO_DOWNLOAD_URL:"no-download-url",INVALID_ARGUMENT:"invalid-argument",INVALID_ARGUMENT_COUNT:"invalid-argument-count",APP_DELETED:"app-deleted",INVALID_ROOT_OPERATION:"invalid-root-operation",INVALID_FORMAT:"invalid-format",INTERNAL_ERROR:"internal-error"};function f(t){return"storage/"+t}function p(){var t="An unknown error occurred, please check the error payload for server response.";return new h(l.UNKNOWN,t)}function d(t){return new h(l.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function _(t){return new h(l.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function v(){var t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new h(l.UNAUTHENTICATED,t)}function g(t){return new h(l.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function m(){return new h(l.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function b(){return new h(l.CANCELED,"User canceled the upload/download.")}function y(t){return new h(l.INVALID_URL,"Invalid URL '"+t+"'.")}function E(t){return new h(l.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function w(){return new h(l.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function T(){return new h(l.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.")}function R(){return new h(l.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function A(t,e,r){return new h(l.INVALID_ARGUMENT,"Invalid argument in `"+e+"` at index "+t+": "+r)}function S(t,e,r,n){var o,i;return t===e?(o=t,i=1===t?"argument":"arguments"):(o="between "+t+" and "+e,i="arguments"),new h(l.INVALID_ARGUMENT_COUNT,"Invalid argument count in `"+r+"`: Expected "+o+" "+i+", received "+n+".")}function N(){return new h(l.APP_DELETED,"The Firebase app was deleted.")}function O(t){return new h(l.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function C(t,e){return new h(l.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function k(t){throw new h(l.INTERNAL_ERROR,"Internal error: "+t)}
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
 */var I={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};function U(t){switch(t){case I.RAW:case I.BASE64:case I.BASE64URL:case I.DATA_URL:return;default:throw"Expected one of the event types: ["+I.RAW+", "+I.BASE64+", "+I.BASE64URL+", "+I.DATA_URL+"]."}}var P=function(){function t(t,e){this.data=t,this.contentType=e||null}return t}();function D(t,e){switch(t){case I.RAW:return new P(L(e));case I.BASE64:case I.BASE64URL:return new P(x(t,e));case I.DATA_URL:return new P(j(e),W(e))}throw p()}function L(t){for(var e=[],r=0;r<t.length;r++){var n=t.charCodeAt(r);if(n<=127)e.push(n);else if(n<=2047)e.push(192|n>>6,128|63&n);else if(55296==(64512&n)){var o=r<t.length-1&&56320==(64512&t.charCodeAt(r+1));if(o){var i=n,a=t.charCodeAt(++r);n=65536|(1023&i)<<10|1023&a,e.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n)}else e.push(239,191,189)}else 56320==(64512&n)?e.push(239,191,189):e.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(e)}function M(t){var e;try{e=decodeURIComponent(t)}catch(r){throw C(I.DATA_URL,"Malformed data URL.")}return L(e)}function x(t,e){switch(t){case I.BASE64:var r=-1!==e.indexOf("-"),n=-1!==e.indexOf("_");if(r||n){var o=r?"-":"_";throw C(t,"Invalid character '"+o+"' found: is it base64url encoded?")}break;case I.BASE64URL:var i=-1!==e.indexOf("+"),a=-1!==e.indexOf("/");if(i||a){o=i?"+":"/";throw C(t,"Invalid character '"+o+"' found: is it base64 encoded?")}e=e.replace(/-/g,"+").replace(/_/g,"/");break}var s;try{s=atob(e)}catch(h){throw C(t,"Invalid character found")}for(var u=new Uint8Array(s.length),c=0;c<s.length;c++)u[c]=s.charCodeAt(c);return u}var B=function(){function t(t){this.base64=!1,this.contentType=null;var e=t.match(/^data:([^,]+)?,/);if(null===e)throw C(I.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r=e[1]||null;null!=r&&(this.base64=F(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-";base64".length):r),this.rest=t.substring(t.indexOf(",")+1)}return t}();function j(t){var e=new B(t);return e.base64?x(I.BASE64,e.rest):M(e.rest)}function W(t){var e=new B(t);return e.contentType}function F(t,e){var r=t.length>=e.length;return!!r&&t.substring(t.length-e.length)===e}
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
 */var q,G={STATE_CHANGED:"state_changed"},z={RUNNING:"running",PAUSING:"pausing",PAUSED:"paused",SUCCESS:"success",CANCELING:"canceling",CANCELED:"canceled",ERROR:"error"},H={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function V(t){switch(t){case z.RUNNING:case z.PAUSING:case z.CANCELING:return H.RUNNING;case z.PAUSED:return H.PAUSED;case z.SUCCESS:return H.SUCCESS;case z.CANCELED:return H.CANCELED;case z.ERROR:return H.ERROR;default:return H.ERROR}}
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
 */function X(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function K(t,e){for(var r in t)X(t,r)&&e(r,t[r])}function J(t){if(null==t)return{};var e={};return K(t,function(t,r){e[t]=r}),e}
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
 */function Z(t){return new Promise(t)}function $(t){return Promise.resolve(t)}function Q(t){return Promise.reject(t)}
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
 */function Y(t){return null!=t}function tt(t){return void 0!==t}function et(t){return"function"===typeof t}function rt(t){return"object"===typeof t}function nt(t){return rt(t)&&null!==t}function ot(t){return rt(t)&&!Array.isArray(t)}function it(t){return"string"===typeof t||t instanceof String}function at(t){return"number"===typeof t||t instanceof Number}function st(t){return ut()&&t instanceof Blob}function ut(){return"undefined"!==typeof Blob}
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
 */(function(t){t[t["NO_ERROR"]=0]="NO_ERROR",t[t["NETWORK_ERROR"]=1]="NETWORK_ERROR",t[t["ABORT"]=2]="ABORT"})(q||(q={}));
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
var ct=function(){function t(){var t=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=q.NO_ERROR,this.sendPromise_=Z(function(e,r){t.xhr_.addEventListener("abort",function(r){t.errorCode_=q.ABORT,e(t)}),t.xhr_.addEventListener("error",function(r){t.errorCode_=q.NETWORK_ERROR,e(t)}),t.xhr_.addEventListener("load",function(r){e(t)})})}return t.prototype.send=function(t,e,r,n){var o=this;if(this.sent_)throw k("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),Y(n)){var i=n;K(i,function(t,e){o.xhr_.setRequestHeader(t,e.toString())})}return Y(r)?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_},t.prototype.getErrorCode=function(){if(!this.sent_)throw k("cannot .getErrorCode() before sending");return this.errorCode_},t.prototype.getStatus=function(){if(!this.sent_)throw k("cannot .getStatus() before sending");try{return this.xhr_.status}catch(t){return-1}},t.prototype.getResponseText=function(){if(!this.sent_)throw k("cannot .getResponseText() before sending");return this.xhr_.responseText},t.prototype.abort=function(){this.xhr_.abort()},t.prototype.getResponseHeader=function(t){return this.xhr_.getResponseHeader(t)},t.prototype.addUploadProgressListener=function(t){Y(this.xhr_.upload)&&this.xhr_.upload.addEventListener("progress",t)},t.prototype.removeUploadProgressListener=function(t){Y(this.xhr_.upload)&&this.xhr_.upload.removeEventListener("progress",t)},t}(),ht=function(){function t(){}return t.prototype.createXhrIo=function(){return new ct},t}();
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
function lt(t){var e;try{e=JSON.parse(t)}catch(r){return null}return ot(e)?e:null}
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
 */var ft=function(){function t(t,e){this.bucket=t,this.path_=e}return Object.defineProperty(t.prototype,"path",{get:function(){return this.path_},enumerable:!0,configurable:!0}),t.prototype.fullServerUrl=function(){var t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)},t.prototype.bucketOnlyServerUrl=function(){var t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o"},t.makeFromBucketSpec=function(e){var r;try{r=t.makeFromUrl(e)}catch(n){return new t(e,"")}if(""===r.path)return r;throw E(e)},t.makeFromUrl=function(e){var r=null,n="([A-Za-z0-9.\\-_]+)";function o(t){"/"===t.path.charAt(t.path.length-1)&&(t.path_=t.path_.slice(0,-1))}var a="(/(.*))?$",s="(/([^?#]*).*)?$",u=new RegExp("^gs://"+n+a,"i"),c={bucket:1,path:3};function h(t){t.path_=decodeURIComponent(t.path)}for(var l="v[A-Za-z0-9_]+",f=i.replace(/[.]/g,"\\."),p=new RegExp("^https?://"+f+"/"+l+"/b/"+n+"/o"+s,"i"),d={bucket:1,path:3},_=[{regex:u,indices:c,postModify:o},{regex:p,indices:d,postModify:h}],v=0;v<_.length;v++){var g=_[v],m=g.regex.exec(e);if(m){var b=m[g.indices.bucket],E=m[g.indices.path];E||(E=""),r=new t(b,E),g.postModify(r);break}}if(null==r)throw y(e);return r},t}();
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
 */function pt(t){if(0==t.length)return null;var e=t.lastIndexOf("/");if(-1===e)return"";var r=t.slice(0,e);return r}function dt(t,e){var r=e.split("/").filter(function(t){return t.length>0}).join("/");return 0===t.length?r:t+"/"+r}function _t(t){var e=t.lastIndexOf("/",t.length-2);return-1===e?t:t.slice(e+1)}
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
 */function vt(t){return"https://"+i+"/v0"+t}function gt(t){var e=encodeURIComponent,r="?";return K(t,function(t,n){var o=e(t)+"="+e(n);r=r+o+"&"}),r=r.slice(0,-1),r}
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
 */function mt(t,e){return e}var bt=function(){function t(t,e,r,n){this.server=t,this.local=e||t,this.writable=!!r,this.xform=n||mt}return t}(),yt=null;function Et(t){var e=it(t);return!e||t.length<2?t:(t=t,_t(t))}function wt(){if(yt)return yt;var t=[];function e(t,e){return Et(e)}t.push(new bt("bucket")),t.push(new bt("generation")),t.push(new bt("metageneration")),t.push(new bt("name","fullPath",!0));var r=new bt("name");function n(t,e){return Y(e)?+e:e}r.xform=e,t.push(r);var o=new bt("size");return o.xform=n,t.push(o),t.push(new bt("timeCreated")),t.push(new bt("updated")),t.push(new bt("md5Hash",null,!0)),t.push(new bt("cacheControl",null,!0)),t.push(new bt("contentDisposition",null,!0)),t.push(new bt("contentEncoding",null,!0)),t.push(new bt("contentLanguage",null,!0)),t.push(new bt("contentType",null,!0)),t.push(new bt("metadata","customMetadata",!0)),yt=t,yt}function Tt(t,e){function r(){var r=t["bucket"],n=t["fullPath"],o=new ft(r,n);return e.makeStorageReference(o)}Object.defineProperty(t,"ref",{get:r})}function Rt(t,e,r){for(var n={type:"file"},o=r.length,i=0;i<o;i++){var a=r[i];n[a.local]=a.xform(n,e[a.server])}return Tt(n,t),n}function At(t,e,r){var n=lt(e);if(null===n)return null;var o=n;return Rt(t,o,r)}function St(t,e){var r=lt(e);if(null===r)return null;if(!it(r["downloadTokens"]))return null;var n=r["downloadTokens"];if(0===n.length)return null;var o=encodeURIComponent,i=n.split(","),a=i.map(function(e){var r=t["bucket"],n=t["fullPath"],i="/b/"+o(r)+"/o/"+o(n),a=vt(i),s=gt({alt:"media",token:e});return a+s});return a[0]}function Nt(t,e){for(var r={},n=e.length,o=0;o<n;o++){var i=e[o];i.writable&&(r[i.server]=t[i.local])}return JSON.stringify(r)}function Ot(t){var e=t&&rt(t);if(!e)throw"Expected Metadata object.";for(var r in t){var n=t[r];if("customMetadata"===r){if(!rt(n))throw"Expected object for 'customMetadata' mapping."}else if(nt(n))throw"Mapping for '"+r+"' cannot be an object."}}
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
 */function Ct(t,e,r){for(var n=e.length,o=e.length,i=0;i<e.length;i++)if(e[i].optional){n=i;break}var a=n<=r.length&&r.length<=o;if(!a)throw S(n,o,t,r.length);for(i=0;i<r.length;i++)try{e[i].validator(r[i])}catch(s){throw s instanceof Error?A(i,t,s.message):A(i,t,s)}}var kt=function(){function t(t,e){var r=this;this.validator=function(e){r.optional&&!tt(e)||t(e)},this.optional=!!e}return t}();function It(t,e){return function(r){t(r),e(r)}}function Ut(t,e){function r(t){if(!it(t))throw"Expected string."}var n;return n=t?It(r,t):r,new kt(n,e)}function Pt(){function t(t){var e=t instanceof Uint8Array||t instanceof ArrayBuffer||ut()&&t instanceof Blob;if(!e)throw"Expected Blob or File."}return new kt(t)}function Dt(t){return new kt(Ot,t)}function Lt(){function t(t){var e=at(t)&&t>=0;if(!e)throw"Expected a number 0 or greater."}return new kt(t)}function Mt(t,e){function r(e){var r=null===e||Y(e)&&e instanceof Object;if(!r)throw"Expected an Object.";void 0!==t&&null!==t&&t(e)}return new kt(r,e)}function xt(t){function e(t){var e=null===t||et(t);if(!e)throw"Expected a Function."}return new kt(e,t)}
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
 */function Bt(){return"undefined"!==typeof BlobBuilder?BlobBuilder:"undefined"!==typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0}function jt(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];var r=Bt();if(void 0!==r){for(var n=new r,o=0;o<t.length;o++)n.append(t[o]);return n.getBlob()}if(ut())return new Blob(t);throw Error("This browser doesn't seem to support creating Blobs")}function Wt(t,e,r){return t.webkitSlice?t.webkitSlice(e,r):t.mozSlice?t.mozSlice(e,r):t.slice?t.slice(e,r):null}
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
 */var Ft=function(){function t(t,e){var r=0,n="";st(t)?(this.data_=t,r=t.size,n=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),r=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),r=t.length),this.size_=r,this.type_=n}return t.prototype.size=function(){return this.size_},t.prototype.type=function(){return this.type_},t.prototype.slice=function(e,r){if(st(this.data_)){var n=this.data_,o=Wt(n,e,r);return null===o?null:new t(o)}var i=new Uint8Array(this.data_.buffer,e,r-e);return new t(i,!0)},t.getBlob=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];if(ut()){var n=e.map(function(e){return e instanceof t?e.data_:e});return new t(jt.apply(null,n))}var o=e.map(function(t){return it(t)?D(I.RAW,t).data:t.data_}),i=0;o.forEach(function(t){i+=t.byteLength});var a=new Uint8Array(i),s=0;return o.forEach(function(t){for(var e=0;e<t.length;e++)a[s++]=t[e]}),new t(a,!0)},t.prototype.uploadData=function(){return this.data_},t}();
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
 */function qt(t,e){return-1!==t.indexOf(e)}function Gt(t){return Array.prototype.slice.call(t)}function zt(t,e){var r=t.indexOf(e);-1!==r&&t.splice(r,1)}var Ht=function(){function t(t,e,r,n){this.url=t,this.method=e,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}return t}();
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
 */function Vt(t){if(!t)throw p()}function Xt(t,e){function r(r,n){var o=At(t,n,e);return Vt(null!==o),o}return r}function Kt(t,e){function r(r,n){var o=At(t,n,e);return Vt(null!==o),St(o,n)}return r}function Jt(t){function e(e,r){var n;return n=401===e.getStatus()?v():402===e.getStatus()?_(t.bucket):403===e.getStatus()?g(t.path):r,n.setServerResponseProp(r.serverResponseProp()),n}return e}function Zt(t){var e=Jt(t);function r(r,n){var o=e(r,n);return 404===r.getStatus()&&(o=d(t.path)),o.setServerResponseProp(n.serverResponseProp()),o}return r}function $t(t,e,r){var n=e.fullServerUrl(),o=vt(n),i="GET",a=t.maxOperationRetryTime(),s=new Ht(o,i,Xt(t,r),a);return s.errorHandler=Zt(e),s}function Qt(t,e,r){var n=e.fullServerUrl(),o=vt(n),i="GET",a=t.maxOperationRetryTime(),s=new Ht(o,i,Kt(t,r),a);return s.errorHandler=Zt(e),s}function Yt(t,e,r,n){var o=e.fullServerUrl(),i=vt(o),a="PATCH",s=Nt(r,n),u={"Content-Type":"application/json; charset=utf-8"},c=t.maxOperationRetryTime(),h=new Ht(i,a,Xt(t,n),c);return h.headers=u,h.body=s,h.errorHandler=Zt(e),h}function te(t,e){var r=e.fullServerUrl(),n=vt(r),o="DELETE",i=t.maxOperationRetryTime();function a(t,e){}var s=new Ht(n,o,a,i);return s.successCodes=[200,204],s.errorHandler=Zt(e),s}function ee(t,e){return t&&t["contentType"]||e&&e.type()||"application/octet-stream"}function re(t,e,r){var n=J(r);return n["fullPath"]=t.path,n["size"]=e.size(),n["contentType"]||(n["contentType"]=ee(null,e)),n}function ne(t,e,r,n,o){var i=e.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"};function s(){for(var t="",e=0;e<2;e++)t+=Math.random().toString().slice(2);return t}var u=s();a["Content-Type"]="multipart/related; boundary="+u;var c=re(e,n,o),h=Nt(c,r),l="--"+u+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+h+"\r\n--"+u+"\r\nContent-Type: "+c["contentType"]+"\r\n\r\n",f="\r\n--"+u+"--",p=Ft.getBlob(l,n,f);if(null===p)throw w();var d={name:c["fullPath"]},_=vt(i),v="POST",g=t.maxUploadRetryTime(),m=new Ht(_,v,Xt(t,r),g);return m.urlParams=d,m.headers=a,m.body=p.uploadData(),m.errorHandler=Jt(e),m}var oe=function(){function t(t,e,r,n){this.current=t,this.total=e,this.finalized=!!r,this.metadata=n||null}return t}();function ie(t,e){var r;try{r=t.getResponseHeader("X-Goog-Upload-Status")}catch(o){Vt(!1)}var n=e||["active"];return Vt(qt(n,r)),r}function ae(t,e,r,n,o){var i=e.bucketOnlyServerUrl(),a=re(e,n,o),s={name:a["fullPath"]},u=vt(i),c="POST",h={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":n.size(),"X-Goog-Upload-Header-Content-Type":a["contentType"],"Content-Type":"application/json; charset=utf-8"},l=Nt(a,r),f=t.maxUploadRetryTime();function p(t,e){var r;ie(t);try{r=t.getResponseHeader("X-Goog-Upload-URL")}catch(n){Vt(!1)}return Vt(it(r)),r}var d=new Ht(u,c,p,f);return d.urlParams=s,d.headers=h,d.body=l,d.errorHandler=Jt(e),d}function se(t,e,r,n){var o={"X-Goog-Upload-Command":"query"};function i(t,e){var r,o=ie(t,["active","final"]);try{r=t.getResponseHeader("X-Goog-Upload-Size-Received")}catch(a){Vt(!1)}var i=parseInt(r,10);return Vt(!isNaN(i)),new oe(i,n.size(),"final"===o)}var a="POST",s=t.maxUploadRetryTime(),u=new Ht(r,a,i,s);return u.headers=o,u.errorHandler=Jt(e),u}var ue=262144;function ce(t,e,r,n,o,i,a,s){var u=new oe(0,0);if(a?(u.current=a.current,u.total=a.total):(u.current=0,u.total=n.size()),n.size()!==u.total)throw T();var c=u.total-u.current,h=c;o>0&&(h=Math.min(h,o));var l=u.current,f=l+h,p=h===c?"upload, finalize":"upload",d={"X-Goog-Upload-Command":p,"X-Goog-Upload-Offset":u.current},_=n.slice(l,f);if(null===_)throw w();function v(t,r){var o,a=ie(t,["active","final"]),s=u.current+h,c=n.size();return o="final"===a?Xt(e,i)(t,r):null,new oe(s,c,"final"===a,o)}var g="POST",m=e.maxUploadRetryTime(),b=new Ht(r,g,v,m);return b.headers=d,b.body=_.uploadData(),b.progressCallback=s||null,b.errorHandler=Jt(t),b}
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
 */var he=function(){function t(t,e,r){var n=et(t)||Y(e)||Y(r);if(n)this.next=t,this.error=e||null,this.complete=r||null;else{var o=t;this.next=o.next||null,this.error=o.error||null,this.complete=o.complete||null}}return t}(),le=function(){function t(t,e,r,n,o,i){this.bytesTransferred=t,this.totalBytes=e,this.state=r,this.metadata=n,this.task=o,this.ref=i}return t}();
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
function fe(t){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];$(!0).then(function(){t.apply(null,e)})}}
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
 */var pe=function(){function t(t,e,r,n,o,i){var a=this;void 0===i&&(i=null),this.transferred_=0,this.needToFetchStatus_=!1,this.needToFetchMetadata_=!1,this.observers_=[],this.error_=null,this.uploadUrl_=null,this.request_=null,this.chunkMultiplier_=1,this.resolve_=null,this.reject_=null,this.ref_=t,this.authWrapper_=e,this.location_=r,this.blob_=o,this.metadata_=i,this.mappings_=n,this.resumable_=this.shouldDoResumable_(this.blob_),this.state_=z.RUNNING,this.errorHandler_=function(t){a.request_=null,a.chunkMultiplier_=1,t.codeEquals(l.CANCELED)?(a.needToFetchStatus_=!0,a.completeTransitions_()):(a.error_=t,a.transition_(z.ERROR))},this.metadataErrorHandler_=function(t){a.request_=null,t.codeEquals(l.CANCELED)?a.completeTransitions_():(a.error_=t,a.transition_(z.ERROR))},this.promise_=Z(function(t,e){a.resolve_=t,a.reject_=e,a.start_()}),this.promise_.then(null,function(){})}return t.prototype.makeProgressCallback_=function(){var t=this,e=this.transferred_;return function(r,n){t.updateProgress_(e+r)}},t.prototype.shouldDoResumable_=function(t){return t.size()>262144},t.prototype.start_=function(){this.state_===z.RUNNING&&null===this.request_&&(this.resumable_?null===this.uploadUrl_?this.createResumable_():this.needToFetchStatus_?this.fetchStatus_():this.needToFetchMetadata_?this.fetchMetadata_():this.continueUpload_():this.oneShotUpload_())},t.prototype.resolveToken_=function(t){var e=this;this.authWrapper_.getAuthToken().then(function(r){switch(e.state_){case z.RUNNING:t(r);break;case z.CANCELING:e.transition_(z.CANCELED);break;case z.PAUSING:e.transition_(z.PAUSED);break;default:}})},t.prototype.createResumable_=function(){var t=this;this.resolveToken_(function(e){var r=ae(t.authWrapper_,t.location_,t.mappings_,t.blob_,t.metadata_),n=t.authWrapper_.makeRequest(r,e);t.request_=n,n.getPromise().then(function(e){t.request_=null,t.uploadUrl_=e,t.needToFetchStatus_=!1,t.completeTransitions_()},t.errorHandler_)})},t.prototype.fetchStatus_=function(){var t=this,e=this.uploadUrl_;this.resolveToken_(function(r){var n=se(t.authWrapper_,t.location_,e,t.blob_),o=t.authWrapper_.makeRequest(n,r);t.request_=o,o.getPromise().then(function(e){e=e,t.request_=null,t.updateProgress_(e.current),t.needToFetchStatus_=!1,e.finalized&&(t.needToFetchMetadata_=!0),t.completeTransitions_()},t.errorHandler_)})},t.prototype.continueUpload_=function(){var t=this,e=ue*this.chunkMultiplier_,r=new oe(this.transferred_,this.blob_.size()),n=this.uploadUrl_;this.resolveToken_(function(o){var i;try{i=ce(t.location_,t.authWrapper_,n,t.blob_,e,t.mappings_,r,t.makeProgressCallback_())}catch(s){return t.error_=s,void t.transition_(z.ERROR)}var a=t.authWrapper_.makeRequest(i,o);t.request_=a,a.getPromise().then(function(e){t.increaseMultiplier_(),t.request_=null,t.updateProgress_(e.current),e.finalized?(t.metadata_=e.metadata,t.transition_(z.SUCCESS)):t.completeTransitions_()},t.errorHandler_)})},t.prototype.increaseMultiplier_=function(){var t=ue*this.chunkMultiplier_;t<33554432&&(this.chunkMultiplier_*=2)},t.prototype.fetchMetadata_=function(){var t=this;this.resolveToken_(function(e){var r=$t(t.authWrapper_,t.location_,t.mappings_),n=t.authWrapper_.makeRequest(r,e);t.request_=n,n.getPromise().then(function(e){t.request_=null,t.metadata_=e,t.transition_(z.SUCCESS)},t.metadataErrorHandler_)})},t.prototype.oneShotUpload_=function(){var t=this;this.resolveToken_(function(e){var r=ne(t.authWrapper_,t.location_,t.mappings_,t.blob_,t.metadata_),n=t.authWrapper_.makeRequest(r,e);t.request_=n,n.getPromise().then(function(e){t.request_=null,t.metadata_=e,t.updateProgress_(t.blob_.size()),t.transition_(z.SUCCESS)},t.errorHandler_)})},t.prototype.updateProgress_=function(t){var e=this.transferred_;this.transferred_=t,this.transferred_!==e&&this.notifyObservers_()},t.prototype.transition_=function(t){if(this.state_!==t)switch(t){case z.CANCELING:this.state_=t,null!==this.request_&&this.request_.cancel();break;case z.PAUSING:this.state_=t,null!==this.request_&&this.request_.cancel();break;case z.RUNNING:var e=this.state_===z.PAUSED;this.state_=t,e&&(this.notifyObservers_(),this.start_());break;case z.PAUSED:this.state_=t,this.notifyObservers_();break;case z.CANCELED:this.error_=b(),this.state_=t,this.notifyObservers_();break;case z.ERROR:this.state_=t,this.notifyObservers_();break;case z.SUCCESS:this.state_=t,this.notifyObservers_();break}},t.prototype.completeTransitions_=function(){switch(this.state_){case z.PAUSING:this.transition_(z.PAUSED);break;case z.CANCELING:this.transition_(z.CANCELED);break;case z.RUNNING:this.start_();break;default:break}},Object.defineProperty(t.prototype,"snapshot",{get:function(){var t=V(this.state_);return new le(this.transferred_,this.blob_.size(),t,this.metadata_,this,this.ref_)},enumerable:!0,configurable:!0}),t.prototype.on=function(t,e,r,n){function o(e){if(t!==G.STATE_CHANGED)throw"Expected one of the event types: ["+G.STATE_CHANGED+"]."}void 0===e&&(e=void 0),void 0===r&&(r=void 0),void 0===n&&(n=void 0);var i="Expected a function or an Object with one of `next`, `error`, `complete` properties.",a=xt(!0).validator,s=Mt(null,!0).validator;function u(t){try{return void a(t)}catch(r){}try{s(t);var e=tt(t["next"])||tt(t["error"])||tt(t["complete"]);if(!e)throw"";return}catch(r){throw i}}var c=[Ut(o),Mt(u,!0),xt(!0),xt(!0)];Ct("on",c,arguments);var h=this;function l(t){function e(e,r,o){null!==t&&Ct("on",t,arguments);var i=new he(e,r,n);return h.addObserver_(i),function(){h.removeObserver_(i)}}return e}function f(t){if(null===t)throw i;u(t)}var p=[Mt(f),xt(!0),xt(!0)],d=!(tt(e)||tt(r)||tt(n));return d?l(p):l(null)(e,r,n)},t.prototype.then=function(t,e){return this.promise_.then(t,e)},t.prototype.catch=function(t){return this.then(null,t)},t.prototype.addObserver_=function(t){this.observers_.push(t),this.notifyObserver_(t)},t.prototype.removeObserver_=function(t){zt(this.observers_,t)},t.prototype.notifyObservers_=function(){var t=this;this.finishPromise_();var e=Gt(this.observers_);e.forEach(function(e){t.notifyObserver_(e)})},t.prototype.finishPromise_=function(){if(null!==this.resolve_){var t=!0;switch(V(this.state_)){case H.SUCCESS:fe(this.resolve_.bind(null,this.snapshot))();break;case H.CANCELED:case H.ERROR:var e=this.reject_;fe(e.bind(null,this.error_))();break;default:t=!1;break}t&&(this.resolve_=null,this.reject_=null)}},t.prototype.notifyObserver_=function(t){var e=V(this.state_);switch(e){case H.RUNNING:case H.PAUSED:null!==t.next&&fe(t.next.bind(t,this.snapshot))();break;case H.SUCCESS:null!==t.complete&&fe(t.complete.bind(t))();break;case H.CANCELED:case H.ERROR:null!==t.error&&fe(t.error.bind(t,this.error_))();break;default:null!==t.error&&fe(t.error.bind(t,this.error_))()}},t.prototype.resume=function(){Ct("resume",[],arguments);var t=this.state_===z.PAUSED||this.state_===z.PAUSING;return t&&this.transition_(z.RUNNING),t},t.prototype.pause=function(){Ct("pause",[],arguments);var t=this.state_===z.RUNNING;return t&&this.transition_(z.PAUSING),t},t.prototype.cancel=function(){Ct("cancel",[],arguments);var t=this.state_===z.RUNNING||this.state_===z.PAUSING;return t&&this.transition_(z.CANCELING),t},t}(),de=function(){function t(t,e){this.authWrapper=t,this.location=e instanceof ft?e:ft.makeFromUrl(e)}return t.prototype.toString=function(){return Ct("toString",[],arguments),"gs://"+this.location.bucket+"/"+this.location.path},t.prototype.newRef=function(e,r){return new t(e,r)},t.prototype.mappings=function(){return wt()},t.prototype.child=function(t){Ct("child",[Ut()],arguments);var e=dt(this.location.path,t),r=new ft(this.location.bucket,e);return this.newRef(this.authWrapper,r)},Object.defineProperty(t.prototype,"parent",{get:function(){var t=pt(this.location.path);if(null===t)return null;var e=new ft(this.location.bucket,t);return this.newRef(this.authWrapper,e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"root",{get:function(){var t=new ft(this.location.bucket,"");return this.newRef(this.authWrapper,t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"bucket",{get:function(){return this.location.bucket},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fullPath",{get:function(){return this.location.path},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"name",{get:function(){return _t(this.location.path)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"storage",{get:function(){return this.authWrapper.service()},enumerable:!0,configurable:!0}),t.prototype.put=function(t,e){return void 0===e&&(e=null),Ct("put",[Pt(),Dt(!0)],arguments),this.throwIfRoot_("put"),new pe(this,this.authWrapper,this.location,this.mappings(),new Ft(t),e)},t.prototype.putString=function(t,e,r){void 0===e&&(e=I.RAW),Ct("putString",[Ut(),Ut(U,!0),Dt(!0)],arguments),this.throwIfRoot_("putString");var n=D(e,t),o=J(r);return!Y(o["contentType"])&&Y(n.contentType)&&(o["contentType"]=n.contentType),new pe(this,this.authWrapper,this.location,this.mappings(),new Ft(n.data,!0),o)},t.prototype.delete=function(){Ct("delete",[],arguments),this.throwIfRoot_("delete");var t=this;return this.authWrapper.getAuthToken().then(function(e){var r=te(t.authWrapper,t.location);return t.authWrapper.makeRequest(r,e).getPromise()})},t.prototype.getMetadata=function(){Ct("getMetadata",[],arguments),this.throwIfRoot_("getMetadata");var t=this;return this.authWrapper.getAuthToken().then(function(e){var r=$t(t.authWrapper,t.location,t.mappings());return t.authWrapper.makeRequest(r,e).getPromise()})},t.prototype.updateMetadata=function(t){Ct("updateMetadata",[Dt()],arguments),this.throwIfRoot_("updateMetadata");var e=this;return this.authWrapper.getAuthToken().then(function(r){var n=Yt(e.authWrapper,e.location,t,e.mappings());return e.authWrapper.makeRequest(n,r).getPromise()})},t.prototype.getDownloadURL=function(){Ct("getDownloadURL",[],arguments),this.throwIfRoot_("getDownloadURL");var t=this;return this.authWrapper.getAuthToken().then(function(e){var r=Qt(t.authWrapper,t.location,t.mappings());return t.authWrapper.makeRequest(r,e).getPromise().then(function(t){if(null===t)throw R();return t})})},t.prototype.throwIfRoot_=function(t){if(""===this.location.path)throw O(t)},t}(),_e=function(){function t(t){this.promise_=Q(t)}return t.prototype.getPromise=function(){return this.promise_},t.prototype.cancel=function(t){void 0===t&&(t=!1)},t}(),ve=function(){function t(){this.map_={},this.id_=c}return t.prototype.addRequest=function(t){var e=this.id_;this.id_++,this.map_[e]=t;var r=this;function n(){delete r.map_[e]}t.getPromise().then(n,n)},t.prototype.clear=function(){K(this.map_,function(t,e){e&&e.cancel(!0)}),this.map_={}},t}(),ge=function(){function t(e,r,n,o,i){if(this.bucket_=null,this.deleted_=!1,this.app_=e,null!==this.app_){var a=this.app_.options;Y(a)&&(this.bucket_=t.extractBucket_(a))}this.storageRefMaker_=r,this.requestMaker_=n,this.pool_=i,this.service_=o,this.maxOperationRetryTime_=s,this.maxUploadRetryTime_=u,this.requestMap_=new ve}return t.extractBucket_=function(t){var e=t[a]||null;if(null==e)return null;var r=ft.makeFromBucketSpec(e);return r.bucket},t.prototype.getAuthToken=function(){return null!==this.app_&&Y(this.app_.INTERNAL)&&Y(this.app_.INTERNAL.getToken)?this.app_.INTERNAL.getToken().then(function(t){return null!==t?t.accessToken:null},function(t){return null}):$(null)},t.prototype.bucket=function(){if(this.deleted_)throw N();return this.bucket_},t.prototype.service=function(){return this.service_},t.prototype.makeStorageReference=function(t){return this.storageRefMaker_(this,t)},t.prototype.makeRequest=function(t,e){if(this.deleted_)return new _e(N());var r=this.requestMaker_(t,e,this.pool_);return this.requestMap_.addRequest(r),r},t.prototype.deleteApp=function(){this.deleted_=!0,this.app_=null,this.requestMap_.clear()},t.prototype.maxUploadRetryTime=function(){return this.maxUploadRetryTime_},t.prototype.setMaxUploadRetryTime=function(t){this.maxUploadRetryTime_=t},t.prototype.maxOperationRetryTime=function(){return this.maxOperationRetryTime_},t.prototype.setMaxOperationRetryTime=function(t){this.maxOperationRetryTime_=t},t}();
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
function me(t,e,r){var n=1,o=null,i=!1,a=0;function s(){return 2===a}var u=!1;function c(){u||(u=!0,e.apply(null,arguments))}function h(e){o=setTimeout(function(){o=null,t(l,s())},e)}function l(t){for(var e=[],r=1;r<arguments.length;r++)e[r-1]=arguments[r];if(!u)if(t)c.apply(null,arguments);else{var o,l=s()||i;if(l)c.apply(null,arguments);else n<64&&(n*=2),1===a?(a=2,o=0):o=1e3*(n+Math.random()),h(o)}}var f=!1;function p(t){f||(f=!0,u||(null!==o?(t||(a=2),clearTimeout(o),h(0)):t||(a=1)))}return h(0),setTimeout(function(){i=!0,p(!0)},r),p}function be(t){t(!1)}
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
 */var ye=function(){function t(t,e,r,n,o,i,a,s,u,c,h){this.pendingXhr_=null,this.backoffId_=null,this.resolve_=null,this.reject_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=t,this.method_=e,this.headers_=r,this.body_=n,this.successCodes_=o.slice(),this.additionalRetryCodes_=i.slice(),this.callback_=a,this.errorCallback_=s,this.progressCallback_=c,this.timeout_=u,this.pool_=h;var l=this;this.promise_=Z(function(t,e){l.resolve_=t,l.reject_=e,l.start_()})}return t.prototype.start_=function(){var t=this;function e(e,r){if(r)e(!1,new Ee(!1,null,!0));else{var n=t.pool_.createXhrIo();t.pendingXhr_=n,null!==t.progressCallback_&&n.addUploadProgressListener(o),n.send(t.url_,t.method_,t.body_,t.headers_).then(function(r){null!==t.progressCallback_&&r.removeUploadProgressListener(o),t.pendingXhr_=null,r=r;var n=r.getErrorCode()===q.NO_ERROR,i=r.getStatus();if(n&&!t.isRetryStatusCode_(i)){var a=qt(t.successCodes_,i);e(!0,new Ee(a,r))}else{var s=r.getErrorCode()===q.ABORT;e(!1,new Ee(!1,null,s))}})}function o(e){var r=e.loaded,n=e.lengthComputable?e.total:-1;null!==t.progressCallback_&&t.progressCallback_(r,n)}}function r(e,r){var n=t.resolve_,o=t.reject_,i=r.xhr;if(r.wasSuccessCode)try{var a=t.callback_(i,i.getResponseText());tt(a)?n(a):n()}catch(u){o(u)}else if(null!==i){var s=p();s.setServerResponseProp(i.getResponseText()),t.errorCallback_?o(t.errorCallback_(i,s)):o(s)}else if(r.canceled){s=t.appDelete_?N():b();o(s)}else{s=m();o(s)}}this.canceled_?r(!1,new Ee(!1,null,!0)):this.backoffId_=me(e,r,this.timeout_)},t.prototype.getPromise=function(){return this.promise_},t.prototype.cancel=function(t){this.canceled_=!0,this.appDelete_=t||!1,null!==this.backoffId_&&be(this.backoffId_),null!==this.pendingXhr_&&this.pendingXhr_.abort()},t.prototype.isRetryStatusCode_=function(t){var e=t>=500&&t<600,r=[408,429],n=qt(r,t),o=qt(this.additionalRetryCodes_,t);return e||n||o},t}(),Ee=function(){function t(t,e,r){this.wasSuccessCode=t,this.xhr=e,this.canceled=!!r}return t}();function we(t,e){null!==e&&e.length>0&&(t["Authorization"]="Firebase "+e)}function Te(t){var e="undefined"!==typeof o.a?o.a.SDK_VERSION:"AppManager";t["X-Firebase-Storage-Version"]="webjs/"+e}function Re(t,e,r){var n=gt(t.urlParams),o=t.url+n,i=J(t.headers);return we(i,e),Te(i),new ye(o,t.method,i,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,r)}
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
 */var Ae=function(){function t(t,e,r){function n(t,e){return new de(t,e)}if(this.bucket_=null,this.authWrapper_=new ge(t,n,Re,this,e),this.app_=t,null!=r)this.bucket_=ft.makeFromBucketSpec(r);else{var o=this.authWrapper_.bucket();null!=o&&(this.bucket_=new ft(o,""))}this.internals_=new Se(this)}return t.prototype.ref=function(t){function e(t){if(/^[A-Za-z]+:\/\//.test(t))throw"Expected child path but got a URL, use refFromURL instead."}if(Ct("ref",[Ut(e,!0)],arguments),null==this.bucket_)throw new Error("No Storage Bucket defined in Firebase Options.");var r=new de(this.authWrapper_,this.bucket_);return null!=t?r.child(t):r},t.prototype.refFromURL=function(t){function e(t){if(!/^[A-Za-z]+:\/\//.test(t))throw"Expected full URL but got a child path, use ref instead.";try{ft.makeFromUrl(t)}catch(e){throw"Expected valid full URL but got an invalid one."}}return Ct("refFromURL",[Ut(e,!1)],arguments),new de(this.authWrapper_,t)},Object.defineProperty(t.prototype,"maxUploadRetryTime",{get:function(){return this.authWrapper_.maxUploadRetryTime()},enumerable:!0,configurable:!0}),t.prototype.setMaxUploadRetryTime=function(t){Ct("setMaxUploadRetryTime",[Lt()],arguments),this.authWrapper_.setMaxUploadRetryTime(t)},t.prototype.setMaxOperationRetryTime=function(t){Ct("setMaxOperationRetryTime",[Lt()],arguments),this.authWrapper_.setMaxOperationRetryTime(t)},Object.defineProperty(t.prototype,"app",{get:function(){return this.app_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"INTERNAL",{get:function(){return this.internals_},enumerable:!0,configurable:!0}),t}(),Se=function(){function t(t){this.service_=t}return t.prototype.delete=function(){return this.service_.authWrapper_.deleteApp(),$(void 0)},t}(),Ne="storage";function Oe(t,e,r){return new Ae(t,new ht,r)}function Ce(t){var e={TaskState:H,TaskEvent:G,StringFormat:I,Storage:Ae,Reference:de};t.INTERNAL.registerService(Ne,Oe,e,void 0,!0)}Ce(o.a)},"6d09":function(t,e,r){"use strict";function n(t){return t&&"object"===typeof t&&"default"in t?t["default"]:t}Object.defineProperty(e,"__esModule",{value:!0});var o=n(r("c23d")),i=r("9ab4"),a=r("cd51");r("7d28");var s,u,c,h,l=r("abfd"),f="0.2.1",p="FB-PERF-TRACE-START",d="FB-PERF-TRACE-STOP",_="FB-PERF-TRACE-MEASURE",v="_wt_",g="_fp",m="_fcp",b="_fid",y="@firebase/performance/config",E="@firebase/performance/configexpire",w="performance",T="Performance",R=(s={},s["trace started"]="Trace {$traceName} was started before.",s["trace stopped"]="Trace {$traceName} is not running.",s["no window"]="Window is not available.",s["no app id"]="App id is not available.",s["no project id"]="Project id is not available.",s["no api key"]="Api key is not available.",s["invalid cc log"]="Attempted to queue invalid cc event",s["FB not default"]="Performance can only start when Firebase app instance is the default one.",s["RC response not ok"]="RC response is not ok",s),A=new a.ErrorFactory(w,T,R),S=function(){function t(t){if(!t)throw A.create("no window");this.performance=t.performance,this.PerformanceObserver=t.PerformanceObserver,this.windowLocation=t.location,this.navigator=t.navigator,this.document=t.document,this.localStorage=t.localStorage,t.perfMetrics&&t.perfMetrics.onFirstInputDelay&&(this.onFirstInputDelay=t.perfMetrics.onFirstInputDelay)}return t.prototype.getUrl=function(){return this.windowLocation.href.split("?")[0]},t.prototype.mark=function(t){this.performance&&this.performance.mark&&this.performance.mark(t)},t.prototype.measure=function(t,e,r){this.performance&&this.performance.measure&&this.performance.measure(t,e,r)},t.prototype.getEntriesByType=function(t){return this.performance&&this.performance.getEntriesByType?this.performance.getEntriesByType(t):[]},t.prototype.getEntriesByName=function(t){return this.performance&&this.performance.getEntriesByName?this.performance.getEntriesByName(t):[]},t.prototype.getTimeOrigin=function(){return this.performance&&(this.performance.timeOrigin||this.performance.timing.navigationStart)},t.prototype.setupObserver=function(t,e){if(this.PerformanceObserver){var r=new this.PerformanceObserver(function(t){for(var r=0,n=t.getEntries();r<n.length;r++){var o=n[r];e(o)}});r.observe({entryTypes:[t]})}},t.getInstance=function(){return void 0===u&&(u=new t(c)),u},t}();function N(t){c=t}
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
 */var O,C,k=function(){function t(){this.instrumentationEnabled=!0,this.dataCollectionEnabled=!0,this.loggingEnabled=!1,this.tracesSamplingRate=1,this.networkRequestsSamplingRate=1,this.logEndPointUrl="https://firebaselogging.googleapis.com/v0cc/log?format=json_proto",this.logSource=462,this.logTraceAfterSampling=!1,this.logNetworkAfterSampling=!1,this.configTimeToLive=12}return t.prototype.getAppId=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.appId;if(!t)throw A.create("no app id");return t},t.prototype.getProjectId=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.projectId;if(!t)throw A.create("no project id");return t},t.prototype.getApiKey=function(){var t=this.firebaseAppInstance&&this.firebaseAppInstance.options&&this.firebaseAppInstance.options.apiKey;if(!t)throw A.create("no api key");return t},t.getInstance=function(){return void 0===h&&(h=new t),h},t}();
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
 */function I(){var t=k.getInstance().firebaseAppInstance.installations().getId();return t.then(function(t){O=t}),t}function U(){return O}function P(){var t=k.getInstance().firebaseAppInstance.installations().getToken();return t.then(function(t){}),t}
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
 */function D(){var t=S.getInstance().navigator;return"serviceWorker"in t?t.serviceWorker.controller?2:3:1}function L(){var t=S.getInstance().document,e=t.visibilityState;switch(e){case"visible":return C.VISIBLE;case"hidden":return C.HIDDEN;case"prerender":return C.PRERENDER;default:return C.UNKNOWN}}function M(){var t=S.getInstance().navigator,e=t.connection,r=e&&e.effectiveType;switch(r){case"slow-2g":return 1;case"2g":return 2;case"3g":return 3;case"4g":return 4;default:return 0}}
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
 */(function(t){t[t["UNKNOWN"]=0]="UNKNOWN",t[t["VISIBLE"]=1]="VISIBLE",t[t["HIDDEN"]=2]="HIDDEN",t[t["PRERENDER"]=3]="PRERENDER",t[t["UNLOADED"]=4]="UNLOADED"})(C||(C={}));var x=new l.Logger(T);x.logLevel=l.LogLevel.INFO;
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
var B="0.0.1",j={loggingEnabled:!0},W="FIREBASE_INSTALLATIONS_AUTH";function F(t){var e=q();return e?(V(e),Promise.resolve()):H(t).then(function(t){return V(t)}).then(function(t){return G(t)},function(){})}function q(){var t=S.getInstance().localStorage,e=t.getItem(E);if(e&&X(e)){var r=t.getItem(y);if(r)try{var n=JSON.parse(r);return n}catch(s){return}}}function G(t){if(t){var e=S.getInstance().localStorage;e.setItem(y,JSON.stringify(t)),e.setItem(E,String(Date.now()+60*k.getInstance().configTimeToLive*60*1e3))}}var z="Could not fetch config, will use default configs";function H(t){return P().then(function(e){var r=k.getInstance().getProjectId(),n="https://firebaseremoteconfig.googleapis.com/v1/projects/"+r+"/namespaces/fireperf:fetch?key="+k.getInstance().getApiKey(),o=new Request(n,{method:"POST",headers:{Authorization:W+" "+e},body:JSON.stringify({app_instance_id:t,app_instance_id_token:e,app_id:k.getInstance().getAppId(),app_version:f,sdk_version:B})});return fetch(o).then(function(t){if(t.ok)return t.json();throw A.create("RC response not ok")})}).catch(function(){x.info(z)})}function V(t){if(!t)return t;var e=k.getInstance(),r=t.entries||{};return void 0!==r.fpr_enabled?e.loggingEnabled="true"===String(r.fpr_enabled):e.loggingEnabled=j.loggingEnabled,r.fpr_log_source&&(e.logSource=Number(r.fpr_log_source)),r.fpr_log_endpoint_url&&(e.logEndPointUrl=r.fpr_log_endpoint_url),void 0!==r.fpr_vc_network_request_sampling_rate&&(e.networkRequestsSamplingRate=Number(r.fpr_vc_network_request_sampling_rate)),void 0!==r.fpr_vc_trace_sampling_rate&&(e.tracesSamplingRate=Number(r.fpr_vc_trace_sampling_rate)),e.logTraceAfterSampling=K(e.tracesSamplingRate),e.logNetworkAfterSampling=K(e.networkRequestsSamplingRate),t}function X(t){return Number(t)>Date.now()}function K(t){return Math.random()<=t}
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
 */var J,Z=1;function $(){return Z=2,J=J||Y(),J}function Q(){return 3===Z}function Y(){return tt().then(function(){return I()}).then(function(t){return F(t)}).then(function(){return et()},function(){return et()})}function tt(){var t=S.getInstance().document;return new Promise(function(e){if(t&&"complete"!==t.readyState){var r=function(){"complete"===t.readyState&&(t.removeEventListener("readystatechange",r),e())};t.addEventListener("readystatechange",r)}else e()})}function et(){Z=3}
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
 */var rt,nt=1e4,ot=5500,it=3,at=it,st=[];function ut(t){setTimeout(function(){if(0!==at){if(!st.length)return ut(nt);var t=st.slice();st=[];var e=t.map(function(t){return{source_extension_json:t.message,event_time_ms:String(t.eventTime)}}),r={request_time_ms:String(Date.now()),client_info:{client_type:1,js_client_info:{}},log_source:k.getInstance().logSource,log_event:e};fetch(k.getInstance().logEndPointUrl,{method:"POST",body:JSON.stringify(r)}).then(function(t){return t.ok||x.info("Call to Firebase backend failed."),t.json()}).then(function(t){var e=Math.max(nt,parseInt(t.next_request_wait_millis,10));at=it,ut(e)}).catch(function(){st=t.concat(st),at--,x.info("Tries left: "+at+"."),ut(nt)})}},t)}function ct(t){if(!t.eventTime||!t.message)throw A.create("invalid cc log");st=st.concat([t])}function ht(t){return function(e,r){for(var n=[],o=2;o<arguments.length;o++)n[o-2]=arguments[o];var i=t.apply(void 0,n);ct({message:i,eventTime:Date.now()})}}
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
 */function lt(){if(rt)return rt;var t=ht(_t);return rt=new l.Logger("@firebase/performance/cc"),rt.logHandler=t,rt}function ft(t){var e=k.getInstance();!e.instrumentationEnabled&&t.isAuto||(e.dataCollectionEnabled||t.isAuto)&&(t.isAuto&&L()!==C.VISIBLE||e.loggingEnabled&&e.logTraceAfterSampling&&(Q()?pt(t):$().then(function(){return pt(t)},function(){return pt(t)})))}function pt(t){U()&&setTimeout(function(){return lt().log(t,1)},0)}function dt(t){var e=k.getInstance();e.instrumentationEnabled&&t.url!==e.logEndPointUrl.split("?")[0]&&e.loggingEnabled&&e.logNetworkAfterSampling&&setTimeout(function(){return lt().log(t,0)},0)}function _t(t,e){return 0===e?vt(t):gt(t)}function vt(t){var e={url:t.url,http_method:1,http_response_code:200,response_payload_bytes:t.responsePayloadBytes,client_start_time_us:t.startTimeUs,time_to_response_initiated_us:t.timeToResponseInitiatedUs,time_to_response_completed_us:t.timeToResponseCompletedUs},r={application_info:mt(),network_request_metric:e};return JSON.stringify(r)}function gt(t){var e={name:t.name,is_auto:t.isAuto,client_start_time_us:t.startTimeUs,duration_us:t.durationUs};0!==Object.keys(t.counters).length&&(e.counters=bt(t.counters));var r=t.getAttributes();0!==Object.keys(r).length&&(e.custom_attributes=bt(r));var n={application_info:mt(),trace_metric:e};return JSON.stringify(n)}function mt(){return{google_app_id:k.getInstance().getAppId(),app_instance_id:U(),web_app_info:{sdk_version:f,page_url:S.getInstance().getUrl(),service_worker_status:D(),visibility_state:L(),effective_connection_type:M()},application_process_state:0}}function bt(t){var e=Object.keys(t);return e.map(function(e){return{key:e,value:t[e]}})}
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
 */ut(ot);var yt=function(){function t(t,e,r){void 0===e&&(e=!1),this.name=t,this.isAuto=e,this.state=1,this.customAttributes={},this.counters={},this.api=S.getInstance(),this.randomId=Math.floor(1e6*Math.random()),this.isAuto||(this.traceStartMark=p+"-"+this.randomId+"-"+this.name,this.traceStopMark=d+"-"+this.randomId+"-"+this.name,this.traceMeasure=r||_+"-"+this.randomId+"-"+this.name,r&&this.calculateTraceMetrics())}return t.prototype.start=function(){if(1!==this.state)throw A.create("trace started",{traceName:this.name});this.api.mark(this.traceStartMark),this.state=2},t.prototype.stop=function(){if(2!==this.state)throw A.create("trace stopped",{traceName:this.name});this.state=3,this.api.mark(this.traceStopMark),this.api.measure(this.traceMeasure,this.traceStartMark,this.traceStopMark),this.calculateTraceMetrics(),ft(this)},t.prototype.record=function(t,e,r){if(this.durationUs=Math.floor(1e3*e),this.startTimeUs=Math.floor(1e3*t),r&&r.attributes&&(this.customAttributes=i.__assign({},r.attributes)),r&&r.metrics)for(var n=0,o=Object.keys(r.metrics);n<o.length;n++){var a=o[n];isNaN(Number(r.metrics[a]))||(this.counters[a]=Number(Math.floor(r.metrics[a])))}ft(this)},t.prototype.incrementMetric=function(t,e){void 0===e&&(e=1),void 0===this.counters[t]&&(this.counters[t]=0),this.counters[t]+=e},t.prototype.putMetric=function(t,e){this.counters[t]=e},t.prototype.getMetric=function(t){return this.counters[t]||0},t.prototype.putAttribute=function(t,e){this.customAttributes[t]=e},t.prototype.getAttribute=function(t){return this.customAttributes[t]},t.prototype.removeAttribute=function(t){void 0!==this.customAttributes[t]&&delete this.customAttributes[t]},t.prototype.getAttributes=function(){return i.__assign({},this.customAttributes)},t.prototype.setStartTime=function(t){this.startTimeUs=t},t.prototype.setDuration=function(t){this.durationUs=t},t.prototype.calculateTraceMetrics=function(){var t=this.api.getEntriesByName(this.traceMeasure),e=t&&t[0];e&&(this.durationUs=Math.floor(1e3*e.duration),this.startTimeUs=Math.floor(1e3*(e.startTime+this.api.getTimeOrigin())))},t.createOobTrace=function(e,r,n){var o=S.getInstance().getUrl();if(o){var i=new t(v+o,!0),a=Math.floor(1e3*S.getInstance().getTimeOrigin());i.setStartTime(a),e&&e[0]&&(i.setDuration(Math.floor(1e3*e[0].duration)),i.incrementMetric("domInteractive",Math.floor(1e3*e[0].domInteractive)),i.incrementMetric("domContentLoadedEventEnd",Math.floor(1e3*e[0].domContentLoadedEventEnd)),i.incrementMetric("loadEventEnd",Math.floor(1e3*e[0].loadEventEnd)));var s="first-paint",u="first-contentful-paint";if(r){var c=r.find(function(t){return t.name===s});c&&c.startTime&&i.incrementMetric(g,Math.floor(1e3*c.startTime));var h=r.find(function(t){return t.name===u});h&&h.startTime&&i.incrementMetric(m,Math.floor(1e3*h.startTime)),n&&i.incrementMetric(b,Math.floor(1e3*n))}ft(i)}},t.createUserTimingTrace=function(e){var r=new t(e,!1,e);ft(r)},t}();
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
 */function Et(t){var e=t;if(e&&void 0!==e.responseStart){var r=S.getInstance().getTimeOrigin(),n=Math.floor(1e3*(e.startTime+r)),o=e.responseStart?Math.floor(1e3*(e.responseStart-e.startTime)):void 0,i=Math.floor(1e3*(e.responseEnd-e.startTime)),a=e.name&&e.name.split("?")[0],s={url:a,responsePayloadBytes:e.transferSize,startTimeUs:n,timeToResponseInitiatedUs:o,timeToResponseCompletedUs:i};dt(s)}}
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
 */var wt=5e3;function Tt(){U()&&(setTimeout(function(){return At()},0),setTimeout(function(){return Rt()},0),setTimeout(function(){return St()},0))}function Rt(){for(var t=S.getInstance(),e=t.getEntriesByType("resource"),r=0,n=e;r<n.length;r++){var o=n[r];Et(o)}t.setupObserver("resource",Et)}function At(){var t=S.getInstance(),e=t.getEntriesByType("navigation"),r=t.getEntriesByType("paint");if(t.onFirstInputDelay){var n=setTimeout(function(){yt.createOobTrace(e,r),n=void 0},wt);t.onFirstInputDelay(function(t){n&&(clearTimeout(n),yt.createOobTrace(e,r,t))})}else yt.createOobTrace(e,r)}function St(){for(var t=S.getInstance(),e=t.getEntriesByType("measure"),r=0,n=e;r<n.length;r++){var o=n[r];Nt(o)}t.setupObserver("measure",Nt)}function Nt(t){var e=t.name;e.substring(0,_.length)!==_&&yt.createUserTimingTrace(e)}var Ot=function(){function t(t){this.app=t,$().then(Tt,Tt)}return t.prototype.trace=function(t){return new yt(t)},Object.defineProperty(t.prototype,"instrumentationEnabled",{get:function(){return k.getInstance().instrumentationEnabled},set:function(t){k.getInstance().instrumentationEnabled=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"dataCollectionEnabled",{get:function(){return k.getInstance().dataCollectionEnabled},set:function(t){k.getInstance().dataCollectionEnabled=t},enumerable:!0,configurable:!0}),t}(),Ct="[DEFAULT]";
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
 */function kt(t){var e=function(t){if(t.name!==Ct)throw A.create("FB not default");return k.getInstance().firebaseAppInstance=t,new Ot(t)},r={};t.INTERNAL.registerService("performance",e,r)}window&&fetch&&Promise?(N(window),kt(o)):x.info("Firebase Performance cannot start if browser does not support fetch and Promise."),e.registerPerformance=kt},cd51:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("9ab4"),o={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"},i=function(t,e){if(!t)throw a(e)},a=function(t){return new Error("Firebase Database ("+o.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)},s=function(t){for(var e=[],r=0,n=0;n<t.length;n++){var o=t.charCodeAt(n);o<128?e[r++]=o:o<2048?(e[r++]=o>>6|192,e[r++]=63&o|128):55296==(64512&o)&&n+1<t.length&&56320==(64512&t.charCodeAt(n+1))?(o=65536+((1023&o)<<10)+(1023&t.charCodeAt(++n)),e[r++]=o>>18|240,e[r++]=o>>12&63|128,e[r++]=o>>6&63|128,e[r++]=63&o|128):(e[r++]=o>>12|224,e[r++]=o>>6&63|128,e[r++]=63&o|128)}return e},u=function(t){var e=[],r=0,n=0;while(r<t.length){var o=t[r++];if(o<128)e[n++]=String.fromCharCode(o);else if(o>191&&o<224){var i=t[r++];e[n++]=String.fromCharCode((31&o)<<6|63&i)}else if(o>239&&o<365){i=t[r++];var a=t[r++],s=t[r++],u=((7&o)<<18|(63&i)<<12|(63&a)<<6|63&s)-65536;e[n++]=String.fromCharCode(55296+(u>>10)),e[n++]=String.fromCharCode(56320+(1023&u))}else{i=t[r++],a=t[r++];e[n++]=String.fromCharCode((15&o)<<12|(63&i)<<6|63&a)}}return e.join("")},c={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray:function(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[],o=0;o<t.length;o+=3){var i=t[o],a=o+1<t.length,s=a?t[o+1]:0,u=o+2<t.length,c=u?t[o+2]:0,h=i>>2,l=(3&i)<<4|s>>4,f=(15&s)<<2|c>>6,p=63&c;u||(p=64,a||(f=64)),n.push(r[h],r[l],r[f],r[p])}return n.join("")},encodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(s(t),e)},decodeString:function(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):u(this.decodeStringToByteArray(t,e))},decodeStringToByteArray:function(t,e){this.init_();for(var r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[],o=0;o<t.length;){var i=r[t.charAt(o++)],a=o<t.length,s=a?r[t.charAt(o)]:0;++o;var u=o<t.length,c=u?r[t.charAt(o)]:64;++o;var h=o<t.length,l=h?r[t.charAt(o)]:64;if(++o,null==i||null==s||null==c||null==l)throw Error();var f=i<<2|s>>4;if(n.push(f),64!=c){var p=s<<4&240|c>>2;if(n.push(p),64!=l){var d=c<<6&192|l;n.push(d)}}}return n},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},h=function(t){var e=s(t);return c.encodeByteArray(e,!0)},l=function(t){try{return c.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};
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
function f(t){return p(void 0,t)}function p(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:var r=e;return new Date(r.getTime());case Object:void 0===t&&(t={});break;case Array:t=[];break;default:return e}for(var n in e)e.hasOwnProperty(n)&&(t[n]=p(t[n],e[n]));return t}function d(t,e,r){t[e]=r}
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
 */var _=function(){function t(){var t=this;this.promise=new Promise(function(e,r){t.resolve=e,t.reject=r})}return t.prototype.wrapCallback=function(t){var e=this;return function(r,n){r?e.reject(r):e.resolve(n),"function"===typeof t&&(e.promise.catch(function(){}),1===t.length?t(r):t(r,n))}},t}(),v=function(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""},g=function(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(v())},m=function(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]},b=function(){return!0===o.NODE_CLIENT||!0===o.NODE_ADMIN},y="FirebaseError",E=function(t){function e(r,n){var o=t.call(this,n)||this;return o.code=r,o.name=y,Object.setPrototypeOf(o,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,w.prototype.create),o}return n.__extends(e,t),e}(Error),w=function(){function t(t,e,r){this.service=t,this.serviceName=e,this.errors=r}return t.prototype.create=function(t,e){void 0===e&&(e={});for(var r=this.service+"/"+t,n=this.errors[t],o=n?T(n,e):"Error",i=this.serviceName+": "+o+" ("+r+").",a=new E(r,i),s=0,u=Object.keys(e);s<u.length;s++){var c=u[s];"_"!==c.slice(-1)&&(c in a&&console.warn('Overwriting FirebaseError base field "'+c+'" can cause unexpected behavior.'),a[c]=e[c])}return a},t}();
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
 */function T(t,e){return t.replace(R,function(t,r){var n=e[r];return null!=n?n.toString():"<"+r+"?>"})}var R=/\{\$([^}]+)}/g;
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
 */function A(t){return JSON.parse(t)}function S(t){return JSON.stringify(t)}
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
 */var N=function(t){var e={},r={},n={},o="";try{var i=t.split(".");e=A(l(i[0])||""),r=A(l(i[1])||""),o=i[2],n=r["d"]||{},delete r["d"]}catch(a){}return{header:e,claims:r,data:n,signature:o}},O=function(t){var e,r,n=N(t).claims,o=Math.floor((new Date).getTime()/1e3);return"object"===typeof n&&(n.hasOwnProperty("nbf")?e=n["nbf"]:n.hasOwnProperty("iat")&&(e=n["iat"]),r=n.hasOwnProperty("exp")?n["exp"]:e+86400),o&&e&&r&&o>=e&&o<=r},C=function(t){var e=N(t).claims;return"object"===typeof e&&e.hasOwnProperty("iat")?e["iat"]:null},k=function(t){var e=N(t),r=e.claims;return!!r&&"object"===typeof r&&r.hasOwnProperty("iat")},I=function(t){var e=N(t).claims;return"object"===typeof e&&!0===e["admin"]},U=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},P=function(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]},D=function(t,e){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e(r,t[r])},L=function(t,e){return D(e,function(e,r){t[e]=r}),t},M=function(t){return L({},t)},x=function(t){return"object"===typeof t&&null!==t},B=function(t){for(var e in t)return!1;return!0},j=function(t){var e=0;for(var r in t)e++;return e},W=function(t,e,r){var n={};for(var o in t)n[o]=e.call(r,t[o],o,t);return n},F=function(t,e,r){for(var n in t)if(e.call(r,t[n],n,t))return n},q=function(t,e,r){var n=F(t,e,r);return n&&t[n]},G=function(t){for(var e in t)return e},z=function(t){var e=[],r=0;for(var n in t)e[r++]=t[n];return e},H=function(t,e){for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)&&!e(r,t[r]))return!1;return!0},V=function(t){var e=[];return D(t,function(t,r){Array.isArray(r)?r.forEach(function(r){e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}),e.length?"&"+e.join("&"):""},X=function(t){var e={},r=t.replace(/^\?/,"").split("&");return r.forEach(function(t){if(t){var r=t.split("=");e[r[0]]=r[1]}}),e},K=function(){function t(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(var t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}return t.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},t.prototype.compress_=function(t,e){e||(e=0);var r=this.W_;if("string"===typeof t)for(var n=0;n<16;n++)r[n]=t.charCodeAt(e)<<24|t.charCodeAt(e+1)<<16|t.charCodeAt(e+2)<<8|t.charCodeAt(e+3),e+=4;else for(n=0;n<16;n++)r[n]=t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3],e+=4;for(n=16;n<80;n++){var o=r[n-3]^r[n-8]^r[n-14]^r[n-16];r[n]=4294967295&(o<<1|o>>>31)}var i,a,s=this.chain_[0],u=this.chain_[1],c=this.chain_[2],h=this.chain_[3],l=this.chain_[4];for(n=0;n<80;n++){n<40?n<20?(i=h^u&(c^h),a=1518500249):(i=u^c^h,a=1859775393):n<60?(i=u&c|h&(u|c),a=2400959708):(i=u^c^h,a=3395469782);o=(s<<5|s>>>27)+i+l+a+r[n]&4294967295;l=h,h=c,c=4294967295&(u<<30|u>>>2),u=s,s=o}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+u&4294967295,this.chain_[2]=this.chain_[2]+c&4294967295,this.chain_[3]=this.chain_[3]+h&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295},t.prototype.update=function(t,e){if(null!=t){void 0===e&&(e=t.length);var r=e-this.blockSize,n=0,o=this.buf_,i=this.inbuf_;while(n<e){if(0==i)while(n<=r)this.compress_(t,n),n+=this.blockSize;if("string"===typeof t){while(n<e)if(o[i]=t.charCodeAt(n),++i,++n,i==this.blockSize){this.compress_(o),i=0;break}}else while(n<e)if(o[i]=t[n],++i,++n,i==this.blockSize){this.compress_(o),i=0;break}}this.inbuf_=i,this.total_+=e}},t.prototype.digest=function(){var t=[],e=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var r=this.blockSize-1;r>=56;r--)this.buf_[r]=255&e,e/=256;this.compress_(this.buf_);var n=0;for(r=0;r<5;r++)for(var o=24;o>=0;o-=8)t[n]=this.chain_[r]>>o&255,++n;return t},t}();function J(t,e){var r=new Z(t,e);return r.subscribe.bind(r)}var Z=function(){function t(t,e){var r=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=e,this.task.then(function(){t(r)}).catch(function(t){r.error(t)})}return t.prototype.next=function(t){this.forEachObserver(function(e){e.next(t)})},t.prototype.error=function(t){this.forEachObserver(function(e){e.error(t)}),this.close(t)},t.prototype.complete=function(){this.forEachObserver(function(t){t.complete()}),this.close()},t.prototype.subscribe=function(t,e,r){var n,o=this;if(void 0===t&&void 0===e&&void 0===r)throw new Error("Missing Observer.");n=Q(t,["next","error","complete"])?t:{next:t,error:e,complete:r},void 0===n.next&&(n.next=Y),void 0===n.error&&(n.error=Y),void 0===n.complete&&(n.complete=Y);var i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(function(){try{o.finalError?n.error(o.finalError):n.complete()}catch(t){}}),this.observers.push(n),i},t.prototype.unsubscribeOne=function(t){void 0!==this.observers&&void 0!==this.observers[t]&&(delete this.observers[t],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},t.prototype.forEachObserver=function(t){if(!this.finalized)for(var e=0;e<this.observers.length;e++)this.sendOne(e,t)},t.prototype.sendOne=function(t,e){var r=this;this.task.then(function(){if(void 0!==r.observers&&void 0!==r.observers[t])try{e(r.observers[t])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}})},t.prototype.close=function(t){var e=this;this.finalized||(this.finalized=!0,void 0!==t&&(this.finalError=t),this.task.then(function(){e.observers=void 0,e.onNoObservers=void 0}))},t}();function $(t,e){return function(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];Promise.resolve(!0).then(function(){t.apply(void 0,r)}).catch(function(t){e&&e(t)})}}function Q(t,e){if("object"!==typeof t||null===t)return!1;for(var r=0,n=e;r<n.length;r++){var o=n[r];if(o in t&&"function"===typeof t[o])return!0}return!1}function Y(){}
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
 */var tt=function(t,e,r,n){var o;if(n<e?o="at least "+e:n>r&&(o=0===r?"none":"no more than "+r),o){var i=t+" failed: Was called with "+n+(1===n?" argument.":" arguments.")+" Expects "+o+".";throw new Error(i)}};function et(t,e,r){var n="";switch(e){case 1:n=r?"first":"First";break;case 2:n=r?"second":"Second";break;case 3:n=r?"third":"Third";break;case 4:n=r?"fourth":"Fourth";break;default:throw new Error("errorPrefix called with argumentNumber > 4.  Need to update it?")}var o=t+" failed: ";return o+=n+" argument ",o}function rt(t,e,r,n){if((!n||r)&&"string"!==typeof r)throw new Error(et(t,e,n)+"must be a valid firebase namespace.")}function nt(t,e,r,n){if((!n||r)&&"function"!==typeof r)throw new Error(et(t,e,n)+"must be a valid function.")}function ot(t,e,r,n){if((!n||r)&&("object"!==typeof r||null===r))throw new Error(et(t,e,n)+"must be a valid context object.")}
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
 */var it=function(t){for(var e=[],r=0,n=0;n<t.length;n++){var o=t.charCodeAt(n);if(o>=55296&&o<=56319){var a=o-55296;n++,i(n<t.length,"Surrogate pair missing trail surrogate.");var s=t.charCodeAt(n)-56320;o=65536+(a<<10)+s}o<128?e[r++]=o:o<2048?(e[r++]=o>>6|192,e[r++]=63&o|128):o<65536?(e[r++]=o>>12|224,e[r++]=o>>6&63|128,e[r++]=63&o|128):(e[r++]=o>>18|240,e[r++]=o>>12&63|128,e[r++]=o>>6&63|128,e[r++]=63&o|128)}return e},at=function(t){for(var e=0,r=0;r<t.length;r++){var n=t.charCodeAt(r);n<128?e++:n<2048?e+=2:n>=55296&&n<=56319?(e+=4,r++):e+=3}return e};
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
e.CONSTANTS=o,e.Deferred=_,e.ErrorFactory=w,e.FirebaseError=E,e.Sha1=K,e.assert=i,e.assertionError=a,e.async=$,e.base64=c,e.base64Decode=l,e.base64Encode=h,e.clone=M,e.contains=U,e.createSubscribe=J,e.decode=N,e.deepCopy=f,e.deepExtend=p,e.errorPrefix=et,e.every=H,e.extend=L,e.findKey=F,e.findValue=q,e.forEach=D,e.getAnyKey=G,e.getCount=j,e.getUA=v,e.getValues=z,e.isAdmin=I,e.isEmpty=B,e.isMobileCordova=g,e.isNodeSdk=b,e.isNonNullObject=x,e.isReactNative=m,e.isValidFormat=k,e.isValidTimestamp=O,e.issuedAtTime=C,e.jsonEval=A,e.map=W,e.patchProperty=d,e.querystring=V,e.querystringDecode=X,e.safeGet=P,e.stringLength=at,e.stringToByteArray=it,e.stringify=S,e.validateArgCount=tt,e.validateCallback=nt,e.validateContextObject=ot,e.validateNamespace=rt}}]);
//# sourceMappingURL=chunk-vendors~a6cd21c3.dfc154e9.js.map