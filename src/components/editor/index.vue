<template>
  <div v-if="globalData.demoStatus === 'LOADED'">
    <Tab />
    <div class="editor-container">
      <CodeMirror @change="onChange" :value="activeCode" :mode="activeMode" />
    </div>
  </div>
  <Status v-else />
</template>

<script setup lang="ts">
//implementation from Vue.js
// MIT License https://github.com/vuejs/vue-next/blob/master/LICENSE

import CodeMirror from '../codemirror/index.vue';
import Status from '../status.vue';
import Tab from './tab.vue';
import { ref, watch, computed } from 'vue';
import { debounce } from './../../util/time';
import { store, updateActiveFileCode } from './../../util/store';
import { globalData } from './../../util/global';

const onChange = debounce((code: string) => {
  updateActiveFileCode(code)
}, 300)

const activeCode = ref(store.files[store.activeIndex]?.code || '');

const modeMap = {
  'js': 'javascript',
  'css': 'css',
  'html': 'htmlmixed',
  'json': 'javascript',
};

const activeMode = computed(() => {
  return modeMap[store.files[store.activeIndex]?.type]
});

watch(() => {
  return store.activeIndex
}, () => {
  activeCode.value = store.files[store.activeIndex]?.code || '';
})
</script>

<style scoped>
.editor-container {
  height: calc(100% - 35px);
  overflow: hidden;
  position: relative;
}
</style>
