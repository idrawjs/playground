<template>
  <Status v-if="globalData.demoStatus !== 'LOADED'" />
  <div :class="{
      'preview-container': globalData.demoStatus === 'LOADED',
      'preview-hide': globalData.demoStatus !== 'LOADED'
    }"
    ref="container"></div>
  
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect, watch } from 'vue';
import Status from './../status.vue';
import { store } from './../../util/store';
import { globalData } from './../../util/global';
import { PreviewProxy } from './proxy';
import { getPreivewAssets, mergePreviewDoc } from './../../util/data';

const container = ref()
const runtimeError = ref()
const runtimeWarning = ref()

let sandbox: HTMLIFrameElement
let proxy: PreviewProxy

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
    store?.files[2]?.code,
    store?.files[3]?.code,
    store?.files[4]?.code
  ]
}, () => {
  createSandbox();
});

function createSandbox() {
  if (sandbox) {
    proxy.destroy();
    container.value.removeChild(sandbox)
  }

  const assets = getPreivewAssets(store.files);
  sandbox = document.createElement('iframe');
  sandbox.setAttribute('sandbox', [
    'allow-forms',
    'allow-modals',
    'allow-pointer-lock',
    'allow-popups',
    'allow-same-origin',
    'allow-scripts',
    'allow-top-navigation-by-user-activation'
  ].join(' '))
  
  let sandboxSrc = mergePreviewDoc(assets); 
  sandbox.srcdoc = sandboxSrc;
  container.value.appendChild(sandbox);
  proxy = createPreviewProxy(sandbox);
}

function createPreviewProxy(sandbox: HTMLIFrameElement): PreviewProxy {
  return new PreviewProxy(sandbox, {
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

</script>

<style>
.preview-container,
iframe {
  width: 100%;
  height: 100%;
  border: none;
  background-color: #fff;
}

.preview-hide {
  display: none;
}
</style>
