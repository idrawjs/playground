<template>
  <!-- <FileSelector/> -->
  <div class="editor-container">
    <CodeMirror @change="onChange" :value="activeCode" :mode="activeMode" />
  </div>
</template>

<script setup lang="ts">
import CodeMirror from './codemirror/index.vue'
import { ref, watch, computed } from 'vue';
// import { debounce } from './../util/time';

function debounce(fn: Function, n = 100) {
  let handle: any
  return (...args: any[]) => {
    if (handle) clearTimeout(handle)
    handle = setTimeout(() => {
      fn(...args)
    }, n)
  }
}

const onChange = debounce((code: string) => {
  console.log('code =', code);
}, 250)

// const activeCode = ref(store.activeFile.code)

const activeCode = ref(`
function add(a, b) {
  return a + b;
};
console.log(add(1, 2));
`)

const activeMode = 'javascript';
// const activeMode = computed(
//   () => (store.activeFilename.endsWith('.vue') ? 'htmlmixed' : 'javascript')
// )

// watch(
//   () => store.activeFilename,
//   () => {
//     activeCode.value = store.activeFile.code
//   }
// )
</script>

<style scoped>
.editor-container {
  height: calc(100% - 35px);
  overflow: hidden;
  position: relative;
}
</style>
