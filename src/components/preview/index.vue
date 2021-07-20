<template>
  <div class="preview-container" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect, watch } from 'vue'
import type { WatchStopHandle } from 'vue'
import srcdoc from './srcdoc.html?raw'
import { store } from './../../util/store';
import { PreviewProxy } from './proxy';

const container = ref()
const runtimeError = ref()
const runtimeWarning = ref()

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy
let stopUpdateWatcher: WatchStopHandle

// create sandbox on mount
onMounted(createSandbox)

onUnmounted(() => {
  proxy.destroy();
  // stopUpdateWatcher && stopUpdateWatcher()
})

watch(() => {
  return [
    store?.files[0]?.code,
    store?.files[1]?.code,
    store?.files[2]?.code
  ]
}, () => {
  createSandbox();
});

function createSandbox() {
  if (sandbox) {
    proxy.destroy();
    container.value.removeChild(sandbox)
  }

  sandbox = document.createElement('iframe')
  sandbox.setAttribute('sandbox', [
    'allow-forms',
    'allow-modals',
    'allow-pointer-lock',
    'allow-popups',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation-by-user-activation'
  ].join(' '))
  
  const sandboxSrc: string = getPreivewHTML();
  sandbox.srcdoc = sandboxSrc;
  container.value.appendChild(sandbox);


  proxy = new PreviewProxy(sandbox, {
    on_fetch_progress: (progress: any) => {
      // pending_imports = progress;
    },
    on_error: (event: any) => {
      const msg = event.value instanceof Error ? event.value.message : event.value
      if (
        msg.includes('Failed to resolve module specifier') ||
        msg.includes('Error resolving module specifier')
      ) {
        runtimeError.value = msg.replace(/\. Relative references must.*$/, '') +
        `.\nTip: add an "import-map.json" file to specify import paths for dependencies.`
      } else {
        runtimeError.value = event.value
      }
    },
    on_unhandled_rejection: (event: any) => {
      let error = event.value
      if (typeof error === 'string') {
        error = { message: error }
      }
      runtimeError.value = 'Uncaught (in promise): ' + error.message
    },
    on_console: (log: any) => {
      if (log.duplicate) {
        return
      }
      if (log.level === 'error') {
        if (log.args[0] instanceof Error) {
          runtimeError.value = log.args[0].message
        } else {
          runtimeError.value = log.args[0]
        }
      } else if (log.level === 'warn') {
        if (log.args[0].toString().includes('[Vue warn]')) {
          runtimeWarning.value = log.args
            .join('')
            .replace(/\[Vue warn\]:/, '')
            .trim()
        }
      }
    },
    on_console_group: (action: any) => {
      // group_logs(action.label, false);
    },
    on_console_group_end: () => {
      // ungroup_logs();
    },
    on_console_group_collapsed: (action: any) => {
      // group_logs(action.label, true);
    }
  })
}

function getPreivewHTML() {
  const assets = { html: '', css: '', js: '' };
  let previewHTML: string = '';
  for (let i = 0; i < store.files.length; i++) {
    if (store.files[i].type === 'html') {
      assets.html = store.files[i].code;
    } else if (store.files[i].type === 'css') {
      assets.css = store.files[i].code;
    } else if (store.files[i].type === 'js') {
      assets.js = store.files[i].code;
    }
  }
  previewHTML = assets.html;
  previewHTML = previewHTML.replace('<!-- @inject-css -->', `<style>${assets.css}</style>`);
  previewHTML = previewHTML.replace('<!-- @inject-js -->', `\<script type="module"\>${assets.js}\</script\>`);
  
  console.log('previewHTML ==', previewHTML);
  
  return assets.html;
}

</script>

<style>
.preview-container,
iframe {
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
}
</style>
