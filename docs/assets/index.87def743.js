var e=Object.defineProperty,n=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(n,t,a)=>t in n?e(n,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):n[t]=a,o=(e,n,t)=>(s(e,"symbol"!=typeof n?n+"":n,t),t);import{p as l,a as r,d as i,r as c,b as d,o as u,c as m,e as p,f as v,w as g,n as f,g as h,u as _,h as y,t as b,C as w,i as k,j as E,F as x,k as j,l as S,m as I,q as M,s as N,v as $,x as A,y as L,z as T}from"./vendor.55a3bcfd.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver((e=>{for(const t of e)if("childList"===t.type)for(const e of t.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&n(e)})).observe(document,{childList:!0,subtree:!0})}function n(e){if(e.ep)return;e.ep=!0;const n=function(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?n.credentials="include":"anonymous"===e.crossorigin?n.credentials="omit":n.credentials="same-origin",n}(e);fetch(e.href,n)}}(),l("data-v-5f4d69b4");const C=["onMousedown"];r();var O=i({props:{defaultSplit:{type:Number,default:50}},setup(e){const n=e,{defaultSplit:t}=n,a=c(),s=d({dragging:!1,split:t});function o(){const{split:e}=s;return e<10?10:e>90?90:e}let l=0,r=0;function i(e){s.dragging=!0,l=e.pageX,r=o()}function y(e){if(s.dragging){const n=e.pageX,t=a.value.offsetWidth,o=n-l;s.split=r+~~(o/t*100)}}function b(){s.dragging=!1}return(e,n)=>(u(),m("div",{ref:(e,n)=>{n.container=e,a.value=e},class:h(["split-box",{dragging:_(s).dragging}]),onMousemove:y,onMouseup:b,onMouseleave:b},[p("div",{class:"left",style:f({width:o()+"%"})},[v(e.$slots,"left",{},void 0,!0),p("div",{class:"dragger",onMousedown:g(i,["prevent"])},null,40,C)],4),p("div",{class:"right",style:f({width:100-o()+"%"})},[v(e.$slots,"right",{},void 0,!0)],4)],34))}});O.__scopeId="data-v-5f4d69b4",l("data-v-6855b06d");const P=p("h1",null,[p("span",{class:"text-important"},"iDraw"),p("span",{class:"text"},"Playground")],-1),D={class:"links"},z=p("a",{class:"link-item",target:"_blank",href:"https://www.github.com/idrawjs/idraw"},[p("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2396",width:"100",height:"100"},[p("path",{d:"M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z",fill:"#3c6ea8"})])],-1),B=[p("li",null,[p("a",null,"v0.x")],-1)];r();var H=i({setup(e){const n=c("@0.x"),t=c(!1);async function a(){t.value=!t.value}return y((async()=>{window.addEventListener("click",(()=>{t.value=!1}))})),(e,s)=>(u(),m("nav",null,[P,p("div",D,[z,p("div",{class:"version-selector",onClick:s[0]||(s[0]=g((()=>{}),["stop"]))},[p("span",{class:"active-version",onClick:a}," Version: "+b(n.value),1),p("ul",{class:h(["versions",{expanded:t.value}])},B,2)])])]))}});H.__scopeId="data-v-6855b06d";var J=i({props:{mode:{type:String,default:"htmlmixed"},value:{type:String,default:""},readonly:{type:Boolean,default:!1}},emits:["change"],setup(e,{emit:o}){const l=e,r=c();return y((()=>{const e=w(r.value,((e,o)=>{for(var l in o||(o={}))t.call(o,l)&&s(e,l,o[l]);if(n)for(var l of n(o))a.call(o,l)&&s(e,l,o[l]);return e})({value:"",mode:l.mode,readOnly:l.readonly,tabSize:2,lineWrapping:!0,lineNumbers:!0},{autoCloseBrackets:!0,autoCloseTags:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]}));e.on("change",(()=>{o("change",e.getValue())})),k((()=>{e.setValue(l.value)})),k((()=>{e.setOption("mode",l.mode)})),window.addEventListener("resize",(()=>{e.refresh()})),setTimeout((()=>{e.refresh()}),50)})),(e,n)=>(u(),m("div",{class:"editor",ref:(e,n)=>{n.el=e,r.value=e}},null,512))}});const V=d({urlParams:{demo:"basic"},demoStatus:"LOADING",layout:{showHeader:!0,showSider:!0,defaultEditorSplit:40}});function R(e){V.demoStatus=e}!function(){new URLSearchParams(window.location.search).forEach(((e,n)=>{V.urlParams[n]=e})),"string"==typeof V.urlParams["default-editor-split"]&&parseInt(V.urlParams["default-editor-split"])>0&&(V.layout.defaultEditorSplit=parseInt(V.urlParams["default-editor-split"]));"false"===V.urlParams.header&&(V.layout.showHeader=!1);"false"===V.urlParams.sider&&(V.layout.showSider=!1)}(),l("data-v-0eb87a2b");const U={key:0},F=[j('<div class="loading" data-v-0eb87a2b><div class="loading-container loading-container-1" data-v-0eb87a2b><div class="circle-1" data-v-0eb87a2b></div><div class="circle-2" data-v-0eb87a2b></div><div class="circle-3" data-v-0eb87a2b></div><div class="circle-4" data-v-0eb87a2b></div></div><div class="loading-container loading-container-2" data-v-0eb87a2b><div class="circle-1" data-v-0eb87a2b></div><div class="circle-2" data-v-0eb87a2b></div><div class="circle-3" data-v-0eb87a2b></div><div class="circle-4" data-v-0eb87a2b></div></div><div class="loading-container loading-container-3" data-v-0eb87a2b><div class="circle-1" data-v-0eb87a2b></div><div class="circle-2" data-v-0eb87a2b></div><div class="circle-3" data-v-0eb87a2b></div><div class="circle-4" data-v-0eb87a2b></div></div></div>',1)],W={key:1,class:"error-status"},Z=[p("div",{class:"error-status-logo"},[p("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"200",height:"200"},[p("path",{d:"M517.818182 69.818182C765.207273 69.818182 965.818182 270.429091 965.818182 517.818182S765.207273 965.818182 517.818182 965.818182 69.818182 765.207273 69.818182 517.818182 270.429091 69.818182 517.818182 69.818182z m0 819.991273c205.405091 0 371.991273-166.586182 371.991273-371.991273S723.223273 145.826909 517.818182 145.826909 145.826909 312.413091 145.826909 517.818182s166.586182 371.991273 371.991273 371.991273z m-47.988364-195.979637a48.011636 48.011636 0 1 1 96 0 48.011636 48.011636 0 0 1-96 0zM493.800727 581.818182a8.029091 8.029091 0 0 1-7.982545-8.005818V301.847273c0-4.421818 3.607273-8.005818 8.005818-8.005818h47.988364c4.421818 0 8.005818 3.607273 8.005818 8.005818v271.988363c0 4.421818-3.607273 8.005818-8.005818 8.005819H493.847273z",fill:"#7dc5eb"})])],-1),p("div",{class:"error-status-title"},"Not Found",-1)],G={key:2,class:"error-status"},K=[j('<div class="error-status-logo" data-v-0eb87a2b><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" data-v-0eb87a2b><path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 64a384 384 0 1 0 0 768A384 384 0 0 0 512 128z m-0.704 448.512c98.048 0 187.648 49.472 240.384 129.408l7.68 12.16-55.104 32.64a223.872 223.872 0 0 0-192.96-110.208c-75.968 0-145.28 38.144-186.432 99.776l-7.36 11.776-55.36-32.192a287.872 287.872 0 0 1 249.152-143.36zM384 320v128H320V320h64z m320 0v128h-64V320h64z" fill="#7dc5eb" data-v-0eb87a2b></path></svg></div><div class="error-status-title" data-v-0eb87a2b>Not Finished</div><div class="error-status-title" data-v-0eb87a2b>It will take a while ...</div>',3)];r();var Y=i({setup:e=>(e,n)=>(u(),m(x,null,["LOADING"===_(V).demoStatus?(u(),m("div",U,F)):E("",!0),"NOT_FOUND"===_(V).demoStatus?(u(),m("div",W,Z)):E("",!0),"NOT_FINISHED"===_(V).demoStatus?(u(),m("div",G,K)):E("",!0)],64))});Y.__scopeId="data-v-0eb87a2b";const q=d({files:[],activeIndex:-1,errors:[]});function X(e){q.activeIndex=e}l("data-v-2e319b94");const Q={class:"tab-list"},ee=["onClick"],ne={class:"label"};r();var te=i({setup:e=>(e,n)=>(u(),m("div",Q,[(u(!0),m(x,null,S(_(q).files,((e,n)=>(u(),m("div",{class:h(["tab",{active:n===_(q).activeIndex}]),onClick:e=>_(X)(n)},[p("span",ne,b(e.name),1)],10,ee)))),256))]))});te.__scopeId="data-v-2e319b94",l("data-v-9235c586");const ae={key:0,class:"editor-container"},se={class:"editor-main"};r();var oe=i({setup(e){var n;const t=function(e,n=100){let t;return(...a)=>{t&&clearTimeout(t),t=setTimeout((()=>{e(...a)}),n)}}((e=>{!function(e){q.files[q.activeIndex]&&(q.files[q.activeIndex].code=e)}(e)}),300),a=c((null==(n=q.files[q.activeIndex])?void 0:n.code)||""),s={js:"javascript",css:"css",html:"htmlmixed",json:"javascript"},o=I((()=>{var e;return s[null==(e=q.files[q.activeIndex])?void 0:e.type]}));return M((()=>q.activeIndex),(()=>{var e;a.value=(null==(e=q.files[q.activeIndex])?void 0:e.code)||""})),(e,n)=>"LOADED"===_(V).demoStatus?(u(),m("div",ae,[N(te),p("div",se,[N(J,{onChange:_(t),value:a.value,mode:_(o)},null,8,["onChange","value","mode"])])])):(u(),$(Y,{key:1}))}});oe.__scopeId="data-v-9235c586";let le=1;class re{constructor(e,n){o(this,"iframe"),o(this,"handlers"),o(this,"pending_cmds"),o(this,"handle_event"),this.iframe=e,this.handlers=n,this.pending_cmds=new Map,this.handle_event=e=>this.handle_repl_message(e),window.addEventListener("message",this.handle_event,!1)}destroy(){window.removeEventListener("message",this.handle_event)}iframe_command(e,n){return new Promise(((t,a)=>{const s=le++;this.pending_cmds.set(s,{resolve:t,reject:a}),this.iframe.contentWindow.postMessage({action:e,cmd_id:s,args:n},"*")}))}handle_command_message(e){let n=e.action,t=e.cmd_id,a=this.pending_cmds.get(t);if(a){if(this.pending_cmds.delete(t),"cmd_error"===n){let{message:n,stack:t}=e,s=new Error(n);s.stack=t,a.reject(s)}"cmd_ok"===n&&a.resolve(e.args)}else console.error("command not found",t,e,[...this.pending_cmds.keys()])}handle_repl_message(e){if(e.source!==this.iframe.contentWindow)return;const{action:n,args:t}=e.data;switch(n){case"cmd_error":case"cmd_ok":return this.handle_command_message(e.data);case"fetch_progress":return this.handlers.on_fetch_progress(t.remaining);case"error":return this.handlers.on_error(e.data);case"unhandledrejection":return this.handlers.on_unhandled_rejection(e.data);case"console":return this.handlers.on_console(e.data);case"console_group":return this.handlers.on_console_group(e.data);case"console_group_collapsed":return this.handlers.on_console_group_collapsed(e.data);case"console_group_end":return this.handlers.on_console_group_end(e.data)}}eval(e){return this.iframe_command("eval",{script:e})}handle_links(){return this.iframe_command("catch_clicks",{})}}const ie=[{name:"Quick Start",list:[{name:"Basic",key:"basic"},{name:"Options",key:"options"},{name:"Config",key:"config"}]},{name:"Elements' Types",list:[{name:"Text",key:"elem-text",exclude:["data.js"]},{name:"Rect",key:"elem-rect",exclude:["data.js"]},{name:"Circle",key:"elem-circle",exclude:["data.js"]},{name:"Image",key:"elem-image",exclude:["data.js"]},{name:"SVG",key:"elem-svg",exclude:["data.js"]},{name:"HTML",key:"elem-html",exclude:["data.js"]}]},{name:"iDraw API",list:[{name:"setData",key:"api-setData"},{name:"getData",key:"api-getData"},{name:"resetSize",key:"api-resetSize"},{name:"selectElement",key:"api-selectElement"},{name:"selectElementByIndex",key:"api-selectElementByIndex"},{name:"getSelectedElements",key:"api-getSelectedElements"},{name:"updateElement",key:"api-updateElement"},{name:"addElement",key:"api-addElement"},{name:"deleteElement",key:"api-deleteElement"},{name:"moveDownElement",key:"api-moveDownElement"},{name:"moveUpElement",key:"api-moveUpElement"},{name:"insertElementBefore",key:"api-insertElementBefore"},{name:"insertElementAfter",key:"api-insertElementAfter"},{name:"insertElementBeforeIndex",key:"api-insertElementBeforeIndex"},{name:"insertElementAfterIndex",key:"api-insertElementAfterIndex"},{name:"scale",key:"api-scale"},{name:"scrollLeft",key:"api-scrollLeft"},{name:"scrollTop",key:"api-scrollTop"},{name:"on",key:"api-on"},{name:"off",key:"api-off"}]}];var ce={hash:"a32e13d5e50e1e8862757326da"};function de(e){return new Promise(((n,t)=>{fetch(e).then((e=>{if(200===e.status)return e.text().then((e=>{n(e)})).catch(t);t(e)})).catch(t)}))}let ue="./../../public";async function me(e){const n=[],t=function(e){for(let n=0;n<ie.length;n++){const t=ie[n].list;for(let n=0;n<t.length;n++){const a=t[n]||{};if(a.key===e)return a}}return null}(e);if(null===t)return[];try{const t=await de(`.//demo/${e}/index.js`);n.push({name:"index.js",fileName:"index.js",code:pe(t),type:"js"})}catch(a){console.log(a)}try{if(!Array.isArray(t.exclude)||!t.exclude.includes("data.js")){const t=await de(`.//demo/${e}/data.js?v=${(null==ce?void 0:ce.hash)||""}`);n.push({name:"data.js",fileName:"data.js",code:pe(t),type:"js"})}}catch(a){console.log(a)}try{const t=await de(`.//demo/${e}/index.html?v=${(null==ce?void 0:ce.hash)||""}`);n.push({name:"html",fileName:"index.html",code:t,type:"html"})}catch(a){console.log(a)}try{let t=await de(`.//demo/${e}/index.css?v=${(null==ce?void 0:ce.hash)||""}`);0,n.push({name:"css",fileName:"index.css",code:t,type:"css"})}catch(a){console.log(a)}try{const t=await de(`.//demo/${e}/import-map.json?v=${(null==ce?void 0:ce.hash)||""}`);n.push({name:"import-map",fileName:"import-map.json",code:t,type:"json"})}catch(a){console.log(a)}return n}function pe(e){const n=/\'\/node_modules\/\.vite\/([\w]+)\.js\?v=[0-9a-zA_Z]{1,}\'/;let t=e.replace(n,(e=>{let t="''";const a=null==n?void 0:n.exec(e);return a&&a[1]&&(t=`'${a[1]}'`),t}));const a=/\'\/public\/demo\/[0-9a-zA-Z\-\_]{1,}\/([0-9a-zA-Z\-\_]+)\.(js\?t=[0-9]{1,}|js)\'/;return t=t.replace(a,(e=>{let n="'./'";const t=null==a?void 0:a.exec(e);return t&&t[1]&&(n=`'./${t[1]}'`),n})),t}ue="./";var ve=i({setup(e){const n=c(),t=c(),a=c();let s,o;function l(){s&&(o.destroy(),n.value.removeChild(s));const e=function(e){const n={html:"",css:"",js:"",datajs:"",importmap:"{}"};for(let t=0;t<e.length;t++)"index.html"===e[t].fileName?n.html=e[t].code:"index.css"===e[t].fileName?n.css=e[t].code:"index.js"===e[t].fileName?n.js=e[t].code:"data.js"===e[t].fileName?n.datajs=e[t].code:"import-map.json"===e[t].fileName&&(n.importmap=e[t].code);return n}(q.files);s=document.createElement("iframe"),s.setAttribute("sandbox",["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts","allow-top-navigation-by-user-activation"].join(" "));const l=function(e){return"<!doctype html>\n<html>\n  <head>\n    <style>\n      body {\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,\n        Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n      }\n    </style>\n    \x3c!--__INJECT_STYLE__--\x3e\n    <script>\n      (() => {\n        let scriptEls = []\n\n        window.__modules__ = {}\n\n        window.__export__ = (mod, key, get) => {\n          Object.defineProperty(mod, key, {\n            enumerable: true,\n            configurable: true,\n            get\n          })\n        }\n\n        window.__dynamic_import__ = key => {\n          return Promise.resolve(window.__modules__[key])\n        }\n\n        async function handle_message(ev) {\n          let { action, cmd_id } = ev.data;\n          const send_message = (payload) => parent.postMessage( { ...payload }, ev.origin);\n          const send_reply = (payload) => send_message({ ...payload, cmd_id });\n          const send_ok = () => send_reply({ action: 'cmd_ok' });\n          const send_error = (message, stack) => send_reply({ action: 'cmd_error', message, stack });\n\n          if (action === 'eval') {\n            try {\n              if (scriptEls.length) {\n                scriptEls.forEach(el => {\n                  document.head.removeChild(el)\n                })\n                scriptEls.length = 0\n              }\n\n              let { script: scripts } = ev.data.args\n              if (typeof scripts === 'string') scripts = [scripts]\n\n              for (const script of scripts) {\n                const scriptEl = document.createElement('script')\n                scriptEl.setAttribute('type', 'module')\n                // send ok in the module script to ensure sequential evaluation\n                // of multiple proxy.eval() calls\n                const done = new Promise((resolve) => {\n                  window.__next__ = resolve\n                })\n                scriptEl.innerHTML = script + `\\nwindow.__next__()`\n                document.head.appendChild(scriptEl)\n                scriptEl.onrror = err => send_error(err.message, err.stack)\n                scriptEls.push(scriptEl)\n                await done\n              }\n              window.__next__ = undefined\n              send_ok()\n            } catch (e) {\n              send_error(e.message, e.stack);\n            }\n          }\n\n          if (action === 'catch_clicks') {\n            try {\n              const top_origin = ev.origin;\n              document.body.addEventListener('click', event => {\n                if (event.which !== 1) return;\n                if (event.metaKey || event.ctrlKey || event.shiftKey) return;\n                if (event.defaultPrevented) return;\n\n                // ensure target is a link\n                let el = event.target;\n                while (el && el.nodeName !== 'A') el = el.parentNode;\n                if (!el || el.nodeName !== 'A') return;\n\n                if (el.hasAttribute('download') || el.getAttribute('rel') === 'external' || el.target) return;\n\n                event.preventDefault();\n\n                if (el.href.startsWith(top_origin)) {\n                  const url = new URL(el.href);\n                  if (url.hash[0] === '#') {\n                    window.location.hash = url.hash;\n                    return;\n                  }\n                }\n\n                window.open(el.href, '_blank');\n              });\n              send_ok();\n            } catch(e) {\n              send_error(e.message, e.stack);\n            }\n          }\n        }\n\n        window.addEventListener('message', handle_message, false);\n\n        window.onerror = function (msg, url, lineNo, columnNo, error) {\n          if (msg.includes('module specifier “vue”')) {\n            // firefox only error, ignore\n            return false\n          }\n          try {\n            parent.postMessage({ action: 'error', value: error }, '*');\n          } catch (e) {\n            parent.postMessage({ action: 'error', value: msg }, '*');\n          }\n        }\n\n        window.addEventListener(\"unhandledrejection\", event => {\n          if (event.reason.message.includes('Cross-origin')) {\n            event.preventDefault()\n            return\n          }\n          try {\n            parent.postMessage({ action: 'unhandledrejection', value: event.reason }, '*');\n          } catch (e) {\n            parent.postMessage({ action: 'unhandledrejection', value: event.reason.message }, '*');\n          }\n        });\n\n        let previous = { level: null, args: null };\n\n        ['clear', 'log', 'info', 'dir', 'warn', 'error', 'table'].forEach((level) => {\n          const original = console[level];\n          console[level] = (...args) => {\n            const msg = String(args[0])\n            if (\n              msg.includes('You are running a development build of Vue') ||\n              msg.includes('You are running the esm-bundler build of Vue')\n            ) {\n              return\n            }\n            const stringifiedArgs = stringify(args);\n            if (\n              previous.level === level &&\n              previous.args &&\n              previous.args === stringifiedArgs\n            ) {\n              parent.postMessage({ action: 'console', level, duplicate: true }, '*');\n            } else {\n              previous = { level, args: stringifiedArgs };\n\n              try {\n                parent.postMessage({ action: 'console', level, args }, '*');\n              } catch (err) {\n                parent.postMessage({ action: 'console', level, args: args.map(a => {\n                  return a instanceof Error ? a.message : String(a)\n                }) }, '*');\n              }\n            }\n\n            original(...args);\n          }\n        });\n\n        [\n          { method: 'group', action: 'console_group' },\n          { method: 'groupEnd', action: 'console_group_end' },\n          { method: 'groupCollapsed', action: 'console_group_collapsed' },\n        ].forEach((group_action) => {\n          const original = console[group_action.method];\n          console[group_action.method] = (label) => {\n            parent.postMessage({ action: group_action.action, label }, '*');\n\n            original(label);\n          };\n        });\n\n        const timers = new Map();\n        const original_time = console.time;\n        const original_timelog = console.timeLog;\n        const original_timeend = console.timeEnd;\n\n        console.time = (label = 'default') => {\n          original_time(label);\n          timers.set(label, performance.now());\n        }\n        console.timeLog = (label = 'default') => {\n          original_timelog(label);\n          const now = performance.now();\n          if (timers.has(label)) {\n            parent.postMessage({ action: 'console', level: 'system-log', args: [`${label}: ${now - timers.get(label)}ms`] }, '*');\n          } else {\n            parent.postMessage({ action: 'console', level: 'system-warn', args: [`Timer '${label}' does not exist`] }, '*');\n          }\n        }\n        console.timeEnd = (label = 'default') => {\n          original_timeend(label);\n          const now = performance.now();\n          if (timers.has(label)) {\n            parent.postMessage({ action: 'console', level: 'system-log', args: [`${label}: ${now - timers.get(label)}ms`] }, '*');\n          } else {\n            parent.postMessage({ action: 'console', level: 'system-warn', args: [`Timer '${label}' does not exist`] }, '*');\n          }\n          timers.delete(label);\n        };\n\n        const original_assert = console.assert;\n        console.assert = (condition, ...args) => {\n          if (condition) {\n            const stack = new Error().stack;\n            parent.postMessage({ action: 'console', level: 'assert', args, stack }, '*');\n          }\n          original_assert(condition, ...args);\n        };\n\n        const counter = new Map();\n        const original_count = console.count;\n        const original_countreset = console.countReset;\n\n        console.count = (label = 'default') => {\n          counter.set(label, (counter.get(label) || 0) + 1);\n          parent.postMessage({ action: 'console', level: 'system-log', args: `${label}: ${counter.get(label)}` }, '*');\n          original_count(label);\n        };\n\n        console.countReset = (label = 'default') => {\n          if (counter.has(label)) {\n            counter.set(label, 0);\n          } else {\n            parent.postMessage({ action: 'console', level: 'system-warn', args: `Count for '${label}' does not exist` }, '*');\n          }\n          original_countreset(label);\n        };\n\n        const original_trace = console.trace;\n\n        console.trace = (...args) => {\n          const stack = new Error().stack;\n          parent.postMessage({ action: 'console', level: 'trace', args, stack }, '*');\n          original_trace(...args);\n        };\n\n        function stringify(args) {\n          try {\n            return JSON.stringify(args);\n          } catch (error) {\n            return null;\n          }\n        }\n      })()\n    <\/script>\n    \x3c!-- <script async src=\"/lib/es-module-shims/es-module-shims.js\"><\/script> --\x3e\n    <script src=\"./lib/idraw/0.x/index.global.js\"><\/script>\n    \x3c!--__INJECT_IMPORTMAP__--\x3e\n  </head>\n  <body>\n    \x3c!--__INJECT_HTML__--\x3e\n    \x3c!--__INJECT_JS__--\x3e\n  </body>\n</html>".replace(/<!--__INJECT_STYLE__-->/,`<style>${e.css}</style>`).replace(/<!--__INJECT_IMPORTMAP__-->/,`<script type="importmap">${e.importmap}<\/script>`).replace(/<!--__INJECT_HTML__-->/,e.html.replace(/<script[\s\S]*?<\/script>/gi,"")).replace(/<!--__INJECT_JS__-->/,`<script type="module">${function(e){const n=/import[\s]{1,}([a-zA-Z\_]+)[\s]{1,}from[\s]{1,}\'\.\/data\'/;let t=e.js;t=t.replace(n,(t=>{const a=null==n?void 0:n.exec(t);let s=t;if(a&&a[1]){const n=`${a[1]}`,t=/export[\s]{1,}default[\s]{1,}\{/;e.datajs&&t.test(`${e.datajs}`)&&(s=`const ${n} = ${e.datajs.replace(t,"{")}`)}return s}));const a=/import[\s]{1,}([a-zA-Z\_]+)[\s]{1,}from[\s]{1,}\'idraw\'/;return t=t.replace(a,(e=>{const n=null==a?void 0:a.exec(e);let t=e;return n&&n[1]&&(t=`const ${n[1]} = window.iDraw`),t})),t}(e)}<\/script>`)}(e);s.srcdoc=l,n.value.appendChild(s),o=new re(s,{on_fetch_progress:e=>{},on_error:e=>{const n=e.value instanceof Error?e.value.message:e.value;n.includes("Failed to resolve module specifier")||n.includes("Error resolving module specifier")?t.value=n.replace(/\. Relative references must.*$/,"")+'.\nTip: add an "import-map.json" file to specify import paths for dependencies.':t.value=e.value},on_unhandled_rejection:e=>{let n=e.value;"string"==typeof n&&(n={message:n}),t.value="Uncaught (in promise): "+n.message},on_console:e=>{e.duplicate||("error"===e.level?e.args[0]instanceof Error?t.value=e.args[0].message:t.value=e.args[0]:"warn"===e.level&&e.args[0].toString().includes("[Vue warn]")&&(a.value=e.args.join("").replace(/\[Vue warn\]:/,"").trim()))},on_console_group:e=>{},on_console_group_end:()=>{},on_console_group_collapsed:e=>{}})}return y(l),A((()=>{o.destroy()})),M((()=>{var e,n,t,a,s;return[null==(e=null==q?void 0:q.files[0])?void 0:e.code,null==(n=null==q?void 0:q.files[1])?void 0:n.code,null==(t=null==q?void 0:q.files[2])?void 0:t.code,null==(a=null==q?void 0:q.files[3])?void 0:a.code,null==(s=null==q?void 0:q.files[4])?void 0:s.code]}),(()=>{l()})),(e,t)=>(u(),m(x,null,["LOADED"!==_(V).demoStatus?(u(),$(Y,{key:0})):E("",!0),p("div",{class:h({"preview-container":"LOADED"===_(V).demoStatus,"preview-hide":"LOADED"!==_(V).demoStatus}),ref:(e,t)=>{t.container=e,n.value=e}},null,2)],64))}});l("data-v-702d1014");const ge={class:"sider-container"},fe={class:"sider-menu"},he={class:"sider-menu-title"},_e={class:"sider-menu-list"},ye=["href"];r();var be=i({setup(e){function n(e){const n=Object.keys(V.urlParams),t=[];return n.forEach((n=>{"demo"===n?t.push(`demo=${e}`):t.push(`${n}=${V.urlParams[n]||""}`)})),`?${t.join("&")}`}return(e,t)=>(u(),m("div",ge,[(u(!0),m(x,null,S(_(ie),(e=>(u(),m("div",fe,[p("div",he,b(e.name),1),p("div",_e,[(u(!0),m(x,null,S(e.list,(e=>(u(),m("a",{class:h(["sider-menu-item",{active:e.key===_(V).urlParams.demo}]),href:n(e.key)},[p("span",null,b(e.name),1)],10,ye)))),256))])])))),256))]))}});be.__scopeId="data-v-702d1014";T(i({setup:e=>(async function(){const e=(n="demo",new URLSearchParams(window.location.search).get(n)||"basic");var n;try{if(function(e){for(let n=0;n<ie.length;n++){const t=ie[n].list;for(let n=0;n<t.length;n++)if((t[n]||{}).key===e)return!0}return!1}(e)){const n=await me(e);!function(e){for(;q.files.length>0;)q.files.pop();e.forEach((e=>{q.files.push(e)})),X(0)}(n),n.length>0?R("LOADED"):R("NOT_FINISHED")}else R("NOT_FOUND")}catch(t){console.log(t)}}(),(e,n)=>(u(),m(x,null,[_(V).layout.showHeader?(u(),$(H,{key:0})):E("",!0),p("div",{class:h(["container",{"no-header":!_(V).layout.showHeader}])},[_(V).layout.showSider?(u(),$(O,{key:0,defaultSplit:15},{left:L((()=>[N(be)])),right:L((()=>[N(O,{defaultSplit:_(V).layout.defaultEditorSplit},{left:L((()=>[N(oe)])),right:L((()=>[N(ve)])),_:1},8,["defaultSplit"])])),_:1})):(u(),$(O,{key:1,defaultSplit:_(V).layout.defaultEditorSplit},{left:L((()=>[N(oe)])),right:L((()=>[N(ve)])),_:1},8,["defaultSplit"]))],2)],64)))})).mount("#app");
