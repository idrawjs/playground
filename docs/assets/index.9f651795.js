var oe=Object.defineProperty;var J=Object.getOwnPropertySymbols;var re=Object.prototype.hasOwnProperty,ie=Object.prototype.propertyIsEnumerable;var T=(t,e,n)=>e in t?oe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,R=(t,e)=>{for(var n in e||(e={}))re.call(e,n)&&T(t,n,e[n]);if(J)for(var n of J(e))ie.call(e,n)&&T(t,n,e[n]);return t};var M=(t,e,n)=>(T(t,typeof e!="symbol"?e+"":e,n),n);import{d as y,r as w,a as O,o as u,c as p,b as c,e as U,w as W,n as Z,f as x,u as m,g as z,t as L,p as G,h as K,C as le,i as Y,j as N,F as k,k as q,l as B,m as ce,q as X,s as b,v as I,x as de,y as E,z as ue}from"./vendor.f72aafdb.js";const me=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerpolicy&&(o.referrerPolicy=a.referrerpolicy),a.crossorigin==="use-credentials"?o.credentials="include":a.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=n(a);fetch(a.href,o)}};me();var S=(t,e)=>{for(const[n,s]of e)t[n]=s;return t};const pe=["onMousedown"],_e=y({props:{defaultSplit:{type:Number,default:50}},setup(t){const e=t,{defaultSplit:n}=e,s=w(),a=O({dragging:!1,split:n});function o(){const{split:v}=a;return v<10?10:v>90?90:v}let r=0,f=0;function g(v){a.dragging=!0,r=v.pageX,f=o()}function l(v){if(a.dragging){const j=v.pageX,A=s.value.offsetWidth,D=j-r;a.split=f+~~(D/A*100)}}function _(){a.dragging=!1}return(v,j)=>(u(),p("div",{ref:(A,D)=>{D.container=A,s.value=A},class:x(["split-box",{dragging:m(a).dragging}]),onMousemove:l,onMouseup:_,onMouseleave:_},[c("div",{class:"left",style:Z({width:o()+"%"})},[U(v.$slots,"left",{},void 0,!0),c("div",{class:"dragger",onMousedown:W(g,["prevent"])},null,40,pe)],4),c("div",{class:"right",style:Z({width:100-o()+"%"})},[U(v.$slots,"right",{},void 0,!0)],4)],34))}});var V=S(_e,[["__scopeId","data-v-5f4d69b4"]]);const H=t=>(G("data-v-6855b06d"),t=t(),K(),t),ve=H(()=>c("h1",null,[c("span",{class:"text-important"},"iDraw"),c("span",{class:"text"},"Playground")],-1)),fe={class:"links"},ge=H(()=>c("a",{class:"link-item",target:"_blank",href:"https://www.github.com/idrawjs/idraw"},[c("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg","p-id":"2396",width:"100",height:"100"},[c("path",{d:"M512 12.64c-282.752 0-512 229.216-512 512 0 226.208 146.72 418.144 350.144 485.824 25.6 4.736 35.008-11.104 35.008-24.64 0-12.192-0.48-52.544-0.704-95.328-142.464 30.976-172.512-60.416-172.512-60.416-23.296-59.168-56.832-74.912-56.832-74.912-46.464-31.776 3.52-31.136 3.52-31.136 51.392 3.616 78.464 52.768 78.464 52.768 45.664 78.272 119.776 55.648 148.992 42.56 4.576-33.088 17.856-55.68 32.512-68.48-113.728-12.928-233.28-56.864-233.28-253.024 0-55.904 20-101.568 52.768-137.44-5.312-12.896-22.848-64.96 4.96-135.488 0 0 43.008-13.76 140.832 52.48 40.832-11.36 84.64-17.024 128.16-17.248 43.488 0.192 87.328 5.888 128.256 17.248 97.728-66.24 140.64-52.48 140.64-52.48 27.872 70.528 10.336 122.592 5.024 135.488 32.832 35.84 52.704 81.536 52.704 137.44 0 196.64-119.776 239.936-233.792 252.64 18.368 15.904 34.72 47.04 34.72 94.816 0 68.512-0.608 123.648-0.608 140.512 0 13.632 9.216 29.6 35.168 24.576 203.328-67.776 349.856-259.616 349.856-485.76 0-282.784-229.248-512-512-512z",fill:"#3c6ea8"})])],-1)),he=H(()=>c("li",null,[c("a",null,"v0.x")],-1)),ye=[he],we=y({setup(t){const e=w("@0.x"),n=w(!1);async function s(){n.value=!n.value}return z(async()=>{window.addEventListener("click",()=>{n.value=!1})}),(a,o)=>(u(),p("nav",null,[ve,c("div",fe,[ge,c("div",{class:"version-selector",onClick:o[0]||(o[0]=W(()=>{},["stop"]))},[c("span",{class:"active-version",onClick:s}," Version: "+L(e.value),1),c("ul",{class:x(["versions",{expanded:n.value}])},ye,2)])])]))}});var be=S(we,[["__scopeId","data-v-6855b06d"]]);const xe=y({props:{mode:{type:String,default:"htmlmixed"},value:{type:String,default:""},readonly:{type:Boolean,default:!1}},emits:["change"],setup(t,{emit:e}){const n=t,s=w();return z(()=>{const a={autoCloseBrackets:!0,autoCloseTags:!0,foldGutter:!0,gutters:["CodeMirror-linenumbers","CodeMirror-foldgutter"]},o=le(s.value,R({value:"",mode:n.mode,readOnly:n.readonly,tabSize:2,lineWrapping:!0,lineNumbers:!0},a));o.on("change",()=>{e("change",o.getValue())}),Y(()=>{o.setValue(n.value)}),Y(()=>{o.setOption("mode",n.mode)}),window.addEventListener("resize",()=>{o.refresh()}),setTimeout(()=>{o.refresh()},50)}),(a,o)=>(u(),p("div",{class:"editor",ref:(r,f)=>{f.el=r,s.value=r}},null,512))}}),d=O({urlParams:{demo:"basic"},demoStatus:"LOADING",layout:{showHeader:!0,showSider:!0,defaultEditorSplit:40}});ke();function ke(){new URLSearchParams(window.location.search).forEach((e,n)=>{d.urlParams[n]=e}),typeof d.urlParams["default-editor-split"]=="string"&&parseInt(d.urlParams["default-editor-split"])>0&&(d.layout.defaultEditorSplit=parseInt(d.urlParams["default-editor-split"])),d.urlParams.header==="false"&&(d.layout.showHeader=!1),d.urlParams.sider==="false"&&(d.layout.showSider=!1)}function F(t){d.demoStatus=t}const Q=t=>(G("data-v-0eb87a2b"),t=t(),K(),t),Ee={key:0},Se=q('<div class="loading" data-v-0eb87a2b><div class="loading-container loading-container-1" data-v-0eb87a2b><div class="circle-1" data-v-0eb87a2b></div><div class="circle-2" data-v-0eb87a2b></div><div class="circle-3" data-v-0eb87a2b></div><div class="circle-4" data-v-0eb87a2b></div></div><div class="loading-container loading-container-2" data-v-0eb87a2b><div class="circle-1" data-v-0eb87a2b></div><div class="circle-2" data-v-0eb87a2b></div><div class="circle-3" data-v-0eb87a2b></div><div class="circle-4" data-v-0eb87a2b></div></div><div class="loading-container loading-container-3" data-v-0eb87a2b><div class="circle-1" data-v-0eb87a2b></div><div class="circle-2" data-v-0eb87a2b></div><div class="circle-3" data-v-0eb87a2b></div><div class="circle-4" data-v-0eb87a2b></div></div></div>',1),$e=[Se],je={key:1,class:"error-status"},Me=Q(()=>c("div",{class:"error-status-logo"},[c("svg",{viewBox:"0 0 1024 1024",version:"1.1",xmlns:"http://www.w3.org/2000/svg",width:"200",height:"200"},[c("path",{d:"M517.818182 69.818182C765.207273 69.818182 965.818182 270.429091 965.818182 517.818182S765.207273 965.818182 517.818182 965.818182 69.818182 765.207273 69.818182 517.818182 270.429091 69.818182 517.818182 69.818182z m0 819.991273c205.405091 0 371.991273-166.586182 371.991273-371.991273S723.223273 145.826909 517.818182 145.826909 145.826909 312.413091 145.826909 517.818182s166.586182 371.991273 371.991273 371.991273z m-47.988364-195.979637a48.011636 48.011636 0 1 1 96 0 48.011636 48.011636 0 0 1-96 0zM493.800727 581.818182a8.029091 8.029091 0 0 1-7.982545-8.005818V301.847273c0-4.421818 3.607273-8.005818 8.005818-8.005818h47.988364c4.421818 0 8.005818 3.607273 8.005818 8.005818v271.988363c0 4.421818-3.607273 8.005818-8.005818 8.005819H493.847273z",fill:"#7dc5eb"})])],-1)),Ne=Q(()=>c("div",{class:"error-status-title"},"Not Found",-1)),Ie=[Me,Ne],Pe={key:2,class:"error-status"},Ce=q('<div class="error-status-logo" data-v-0eb87a2b><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200" data-v-0eb87a2b><path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 64a384 384 0 1 0 0 768A384 384 0 0 0 512 128z m-0.704 448.512c98.048 0 187.648 49.472 240.384 129.408l7.68 12.16-55.104 32.64a223.872 223.872 0 0 0-192.96-110.208c-75.968 0-145.28 38.144-186.432 99.776l-7.36 11.776-55.36-32.192a287.872 287.872 0 0 1 249.152-143.36zM384 320v128H320V320h64z m320 0v128h-64V320h64z" fill="#7dc5eb" data-v-0eb87a2b></path></svg></div><div class="error-status-title" data-v-0eb87a2b>Not Finished</div><div class="error-status-title" data-v-0eb87a2b>It will take a while ...</div>',3),Ae=[Ce],Le=y({setup(t){return(e,n)=>(u(),p(k,null,[m(d).demoStatus==="LOADING"?(u(),p("div",Ee,$e)):N("",!0),m(d).demoStatus==="NOT_FOUND"?(u(),p("div",je,Ie)):N("",!0),m(d).demoStatus==="NOT_FINISHED"?(u(),p("div",Pe,Ae)):N("",!0)],64))}});var ee=S(Le,[["__scopeId","data-v-0eb87a2b"]]);let De=[];const i=O({files:De,activeIndex:-1,errors:[]});function ne(t){i.activeIndex=t}function Te(t){i.files[i.activeIndex]&&(i.files[i.activeIndex].code=t)}function Oe(t){for(;i.files.length>0;)i.files.pop();t.forEach(e=>{i.files.push(e)}),ne(0)}const ze={class:"tab-list"},Be=["onClick"],Ve={class:"label"},He=y({setup(t){return(e,n)=>(u(),p("div",ze,[(u(!0),p(k,null,B(m(i).files,(s,a)=>(u(),p("div",{class:x(["tab",{active:a===m(i).activeIndex}]),onClick:o=>m(ne)(a)},[c("span",Ve,L(s.name),1)],10,Be))),256))]))}});var Fe=S(He,[["__scopeId","data-v-2e319b94"]]);function Je(t,e=100){let n;return(...s)=>{n&&clearTimeout(n),n=setTimeout(()=>{t(...s)},e)}}const Re={key:0,class:"editor-container"},Ue={class:"editor-main"},We=y({setup(t){var o;const e=Je(r=>{Te(r)},300),n=w(((o=i.files[i.activeIndex])==null?void 0:o.code)||""),s={js:"javascript",css:"css",html:"htmlmixed",json:"javascript"},a=ce(()=>{var r;return s[(r=i.files[i.activeIndex])==null?void 0:r.type]});return X(()=>i.activeIndex,()=>{var r;n.value=((r=i.files[i.activeIndex])==null?void 0:r.code)||""}),(r,f)=>m(d).demoStatus==="LOADED"?(u(),p("div",Re,[b(Fe),c("div",Ue,[b(xe,{onChange:m(e),value:n.value,mode:m(a)},null,8,["onChange","value","mode"])])])):(u(),I(ee,{key:1}))}});var te=S(We,[["__scopeId","data-v-9235c586"]]);let Ze=1;class Ge{constructor(e,n){M(this,"iframe");M(this,"handlers");M(this,"pending_cmds");M(this,"handle_event");this.iframe=e,this.handlers=n,this.pending_cmds=new Map,this.handle_event=s=>this.handle_repl_message(s),window.addEventListener("message",this.handle_event,!1)}destroy(){window.removeEventListener("message",this.handle_event)}iframe_command(e,n){return new Promise((s,a)=>{const o=Ze++;this.pending_cmds.set(o,{resolve:s,reject:a}),this.iframe.contentWindow.postMessage({action:e,cmd_id:o,args:n},"*")})}handle_command_message(e){let n=e.action,s=e.cmd_id,a=this.pending_cmds.get(s);if(a){if(this.pending_cmds.delete(s),n==="cmd_error"){let{message:o,stack:r}=e,f=new Error(o);f.stack=r,a.reject(f)}n==="cmd_ok"&&a.resolve(e.args)}else console.error("command not found",s,e,[...this.pending_cmds.keys()])}handle_repl_message(e){if(e.source!==this.iframe.contentWindow)return;const{action:n,args:s}=e.data;switch(n){case"cmd_error":case"cmd_ok":return this.handle_command_message(e.data);case"fetch_progress":return this.handlers.on_fetch_progress(s.remaining);case"error":return this.handlers.on_error(e.data);case"unhandledrejection":return this.handlers.on_unhandled_rejection(e.data);case"console":return this.handlers.on_console(e.data);case"console_group":return this.handlers.on_console_group(e.data);case"console_group_collapsed":return this.handlers.on_console_group_collapsed(e.data);case"console_group_end":return this.handlers.on_console_group_end(e.data)}}eval(e){return this.iframe_command("eval",{script:e})}handle_links(){return this.iframe_command("catch_clicks",{})}}const P=[{name:"Quick Start",list:[{name:"Basic",key:"basic"},{name:"Options",key:"options"},{name:"Config",key:"config"}]},{name:"Elements' Types",list:[{name:"Text",key:"elem-text",exclude:["data.js"]},{name:"Rect",key:"elem-rect",exclude:["data.js"]},{name:"Circle",key:"elem-circle",exclude:["data.js"]},{name:"Image",key:"elem-image",exclude:["data.js"]},{name:"SVG",key:"elem-svg",exclude:["data.js"]},{name:"HTML",key:"elem-html",exclude:["data.js"]}]},{name:"iDraw API",list:[{name:"setData",key:"api-setData"},{name:"getData",key:"api-getData"},{name:"resetSize",key:"api-resetSize"},{name:"selectElement",key:"api-selectElement"},{name:"selectElementByIndex",key:"api-selectElementByIndex"},{name:"getSelectedElements",key:"api-getSelectedElements"},{name:"updateElement",key:"api-updateElement"},{name:"addElement",key:"api-addElement"},{name:"deleteElement",key:"api-deleteElement"},{name:"moveDownElement",key:"api-moveDownElement"},{name:"moveUpElement",key:"api-moveUpElement"},{name:"insertElementBefore",key:"api-insertElementBefore"},{name:"insertElementAfter",key:"api-insertElementAfter"},{name:"insertElementBeforeIndex",key:"api-insertElementBeforeIndex"},{name:"insertElementAfterIndex",key:"api-insertElementAfterIndex"},{name:"scale",key:"api-scale"},{name:"scrollLeft",key:"api-scrollLeft"},{name:"scrollTop",key:"api-scrollTop"},{name:"on",key:"api-on"},{name:"off",key:"api-off"}]}];var Ke=`<!doctype html>
<html>
  <head>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      }
    </style>
    <!--__INJECT_STYLE__-->
    <script>
      (() => {
        let scriptEls = []

        window.__modules__ = {}

        window.__export__ = (mod, key, get) => {
          Object.defineProperty(mod, key, {
            enumerable: true,
            configurable: true,
            get
          })
        }

        window.__dynamic_import__ = key => {
          return Promise.resolve(window.__modules__[key])
        }

        async function handle_message(ev) {
          let { action, cmd_id } = ev.data;
          const send_message = (payload) => parent.postMessage( { ...payload }, ev.origin);
          const send_reply = (payload) => send_message({ ...payload, cmd_id });
          const send_ok = () => send_reply({ action: 'cmd_ok' });
          const send_error = (message, stack) => send_reply({ action: 'cmd_error', message, stack });

          if (action === 'eval') {
            try {
              if (scriptEls.length) {
                scriptEls.forEach(el => {
                  document.head.removeChild(el)
                })
                scriptEls.length = 0
              }

              let { script: scripts } = ev.data.args
              if (typeof scripts === 'string') scripts = [scripts]

              for (const script of scripts) {
                const scriptEl = document.createElement('script')
                scriptEl.setAttribute('type', 'module')
                // send ok in the module script to ensure sequential evaluation
                // of multiple proxy.eval() calls
                const done = new Promise((resolve) => {
                  window.__next__ = resolve
                })
                scriptEl.innerHTML = script + \`\\nwindow.__next__()\`
                document.head.appendChild(scriptEl)
                scriptEl.onrror = err => send_error(err.message, err.stack)
                scriptEls.push(scriptEl)
                await done
              }
              window.__next__ = undefined
              send_ok()
            } catch (e) {
              send_error(e.message, e.stack);
            }
          }

          if (action === 'catch_clicks') {
            try {
              const top_origin = ev.origin;
              document.body.addEventListener('click', event => {
                if (event.which !== 1) return;
                if (event.metaKey || event.ctrlKey || event.shiftKey) return;
                if (event.defaultPrevented) return;

                // ensure target is a link
                let el = event.target;
                while (el && el.nodeName !== 'A') el = el.parentNode;
                if (!el || el.nodeName !== 'A') return;

                if (el.hasAttribute('download') || el.getAttribute('rel') === 'external' || el.target) return;

                event.preventDefault();

                if (el.href.startsWith(top_origin)) {
                  const url = new URL(el.href);
                  if (url.hash[0] === '#') {
                    window.location.hash = url.hash;
                    return;
                  }
                }

                window.open(el.href, '_blank');
              });
              send_ok();
            } catch(e) {
              send_error(e.message, e.stack);
            }
          }
        }

        window.addEventListener('message', handle_message, false);

        window.onerror = function (msg, url, lineNo, columnNo, error) {
          if (msg.includes('module specifier \u201Cvue\u201D')) {
            // firefox only error, ignore
            return false
          }
          try {
            parent.postMessage({ action: 'error', value: error }, '*');
          } catch (e) {
            parent.postMessage({ action: 'error', value: msg }, '*');
          }
        }

        window.addEventListener("unhandledrejection", event => {
          if (event.reason.message.includes('Cross-origin')) {
            event.preventDefault()
            return
          }
          try {
            parent.postMessage({ action: 'unhandledrejection', value: event.reason }, '*');
          } catch (e) {
            parent.postMessage({ action: 'unhandledrejection', value: event.reason.message }, '*');
          }
        });

        let previous = { level: null, args: null };

        ['clear', 'log', 'info', 'dir', 'warn', 'error', 'table'].forEach((level) => {
          const original = console[level];
          console[level] = (...args) => {
            const msg = String(args[0])
            if (
              msg.includes('You are running a development build of Vue') ||
              msg.includes('You are running the esm-bundler build of Vue')
            ) {
              return
            }
            const stringifiedArgs = stringify(args);
            if (
              previous.level === level &&
              previous.args &&
              previous.args === stringifiedArgs
            ) {
              parent.postMessage({ action: 'console', level, duplicate: true }, '*');
            } else {
              previous = { level, args: stringifiedArgs };

              try {
                parent.postMessage({ action: 'console', level, args }, '*');
              } catch (err) {
                parent.postMessage({ action: 'console', level, args: args.map(a => {
                  return a instanceof Error ? a.message : String(a)
                }) }, '*');
              }
            }

            original(...args);
          }
        });

        [
          { method: 'group', action: 'console_group' },
          { method: 'groupEnd', action: 'console_group_end' },
          { method: 'groupCollapsed', action: 'console_group_collapsed' },
        ].forEach((group_action) => {
          const original = console[group_action.method];
          console[group_action.method] = (label) => {
            parent.postMessage({ action: group_action.action, label }, '*');

            original(label);
          };
        });

        const timers = new Map();
        const original_time = console.time;
        const original_timelog = console.timeLog;
        const original_timeend = console.timeEnd;

        console.time = (label = 'default') => {
          original_time(label);
          timers.set(label, performance.now());
        }
        console.timeLog = (label = 'default') => {
          original_timelog(label);
          const now = performance.now();
          if (timers.has(label)) {
            parent.postMessage({ action: 'console', level: 'system-log', args: [\`\${label}: \${now - timers.get(label)}ms\`] }, '*');
          } else {
            parent.postMessage({ action: 'console', level: 'system-warn', args: [\`Timer '\${label}' does not exist\`] }, '*');
          }
        }
        console.timeEnd = (label = 'default') => {
          original_timeend(label);
          const now = performance.now();
          if (timers.has(label)) {
            parent.postMessage({ action: 'console', level: 'system-log', args: [\`\${label}: \${now - timers.get(label)}ms\`] }, '*');
          } else {
            parent.postMessage({ action: 'console', level: 'system-warn', args: [\`Timer '\${label}' does not exist\`] }, '*');
          }
          timers.delete(label);
        };

        const original_assert = console.assert;
        console.assert = (condition, ...args) => {
          if (condition) {
            const stack = new Error().stack;
            parent.postMessage({ action: 'console', level: 'assert', args, stack }, '*');
          }
          original_assert(condition, ...args);
        };

        const counter = new Map();
        const original_count = console.count;
        const original_countreset = console.countReset;

        console.count = (label = 'default') => {
          counter.set(label, (counter.get(label) || 0) + 1);
          parent.postMessage({ action: 'console', level: 'system-log', args: \`\${label}: \${counter.get(label)}\` }, '*');
          original_count(label);
        };

        console.countReset = (label = 'default') => {
          if (counter.has(label)) {
            counter.set(label, 0);
          } else {
            parent.postMessage({ action: 'console', level: 'system-warn', args: \`Count for '\${label}' does not exist\` }, '*');
          }
          original_countreset(label);
        };

        const original_trace = console.trace;

        console.trace = (...args) => {
          const stack = new Error().stack;
          parent.postMessage({ action: 'console', level: 'trace', args, stack }, '*');
          original_trace(...args);
        };

        function stringify(args) {
          try {
            return JSON.stringify(args);
          } catch (error) {
            return null;
          }
        }
      })()
    <\/script>
    <!-- <script async src="/lib/es-module-shims/es-module-shims.js"><\/script> -->
    <script src="./lib/idraw/0.x/index.global.js"><\/script>
    <!--__INJECT_IMPORTMAP__-->
  </head>
  <body>
    <!--__INJECT_HTML__-->
    <!--__INJECT_JS__-->
  </body>
</html>`;const Ye="079250cdb7bd34520dc7f807db";var h={hash:Ye};function qe(t){return new URLSearchParams(window.location.search).get(t)}function C(t){return new Promise((e,n)=>{fetch(t).then(s=>{if(s.status===200)return s.text().then(a=>{e(a)}).catch(n);n(s)}).catch(n)})}let $="./../../public";$="./";async function Xe(t){const e=[],n=sn(t);if(n===null)return[];try{const s=await C(`${$}/demo/${t}/index.js`);e.push({name:"index.js",fileName:"index.js",code:se(s),type:"js"})}catch(s){console.log(s)}try{if(!(Array.isArray(n.exclude)&&n.exclude.includes("data.js"))){const s=await C(`${$}/demo/${t}/data.js?v=${(h==null?void 0:h.hash)||""}`);e.push({name:"data.js",fileName:"data.js",code:se(s),type:"js"})}}catch(s){console.log(s)}try{const s=await C(`${$}/demo/${t}/index.html?v=${(h==null?void 0:h.hash)||""}`);e.push({name:"html",fileName:"index.html",code:s,type:"html"})}catch(s){console.log(s)}try{let s=await C(`${$}/demo/${t}/index.css?v=${(h==null?void 0:h.hash)||""}`);e.push({name:"css",fileName:"index.css",code:s,type:"css"})}catch(s){console.log(s)}try{const s=await C(`${$}/demo/${t}/import-map.json?v=${(h==null?void 0:h.hash)||""}`);e.push({name:"import-map",fileName:"import-map.json",code:s,type:"json"})}catch(s){console.log(s)}return e}function se(t){const e=/\'\/node_modules\/\.vite\/([\w]+)\.js\?v=[0-9a-zA_Z]{1,}\'/;let n=t.replace(e,a=>{let o="''";const r=e==null?void 0:e.exec(a);return r&&r[1]&&(o=`'${r[1]}'`),o});const s=/\'\/public\/demo\/[0-9a-zA-Z\-\_]{1,}\/([0-9a-zA-Z\-\_]+)\.(js\?t=[0-9]{1,}|js)\'/;return n=n.replace(s,a=>{let o="'./'";const r=s==null?void 0:s.exec(a);return r&&r[1]&&(o=`'./${r[1]}'`),o}),n}function Qe(t){const e={html:"",css:"",js:"",datajs:"",importmap:"{}"};for(let n=0;n<t.length;n++)t[n].fileName==="index.html"?e.html=t[n].code:t[n].fileName==="index.css"?e.css=t[n].code:t[n].fileName==="index.js"?e.js=t[n].code:t[n].fileName==="data.js"?e.datajs=t[n].code:t[n].fileName==="import-map.json"&&(e.importmap=t[n].code);return e}function en(t){return Ke.replace(/<!--__INJECT_STYLE__-->/,`<style>${t.css}</style>`).replace(/<!--__INJECT_IMPORTMAP__-->/,`<script type="importmap">${t.importmap}<\/script>`).replace(/<!--__INJECT_HTML__-->/,t.html.replace(/<script[\s\S]*?<\/script>/ig,"")).replace(/<!--__INJECT_JS__-->/,`<script type="module">${nn(t)}<\/script>`)}function nn(t){const e=/import[\s]{1,}([a-zA-Z\_]+)[\s]{1,}from[\s]{1,}\'\.\/data\'/;let n=t.js;n=n.replace(e,a=>{const o=e==null?void 0:e.exec(a);let r=a;if(o&&o[1]){const f=`${o[1]}`,g=/export[\s]{1,}default[\s]{1,}\{/;t.datajs&&g.test(`${t.datajs}`)&&(r=`const ${f} = ${t.datajs.replace(g,"{")}`)}return r});const s=/import[\s]{1,}([a-zA-Z\_]+)[\s]{1,}from[\s]{1,}\'idraw\'/;return n=n.replace(s,a=>{const o=s==null?void 0:s.exec(a);let r=a;return o&&o[1]&&(r=`const ${`${o[1]}`} = window.iDraw`),r}),n}function tn(t){for(let e=0;e<P.length;e++){const n=P[e].list;for(let s=0;s<n.length;s++)if((n[s]||{}).key===t)return!0}return!1}function sn(t){for(let e=0;e<P.length;e++){const n=P[e].list;for(let s=0;s<n.length;s++){const a=n[s]||{};if(a.key===t)return a}}return null}const ae=y({setup(t){const e=w(),n=w(),s=w();let a,o;z(r),de(()=>{o.destroy()}),X(()=>{var g,l,_,v,j;return[(g=i==null?void 0:i.files[0])==null?void 0:g.code,(l=i==null?void 0:i.files[1])==null?void 0:l.code,(_=i==null?void 0:i.files[2])==null?void 0:_.code,(v=i==null?void 0:i.files[3])==null?void 0:v.code,(j=i==null?void 0:i.files[4])==null?void 0:j.code]},()=>{r()});function r(){a&&(o.destroy(),e.value.removeChild(a));const g=Qe(i.files);a=document.createElement("iframe"),a.setAttribute("sandbox",["allow-forms","allow-modals","allow-pointer-lock","allow-popups","allow-same-origin","allow-scripts","allow-top-navigation-by-user-activation"].join(" "));const l=en(g);a.srcdoc=l,e.value.appendChild(a),o=f(a)}function f(g){return new Ge(g,{on_fetch_progress:l=>{},on_error:l=>{const _=l.value instanceof Error?l.value.message:l.value;_.includes("Failed to resolve module specifier")||_.includes("Error resolving module specifier")?n.value=_.replace(/\. Relative references must.*$/,"")+`.
Tip: add an "import-map.json" file to specify import paths for dependencies.`:n.value=l.value},on_unhandled_rejection:l=>{let _=l.value;typeof _=="string"&&(_={message:_}),n.value="Uncaught (in promise): "+_.message},on_console:l=>{l.duplicate||(l.level==="error"?l.args[0]instanceof Error?n.value=l.args[0].message:n.value=l.args[0]:l.level==="warn"&&l.args[0].toString().includes("[Vue warn]")&&(s.value=l.args.join("").replace(/\[Vue warn\]:/,"").trim()))},on_console_group:l=>{},on_console_group_end:()=>{},on_console_group_collapsed:l=>{}})}return(g,l)=>(u(),p(k,null,[m(d).demoStatus!=="LOADED"?(u(),I(ee,{key:0})):N("",!0),c("div",{class:x({"preview-container":m(d).demoStatus==="LOADED","preview-hide":m(d).demoStatus!=="LOADED"}),ref:(_,v)=>{v.container=_,e.value=_}},null,2)],64))}});const an={class:"sider-container"},on={class:"sider-menu"},rn={class:"sider-menu-title"},ln={class:"sider-menu-list"},cn=["href"],dn=y({setup(t){function e(n){const s=Object.keys(d.urlParams),a=[];return s.forEach(o=>{o==="demo"?a.push(`demo=${n}`):a.push(`${o}=${d.urlParams[o]||""}`)}),`?${a.join("&")}`}return(n,s)=>(u(),p("div",an,[(u(!0),p(k,null,B(m(P),a=>(u(),p("div",on,[c("div",rn,L(a.name),1),c("div",ln,[(u(!0),p(k,null,B(a.list,o=>(u(),p("a",{class:x(["sider-menu-item",{active:o.key===m(d).urlParams.demo}]),href:e(o.key)},[c("span",null,L(o.name),1)],10,cn))),256))])]))),256))]))}});var un=S(dn,[["__scopeId","data-v-702d1014"]]);const mn=y({setup(t){async function e(){const n=qe("demo")||"basic";try{if(tn(n)){const s=await Xe(n);Oe(s),s.length>0?F("LOADED"):F("NOT_FINISHED")}else F("NOT_FOUND")}catch(s){console.log(s)}}return e(),(n,s)=>(u(),p(k,null,[m(d).layout.showHeader?(u(),I(be,{key:0})):N("",!0),c("div",{class:x(["container",{"no-header":!m(d).layout.showHeader}])},[m(d).layout.showSider?(u(),I(V,{key:0,defaultSplit:15},{left:E(()=>[b(un)]),right:E(()=>[b(V,{defaultSplit:m(d).layout.defaultEditorSplit},{left:E(()=>[b(te)]),right:E(()=>[b(ae)]),_:1},8,["defaultSplit"])]),_:1})):(u(),I(V,{key:1,defaultSplit:m(d).layout.defaultEditorSplit},{left:E(()=>[b(te)]),right:E(()=>[b(ae)]),_:1},8,["defaultSplit"]))],2)],64))}});ue(mn).mount("#app");
