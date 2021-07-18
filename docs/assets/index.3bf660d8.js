var t=Object.defineProperty,e=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,s=Object.prototype.propertyIsEnumerable,o=(e,n,s)=>n in e?t(e,n,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[n]=s;import{d as a,r,a as l,o as i,c,b as d,e as u,w as p,u as g,f as m,t as v,C as h,g as _,p as f,h as w,F as y,i as b,j as k,k as x,l as E,m as M,n as j}from"./vendor.22bb42bc.js";var C=a({setup(t){const e=r(),n=l({dragging:!1,split:50});function s(){const{split:t}=n;return t<20?20:t>80?80:t}let o=0,a=0;function m(t){n.dragging=!0,o=t.pageX,a=s()}function v(t){if(n.dragging){const s=t.pageX,r=e.value.offsetWidth,l=s-o;n.split=a+~~(l/r*100)}}function h(){n.dragging=!1}return(t,o)=>(i(),c("div",{ref:e,class:["split-box",{dragging:g(n).dragging}],onMousemove:v,onMouseup:h,onMouseleave:h},[d("div",{class:"left",style:{width:s()+"%"}},[u(t.$slots,"left",{},void 0,!0),d("div",{class:"dragger",onMousedown:p(m,["prevent"])},null,40,["onMousedown"])],4),d("div",{class:"right",style:{width:100-s()+"%"}},[u(t.$slots,"right",{},void 0,!0)],4)],34))}});C.__scopeId="data-v-5b6a2e03";const O=d("h1",null,[d("span",null,"iDraw Playground")],-1),S={class:"links"},I=d("li",null,[d("a",null,"v0.0.1"),d("a",null,"v0.0.2"),d("a",null,"v0.0.3")],-1);var P=a({setup(t){const e=r("@0.0.1"),n=r(!1);async function s(){n.value=!n.value}return m((async()=>{window.addEventListener("click",(()=>{n.value=!1}))})),(t,o)=>(i(),c("nav",null,[O,d("div",S,[d("div",{class:"version",onClick:o[1]||(o[1]=p((()=>{}),["stop"]))},[d("span",{class:"active-version",onClick:s}," Version: "+v(e.value),1),d("ul",{class:["versions",{expanded:n.value}]},[I],2)])])]))}}),$=a({props:{mode:{type:String,default:"htmlmixed"},value:{type:String,default:""},readonly:{type:Boolean,default:!1}},emits:["change"],setup(t,{emit:a}){const l=t,d=r();return m((()=>{const t=h(d.value,((t,a)=>{for(var r in a||(a={}))n.call(a,r)&&o(t,r,a[r]);if(e)for(var r of e(a))s.call(a,r)&&o(t,r,a[r]);return t})({value:"",mode:l.mode,readOnly:l.readonly,tabSize:2,lineWrapping:!0,lineNumbers:!0},{autoCloseBrackets:!0,autoCloseTags:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]}));t.on("change",(()=>{a("change",t.getValue())})),_((()=>{t.setValue(l.value)})),_((()=>{t.setOption("mode",l.mode)})),window.addEventListener("resize",(()=>{t.refresh()})),setTimeout((()=>{t.refresh()}),50)})),(t,e)=>(i(),c("div",{class:"editor",ref:d},null,512))}});const L=l({files:[],activeIndex:-1});function A(t){L.activeIndex=t}f("data-v-2e319b94");const N={class:"tab-list"},T={class:"label"};w();var R=a({setup:t=>(t,e)=>(i(),c("div",N,[(i(!0),c(y,null,b(g(L).files,((t,e)=>(i(),c("div",{class:["tab",{active:e===g(L).activeIndex}],onClick:t=>g(A)(e)},[d("span",T,v(t.name),1)],10,["onClick"])))),256))]))});R.__scopeId="data-v-2e319b94",f("data-v-0a9e238b");const V={class:"editor-container"};w();var W=a({setup(t){var e;const n=function(t,e=100){let n;return(...s)=>{n&&clearTimeout(n),n=setTimeout((()=>{t(...s)}),e)}}((t=>{}),300),s=r((null==(e=L.files[L.activeIndex])?void 0:e.code)||""),o={js:"javascript",css:"css",html:"htmlmixed"},a=k((()=>{var t;return o[null==(t=L.files[L.activeIndex])?void 0:t.type]}));return x((()=>L.activeIndex),(()=>{var t;s.value=(null==(t=L.files[L.activeIndex])?void 0:t.code)||""})),(t,e)=>(i(),c(y,null,[d(R),d("div",V,[d($,{onChange:g(n),value:s.value,mode:g(a)},null,8,["onChange","value","mode"])])],64))}});W.__scopeId="data-v-0a9e238b";let U=1;class B{constructor(t,e){this.iframe=t,this.handlers=e,this.pending_cmds=new Map,this.handle_event=t=>this.handle_repl_message(t),window.addEventListener("message",this.handle_event,!1)}destroy(){window.removeEventListener("message",this.handle_event)}iframe_command(t,e){return new Promise(((n,s)=>{const o=U++;this.pending_cmds.set(o,{resolve:n,reject:s}),this.iframe.contentWindow.postMessage({action:t,cmd_id:o,args:e},"*")}))}handle_command_message(t){let e=t.action,n=t.cmd_id,s=this.pending_cmds.get(n);if(s){if(this.pending_cmds.delete(n),"cmd_error"===e){let{message:e,stack:n}=t,o=new Error(e);o.stack=n,s.reject(o)}"cmd_ok"===e&&s.resolve(t.args)}else console.error("command not found",n,t,[...this.pending_cmds.keys()])}handle_repl_message(t){if(t.source!==this.iframe.contentWindow)return;const{action:e,args:n}=t.data;switch(e){case"cmd_error":case"cmd_ok":return this.handle_command_message(t.data);case"fetch_progress":return this.handlers.on_fetch_progress(n.remaining);case"error":return this.handlers.on_error(t.data);case"unhandledrejection":return this.handlers.on_unhandled_rejection(t.data);case"console":return this.handlers.on_console(t.data);case"console_group":return this.handlers.on_console_group(t.data);case"console_group_collapsed":return this.handlers.on_console_group_collapsed(t.data);case"console_group_end":return this.handlers.on_console_group_end(t.data)}}eval(t){return this.iframe_command("eval",{script:t})}handle_links(){return this.iframe_command("catch_clicks",{})}}var D=a({setup(t){const e=r(),n=r(),s=r();let o,a,l;async function d(){console.clear(),n.value=null,s.value=null;try{await a.eval(["console.log('hello 001')","\n      console.log('hello 002')".trim()])}catch(t){n.value=t.message}}return m((function(){o&&(a.destroy(),l(),e.value.removeChild(o));let t;o=document.createElement("iframe"),o.setAttribute("sandbox",["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts","allow-top-navigation-by-user-activation"].join(" "));try{t=JSON.parse("{}")}catch(i){return void console.log(i)}t.imports||(t.imports={});const r="<!doctype html>\n<html>\n\t<head>\n\t\t<style>\n\t\t\tbody {\n\t\t\t\tfont-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto,\n\t\t\t\tOxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n\t\t\t}\n\t\t</style>\n\t\t<style id=\"__sfc-styles\"></style>\n\t\t<script>\n\t\t\t(() => {\n\t\t\t\tlet scriptEls = []\n\n\t\t\t\twindow.__modules__ = {}\n\n\t\t\t\twindow.__export__ = (mod, key, get) => {\n\t\t\t\t\tObject.defineProperty(mod, key, {\n\t\t\t\t\t\tenumerable: true,\n\t\t\t\t\t\tconfigurable: true,\n\t\t\t\t\t\tget\n\t\t\t\t\t})\n\t\t\t\t}\n\n\t\t\t\twindow.__dynamic_import__ = key => {\n\t\t\t\t\treturn Promise.resolve(window.__modules__[key])\n\t\t\t\t}\n\n\t\t\t\tasync function handle_message(ev) {\n\t\t\t\t\tlet { action, cmd_id } = ev.data;\n\t\t\t\t\tconst send_message = (payload) => parent.postMessage( { ...payload }, ev.origin);\n\t\t\t\t\tconst send_reply = (payload) => send_message({ ...payload, cmd_id });\n\t\t\t\t\tconst send_ok = () => send_reply({ action: 'cmd_ok' });\n\t\t\t\t\tconst send_error = (message, stack) => send_reply({ action: 'cmd_error', message, stack });\n\n\t\t\t\t\tif (action === 'eval') {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tif (scriptEls.length) {\n\t\t\t\t\t\t\t\tscriptEls.forEach(el => {\n\t\t\t\t\t\t\t\t\tdocument.head.removeChild(el)\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\tscriptEls.length = 0\n\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\tlet { script: scripts } = ev.data.args\n\t\t\t\t\t\t\tif (typeof scripts === 'string') scripts = [scripts]\n\n\t\t\t\t\t\t\tfor (const script of scripts) {\n\t\t\t\t\t\t\t\tconst scriptEl = document.createElement('script')\n\t\t\t\t\t\t\t\tscriptEl.setAttribute('type', 'module')\n\t\t\t\t\t\t\t\t// send ok in the module script to ensure sequential evaluation\n\t\t\t\t\t\t\t\t// of multiple proxy.eval() calls\n\t\t\t\t\t\t\t\tconst done = new Promise((resolve) => {\n\t\t\t\t\t\t\t\t\twindow.__next__ = resolve\n\t\t\t\t\t\t\t\t})\n\t\t\t\t\t\t\t\tscriptEl.innerHTML = script + `\\nwindow.__next__()`\n\t\t\t\t\t\t\t\tdocument.head.appendChild(scriptEl)\n\t\t\t\t\t\t\t\tscriptEl.onrror = err => send_error(err.message, err.stack)\n\t\t\t\t\t\t\t\tscriptEls.push(scriptEl)\n\t\t\t\t\t\t\t\tawait done\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\twindow.__next__ = undefined\n\t\t\t\t\t\t\tsend_ok()\n\t\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\t\tsend_error(e.message, e.stack);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\n\t\t\t\t\tif (action === 'catch_clicks') {\n\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\tconst top_origin = ev.origin;\n\t\t\t\t\t\t\tdocument.body.addEventListener('click', event => {\n\t\t\t\t\t\t\t\tif (event.which !== 1) return;\n\t\t\t\t\t\t\t\tif (event.metaKey || event.ctrlKey || event.shiftKey) return;\n\t\t\t\t\t\t\t\tif (event.defaultPrevented) return;\n\n\t\t\t\t\t\t\t\t// ensure target is a link\n\t\t\t\t\t\t\t\tlet el = event.target;\n\t\t\t\t\t\t\t\twhile (el && el.nodeName !== 'A') el = el.parentNode;\n\t\t\t\t\t\t\t\tif (!el || el.nodeName !== 'A') return;\n\n\t\t\t\t\t\t\t\tif (el.hasAttribute('download') || el.getAttribute('rel') === 'external' || el.target) return;\n\n\t\t\t\t\t\t\t\tevent.preventDefault();\n\n\t\t\t\t\t\t\t\tif (el.href.startsWith(top_origin)) {\n\t\t\t\t\t\t\t\t\tconst url = new URL(el.href);\n\t\t\t\t\t\t\t\t\tif (url.hash[0] === '#') {\n\t\t\t\t\t\t\t\t\t\twindow.location.hash = url.hash;\n\t\t\t\t\t\t\t\t\t\treturn;\n\t\t\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\t\t}\n\n\t\t\t\t\t\t\t\twindow.open(el.href, '_blank');\n\t\t\t\t\t\t\t});\n\t\t\t\t\t\t\tsend_ok();\n\t\t\t\t\t\t} catch(e) {\n\t\t\t\t\t\t\tsend_error(e.message, e.stack);\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\twindow.addEventListener('message', handle_message, false);\n\n\t\t\t\twindow.onerror = function (msg, url, lineNo, columnNo, error) {\n\t\t\t\t\tif (msg.includes('module specifier “vue”')) {\n\t\t\t\t\t\t// firefox only error, ignore\n\t\t\t\t\t\treturn false\n\t\t\t\t\t}\n\t\t\t\t\ttry {\n\t\t\t\t\t\tparent.postMessage({ action: 'error', value: error }, '*');\n\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\tparent.postMessage({ action: 'error', value: msg }, '*');\n\t\t\t\t\t}\n\t\t\t\t}\n\n\t\t\t\twindow.addEventListener(\"unhandledrejection\", event => {\n\t\t\t\t\tif (event.reason.message.includes('Cross-origin')) {\n\t\t\t\t\t\tevent.preventDefault()\n\t\t\t\t\t\treturn\n\t\t\t\t\t}\n\t\t\t\t\ttry {\n\t\t\t\t\t\tparent.postMessage({ action: 'unhandledrejection', value: event.reason }, '*');\n\t\t\t\t\t} catch (e) {\n\t\t\t\t\t\tparent.postMessage({ action: 'unhandledrejection', value: event.reason.message }, '*');\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\tlet previous = { level: null, args: null };\n\n\t\t\t\t['clear', 'log', 'info', 'dir', 'warn', 'error', 'table'].forEach((level) => {\n\t\t\t\t\tconst original = console[level];\n\t\t\t\t\tconsole[level] = (...args) => {\n\t\t\t\t\t\tconst msg = String(args[0])\n\t\t\t\t\t\tif (\n\t\t\t\t\t\t\tmsg.includes('You are running a development build of Vue') ||\n\t\t\t\t\t\t\tmsg.includes('You are running the esm-bundler build of Vue')\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\treturn\n\t\t\t\t\t\t}\n\t\t\t\t\t\tconst stringifiedArgs = stringify(args);\n\t\t\t\t\t\tif (\n\t\t\t\t\t\t\tprevious.level === level &&\n\t\t\t\t\t\t\tprevious.args &&\n\t\t\t\t\t\t\tprevious.args === stringifiedArgs\n\t\t\t\t\t\t) {\n\t\t\t\t\t\t\tparent.postMessage({ action: 'console', level, duplicate: true }, '*');\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tprevious = { level, args: stringifiedArgs };\n\n\t\t\t\t\t\t\ttry {\n\t\t\t\t\t\t\t\tparent.postMessage({ action: 'console', level, args }, '*');\n\t\t\t\t\t\t\t} catch (err) {\n\t\t\t\t\t\t\t\tparent.postMessage({ action: 'console', level, args: args.map(a => {\n\t\t\t\t\t\t\t\t\treturn a instanceof Error ? a.message : String(a)\n\t\t\t\t\t\t\t\t}) }, '*');\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\toriginal(...args);\n\t\t\t\t\t}\n\t\t\t\t});\n\n\t\t\t\t[\n\t\t\t\t\t{ method: 'group', action: 'console_group' },\n\t\t\t\t\t{ method: 'groupEnd', action: 'console_group_end' },\n\t\t\t\t\t{ method: 'groupCollapsed', action: 'console_group_collapsed' },\n\t\t\t\t].forEach((group_action) => {\n\t\t\t\t\tconst original = console[group_action.method];\n\t\t\t\t\tconsole[group_action.method] = (label) => {\n\t\t\t\t\t\tparent.postMessage({ action: group_action.action, label }, '*');\n\n\t\t\t\t\t\toriginal(label);\n\t\t\t\t\t};\n\t\t\t\t});\n\n\t\t\t\tconst timers = new Map();\n\t\t\t\tconst original_time = console.time;\n\t\t\t\tconst original_timelog = console.timeLog;\n\t\t\t\tconst original_timeend = console.timeEnd;\n\n\t\t\t\tconsole.time = (label = 'default') => {\n\t\t\t\t\toriginal_time(label);\n\t\t\t\t\ttimers.set(label, performance.now());\n\t\t\t\t}\n\t\t\t\tconsole.timeLog = (label = 'default') => {\n\t\t\t\t\toriginal_timelog(label);\n\t\t\t\t\tconst now = performance.now();\n\t\t\t\t\tif (timers.has(label)) {\n\t\t\t\t\t\tparent.postMessage({ action: 'console', level: 'system-log', args: [`${label}: ${now - timers.get(label)}ms`] }, '*');\n\t\t\t\t\t} else {\n\t\t\t\t\t\tparent.postMessage({ action: 'console', level: 'system-warn', args: [`Timer '${label}' does not exist`] }, '*');\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tconsole.timeEnd = (label = 'default') => {\n\t\t\t\t\toriginal_timeend(label);\n\t\t\t\t\tconst now = performance.now();\n\t\t\t\t\tif (timers.has(label)) {\n\t\t\t\t\t\tparent.postMessage({ action: 'console', level: 'system-log', args: [`${label}: ${now - timers.get(label)}ms`] }, '*');\n\t\t\t\t\t} else {\n\t\t\t\t\t\tparent.postMessage({ action: 'console', level: 'system-warn', args: [`Timer '${label}' does not exist`] }, '*');\n\t\t\t\t\t}\n\t\t\t\t\ttimers.delete(label);\n\t\t\t\t};\n\n\t\t\t\tconst original_assert = console.assert;\n\t\t\t\tconsole.assert = (condition, ...args) => {\n\t\t\t\t\tif (condition) {\n\t\t\t\t\t\tconst stack = new Error().stack;\n\t\t\t\t\t\tparent.postMessage({ action: 'console', level: 'assert', args, stack }, '*');\n\t\t\t\t\t}\n\t\t\t\t\toriginal_assert(condition, ...args);\n\t\t\t\t};\n\n\t\t\t\tconst counter = new Map();\n\t\t\t\tconst original_count = console.count;\n\t\t\t\tconst original_countreset = console.countReset;\n\n\t\t\t\tconsole.count = (label = 'default') => {\n\t\t\t\t\tcounter.set(label, (counter.get(label) || 0) + 1);\n\t\t\t\t\tparent.postMessage({ action: 'console', level: 'system-log', args: `${label}: ${counter.get(label)}` }, '*');\n\t\t\t\t\toriginal_count(label);\n\t\t\t\t};\n\n\t\t\t\tconsole.countReset = (label = 'default') => {\n\t\t\t\t\tif (counter.has(label)) {\n\t\t\t\t\t\tcounter.set(label, 0);\n\t\t\t\t\t} else {\n\t\t\t\t\t\tparent.postMessage({ action: 'console', level: 'system-warn', args: `Count for '${label}' does not exist` }, '*');\n\t\t\t\t\t}\n\t\t\t\t\toriginal_countreset(label);\n\t\t\t\t};\n\n\t\t\t\tconst original_trace = console.trace;\n\n\t\t\t\tconsole.trace = (...args) => {\n\t\t\t\t\tconst stack = new Error().stack;\n\t\t\t\t\tparent.postMessage({ action: 'console', level: 'trace', args, stack }, '*');\n\t\t\t\t\toriginal_trace(...args);\n\t\t\t\t};\n\n\t\t\t\tfunction stringify(args) {\n\t\t\t\t\ttry {\n\t\t\t\t\t\treturn JSON.stringify(args);\n\t\t\t\t\t} catch (error) {\n\t\t\t\t\t\treturn null;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t})()\n\t\t<\/script>\n\n\t\t\x3c!-- ES Module Shims: Import maps polyfill for modules browsers without import maps support (all except Chrome 89+) --\x3e\n\t\t\x3c!-- <script async src=\"https://unpkg.com/es-module-shims@0.10.1/dist/es-module-shims.js\"><\/script> --\x3e\n\t\t<script type=\"importmap\">\x3c!--IMPORT_MAP--\x3e<\/script>\n\t</head>\n\t<body>\n    <div id=\"app\">\n\t\t\t<h1>Hello World</h1>\n\t\t</div>\n  </body>\n</html>".replace(/<!--IMPORT_MAP-->/,JSON.stringify(t));o.srcdoc=r,e.value.appendChild(o),a=new B(o,{on_fetch_progress:t=>{},on_error:t=>{const e=t.value instanceof Error?t.value.message:t.value;e.includes("Failed to resolve module specifier")||e.includes("Error resolving module specifier")?n.value=e.replace(/\. Relative references must.*$/,"")+'.\nTip: add an "import-map.json" file to specify import paths for dependencies.':n.value=t.value},on_unhandled_rejection:t=>{let e=t.value;"string"==typeof e&&(e={message:e}),n.value="Uncaught (in promise): "+e.message},on_console:t=>{t.duplicate||("error"===t.level?t.args[0]instanceof Error?n.value=t.args[0].message:n.value=t.args[0]:"warn"===t.level&&t.args[0].toString().includes("[Vue warn]")&&(s.value=t.args.join("").replace(/\[Vue warn\]:/,"").trim()))},on_console_group:t=>{},on_console_group_end:()=>{},on_console_group_collapsed:t=>{}}),o.addEventListener("load",(()=>{a.handle_links(),l=_(d)}))})),E((()=>{a.destroy(),l&&l()})),(t,n)=>(i(),c("div",{class:"preview-container",ref:e},null,512))}});function F(t){return new Promise(((e,n)=>{fetch(t).then((t=>t.text())).then((t=>{e(t)})).catch(n)}))}let H="./../../public";H="./../../";const J={class:"container"};j(a({setup:t=>(async function(){const t=(e="example",new URLSearchParams(window.location.search).get(e)||"basic");var e;try{!function(t){for(;L.files.length>0;)L.files.pop();t.forEach((t=>{L.files.push(t)})),A(0)}(await async function(t){const e=[],n=await F(`./../..//data/${t}/index.js`);e.push({name:"index.js",code:n,type:"js"});const s=await F(`./../..//data/${t}/index.html`);e.push({name:"index.html",code:s,type:"html"});let o=await F(`./../..//data/${t}/index.css`);return e.push({name:"index.css",code:o,type:"css"}),e}(t))}catch(n){console.log(n)}}(),(t,e)=>(i(),c(y,null,[d(P),d("div",J,[d(C,null,{left:M((()=>[d(W)])),right:M((()=>[d(D)])),_:1})])],64)))})).mount("#app");
