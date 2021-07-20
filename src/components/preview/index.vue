<template>
  <div class="preview-container" ref="container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watchEffect, watch } from 'vue'
import type { WatchStopHandle } from 'vue'
import srcdoc from './srcdoc.html?raw'
import { store } from './../../util/store';

const container = ref()

let sandbox: HTMLIFrameElement
// let stopUpdateWatcher: WatchStopHandle

// create sandbox on mount
onMounted(createSandbox)

onUnmounted(() => {
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
  container.value.appendChild(sandbox)
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
