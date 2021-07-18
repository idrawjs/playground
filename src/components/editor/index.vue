<template>
  <Tab />
  <div class="editor-container">
    <CodeMirror @change="onChange" :value="activeCode" :mode="activeMode" />
  </div>
</template>

<script setup lang="ts">
//implementation from Vue.js
// MIT License https://github.com/vuejs/vue-next/blob/master/LICENSE

import CodeMirror from '../codemirror/index.vue';
import Tab from './tab.vue';
import { ref, watch, computed } from 'vue';
import { debounce } from './../../util/time';
import { store } from './../../util/store';

const onChange = debounce((code: string) => {
  // console.log('code =', code);
}, 300)

const activeCode = ref(store.files[store.activeIndex]?.code || '');

const modeMap = {
  'js': 'javascript',
  'css': 'css',
  'html': 'htmlmixed',
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
