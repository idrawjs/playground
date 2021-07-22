var e=Object.defineProperty,n=Object.getOwnPropertySymbols,s=Object.prototype.hasOwnProperty,t=Object.prototype.propertyIsEnumerable,o=(n,s,t)=>s in n?e(n,s,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[s]=t;import{d as a,r,a as l,o as i,c,b as d,e as u,w as p,u as m,f as g,t as _,C as v,g as f,p as h,h as w,F as y,i as b,j as x,k as j,l as E,m as k,n as M}from"./vendor.22bb42bc.js";var C=a({setup(e){const n=r(),s=l({dragging:!1,split:50});function t(){const{split:e}=s;return e<20?20:e>80?80:e}let o=0,a=0;function g(e){s.dragging=!0,o=e.pageX,a=t()}function _(e){if(s.dragging){const t=e.pageX,r=n.value.offsetWidth,l=t-o;s.split=a+~~(l/r*100)}}function v(){s.dragging=!1}return(e,o)=>(i(),c("div",{ref:n,class:["split-box",{dragging:m(s).dragging}],onMousemove:_,onMouseup:v,onMouseleave:v},[d("div",{class:"left",style:{width:t()+"%"}},[u(e.$slots,"left",{},void 0,!0),d("div",{class:"dragger",onMousedown:p(g,["prevent"])},null,40,["onMousedown"])],4),d("div",{class:"right",style:{width:100-t()+"%"}},[u(e.$slots,"right",{},void 0,!0)],4)],34))}});C.__scopeId="data-v-5b6a2e03";const N=d("h1",null,[d("span",null,"iDraw Playground")],-1),$={class:"links"},I=d("li",null,[d("a",null,"v0.0.1"),d("a",null,"v0.0.2"),d("a",null,"v0.0.3")],-1);var T=a({setup(e){const n=r("@0.0.1"),s=r(!1);async function t(){s.value=!s.value}return g((async()=>{window.addEventListener("click",(()=>{s.value=!1}))})),(e,o)=>(i(),c("nav",null,[N,d("div",$,[d("div",{class:"version",onClick:o[1]||(o[1]=p((()=>{}),["stop"]))},[d("span",{class:"active-version",onClick:t}," Version: "+_(n.value),1),d("ul",{class:["versions",{expanded:s.value}]},[I],2)])])]))}}),S=a({props:{mode:{type:String,default:"htmlmixed"},value:{type:String,default:""},readonly:{type:Boolean,default:!1}},emits:["change"],setup(e,{emit:a}){const l=e,d=r();return g((()=>{const e=v(d.value,((e,a)=>{for(var r in a||(a={}))s.call(a,r)&&o(e,r,a[r]);if(n)for(var r of n(a))t.call(a,r)&&o(e,r,a[r]);return e})({value:"",mode:l.mode,readOnly:l.readonly,tabSize:2,lineWrapping:!0,lineNumbers:!0},{autoCloseBrackets:!0,autoCloseTags:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]}));e.on("change",(()=>{a("change",e.getValue())})),f((()=>{e.setValue(l.value)})),f((()=>{e.setOption("mode",l.mode)})),window.addEventListener("resize",(()=>{e.refresh()})),setTimeout((()=>{e.refresh()}),50)})),(e,n)=>(i(),c("div",{class:"editor",ref:d},null,512))}});const L=l({files:[],activeIndex:-1,errors:[]});function P(e){L.activeIndex=e}h("data-v-2e319b94");const A={class:"tab-list"},O={class:"label"};w();var J=a({setup:e=>(e,n)=>(i(),c("div",A,[(i(!0),c(y,null,b(m(L).files,((e,n)=>(i(),c("div",{class:["tab",{active:n===m(L).activeIndex}],onClick:e=>m(P)(n)},[d("span",O,_(e.name),1)],10,["onClick"])))),256))]))});J.__scopeId="data-v-2e319b94",h("data-v-23b9671c");const R={class:"editor-container"};w();var V=a({setup(e){var n;const s=function(e,n=100){let s;return(...t)=>{s&&clearTimeout(s),s=setTimeout((()=>{e(...t)}),n)}}((e=>{!function(e){L.files[L.activeIndex]&&(L.files[L.activeIndex].code=e)}(e)}),300),t=r((null==(n=L.files[L.activeIndex])?void 0:n.code)||""),o={js:"javascript",css:"css",html:"htmlmixed",json:"javascript"},a=x((()=>{var e;return o[null==(e=L.files[L.activeIndex])?void 0:e.type]}));return j((()=>L.activeIndex),(()=>{var e;t.value=(null==(e=L.files[L.activeIndex])?void 0:e.code)||""})),(e,n)=>(i(),c(y,null,[d(J),d("div",R,[d(S,{onChange:m(s),value:t.value,mode:m(a)},null,8,["onChange","value","mode"])])],64))}});V.__scopeId="data-v-23b9671c";let z=1;class U{constructor(e,n){this.iframe=e,this.handlers=n,this.pending_cmds=new Map,this.handle_event=e=>this.handle_repl_message(e),window.addEventListener("message",this.handle_event,!1)}destroy(){window.removeEventListener("message",this.handle_event)}iframe_command(e,n){return new Promise(((s,t)=>{const o=z++;this.pending_cmds.set(o,{resolve:s,reject:t}),this.iframe.contentWindow.postMessage({action:e,cmd_id:o,args:n},"*")}))}handle_command_message(e){let n=e.action,s=e.cmd_id,t=this.pending_cmds.get(s);if(t){if(this.pending_cmds.delete(s),"cmd_error"===n){let{message:n,stack:s}=e,o=new Error(n);o.stack=s,t.reject(o)}"cmd_ok"===n&&t.resolve(e.args)}else console.error("command not found",s,e,[...this.pending_cmds.keys()])}handle_repl_message(e){if(e.source!==this.iframe.contentWindow)return;const{action:n,args:s}=e.data;switch(n){case"cmd_error":case"cmd_ok":return this.handle_command_message(e.data);case"fetch_progress":return this.handlers.on_fetch_progress(s.remaining);case"error":return this.handlers.on_error(e.data);case"unhandledrejection":return this.handlers.on_unhandled_rejection(e.data);case"console":return this.handlers.on_console(e.data);case"console_group":return this.handlers.on_console_group(e.data);case"console_group_collapsed":return this.handlers.on_console_group_collapsed(e.data);case"console_group_end":return this.handlers.on_console_group_end(e.data)}}eval(e){return this.iframe_command("eval",{script:e})}handle_links(){return this.iframe_command("catch_clicks",{})}}function W(e){return new Promise(((n,s)=>{fetch(e).then((e=>e.text())).then((e=>{n(e)})).catch(s)}))}let H="./../../public";function Y(e){const n=/\'\/node_modules\/\.vite\/([\w]+)\.js\?v=[0-9a-zA_Z]{1,}\'/;let s=e.replace(n,(e=>{let s="''";const t=null==n?void 0:n.exec(e);return t&&t[1]&&(s=`'${t[1]}'`),s}));const t=/\'\/public\/demo\/([\w]+)\/([0-9a-zA_Z]+)\.js\?t\=[0-9]{1,}\'/;return s=s.replace(t,(e=>{let n="'./'";const s=null==t?void 0:t.exec(e);return s&&s[2]&&(n=`'./${s[2]}'`),n})),s}H="./";var B=a({setup(e){const n=r(),s=r(),t=r();let o,a;function l(){o&&(a.destroy(),n.value.removeChild(o));const e=function(e){const n={html:"",css:"",js:"",datajs:"",importmap:"{}"};for(let s=0;s<e.length;s++)"index.html"===e[s].fileName?n.html=e[s].code:"index.css"===e[s].fileName?n.css=e[s].code:"index.js"===e[s].fileName?n.js=e[s].code:"data.js"===e[s].fileName?n.datajs=e[s].code:"import-map.json"===e[s].fileName&&(n.importmap=e[s].code);return n}(L.files);o=document.createElement("iframe"),o.setAttribute("sandbox",["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts","allow-top-navigation-by-user-activation"].join(" "));const r=function(e){return"<!doctype html>\n<html>\n  <head>\n    <style>\n      body {\n        font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,\n        Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n      }\n    </style>\n    \x3c!--__INJECT_STYLE__--\x3e\n    <script>\n      (() => {\n        let scriptEls = []\n\n        window.__modules__ = {}\n\n        window.__export__ = (mod, key, get) => {\n          Object.defineProperty(mod, key, {\n            enumerable: true,\n            configurable: true,\n            get\n          })\n        }\n\n        window.__dynamic_import__ = key => {\n          return Promise.resolve(window.__modules__[key])\n        }\n\n        async function handle_message(ev) {\n          let { action, cmd_id } = ev.data;\n          const send_message = (payload) => parent.postMessage( { ...payload }, ev.origin);\n          const send_reply = (payload) => send_message({ ...payload, cmd_id });\n          const send_ok = () => send_reply({ action: 'cmd_ok' });\n          const send_error = (message, stack) => send_reply({ action: 'cmd_error', message, stack });\n\n          if (action === 'eval') {\n            try {\n              if (scriptEls.length) {\n                scriptEls.forEach(el => {\n                  document.head.removeChild(el)\n                })\n                scriptEls.length = 0\n              }\n\n              let { script: scripts } = ev.data.args\n              if (typeof scripts === 'string') scripts = [scripts]\n\n              for (const script of scripts) {\n                const scriptEl = document.createElement('script')\n                scriptEl.setAttribute('type', 'module')\n                // send ok in the module script to ensure sequential evaluation\n                // of multiple proxy.eval() calls\n                const done = new Promise((resolve) => {\n                  window.__next__ = resolve\n                })\n                scriptEl.innerHTML = script + `\\nwindow.__next__()`\n                document.head.appendChild(scriptEl)\n                scriptEl.onrror = err => send_error(err.message, err.stack)\n                scriptEls.push(scriptEl)\n                await done\n              }\n              window.__next__ = undefined\n              send_ok()\n            } catch (e) {\n              send_error(e.message, e.stack);\n            }\n          }\n\n          if (action === 'catch_clicks') {\n            try {\n              const top_origin = ev.origin;\n              document.body.addEventListener('click', event => {\n                if (event.which !== 1) return;\n                if (event.metaKey || event.ctrlKey || event.shiftKey) return;\n                if (event.defaultPrevented) return;\n\n                // ensure target is a link\n                let el = event.target;\n                while (el && el.nodeName !== 'A') el = el.parentNode;\n                if (!el || el.nodeName !== 'A') return;\n\n                if (el.hasAttribute('download') || el.getAttribute('rel') === 'external' || el.target) return;\n\n                event.preventDefault();\n\n                if (el.href.startsWith(top_origin)) {\n                  const url = new URL(el.href);\n                  if (url.hash[0] === '#') {\n                    window.location.hash = url.hash;\n                    return;\n                  }\n                }\n\n                window.open(el.href, '_blank');\n              });\n              send_ok();\n            } catch(e) {\n              send_error(e.message, e.stack);\n            }\n          }\n        }\n\n        window.addEventListener('message', handle_message, false);\n\n        window.onerror = function (msg, url, lineNo, columnNo, error) {\n          if (msg.includes('module specifier “vue”')) {\n            // firefox only error, ignore\n            return false\n          }\n          try {\n            parent.postMessage({ action: 'error', value: error }, '*');\n          } catch (e) {\n            parent.postMessage({ action: 'error', value: msg }, '*');\n          }\n        }\n\n        window.addEventListener(\"unhandledrejection\", event => {\n          if (event.reason.message.includes('Cross-origin')) {\n            event.preventDefault()\n            return\n          }\n          try {\n            parent.postMessage({ action: 'unhandledrejection', value: event.reason }, '*');\n          } catch (e) {\n            parent.postMessage({ action: 'unhandledrejection', value: event.reason.message }, '*');\n          }\n        });\n\n        let previous = { level: null, args: null };\n\n        ['clear', 'log', 'info', 'dir', 'warn', 'error', 'table'].forEach((level) => {\n          const original = console[level];\n          console[level] = (...args) => {\n            const msg = String(args[0])\n            if (\n              msg.includes('You are running a development build of Vue') ||\n              msg.includes('You are running the esm-bundler build of Vue')\n            ) {\n              return\n            }\n            const stringifiedArgs = stringify(args);\n            if (\n              previous.level === level &&\n              previous.args &&\n              previous.args === stringifiedArgs\n            ) {\n              parent.postMessage({ action: 'console', level, duplicate: true }, '*');\n            } else {\n              previous = { level, args: stringifiedArgs };\n\n              try {\n                parent.postMessage({ action: 'console', level, args }, '*');\n              } catch (err) {\n                parent.postMessage({ action: 'console', level, args: args.map(a => {\n                  return a instanceof Error ? a.message : String(a)\n                }) }, '*');\n              }\n            }\n\n            original(...args);\n          }\n        });\n\n        [\n          { method: 'group', action: 'console_group' },\n          { method: 'groupEnd', action: 'console_group_end' },\n          { method: 'groupCollapsed', action: 'console_group_collapsed' },\n        ].forEach((group_action) => {\n          const original = console[group_action.method];\n          console[group_action.method] = (label) => {\n            parent.postMessage({ action: group_action.action, label }, '*');\n\n            original(label);\n          };\n        });\n\n        const timers = new Map();\n        const original_time = console.time;\n        const original_timelog = console.timeLog;\n        const original_timeend = console.timeEnd;\n\n        console.time = (label = 'default') => {\n          original_time(label);\n          timers.set(label, performance.now());\n        }\n        console.timeLog = (label = 'default') => {\n          original_timelog(label);\n          const now = performance.now();\n          if (timers.has(label)) {\n            parent.postMessage({ action: 'console', level: 'system-log', args: [`${label}: ${now - timers.get(label)}ms`] }, '*');\n          } else {\n            parent.postMessage({ action: 'console', level: 'system-warn', args: [`Timer '${label}' does not exist`] }, '*');\n          }\n        }\n        console.timeEnd = (label = 'default') => {\n          original_timeend(label);\n          const now = performance.now();\n          if (timers.has(label)) {\n            parent.postMessage({ action: 'console', level: 'system-log', args: [`${label}: ${now - timers.get(label)}ms`] }, '*');\n          } else {\n            parent.postMessage({ action: 'console', level: 'system-warn', args: [`Timer '${label}' does not exist`] }, '*');\n          }\n          timers.delete(label);\n        };\n\n        const original_assert = console.assert;\n        console.assert = (condition, ...args) => {\n          if (condition) {\n            const stack = new Error().stack;\n            parent.postMessage({ action: 'console', level: 'assert', args, stack }, '*');\n          }\n          original_assert(condition, ...args);\n        };\n\n        const counter = new Map();\n        const original_count = console.count;\n        const original_countreset = console.countReset;\n\n        console.count = (label = 'default') => {\n          counter.set(label, (counter.get(label) || 0) + 1);\n          parent.postMessage({ action: 'console', level: 'system-log', args: `${label}: ${counter.get(label)}` }, '*');\n          original_count(label);\n        };\n\n        console.countReset = (label = 'default') => {\n          if (counter.has(label)) {\n            counter.set(label, 0);\n          } else {\n            parent.postMessage({ action: 'console', level: 'system-warn', args: `Count for '${label}' does not exist` }, '*');\n          }\n          original_countreset(label);\n        };\n\n        const original_trace = console.trace;\n\n        console.trace = (...args) => {\n          const stack = new Error().stack;\n          parent.postMessage({ action: 'console', level: 'trace', args, stack }, '*');\n          original_trace(...args);\n        };\n\n        function stringify(args) {\n          try {\n            return JSON.stringify(args);\n          } catch (error) {\n            return null;\n          }\n        }\n      })()\n    <\/script>\n    \x3c!--__INJECT_IMPORTMAP__--\x3e\n  </head>\n  <body>\n    \x3c!--__INJECT_HTML__--\x3e\n    \x3c!--__INJECT_JS__--\x3e\n  </body>\n</html>".replace(/<!--__INJECT_STYLE__-->/,`<style>${e.css}</style>`).replace(/<!--__INJECT_IMPORTMAP__-->/,`<script type="importmap">${e.importmap}<\/script>`).replace(/<!--__INJECT_HTML__-->/,e.html.replace(/<script[\s\S]*?<\/script>/gi,"")).replace(/<!--__INJECT_JS__-->/,`<script type="module">${function(e){const n=/import[\s]{1,}([a-zA-Z\_]+)[\s]{1,}from[\s]{1,}\'\.\/data\'/;return e.js.replace(n,(s=>{const t=null==n?void 0:n.exec(s);let o=s;if(t&&t[1]){const n=`${t[1]}`,s=/export[\s]{1,}default[\s]{1,}\{/;e.datajs&&s.test(`${e.datajs}`)&&(o=`const ${n} = ${e.datajs.replace(s,"{")}`)}return o}))}(e)}<\/script>`)}(e);o.srcdoc=r,n.value.appendChild(o),a=new U(o,{on_fetch_progress:e=>{},on_error:e=>{const n=e.value instanceof Error?e.value.message:e.value;n.includes("Failed to resolve module specifier")||n.includes("Error resolving module specifier")?s.value=n.replace(/\. Relative references must.*$/,"")+'.\nTip: add an "import-map.json" file to specify import paths for dependencies.':s.value=e.value},on_unhandled_rejection:e=>{let n=e.value;"string"==typeof n&&(n={message:n}),s.value="Uncaught (in promise): "+n.message},on_console:e=>{e.duplicate||("error"===e.level?e.args[0]instanceof Error?s.value=e.args[0].message:s.value=e.args[0]:"warn"===e.level&&e.args[0].toString().includes("[Vue warn]")&&(t.value=e.args.join("").replace(/\[Vue warn\]:/,"").trim()))},on_console_group:e=>{},on_console_group_end:()=>{},on_console_group_collapsed:e=>{}})}return g(l),E((()=>{a.destroy()})),j((()=>{var e,n,s,t,o;return[null==(e=null==L?void 0:L.files[0])?void 0:e.code,null==(n=null==L?void 0:L.files[1])?void 0:n.code,null==(s=null==L?void 0:L.files[2])?void 0:s.code,null==(t=null==L?void 0:L.files[3])?void 0:t.code,null==(o=null==L?void 0:L.files[4])?void 0:o.code]}),(()=>{l()})),(e,s)=>(i(),c("div",{class:"preview-container",ref:n},null,512))}});const D={class:"container"};M(a({setup:e=>(async function(){const e=(n="demo",new URLSearchParams(window.location.search).get(n)||"basic");var n;try{!function(e){for(;L.files.length>0;)L.files.pop();e.forEach((e=>{L.files.push(e)})),P(0)}(await async function(e){const n=[],s=await W(`.//demo/${e}/index.js`);n.push({name:"index.js",fileName:"index.js",code:Y(s),type:"js"});const t=await W(`.//demo/${e}/data.js`);n.push({name:"data.js",fileName:"data.js",code:Y(t),type:"js"});const o=await W(`.//demo/${e}/index.html`);n.push({name:"html",fileName:"index.html",code:o,type:"html"});let a=await W(`.//demo/${e}/index.css`);n.push({name:"css",fileName:"index.css",code:a,type:"css"});const r=await W(`.//demo/${e}/import-map.json`);return n.push({name:"import-map",fileName:"import-map.json",code:r,type:"json"}),n}(e))}catch(s){console.log(s)}}(),(e,n)=>(i(),c(y,null,[d(T),d("div",D,[d(C,null,{left:k((()=>[d(V)])),right:k((()=>[d(B)])),_:1})])],64)))})).mount("#app");
