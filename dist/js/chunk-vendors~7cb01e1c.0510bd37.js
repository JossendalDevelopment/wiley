(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-vendors~7cb01e1c"],{8484:function(t,e,r){"use strict";(function(t){r.d(e,"a",function(){return rt}),r.d(e,"b",function(){return it});var i=r("be09"),n=r.n(i),a=function(t){return!!t&&"object"===typeof t},u=function t(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return r.reduce(function(e,r){return Object.keys(r).forEach(function(i){Array.isArray(e[i])&&Array.isArray(r[i])?e[i]=e[i].concat(r[i]):a(e[i])&&a(r[i])?e[i]=t(e[i],r[i]):e[i]=r[i]}),e},{})},s=function(t){return Object.keys(t).map(function(e){return t[e]})},o=function(t,e){for(var r=[],i=t;i<e;i++)r.push(i);return r},c=function(t){return t.reduce(function(t,e){return t.concat(e)},[])},d=function(t){if(!t.length)return[];for(var e=[],r=0;r<t.length;r++)e.push(t[r]);return e},f=function(t,e){return t.reduce(function(t,r,i){return r[e]&&t.push(i),t},[])},p=function(t){var e=s(t.reduce(function(t,e){var r,i=e.attributes.id+(e.attributes.lang||"");t[i]?(e.segments[0].discontinuity=!0,(r=t[i].segments).push.apply(r,e.segments),e.attributes.contentProtection&&(t[i].attributes.contentProtection=e.attributes.contentProtection)):t[i]=e;return t},{}));return e.map(function(t){return t.discontinuityStarts=f(t.segments,"discontinuity"),t})},m=function(t){var e,r=t.attributes,i=t.segments,n={attributes:(e={NAME:r.id,BANDWIDTH:r.bandwidth,CODECS:r.codecs},e["PROGRAM-ID"]=1,e),uri:"",endList:"static"===(r.type||"static"),timeline:r.periodIndex,resolvedUri:"",targetDuration:r.duration,segments:i,mediaSequence:i.length?i[0].number:1};return r.contentProtection&&(n.contentProtection=r.contentProtection),n},l=function(t){var e,r=t.attributes,i=t.segments;return"undefined"===typeof i&&(i=[{uri:r.baseUrl,timeline:r.periodIndex,resolvedUri:r.baseUrl||"",duration:r.sourceDuration,number:0}],r.duration=r.sourceDuration),{attributes:(e={NAME:r.id,BANDWIDTH:r.bandwidth},e["PROGRAM-ID"]=1,e),uri:"",endList:"static"===(r.type||"static"),timeline:r.periodIndex,resolvedUri:r.baseUrl||"",targetDuration:r.duration,segments:i,mediaSequence:i.length?i[0].number:1}},g=function(t){return t.reduce(function(t,e){var r=e.attributes.role&&e.attributes.role.value||"main",i=e.attributes.lang||"",n="main";return i&&(n=e.attributes.lang+" ("+r+")"),t[n]&&t[n].playlists[0].attributes.BANDWIDTH>e.attributes.bandwidth?t:(t[n]={language:i,autoselect:!0,default:"main"===r,playlists:[m(e)],uri:""},t)},{})},h=function(t){return t.reduce(function(t,e){var r=e.attributes.lang||"text";return t[r]?t:(t[r]={language:r,default:!1,autoselect:!1,playlists:[l(e)],uri:""},t)},{})},b=function(t){var e,r=t.attributes,i=t.segments,n={attributes:(e={NAME:r.id,AUDIO:"audio",SUBTITLES:"subs",RESOLUTION:{width:r.width,height:r.height},CODECS:r.codecs,BANDWIDTH:r.bandwidth},e["PROGRAM-ID"]=1,e),uri:"",endList:"static"===(r.type||"static"),timeline:r.periodIndex,resolvedUri:"",targetDuration:r.duration,segments:i,mediaSequence:i.length?i[0].number:1};return r.contentProtection&&(n.contentProtection=r.contentProtection),n},v=function(t){var e;if(!t.length)return{};var r=t[0].attributes,i=r.sourceDuration,n=r.minimumUpdatePeriod,a=void 0===n?0:n,u=function(t){var e=t.attributes;return"video/mp4"===e.mimeType||"video"===e.contentType},s=function(t){var e=t.attributes;return"audio/mp4"===e.mimeType||"audio"===e.contentType},o=function(t){var e=t.attributes;return"text/vtt"===e.mimeType||"text"===e.contentType},c=p(t.filter(u)).map(b),d=p(t.filter(s)),f=t.filter(o),m={allowCache:!0,discontinuityStarts:[],segments:[],endList:!0,mediaGroups:(e={AUDIO:{},VIDEO:{}},e["CLOSED-CAPTIONS"]={},e.SUBTITLES={},e),uri:"",duration:i,playlists:c,minimumUpdatePeriod:1e3*a};return d.length&&(m.mediaGroups.AUDIO.audio=g(d)),f.length&&(m.mediaGroups.SUBTITLES.subs=h(f)),m};"undefined"!==typeof window?window:"undefined"!==typeof t||"undefined"!==typeof self&&self;function I(t,e){return e={exports:{}},t(e,e.exports),e.exports}var T=I(function(t,e){(function(e){var r=/^((?:[a-zA-Z0-9+\-.]+:)?)(\/\/[^\/?#]*)?((?:[^\/\?#]*\/)*.*?)??(;.*?)?(\?.*?)?(#.*?)?$/,i=/^([^\/?#]*)(.*)$/,n=/(?:\/|^)\.(?=\/)/g,a=/(?:\/|^)\.\.\/(?!\.\.\/).*?(?=\/)/g,u={buildAbsoluteURL:function(t,e,r){if(r=r||{},t=t.trim(),e=e.trim(),!e){if(!r.alwaysNormalize)return t;var n=u.parseURL(t);if(!n)throw new Error("Error trying to parse base URL.");return n.path=u.normalizePath(n.path),u.buildURLFromParts(n)}var a=u.parseURL(e);if(!a)throw new Error("Error trying to parse relative URL.");if(a.scheme)return r.alwaysNormalize?(a.path=u.normalizePath(a.path),u.buildURLFromParts(a)):e;var s=u.parseURL(t);if(!s)throw new Error("Error trying to parse base URL.");if(!s.netLoc&&s.path&&"/"!==s.path[0]){var o=i.exec(s.path);s.netLoc=o[1],s.path=o[2]}s.netLoc&&!s.path&&(s.path="/");var c={scheme:s.scheme,netLoc:a.netLoc,path:null,params:a.params,query:a.query,fragment:a.fragment};if(!a.netLoc&&(c.netLoc=s.netLoc,"/"!==a.path[0]))if(a.path){var d=s.path,f=d.substring(0,d.lastIndexOf("/")+1)+a.path;c.path=u.normalizePath(f)}else c.path=s.path,a.params||(c.params=s.params,a.query||(c.query=s.query));return null===c.path&&(c.path=r.alwaysNormalize?u.normalizePath(a.path):a.path),u.buildURLFromParts(c)},parseURL:function(t){var e=r.exec(t);return e?{scheme:e[1]||"",netLoc:e[2]||"",path:e[3]||"",params:e[4]||"",query:e[5]||"",fragment:e[6]||""}:null},normalizePath:function(t){t=t.split("").reverse().join("").replace(n,"");while(t.length!==(t=t.replace(a,"")).length);return t.split("").reverse().join("")},buildURLFromParts:function(t){return t.scheme+t.netLoc+t.path+t.params+t.query+t.fragment}};t.exports=u})()}),y=function(t,e){return/^[a-z]+:/i.test(e)?e:(/\/\//i.test(t)||(t=T.buildAbsoluteURL(n.a.location.href,t)),T.buildAbsoluteURL(t,e))},E=function(t){var e=t.baseUrl,r=void 0===e?"":e,i=t.source,n=void 0===i?"":i,a=t.range,u=void 0===a?"":a,s={uri:n,resolvedUri:y(r||"",n)};if(u){var o=u.split("-"),c=parseInt(o[0],10),d=parseInt(o[1],10);s.byterange={length:d-c,offset:c}}return s},S=function(t,e,r){var i=t.NOW,n=t.clientOffset,a=t.availabilityStartTime,u=t.timescale,s=void 0===u?1:u,o=t.start,c=void 0===o?0:o,d=t.minimumUpdatePeriod,f=void 0===d?0:d,p=(i+n)/1e3,m=a+c,l=p+f,g=l-m;return Math.ceil((g*s-e)/r)},U=function(t,e){for(var r=t.type,i=void 0===r?"static":r,n=t.minimumUpdatePeriod,a=void 0===n?0:n,u=t.media,s=void 0===u?"":u,o=t.sourceDuration,c=t.timescale,d=void 0===c?1:c,f=t.startNumber,p=void 0===f?1:f,m=t.periodIndex,l=[],g=-1,h=0;h<e.length;h++){var b=e[h],v=b.d,I=b.r||0,T=b.t||0;g<0&&(g=T),T&&T>g&&(g=T);var y=void 0;if(I<0){var E=h+1;y=E===e.length?"dynamic"===i&&a>0&&s.indexOf("$Number$")>0?S(t,g,v):(o*d-g)/v:(e[E].t-g)/v}else y=I+1;var U=p+l.length+y,D=p+l.length;while(D<U)l.push({number:D,duration:v/d,time:g,timeline:m}),g+=v,D++}return l},D={static:function(t){var e=t.duration,r=t.timescale,i=void 0===r?1:r,n=t.sourceDuration;return{start:0,end:Math.ceil(n/(e/i))}},dynamic:function(t){var e=t.NOW,r=t.clientOffset,i=t.availabilityStartTime,n=t.timescale,a=void 0===n?1:n,u=t.duration,s=t.start,o=void 0===s?0:s,c=t.minimumUpdatePeriod,d=void 0===c?0:c,f=t.timeShiftBufferDepth,p=void 0===f?1/0:f,m=(e+r)/1e3,l=i+o,g=m+d,h=g-l,b=Math.ceil(h*a/u),v=Math.floor((m-l-p)*a/u),I=Math.floor((m-l)*a/u);return{start:Math.max(0,v),end:Math.min(b,I)}}},N=function(t){return function(e,r){var i=t.duration,n=t.timescale,a=void 0===n?1:n,u=t.periodIndex,s=t.startNumber,o=void 0===s?1:s;return{number:o+e,duration:i/a,timeline:u,time:r*i}}},O=function(t){var e=t.type,r=void 0===e?"static":e,i=t.duration,n=t.timescale,a=void 0===n?1:n,u=t.sourceDuration,s=D[r](t),c=s.start,d=s.end,f=o(c,d).map(N(t));if("static"===r){var p=f.length-1;f[p].duration=u-i/a*p}return f},R=/\$([A-z]*)(?:(%0)([0-9]+)d)?\$/g,A=function(t){return function(e,r,i,n){if("$$"===e)return"$";if("undefined"===typeof t[r])return e;var a=""+t[r];return"RepresentationID"===r?a:(n=i?parseInt(n,10):1,a.length>=n?a:""+new Array(n-a.length+1).join("0")+a)}},w=function(t,e){return t.replace(R,A(e))},P=function(t,e){return t.duration||e?t.duration?O(t):U(t,e):[{number:t.startNumber||1,duration:t.sourceDuration,time:0,timeline:t.periodIndex}]},L=function(t,e){var r={RepresentationID:t.id,Bandwidth:t.bandwidth||0},i=t.initialization,n=void 0===i?{sourceURL:"",range:""}:i,a=E({baseUrl:t.baseUrl,source:w(n.sourceURL,r),range:n.range}),u=P(t,e);return u.map(function(e){r.Number=e.number,r.Time=e.time;var i=w(t.media||"",r);return{uri:i,timeline:e.timeline,duration:e.duration,resolvedUri:y(t.baseUrl||"",i),map:a,number:e.number}})},M={INVALID_NUMBER_OF_PERIOD:"INVALID_NUMBER_OF_PERIOD",DASH_EMPTY_MANIFEST:"DASH_EMPTY_MANIFEST",DASH_INVALID_XML:"DASH_INVALID_XML",NO_BASE_URL:"NO_BASE_URL",MISSING_SEGMENT_INFORMATION:"MISSING_SEGMENT_INFORMATION",SEGMENT_TIME_UNSPECIFIED:"SEGMENT_TIME_UNSPECIFIED",UNSUPPORTED_UTC_TIMING_SCHEME:"UNSUPPORTED_UTC_TIMING_SCHEME"},x=function(t,e){var r=t.baseUrl,i=t.initialization,n=void 0===i?{}:i,a=E({baseUrl:r,source:n.sourceURL,range:n.range}),u=E({baseUrl:r,source:e.media,range:e.mediaRange});return u.map=a,u},C=function(t,e){var r=t.duration,i=t.segmentUrls,n=void 0===i?[]:i;if(!r&&!e||r&&e)throw new Error(M.SEGMENT_TIME_UNSPECIFIED);var a,u=n.map(function(e){return x(t,e)});r&&(a=O(t)),e&&(a=U(t,e));var s=a.map(function(t,e){if(u[e]){var r=u[e];return r.timeline=t.timeline,r.duration=t.duration,r.number=t.number,r}}).filter(function(t){return t});return s},_=function(t){var e=t.baseUrl,r=t.initialization,i=void 0===r?{}:r,n=t.sourceDuration,a=t.timescale,u=void 0===a?1:a,s=t.indexRange,o=void 0===s?"":s,c=t.duration;if(!e)throw new Error(M.NO_BASE_URL);var d=E({baseUrl:e,source:i.sourceURL,range:i.range}),f=E({baseUrl:e,source:e,range:o});if(f.map=d,c){var p=O(t);p.length&&(f.duration=p[0].duration,f.timeline=p[0].timeline)}else n&&(f.duration=n/u,f.timeline=0);return f.number=0,[f]},F=function(t){var e,r,i=t.attributes,n=t.segmentInfo;if(n.template?(r=L,e=u(i,n.template)):n.base?(r=_,e=u(i,n.base)):n.list&&(r=C,e=u(i,n.list)),!r)return{attributes:i};var a=r(e,n.timeline);if(e.duration){var s=e,o=s.duration,c=s.timescale,d=void 0===c?1:c;e.duration=o/d}else a.length?e.duration=a.reduce(function(t,e){return Math.max(t,Math.ceil(e.duration))},0):e.duration=0;return{attributes:e,segments:a}},X=function(t){return t.map(F)},G=function(t,e){return d(t.childNodes).filter(function(t){var r=t.tagName;return r===e})},B=function(t){return t.textContent.trim()},V=function(t){var e=31536e3,r=2592e3,i=86400,n=3600,a=60,u=/P(?:(\d*)Y)?(?:(\d*)M)?(?:(\d*)D)?(?:T(?:(\d*)H)?(?:(\d*)M)?(?:([\d.]*)S)?)?/,s=u.exec(t);if(!s)return 0;var o=s.slice(1),c=o[0],d=o[1],f=o[2],p=o[3],m=o[4],l=o[5];return parseFloat(c||0)*e+parseFloat(d||0)*r+parseFloat(f||0)*i+parseFloat(p||0)*n+parseFloat(m||0)*a+parseFloat(l||0)},z=function(t){var e=/^\d+-\d+-\d+T\d+:\d+:\d+(\.\d+)?$/;return e.test(t)&&(t+="Z"),Date.parse(t)},$={mediaPresentationDuration:function(t){return V(t)},availabilityStartTime:function(t){return z(t)/1e3},minimumUpdatePeriod:function(t){return V(t)},timeShiftBufferDepth:function(t){return V(t)},start:function(t){return V(t)},width:function(t){return parseInt(t,10)},height:function(t){return parseInt(t,10)},bandwidth:function(t){return parseInt(t,10)},startNumber:function(t){return parseInt(t,10)},timescale:function(t){return parseInt(t,10)},duration:function(t){var e=parseInt(t,10);return isNaN(e)?V(t):e},d:function(t){return parseInt(t,10)},t:function(t){return parseInt(t,10)},r:function(t){return parseInt(t,10)},DEFAULT:function(t){return t}},q=function(t){return t&&t.attributes?d(t.attributes).reduce(function(t,e){var r=$[e.name]||$.DEFAULT;return t[e.name]=r(e.value),t},{}):{}};function H(t){for(var e=n.a.atob(t),r=new Uint8Array(e.length),i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}var k={"urn:uuid:1077efec-c0b2-4d02-ace3-3c1e52e2fb4b":"org.w3.clearkey","urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed":"com.widevine.alpha","urn:uuid:9a04f079-9840-4286-ab92-e65be0885f95":"com.microsoft.playready","urn:uuid:f239e769-efa3-4850-9c16-a903c6932efb":"com.adobe.primetime"},Y=function(t,e){return e.length?c(t.map(function(t){return e.map(function(e){return y(t,B(e))})})):t},j=function(t){var e=G(t,"SegmentTemplate")[0],r=G(t,"SegmentList")[0],i=r&&G(r,"SegmentURL").map(function(t){return u({tag:"SegmentURL"},q(t))}),n=G(t,"SegmentBase")[0],a=r||e,s=a&&G(a,"SegmentTimeline")[0],o=r||n||e,c=o&&G(o,"Initialization")[0],d=e&&q(e);d&&c?d.initialization=c&&q(c):d&&d.initialization&&(d.initialization={sourceURL:d.initialization});var f={template:d,timeline:s&&G(s,"S").map(function(t){return q(t)}),list:r&&u(q(r),{segmentUrls:i,initialization:q(c)}),base:n&&u(q(n),{initialization:q(c)})};return Object.keys(f).forEach(function(t){f[t]||delete f[t]}),f},W=function(t,e,r){return function(i){var n=G(i,"BaseURL"),a=Y(e,n),s=u(t,q(i)),o=j(i);return a.map(function(t){return{segmentInfo:u(r,o),attributes:u(s,{baseUrl:t})}})}},Z=function(t){return t.reduce(function(t,e){var r=q(e),i=k[r.schemeIdUri];if(i){t[i]={attributes:r};var n=G(e,"cenc:pssh")[0];if(n){var a=B(n),u=a&&H(a);t[i].pssh=u}}return t},{})},J=function(t,e,r){return function(i){var n=q(i),a=Y(e,G(i,"BaseURL")),s=G(i,"Role")[0],o={role:q(s)},d=u(t,n,o),f=Z(G(i,"ContentProtection"));Object.keys(f).length&&(d=u(d,{contentProtection:f}));var p=j(i),m=G(i,"Representation"),l=u(r,p);return c(m.map(W(d,a,l)))}},Q=function(t,e){return function(r,i){var a=Y(e,G(r,"BaseURL")),s=q(r),o=parseInt(s.id,10),d=n.a.isNaN(o)?i:o,f=u(t,{periodIndex:d}),p=G(r,"AdaptationSet"),m=j(r);return c(p.map(J(f,a,m)))}},K=function(t,e){void 0===e&&(e={});var r=e,i=r.manifestUri,n=void 0===i?"":i,a=r.NOW,u=void 0===a?Date.now():a,s=r.clientOffset,o=void 0===s?0:s,d=G(t,"Period");if(!d.length)throw new Error(M.INVALID_NUMBER_OF_PERIOD);var f=q(t),p=Y([n],G(t,"BaseURL"));return f.sourceDuration=f.mediaPresentationDuration||0,f.NOW=u,f.clientOffset=o,c(d.map(Q(f,p)))},tt=function(t){if(""===t)throw new Error(M.DASH_EMPTY_MANIFEST);var e=new n.a.DOMParser,r=e.parseFromString(t,"application/xml"),i=r&&"MPD"===r.documentElement.tagName?r.documentElement:null;if(!i||i&&i.getElementsByTagName("parsererror").length>0)throw new Error(M.DASH_INVALID_XML);return i},et=function(t){var e=G(t,"UTCTiming")[0];if(!e)return null;var r=q(e);switch(r.schemeIdUri){case"urn:mpeg:dash:utc:http-head:2014":case"urn:mpeg:dash:utc:http-head:2012":r.method="HEAD";break;case"urn:mpeg:dash:utc:http-xsdate:2014":case"urn:mpeg:dash:utc:http-iso:2014":case"urn:mpeg:dash:utc:http-xsdate:2012":case"urn:mpeg:dash:utc:http-iso:2012":r.method="GET";break;case"urn:mpeg:dash:utc:direct:2014":case"urn:mpeg:dash:utc:direct:2012":r.method="DIRECT",r.value=Date.parse(r.value);break;case"urn:mpeg:dash:utc:http-ntp:2014":case"urn:mpeg:dash:utc:ntp:2014":case"urn:mpeg:dash:utc:sntp:2014":default:throw new Error(M.UNSUPPORTED_UTC_TIMING_SCHEME)}return r},rt=function(t,e){return v(X(K(tt(t),e)))},it=function(t){return et(tt(t))}}).call(this,r("c8ba"))},d749:function(t,e,r){"use strict";
/*! @name m3u8-parser @version 4.3.0 @license Apache-2.0 */
function i(){return i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(t[i]=r[i])}return t},i.apply(this,arguments)}function n(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}function a(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}r.d(e,"a",function(){return f});var u=function(){function t(){this.listeners={}}var e=t.prototype;return e.on=function(t,e){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(e)},e.off=function(t,e){if(!this.listeners[t])return!1;var r=this.listeners[t].indexOf(e);return this.listeners[t].splice(r,1),r>-1},e.trigger=function(t){var e,r,i,n=this.listeners[t];if(n)if(2===arguments.length)for(r=n.length,e=0;e<r;++e)n[e].call(this,arguments[1]);else for(i=Array.prototype.slice.call(arguments,1),r=n.length,e=0;e<r;++e)n[e].apply(this,i)},e.dispose=function(){this.listeners={}},e.pipe=function(t){this.on("data",function(e){t.push(e)})},t}(),s=function(t){function e(){var e;return e=t.call(this)||this,e.buffer="",e}n(e,t);var r=e.prototype;return r.push=function(t){var e;for(this.buffer+=t,e=this.buffer.indexOf("\n");e>-1;e=this.buffer.indexOf("\n"))this.trigger("data",this.buffer.substring(0,e)),this.buffer=this.buffer.substring(e+1)},e}(u),o=function(){var t="[^=]*",e='"[^"]*"|[^,]*',r="(?:"+t+")=(?:"+e+")";return new RegExp("(?:^|,)("+r+")")},c=function(t){var e,r=t.split(o()),i={},n=r.length;while(n--)""!==r[n]&&(e=/([^=]*)=(.*)/.exec(r[n]).slice(1),e[0]=e[0].replace(/^\s+|\s+$/g,""),e[1]=e[1].replace(/^\s+|\s+$/g,""),e[1]=e[1].replace(/^['"](.*)['"]$/g,"$1"),i[e[0]]=e[1]);return i},d=function(t){function e(){var e;return e=t.call(this)||this,e.customParsers=[],e.tagMappers=[],e}n(e,t);var r=e.prototype;return r.push=function(t){var e,r,i=this;if(t=t.trim(),0!==t.length)if("#"===t[0]){var n=this.tagMappers.reduce(function(e,r){var i=r(t);return i===t?e:e.concat([i])},[t]);n.forEach(function(t){for(var n=0;n<i.customParsers.length;n++)if(i.customParsers[n].call(i,t))return;if(0===t.indexOf("#EXT"))if(t=t.replace("\r",""),e=/^#EXTM3U/.exec(t),e)i.trigger("data",{type:"tag",tagType:"m3u"});else{if(e=/^#EXTINF:?([0-9\.]*)?,?(.*)?$/.exec(t),e)return r={type:"tag",tagType:"inf"},e[1]&&(r.duration=parseFloat(e[1])),e[2]&&(r.title=e[2]),void i.trigger("data",r);if(e=/^#EXT-X-TARGETDURATION:?([0-9.]*)?/.exec(t),e)return r={type:"tag",tagType:"targetduration"},e[1]&&(r.duration=parseInt(e[1],10)),void i.trigger("data",r);if(e=/^#ZEN-TOTAL-DURATION:?([0-9.]*)?/.exec(t),e)return r={type:"tag",tagType:"totalduration"},e[1]&&(r.duration=parseInt(e[1],10)),void i.trigger("data",r);if(e=/^#EXT-X-VERSION:?([0-9.]*)?/.exec(t),e)return r={type:"tag",tagType:"version"},e[1]&&(r.version=parseInt(e[1],10)),void i.trigger("data",r);if(e=/^#EXT-X-MEDIA-SEQUENCE:?(\-?[0-9.]*)?/.exec(t),e)return r={type:"tag",tagType:"media-sequence"},e[1]&&(r.number=parseInt(e[1],10)),void i.trigger("data",r);if(e=/^#EXT-X-DISCONTINUITY-SEQUENCE:?(\-?[0-9.]*)?/.exec(t),e)return r={type:"tag",tagType:"discontinuity-sequence"},e[1]&&(r.number=parseInt(e[1],10)),void i.trigger("data",r);if(e=/^#EXT-X-PLAYLIST-TYPE:?(.*)?$/.exec(t),e)return r={type:"tag",tagType:"playlist-type"},e[1]&&(r.playlistType=e[1]),void i.trigger("data",r);if(e=/^#EXT-X-BYTERANGE:?([0-9.]*)?@?([0-9.]*)?/.exec(t),e)return r={type:"tag",tagType:"byterange"},e[1]&&(r.length=parseInt(e[1],10)),e[2]&&(r.offset=parseInt(e[2],10)),void i.trigger("data",r);if(e=/^#EXT-X-ALLOW-CACHE:?(YES|NO)?/.exec(t),e)return r={type:"tag",tagType:"allow-cache"},e[1]&&(r.allowed=!/NO/.test(e[1])),void i.trigger("data",r);if(e=/^#EXT-X-MAP:?(.*)$/.exec(t),e){if(r={type:"tag",tagType:"map"},e[1]){var a=c(e[1]);if(a.URI&&(r.uri=a.URI),a.BYTERANGE){var u=a.BYTERANGE.split("@"),s=u[0],o=u[1];r.byterange={},s&&(r.byterange.length=parseInt(s,10)),o&&(r.byterange.offset=parseInt(o,10))}}i.trigger("data",r)}else if(e=/^#EXT-X-STREAM-INF:?(.*)$/.exec(t),e){if(r={type:"tag",tagType:"stream-inf"},e[1]){if(r.attributes=c(e[1]),r.attributes.RESOLUTION){var d=r.attributes.RESOLUTION.split("x"),f={};d[0]&&(f.width=parseInt(d[0],10)),d[1]&&(f.height=parseInt(d[1],10)),r.attributes.RESOLUTION=f}r.attributes.BANDWIDTH&&(r.attributes.BANDWIDTH=parseInt(r.attributes.BANDWIDTH,10)),r.attributes["PROGRAM-ID"]&&(r.attributes["PROGRAM-ID"]=parseInt(r.attributes["PROGRAM-ID"],10))}i.trigger("data",r)}else{if(e=/^#EXT-X-MEDIA:?(.*)$/.exec(t),e)return r={type:"tag",tagType:"media"},e[1]&&(r.attributes=c(e[1])),void i.trigger("data",r);if(e=/^#EXT-X-ENDLIST/.exec(t),e)i.trigger("data",{type:"tag",tagType:"endlist"});else if(e=/^#EXT-X-DISCONTINUITY/.exec(t),e)i.trigger("data",{type:"tag",tagType:"discontinuity"});else{if(e=/^#EXT-X-PROGRAM-DATE-TIME:?(.*)$/.exec(t),e)return r={type:"tag",tagType:"program-date-time"},e[1]&&(r.dateTimeString=e[1],r.dateTimeObject=new Date(e[1])),void i.trigger("data",r);if(e=/^#EXT-X-KEY:?(.*)$/.exec(t),e)return r={type:"tag",tagType:"key"},e[1]&&(r.attributes=c(e[1]),r.attributes.IV&&("0x"===r.attributes.IV.substring(0,2).toLowerCase()&&(r.attributes.IV=r.attributes.IV.substring(2)),r.attributes.IV=r.attributes.IV.match(/.{8}/g),r.attributes.IV[0]=parseInt(r.attributes.IV[0],16),r.attributes.IV[1]=parseInt(r.attributes.IV[1],16),r.attributes.IV[2]=parseInt(r.attributes.IV[2],16),r.attributes.IV[3]=parseInt(r.attributes.IV[3],16),r.attributes.IV=new Uint32Array(r.attributes.IV))),void i.trigger("data",r);if(e=/^#EXT-X-START:?(.*)$/.exec(t),e)return r={type:"tag",tagType:"start"},e[1]&&(r.attributes=c(e[1]),r.attributes["TIME-OFFSET"]=parseFloat(r.attributes["TIME-OFFSET"]),r.attributes.PRECISE=/YES/.test(r.attributes.PRECISE)),void i.trigger("data",r);if(e=/^#EXT-X-CUE-OUT-CONT:?(.*)?$/.exec(t),e)return r={type:"tag",tagType:"cue-out-cont"},e[1]?r.data=e[1]:r.data="",void i.trigger("data",r);if(e=/^#EXT-X-CUE-OUT:?(.*)?$/.exec(t),e)return r={type:"tag",tagType:"cue-out"},e[1]?r.data=e[1]:r.data="",void i.trigger("data",r);if(e=/^#EXT-X-CUE-IN:?(.*)?$/.exec(t),e)return r={type:"tag",tagType:"cue-in"},e[1]?r.data=e[1]:r.data="",void i.trigger("data",r);i.trigger("data",{type:"tag",data:t.slice(4)})}}}else i.trigger("data",{type:"comment",text:t.slice(1)})})}else this.trigger("data",{type:"uri",uri:t})},r.addParser=function(t){var e=this,r=t.expression,i=t.customType,n=t.dataParser,a=t.segment;"function"!==typeof n&&(n=function(t){return t}),this.customParsers.push(function(t){var u=r.exec(t);if(u)return e.trigger("data",{type:"custom",data:n(t),customType:i,segment:a}),!0})},r.addTagMapper=function(t){var e=t.expression,r=t.map,i=function(t){return e.test(t)?r(t):t};this.tagMappers.push(i)},e}(u),f=function(t){function e(){var e;e=t.call(this)||this,e.lineStream=new s,e.parseStream=new d,e.lineStream.pipe(e.parseStream);var r,n,u=a(a(e)),o=[],c={},f=function(){},p={AUDIO:{},VIDEO:{},"CLOSED-CAPTIONS":{},SUBTITLES:{}},m=0;return e.manifest={allowCache:!0,discontinuityStarts:[],segments:[]},e.parseStream.on("data",function(t){var e,a;({tag:function(){({"allow-cache":function(){this.manifest.allowCache=t.allowed,"allowed"in t||(this.trigger("info",{message:"defaulting allowCache to YES"}),this.manifest.allowCache=!0)},byterange:function(){var e={};"length"in t&&(c.byterange=e,e.length=t.length,"offset"in t||(this.trigger("info",{message:"defaulting offset to zero"}),t.offset=0)),"offset"in t&&(c.byterange=e,e.offset=t.offset)},endlist:function(){this.manifest.endList=!0},inf:function(){"mediaSequence"in this.manifest||(this.manifest.mediaSequence=0,this.trigger("info",{message:"defaulting media sequence to zero"})),"discontinuitySequence"in this.manifest||(this.manifest.discontinuitySequence=0,this.trigger("info",{message:"defaulting discontinuity sequence to zero"})),t.duration>0&&(c.duration=t.duration),0===t.duration&&(c.duration=.01,this.trigger("info",{message:"updating zero segment duration to a small value"})),this.manifest.segments=o},key:function(){t.attributes?"NONE"!==t.attributes.METHOD?t.attributes.URI?(t.attributes.METHOD||this.trigger("warn",{message:"defaulting key method to AES-128"}),n={method:t.attributes.METHOD||"AES-128",uri:t.attributes.URI},"undefined"!==typeof t.attributes.IV&&(n.iv=t.attributes.IV)):this.trigger("warn",{message:"ignoring key declaration without URI"}):n=null:this.trigger("warn",{message:"ignoring key declaration without attribute list"})},"media-sequence":function(){isFinite(t.number)?this.manifest.mediaSequence=t.number:this.trigger("warn",{message:"ignoring invalid media sequence: "+t.number})},"discontinuity-sequence":function(){isFinite(t.number)?(this.manifest.discontinuitySequence=t.number,m=t.number):this.trigger("warn",{message:"ignoring invalid discontinuity sequence: "+t.number})},"playlist-type":function(){/VOD|EVENT/.test(t.playlistType)?this.manifest.playlistType=t.playlistType:this.trigger("warn",{message:"ignoring unknown playlist type: "+t.playlist})},map:function(){r={},t.uri&&(r.uri=t.uri),t.byterange&&(r.byterange=t.byterange)},"stream-inf":function(){this.manifest.playlists=o,this.manifest.mediaGroups=this.manifest.mediaGroups||p,t.attributes?(c.attributes||(c.attributes={}),i(c.attributes,t.attributes)):this.trigger("warn",{message:"ignoring empty stream-inf attributes"})},media:function(){if(this.manifest.mediaGroups=this.manifest.mediaGroups||p,t.attributes&&t.attributes.TYPE&&t.attributes["GROUP-ID"]&&t.attributes.NAME){var r=this.manifest.mediaGroups[t.attributes.TYPE];r[t.attributes["GROUP-ID"]]=r[t.attributes["GROUP-ID"]]||{},e=r[t.attributes["GROUP-ID"]],a={default:/yes/i.test(t.attributes.DEFAULT)},a.default?a.autoselect=!0:a.autoselect=/yes/i.test(t.attributes.AUTOSELECT),t.attributes.LANGUAGE&&(a.language=t.attributes.LANGUAGE),t.attributes.URI&&(a.uri=t.attributes.URI),t.attributes["INSTREAM-ID"]&&(a.instreamId=t.attributes["INSTREAM-ID"]),t.attributes.CHARACTERISTICS&&(a.characteristics=t.attributes.CHARACTERISTICS),t.attributes.FORCED&&(a.forced=/yes/i.test(t.attributes.FORCED)),e[t.attributes.NAME]=a}else this.trigger("warn",{message:"ignoring incomplete or missing media group"})},discontinuity:function(){m+=1,c.discontinuity=!0,this.manifest.discontinuityStarts.push(o.length)},"program-date-time":function(){"undefined"===typeof this.manifest.dateTimeString&&(this.manifest.dateTimeString=t.dateTimeString,this.manifest.dateTimeObject=t.dateTimeObject),c.dateTimeString=t.dateTimeString,c.dateTimeObject=t.dateTimeObject},targetduration:function(){!isFinite(t.duration)||t.duration<0?this.trigger("warn",{message:"ignoring invalid target duration: "+t.duration}):this.manifest.targetDuration=t.duration},totalduration:function(){!isFinite(t.duration)||t.duration<0?this.trigger("warn",{message:"ignoring invalid total duration: "+t.duration}):this.manifest.totalDuration=t.duration},start:function(){t.attributes&&!isNaN(t.attributes["TIME-OFFSET"])?this.manifest.start={timeOffset:t.attributes["TIME-OFFSET"],precise:t.attributes.PRECISE}:this.trigger("warn",{message:"ignoring start declaration without appropriate attribute list"})},"cue-out":function(){c.cueOut=t.data},"cue-out-cont":function(){c.cueOutCont=t.data},"cue-in":function(){c.cueIn=t.data}}[t.tagType]||f).call(u)},uri:function(){c.uri=t.uri,o.push(c),!this.manifest.targetDuration||"duration"in c||(this.trigger("warn",{message:"defaulting segment duration to the target duration"}),c.duration=this.manifest.targetDuration),n&&(c.key=n),c.timeline=m,r&&(c.map=r),c={}},comment:function(){},custom:function(){t.segment?(c.custom=c.custom||{},c.custom[t.customType]=t.data):(this.manifest.custom=this.manifest.custom||{},this.manifest.custom[t.customType]=t.data)}})[t.type].call(u)}),e}n(e,t);var r=e.prototype;return r.push=function(t){this.lineStream.push(t)},r.end=function(){this.lineStream.push("\n")},r.addParser=function(t){this.parseStream.addParser(t)},r.addTagMapper=function(t){this.parseStream.addTagMapper(t)},e}(u)}}]);
//# sourceMappingURL=chunk-vendors~7cb01e1c.0510bd37.js.map