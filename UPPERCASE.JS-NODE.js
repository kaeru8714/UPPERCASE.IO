global.NODE_CONFIG=NODE_CONFIG={},global.CPU_CLUSTERING=CPU_CLUSTERING=METHOD(function(o){"use strict";var E=require("cluster");return{run:function(n){RUN(E.isMaster?function(){var o=function(){var o=E.fork();o.on("message",function(n){EACH(E.workers,function(E){E!==o&&E.send(n)})})};REPEAT(require("os").cpus().length,function(){o()}),E.on("exit",function(E,n,t){console.log(CONSOLE_RED("[UPPERCASE.JS-CPU_CLUSTERING] WORKER #"+E.id+" (PID:"+E.process.pid+") died. ("+(void 0!==t?t:n)+"). restarting...")),o()})}:function(){var t,e,i,r=E.worker.id,R=E.worker.process.pid,a={},c=function(o,E){var n=a[o];void 0!==n&&EACH(n,function(o){o(E)})};process.on("message",function(o){var E=PARSE_STR(o);void 0!==E&&c(E.methodName,E.data)}),o.on=t=function(o,E){var n=a[o];void 0===n&&(n=a[o]=[]),n.push(E)},t("__SHARED_STORE_SAVE",SHARED_STORE.save),t("__SHARED_STORE_REMOVE",SHARED_STORE.remove),t("__CPU_SHARED_STORE_SAVE",CPU_SHARED_STORE.save),t("__CPU_SHARED_STORE_REMOVE",CPU_SHARED_STORE.remove),o.off=e=function(o){delete a[o]},o.broadcast=i=function(o){process.send(STRINGIFY(o))},n({id:r,pid:R},t,e,i),console.log(CONSOLE_GREEN("[UPPERCASE.JS-CPU_CLUSTERING] RUNNING WORKER... (ID:"+r+", PID:"+R+")"))})}}}),global.CPU_SHARED_STORE=CPU_SHARED_STORE=CLASS(function(o){"use strict";var E,n,t,e={},i={};return o.save=E=function(o,E){var n=o.fullName,t=o.value,r=o.removeAfterSeconds,R=o.isWaitRemove;e[n]=t,R===!0&&void 0!==i[n]&&(i[n].remove(),delete i[n]),void 0!==r&&(i[n]=DELAY(r,E))},o.get=n=function(o){return e[o]},o.remove=t=function(o){delete e[o],void 0!==i[o]&&(i[o].remove(),delete i[o])},{init:function(E,n,t){var e,i,r,R;E.getFullName=e=function(o){return t+"."+o},n.save=i=function(E){var n=E.name,t=e(n),i=E.value,r=E.removeAfterSeconds;o.save({fullName:t,value:i,removeAfterSeconds:r},function(){R(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitRemove:void 0!==r}})},n.get=r=function(E){return o.get(e(E))},n.remove=R=function(E){var n=e(E);o.remove(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__CPU_SHARED_STORE_REMOVE",data:n})}}}}),global.SERVER_CLUSTERING=SERVER_CLUSTERING=METHOD(function(o){"use strict";return{run:function(E,n){var t,e,i,r,R=E.hosts,a=E.thisServerHost,c=E.port,S={},s={},u={},_=[];t=function(o){s[o]!==!0&&(s[o]=!0,CONNECT_TO_SOCKET_SERVER({host:o,port:c},{error:function(){delete s[o]},success:function(E,n,t){t({methodName:"__BOOTED",data:a}),u[o]=function(o){var E=o.methodName,n=o.data;t({methodName:"SERVER_CLUSTERING."+E,data:n})},E("__DISCONNECTED",function(){delete u[o],delete s[o]}),console.log("[UPPERCASE.JS-SERVER_CLUSTERING] CONNECTED CLUSTERING SERVER. (HOST:"+o+")"),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",data:o})}}))},void 0!==CPU_CLUSTERING.on&&CPU_CLUSTERING.on("__SERVER_CLUSTERING__CONNECT_TO_CLUSTERING_SERVER",t),EACH(R,function(o){o!==a&&t(o)}),SOCKET_SERVER(c,function(o,E){_.push(E),E("__BOOTED",function(o){t(o)}),EACH(S,function(o,n){EACH(o,function(o){E("SERVER_CLUSTERING."+n,o)})}),E("__DISCONNECTED",function(){REMOVE({array:_,value:E})})}),o.on=e=function(o,E){var n=S[o];void 0===n&&(n=S[o]=[]),n.push(E),EACH(_,function(n){n("SERVER_CLUSTERING."+o,E)})},e("__SHARED_STORE_SAVE",function(o){SHARED_STORE.save(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:o})}),e("__SHARED_STORE_REMOVE",function(o){SHARED_STORE.remove(o),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:o})}),o.off=i=function(o){delete S[o]},o.broadcast=r=function(o){EACH(u,function(E){E(o)})},void 0!==n&&n(a,e,i,r),console.log(CONSOLE_BLUE("[UPPERCASE.JS-SERVER_CLUSTERING] RUNNING CLUSTERING SERVER... (THIS SERVER HOST:"+a+", PORT:"+c+")"))}}}),global.SHARED_STORE=SHARED_STORE=CLASS(function(o){"use strict";var E,n,t,e={},i={};return o.save=E=function(o,E){var n=o.fullName,t=o.value,r=o.removeAfterSeconds,R=o.isWaitRemove;e[n]=t,R===!0&&void 0!==i[n]&&(i[n].remove(),delete i[n]),void 0!==r&&(i[n]=DELAY(r,E))},o.get=n=function(o){return e[o]},o.remove=t=function(o){delete e[o],void 0!==i[o]&&(i[o].remove(),delete i[o])},{init:function(E,n,t){var e,i,r,R;e=function(o){return t+"."+o},n.save=i=function(E){var n=E.name,t=e(n),i=E.value,r=E.removeAfterSeconds;o.save({fullName:t,value:i,removeAfterSeconds:r},function(){R(n)}),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitRemove:void 0!==r}}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_SAVE",data:{fullName:t,value:i,isWaitRemove:void 0!==r}})},n.get=r=function(E){return o.get(e(E))},n.remove=R=function(E){var n=e(E);o.remove(n),void 0!==CPU_CLUSTERING.broadcast&&CPU_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n}),void 0!==SERVER_CLUSTERING.broadcast&&SERVER_CLUSTERING.broadcast({methodName:"__SHARED_STORE_REMOVE",data:n})}}}}),global.CONNECT_TO_SOCKET_SERVER=CONNECT_TO_SOCKET_SERVER=METHOD({run:function(o,E){"use strict";var n,t,e,i,r,R,a,c,S,s=o.host,u=o.port,_=require("net"),d={},C=0,O="";CHECK_IS_DATA(E)!==!0?n=E:(n=E.success,t=E.error),S=function(o,E,n){var t=d[o];void 0!==t&&EACH(t,function(o){o(E,function(o){void 0!==c&&void 0!==n&&c({methodName:"__CALLBACK_"+n,data:o})})})},e=_.connect({host:s,port:u},function(){i=!0,n(R=function(o,E){var n=d[o];void 0===n&&(n=d[o]=[]),n.push(E)},a=function(o,E){var n=d[o];void 0!==n&&(void 0!==E?REMOVE({array:n,value:E}):delete d[o])},c=function(o,E){var n="__CALLBACK_"+C;o.sendKey=C,C+=1,e.write(STRINGIFY(o)+"\n"),void 0!==E&&R(n,function(o){E(o),a(n)})},function(){r=!0,e.end()})}),e.on("data",function(o){var E,n,t;for(O+=o.toString();-1!==(n=O.indexOf("\n"));)E=O.substring(0,n),t=PARSE_STR(E),void 0!==t&&S(t.methodName,t.data,t.sendKey),O=O.substring(n+1)}),e.on("close",function(){r!==!0&&S("__DISCONNECTED")}),e.on("error",function(o){var E=o.toString();i!==!0?(console.log(CONSOLE_RED("[UPPERCASE.JS-CONNECT_TO_SOCKET_SERVER] CONNECT TO SOCKET SERVER FAILED: "+E)),void 0!==t&&t(E)):S("__ERROR",E)})}}),global.CONSOLE_BLUE=CONSOLE_BLUE=METHOD({run:function(o){"use strict";return"[36m"+o+"[0m"}}),global.CONSOLE_GREEN=CONSOLE_GREEN=METHOD({run:function(o){"use strict";return"[32m"+o+"[0m"}}),global.CONSOLE_RED=CONSOLE_RED=METHOD({run:function(o){"use strict";return"[31m"+o+"[0m"}}),global.CONSOLE_YELLOW=CONSOLE_YELLOW=METHOD({run:function(o){"use strict";return"[33m"+o+"[0m"}}),global.SHA1=SHA1=METHOD({run:function(o){"use strict";var E=o.key,n=o.password,t=require("crypto");return t.createHmac("sha1",E).update(n).digest("hex")}}),global.COPY_FILE=COPY_FILE=METHOD(function(){"use strict";var o=require("fs"),E=require("path");return{run:function(n,t){var e,i,r=n.from,R=n.to,a=n.isSync;void 0!==t&&(CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.error)),CREATE_FOLDER({path:E.dirname(R),isSync:a},{error:i,success:function(){RUN(a!==!0?function(){var E=o.createReadStream(r);E.pipe(o.createWriteStream(R)),E.on("error",function(o){var E=o.toString();console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR:"+E)),void 0!==i&&i(E)}),E.on("end",function(){void 0!==e&&e()})}:function(){var E;try{o.writeFileSync(R,o.readFileSync(r)),void 0!==e&&e()}catch(n){n!==TO_DELETE&&(E=n.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-COPY_FILE] ERROR: "+E)),void 0!==i&&i(E))}})}})}}}),global.CREATE_FOLDER=CREATE_FOLDER=METHOD(function(){"use strict";var o=require("fs"),E=require("path");return{run:function(n,t){var e,i,r,R,a;CHECK_IS_DATA(n)!==!0?e=n:(e=n.path,i=n.isSync),void 0!==t&&(CHECK_IS_DATA(t)!==!0?R=t:(R=t.success,a=t.error)),i!==!0?o.exists(e,function(n){n===!0?void 0!==R&&R():(r=E.dirname(e),o.exists(r,function(E){E===!0?o.mkdir(e,function(o){var E;o!==TO_DELETE?(E=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-CREATE_FOLDER] ERROR: "+E)),void 0!==a&&a(E)):R()}):CREATE_FOLDER(r,function(){CREATE_FOLDER(e,R)})}))}):RUN(function(){var n;try{o.existsSync(e)!==!0&&(r=E.dirname(e),o.existsSync(r)===!0?o.mkdirSync(e):(CREATE_FOLDER({path:r,isSync:!0}),CREATE_FOLDER({path:e,isSync:!0}))),void 0!==R&&R()}catch(t){t!==TO_DELETE&&(n=t.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-CREATE_FOLDER] ERROR: "+n)),void 0!==a&&a(n))}})}}}),global.FIND_FILE_NAMES=FIND_FILE_NAMES=METHOD(function(){"use strict";{var o=require("fs");require("path")}return{run:function(E,n){var t,e,i,r,R=[];return CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?i=n:(i=n.success,r=n.error)),e===!0?RUN(function(){var E,n;try{return E=o.readdirSync(t),EACH(E,function(E){"."!==E[0]&&o.statSync(t+"/"+E).isDirectory()!==!0&&R.push(E)}),void 0!==i&&i(R),R}catch(e){e!==TO_DELETE&&(n=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE] ERROR: "+n)),void 0!==r&&r(n))}}):void o.readdir(t,function(E,n){var e;E!==TO_DELETE?(e=E.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE] ERROR:"+e)),void 0!==r&&r(e)):void 0!==i&&PARALLEL(n,[function(E,n){"."!==E[0]?o.stat(t+"/"+E,function(o,t){var e;o!==TO_DELETE?(e=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FILE] ERROR:"+e)),void 0!==r&&r(e)):(t.isDirectory()!==!0&&R.push(E),n())}):n()},function(){void 0!==i&&i(R)}])})}}}),global.FIND_FOLDER_NAMES=FIND_FOLDER_NAMES=METHOD(function(){"use strict";{var o=require("fs");require("path")}return{run:function(E,n){var t,e,i,r,R=[];return CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?i=n:(i=n.success,r=n.error)),e===!0?RUN(function(){var E,n;try{return E=o.readdirSync(t),EACH(E,function(E){"."!==E[0]&&o.statSync(t+"/"+E).isDirectory()===!0&&R.push(E)}),void 0!==i&&i(R),R}catch(e){e!==TO_DELETE&&(n=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER] ERROR: "+n)),void 0!==r&&r(n))}}):void o.readdir(t,function(E,n){var e;E!==TO_DELETE?(e=E.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER] ERROR:"+e)),void 0!==r&&r(e)):void 0!==i&&PARALLEL(n,[function(E,n){"."!==E[0]?o.stat(t+"/"+E,function(o,t){var e;o!==TO_DELETE?(e=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-FIND_FOLDER] ERROR:"+e)),void 0!==r&&r(e)):(t.isDirectory()===!0&&R.push(E),n())}):n()},function(){void 0!==i&&i(R)}])})}}}),global.MOVE_FILE=MOVE_FILE=METHOD({run:function(o,E){"use strict";var n,t,e=o.from,i=o.isSync;CHECK_IS_DATA(E)!==!0?n=E:(n=E.success,t=E.error),COPY_FILE(o,{error:t,success:function(){REMOVE_FILE({path:e,isSync:i},{error:t,success:n})}})}}),global.READ_FILE=READ_FILE=METHOD(function(){"use strict";var o=require("fs");return{run:function(E,n){var t,e,i,r,R;return CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),void 0!==n&&(CHECK_IS_DATA(n)!==!0?i=n:(i=n.success,r=n.notExists,R=n.error)),e===!0?RUN(function(){var E,n;try{if(o.existsSync(t)===!0){if(o.statSync(t).isDirectory()!==!0)return n=o.readFileSync(t),void 0!==i&&i(n),n;void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">"))}else void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">"))}catch(e){e!==TO_DELETE&&(E=e.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+E)),void 0!==R&&R(E))}}):void o.exists(t,function(E){E===!0?o.stat(t,function(E,n){var e;E!==TO_DELETE?(e=E.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+e)),void 0!==R&&R(e)):n.isDirectory()===!0?void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">")):o.readFile(t,function(o,E){var n;o!==TO_DELETE?(n=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-READ_FILE] ERROR: "+n)),void 0!==R&&R(n)):void 0!==i&&i(E)})}):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-READ_FILE] NOT EXISTS! <"+t+">"))})}}}),global.REMOVE_FILE=REMOVE_FILE=METHOD(function(){"use strict";var o=require("fs");return{run:function(E,n){var t,e,i,r,R;CHECK_IS_DATA(E)!==!0?t=E:(t=E.path,e=E.isSync),CHECK_IS_DATA(n)!==!0?i=n:(i=n.success,r=n.notExists,R=n.error),e!==!0?o.exists(t,function(E){E===!0?o.unlink(t,function(o){var E;o!==TO_DELETE?(E=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+E)),void 0!==R&&R(E)):void 0!==i&&i()}):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-REMOVE_FILE] NOT EXISTS! <"+t+">"))}):RUN(function(){var E;try{o.existsSync(t)===!0?(o.unlinkSync(t),void 0!==i&&i()):void 0!==r?r(t):console.log(CONSOLE_YELLOW("[UPPERCASE.JS-REMOVE_FILE] NOT EXISTS! <"+t+">"))}catch(n){n!==TO_DELETE&&(E=n.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-REMOVE_FILE] ERROR: "+E)),void 0!==R&&R(E))}})}}}),global.WRITE_FILE=WRITE_FILE=METHOD(function(){"use strict";var o=require("fs"),E=require("path");return{run:function(n,t){var e,i,r=n.path,R=n.content,a=n.buffer,c=n.isSync;void 0!==t&&(CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.error)),CREATE_FOLDER({path:E.dirname(r),isSync:c},function(){c!==!0?o.writeFile(r,void 0!==a?a:R,function(o){var E;o!==TO_DELETE?(E=o.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR:"+E)),void 0!==i&&i(E)):void 0!==e&&e()}):RUN(function(){var E;try{o.writeFileSync(r,void 0!==a?a:R),void 0!==e&&e()}catch(n){n!==TO_DELETE&&(E=n.toString(),console.log(CONSOLE_RED("[UPPERCASE.JS-WRITE_FILE] ERROR: "+E)),void 0!==i&&i(E))}})})}}}),global.DELETE=DELETE=METHOD({run:function(o,E){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"DELETE"}]),E)}}),global.GET=GET=METHOD({run:function(o,E){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"GET"}]),E)}}),global.POST=POST=METHOD({run:function(o,E){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"POST"}]),E)}}),global.PUT=PUT=METHOD({run:function(o,E){"use strict";REQUEST(COMBINE([CHECK_IS_DATA(o)===!0?o:{uri:o},{method:"PUT"}]),E)}}),global.REQUEST=REQUEST=METHOD(function(){"use strict";var o=require("http"),E=require("https");return{run:function(n,t){var e,i,r,R=n.host,a=n.isSecure,c=void 0===n.port?a!==!0?80:443:n.port,S=n.method,s=n.uri,u=void 0!==n.data?"data="+encodeURIComponent(STRINGIFY(n.data)):n.paramStr;CHECK_IS_DATA(t)!==!0?e=t:(e=t.success,i=t.error),u=(void 0===u?"":u+"&")+Date.now(),S=S.toUpperCase(),"GET"===S?r=(a!==!0?o:E).get({hostname:R,port:c,path:"/"+s+"?"+u},function(o){o.setEncoding("utf-8"),o.on("data",function(o){e(o)})}):(r=(a!==!0?o:E).request({hostname:R,port:c,path:"/"+s,method:S},function(o){o.setEncoding("utf-8"),o.on("data",function(o){e(o)})}),r.write(u),r.end()),r.on("error",function(o){var E=o.toString();console.log(CONSOLE_RED("[UPPERCASE.JS-NODE] REQUEST FAILED: "+E),n),void 0!==i&&i(E)})}}}),global.RESOURCE_SERVER=RESOURCE_SERVER=CLASS(function(o){"use strict";var E,n=require("path"),t=require("querystring");return o.getContentTypeFromURI=E=function(o){var E=n.extname(o);return".png"===E?"image/png":".jpeg"===E||".jpg"===E?"image/jpeg":".gif"===E?"image/gif":".svg"===E?"image/svg+xml":".js"===E?"application/javascript":".json"===E?"application/json":".css"===E?"text/css":".text"===E||".txt"===E?"text/plain":".html"===E?"text/html":".swf"===E?"application/x-shockwave-flash":".mp3"===E?"audio/mpeg":"application/octet-stream"},{init:function(o,n,e,i){var r,R,a,c,S,s=(require("path"),e.port),u=e.securedPort,_=e.rootPath,d=e.version,C={};void 0!==i&&(CHECK_IS_DATA(i)!==!0?r=i:(r=i.requestListener,R=i.error,a=i.notExistsResource)),c=WEB_SERVER(e,function(o,n,e){var i,c,S,s=_,u=o.uri,O=o.uri,v=o.method,T=o.params,f=o.headers,l={};NEXT([function(E){void 0!==r&&(i=r(o,n,e,function(o){s=o},function(o){l=o,E()}),O=o.uri,v=o.method,T=o.params,f=o.headers),i!==!1&&o.isResponsed!==!0&&E()},function(){return function(){CONFIG.isDevMode!==!0&&(l.isFinal!==!0?void 0!==d&&f["if-none-match"]===d:void 0!==f["if-none-match"])?n({statusCode:304}):CONFIG.isDevMode!==!0&&l.isFinal!==!0&&void 0!==d&&""!==u&&T.version!==d?n({statusCode:302,headers:{Location:"/"+u+"?"+t.stringify(COMBINE([T,{version:d}]))}}):"GET"===v&&(c=function(E){void 0!==a&&a(E,o,n),o.isResponsed!==!0&&n({statusCode:404})},S=function(E){console.log(CONSOLE_RED("[UPPERCASE.JS-RESOURCE_SERVER] ERROR: "+E)),void 0!==R&&R(E,o,n),o.isResponsed!==!0&&n({statusCode:500})},NEXT([function(o){var E=C[u];void 0!==E?o(E.buffer,E.contentType):READ_FILE(s+"/"+O,{notExists:function(){READ_FILE(s+(""===O?"":"/"+O)+"/index.html",{notExists:c,error:S,success:function(E){o(E,"text/html")}})},error:S,success:o})},function(){return function(o,t){void 0===t&&(t=E(O)),CONFIG.isDevMode!==!0&&l.isFinal!==!0&&void 0===C[u]&&(C[u]={buffer:o,contentType:t}),n(EXTEND({origin:{buffer:o,contentType:t,version:d},extend:l}))}}]))}}])}),console.log("[UPPERCASE.JS-RESOURCE_SERVER] RUNNING RESOURCE SERVER..."+(void 0===s?"":" (PORT:"+s+")")+(void 0===u?"":" (SECURED PORT:"+u+")")),n.getNativeHTTPServer=S=function(){return c.getNativeHTTPServer()}}}}),global.SOCKET_SERVER=SOCKET_SERVER=METHOD({run:function(o,E){"use strict";var n=require("net"),t=n.createServer(function(o){var n,t,e,i,r={},R=0,a="",c=function(o,E,n){var t=r[o];void 0!==t&&EACH(t,function(o){o(E,function(o){void 0!==n&&i({methodName:"__CALLBACK_"+n,data:o})})})};o.on("data",function(o){var E,n,t;for(a+=o.toString();-1!==(n=a.indexOf("\n"));)E=a.substring(0,n),t=PARSE_STR(E),void 0!==t&&c(t.methodName,t.data,t.sendKey),a=a.substring(n+1)}),o.on("close",function(){n!==!0&&c("__DISCONNECTED"),r=void 0}),o.on("error",function(o){var E=o.toString();console.log("[UPPERCASE.JS-SOCEKT_SERVER] ERROR:",E),c("__ERROR",E)}),E({ip:o.remoteAddress},t=function(o,E){var n=r[o];void 0===n&&(n=r[o]=[]),n.push(E)},e=function(o,E){var n=r[o];void 0!==n&&(void 0!==E?REMOVE({array:n,value:E}):delete r[o])},i=function(E,n){var i="__CALLBACK_"+R;E.sendKey=R,R+=1,o.write(STRINGIFY(E)+"\n"),void 0!==n&&t(i,function(o){n(o),e(i)})},function(){n=!0,o.end()})});t.listen(o),console.log("[UPPERCASE.JS-SOCKET_SERVER] RUNNING SOCKET SERVER... (PORT:"+o+")")}}),global.WEB_SERVER=WEB_SERVER=CLASS(function(o){"use strict";var E,n=require("http"),t=require("querystring"),e=require("zlib");return o.getEncodingFromContentType=E=function(o){return"application/javascript"===o?"utf-8":"application/json"===o?"utf-8":"text/css"===o?"utf-8":"text/plain"===o?"binary":"text/html"===o?"utf-8":"image/png"===o?"binary":"image/jpeg"===o?"binary":"image/gif"===o?"binary":"image/svg+xml"===o?"utf-8":"application/x-shockwave-flash"===o?"binary":"audio/mpeg"===o?"binary":"binary"},{init:function(o,i,r,R){var a,c,S,s,u,_,d,C;CHECK_IS_DATA(r)!==!0?a=r:(a=r.port,c=r.securedPort,S=r.securedKeyFilePath,s=r.securedCertFilePath,u=r.noParsingNativeReqURIs),d=function(o,n){var i,r,a=o.headers,c=o.url,S=o.method.toUpperCase(),s=a["X-Forwarded-For"],_=a["accept-encoding"],d=[];void 0===s&&(s=o.connection.remoteAddress),void 0===_&&(_=""),-1!=c.indexOf("?")&&(i=c.substring(c.indexOf("?")+1),c=c.substring(0,c.indexOf("?"))),c=c.substring(1),NEXT([function(E){"GET"===S||CHECK_IS_IN({array:u,value:c})===!0?E():(o.on("data",function(o){void 0===i&&(i=""),i+=o}),o.on("end",function(){E()}))},function(){return function(){R(r={headers:a,uri:c,method:S,params:t.parse(i),ip:s,cookies:PARSE_COOKIE_STR(a.cookie),nativeReq:o},function(o){var t,i,R,a,c,S,s,u;r.isResponsed!==!0&&(CHECK_IS_DATA(o)!==!0?a=o:(t=o.statusCode,i=o.headers,R=o.contentType,a=o.content,c=o.buffer,S=o.encoding,s=o.version,u=o.isFinal),void 0===t&&(t=200),void 0===i&&(i={}),void 0!==R&&(void 0===S&&(S=E(R)),i["Content-Type"]=R+"; charset="+S),CONFIG.isDevMode!==!0&&(u===!0?i.ETag="FINAL":void 0!==s&&(i.ETag=s)),_.match(/\bgzip\b/)!==TO_DELETE?(i["Content-Encoding"]="gzip",e.gzip(void 0!==c?c:a,function(o,E){n.writeHead(t,i),n.end(E,S)})):(n.writeHead(t,i),n.end(void 0!==c?c:a,S)),r.isResponsed=!0)},function(o){d.push(o)})}}]),CHECK_IS_IN({array:u,value:c})!==!0&&o.on("close",function(){EACH(d,function(o){o()})})},void 0!==a&&(_=n.createServer(d).listen(a)),void 0!==c&&(_=https.createServer({key:fs.readFileSync(S),cert:fs.readFileSync(s)},d).listen(c)),console.log("[UPPERCASE.JS-WEB_SERVER] RUNNING WEB SERVER..."+(void 0===a?"":" (PORT:"+a+")")+(void 0===c?"":" (SECURED PORT:"+c+")")),i.getNativeHTTPServer=C=function(){return _}}}}),global.PARSE_COOKIE_STR=PARSE_COOKIE_STR=METHOD({run:function(o){"use strict";var E,n={};return void 0!==o&&(E=o.split(";"),EACH(E,function(o){var E=o.split("=");n[E[0].trim()]=decodeURIComponent(E[1])})),n}}),global.CREATE_COOKIE_STR_ARRAY=CREATE_COOKIE_STR_ARRAY=METHOD({run:function(o){"use strict";var E=[];return EACH(o,function(o,n){E.push(n+"="+encodeURIComponent(o))}),E}});